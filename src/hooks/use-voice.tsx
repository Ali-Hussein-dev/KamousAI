"use client";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export const useVoice = ({ text }: { text: string }) => {
  const audioRef = React.useRef<HTMLAudioElement | undefined>();
  const [audioURL, setAudioURL] = React.useState<string>();


  const res = useQuery({
    queryKey: ["audio", text],
    queryFn: () =>
      fetch("/api/text-to-speech", {
        method: "POST",
        body: JSON.stringify({ term: text }),
      }).then((d) => d.arrayBuffer()),
    enabled: false,
    staleTime: Infinity,
  });

  const { refetch, data, isFetching, dataUpdatedAt } = res;

  const play = () => {
    // audioRef.current?.load();
    audioRef.current?.play();
  };

  const playAudio = () => {
    console.log("playAudio:", { term: text, audioURL: audioURL?.slice(-3) });
    if (!audioURL) {
      refetch();
      console.log("playAudio: fetching audio...");
    } else {
      play();
      console.log("playAudio: played cached audio");
    }
  };
  // AddEvenetListener to play after first load
  React.useEffect(() => {
    audioRef.current?.addEventListener("loadeddata", () => {
      play();
    });
    audioRef.current?.removeEventListener("loadeddata", () => undefined);
  }, [audioURL]);

  // Create ObjectURL from data
  React.useEffect(() => {
    const url = data ? URL.createObjectURL(new Blob([data])) : undefined;
    setAudioURL(url);
    return () => {
      if (audioURL) {
        setAudioURL(undefined);
        URL.revokeObjectURL(audioURL);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, dataUpdatedAt]);

  return { ...res, playAudio, audioURL, audioRef };
};

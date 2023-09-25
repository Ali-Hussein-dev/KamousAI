"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export const useVoice = () => {
  const query = useSearchParams();
  const term = query?.get("term") || "";

  const filenameRef = React.useRef<string>();
  const audioRef = React.useRef<HTMLAudioElement>();
    const [fetching, setFetching]= React.useState(false);
  const fetchAudio = async () => {
    const isAudioExist = filenameRef.current?.startsWith(term);
      if (!isAudioExist) {
          setFetching(true);
        try {
            const { filename } = await fetch("/api/text-to-speech", {
                method: "POST",
                body: JSON.stringify({ term: term }),
            }).then((r) => r.json());
            filenameRef.current = filename;
            audioRef.current = new Audio(filename);
            console.log("audio fetched");
          setFetching(false);
        } catch (error) {
            console.error(`error: couldnt fetch audio for ${term}`, error);
        }
    } else {
      console.log("Audio file exist", term);
    }
  };
  const play = async () => {
      await fetchAudio();
      audioRef.current?.play();

  };
  return { play,fetching };
};

import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export const useVoiceContext = ({ text }: { text: string }) => {
  const audioContext = React.useRef(new AudioContext());
  const audioSource = React.useRef<AudioBuffer | null>(null);
  const res = useQuery({
    queryKey: ["audio", text],
    queryFn: () =>
      fetch("/api/text-to-speech", {
        method: "POST",
        body: JSON.stringify({ term: text }),
      })
        .then((d) => d.arrayBuffer())
        .then((arrayBuffer) =>
          audioContext.current?.decodeAudioData(arrayBuffer)
        )
        .then((decodedAudio) => {
          audioSource.current = decodedAudio;
          return decodedAudio;
        }),
    enabled: false,
    staleTime: Infinity,
  });
  const { refetch, isFetching } = res;

  React.useEffect(() => {
    if (audioSource.current) {
      return;
    }
    // clean up audio source on unmount
    return () => {
      audioSource.current = null;
    };
  }, [text]);

  const play = async () => {
    if (!audioSource.current) {
      await refetch();
    }
    const playsound = audioContext.current?.createBufferSource();
    playsound.buffer = audioSource.current;
    playsound.connect(audioContext.current.destination);
    playsound.start(audioContext.current.currentTime);
  };
  return { play, isFetching };
};

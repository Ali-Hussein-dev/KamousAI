import { ActionIcon, Loader } from "@mantine/core";
import { HiSpeakerWave } from "react-icons/hi2";
type AudioProp = {
  isLoadingAudio: boolean;
  playAudio: () => void;
  audioURL?: string;
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
};

export const Audio = ({
  isLoadingAudio,
  playAudio,
  audioURL,
  audioRef,
}: AudioProp) => {
  return (
    // workaround solution currently is not working on mobile devices
    <div className="hidden sm:inline-block">
      <ActionIcon
        onClick={() => playAudio()}
        disabled={isLoadingAudio}
        radius="md"
        size="md"
        slot="audio"
      >
        {isLoadingAudio ? (
          <Loader size="xs" color="white" />
        ) : (
          <HiSpeakerWave />
        )}
      </ActionIcon>
      {audioURL && (
        <audio
          ref={audioRef as React.RefObject<HTMLAudioElement>}
          src={audioURL}
        >
          <source src={audioURL} />
        </audio>
      )}
    </div>
  );
};

/**
 * @description
 * Audio button component without aduio tag
 */
export const AudioCtxButton = ({
  isLoadingAudio,
  playAudio,
}: Omit<AudioProp, "audioURL" | "audioRef">) => {
  return (
    <ActionIcon
      onClick={playAudio}
      disabled={isLoadingAudio}
      radius="md"
      size="lg"
      role="button"
      loading={isLoadingAudio}
    >
      <HiSpeakerWave />
    </ActionIcon>
  );
};

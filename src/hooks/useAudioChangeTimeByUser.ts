import { useEffect } from "react";

const useAudioChangeTimeByUser = (
  progressAudioStaticRef: React.RefObject<HTMLDivElement | null>,
  audioRef: React.RefObject<HTMLAudioElement | null>,
  audioDurationMS: number,
) => {
  useEffect(() => {
    const audioBarStatic = progressAudioStaticRef.current;
    const audio = audioRef.current;

    if (!audioBarStatic || !audio) return;

    const handleChangingTimeByUser = changePlayedTimeByUser(
      audioBarStatic,
      audioDurationMS,
      audio,
    );

    if (!handleChangingTimeByUser) return;

    audioBarStatic.addEventListener("click", handleChangingTimeByUser);

    return () => {
      audioBarStatic.removeEventListener("click", handleChangingTimeByUser);
    };
  }, [audioDurationMS, audioRef, progressAudioStaticRef]);
};

interface ChangePlayedTimeByUser {
  (
    progressAudioBarStatic: HTMLDivElement,
    audioDurationMS: number,
    audio: HTMLAudioElement,
  ): ((event: { clientX: number }) => void) | undefined;
}

const changePlayedTimeByUser: ChangePlayedTimeByUser = (
  progressAudioBarStatic: HTMLDivElement,
  audioDurationMS: number,
  audio: HTMLAudioElement,
) => {
  if (!progressAudioBarStatic || !audio || !audioDurationMS) return undefined;

  const handleClick = (event: { clientX: number }) => {
    const rect = progressAudioBarStatic.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    //[0-1]
    const percentage = clickX / rect.width;

    const newTimeMs = audioDurationMS * percentage;
    audio.currentTime = newTimeMs / 1000;
  };

  return handleClick;
};

export { changePlayedTimeByUser };

export default useAudioChangeTimeByUser;

interface ChangePlayedTimeByUser {
  (
    progressAudioBarStatic: HTMLDivElement,
    audioDurationMS: number,
    audio: HTMLAudioElement
  ): ((event: { clientX: number }) => void) | undefined;
}

const changePlayedTimeByUser: ChangePlayedTimeByUser = (
  progressAudioBarStatic: HTMLDivElement,
  audioDurationMS: number,
  audio: HTMLAudioElement
) => {
  if (!progressAudioBarStatic || !audio || !audioDurationMS) return undefined;

  const handleClick = (event: { clientX: number; }) => {
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

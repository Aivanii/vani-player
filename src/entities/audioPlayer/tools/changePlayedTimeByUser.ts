const changePlayedTimeByUser = (
  progressAudioBarStatic: HTMLDivElement,
  audioDurationMS: number,
  audio: HTMLAudioElement
) => {
  if (!progressAudioBarStatic || !audio || !audioDurationMS) return undefined;

  const handleClick = (event) => {
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

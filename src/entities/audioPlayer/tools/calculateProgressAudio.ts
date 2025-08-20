const calculateProgressAudio = (
  currentAudioTimeMS: number,
  audioDurationMS: number
): string => {
  return `${(currentAudioTimeMS * 100) / audioDurationMS}%`;
};

export { calculateProgressAudio };

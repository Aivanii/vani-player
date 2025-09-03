interface GetAudioPercentageFromClick {
  audioVolumeBarStatic: React.RefObject<HTMLDivElement | null>;
  event: { clientX: number };
}

const getAudioPercentageFromClick = ({
  audioVolumeBarStatic,
  event,
}: GetAudioPercentageFromClick): number | undefined => {
  if (!audioVolumeBarStatic || !audioVolumeBarStatic.current) return 1;

  const rect = audioVolumeBarStatic.current.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  //[0-1]
  const percentage = clickX / rect.width;
  return percentage;
};

export { getAudioPercentageFromClick };

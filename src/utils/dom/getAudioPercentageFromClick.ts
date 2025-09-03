import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";

interface GetAudioPercentageFromClick {
  audioVolumeBarStatic: React.RefObject<HTMLDivElement | null>;
  event: { clientX: number };
}

const getAudioPercentageFromClick = ({
  audioVolumeBarStatic,
  event,
}: GetAudioPercentageFromClick): number => {
  const { currentVolume } = currentPlaylistStore;

  if (!audioVolumeBarStatic || !audioVolumeBarStatic.current) return currentVolume;

  const rect = audioVolumeBarStatic.current.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  //[0-1]
  const percentage = clickX / rect.width;
  return percentage;
};

export { getAudioPercentageFromClick };

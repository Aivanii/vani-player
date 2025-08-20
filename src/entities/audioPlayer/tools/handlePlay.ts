interface HandlePlayProps {
  audio: HTMLAudioElement | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const handlePlay = ({
  audio,
  setIsPlaying,
}: HandlePlayProps): (() => void) | undefined => {
  if (!audio || !setIsPlaying) return undefined;

  const handlePlayClick = () => {
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return handlePlayClick;
};

export { handlePlay };

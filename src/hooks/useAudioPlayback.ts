import { useEffect } from "react";
import type { Song } from "../app/types/types";

const useAudioPlayback = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  isPlaying: boolean,
  currentSong: Song | undefined,
  togglePlay: () => void,
  setIsPlaying: (isPlaying: boolean) => void,
) => {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    const handlePlay = () => {
      if (!isPlaying) {
        togglePlay();
      }
      setIsPlaying(true);
    };
    const handlePause = () => {
      if (isPlaying) {
        togglePlay();
      }
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentSong, isPlaying, togglePlay, setIsPlaying, audioRef]);
};

export default useAudioPlayback;

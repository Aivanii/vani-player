import type { Song } from "../../types";

interface AudioPlayerProps {
  activeSong: Song;
  setActiveSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export type { AudioPlayerProps };

import type { Song } from "../../types";

interface AudioPlayerProps {
  activeSong: Song;
  setActiveSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  playlist: Song[];
}

export type { AudioPlayerProps };

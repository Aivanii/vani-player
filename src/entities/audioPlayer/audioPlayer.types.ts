import type { Song } from "../../types";

interface AudioPlayerProps {
  activeSong: Song;
  setActiveSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playlist: Song[];
}

export type { AudioPlayerProps };

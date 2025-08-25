import type { Song } from "../../types";

interface CurrentPlaylistProps {
  activeSong: Song;
  setActiveSong: (song: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export type { CurrentPlaylistProps };

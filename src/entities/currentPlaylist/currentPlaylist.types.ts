import type { Song } from "../../types";

interface CurrentPlaylistProps {
  activeSong: Song;
  setActiveSong: (song: Song) => void;
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
}

export type { CurrentPlaylistProps };

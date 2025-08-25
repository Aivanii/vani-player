import type { Song } from "../../../types";

interface SetNewActiveSong {
  song: Song;
  setActiveSong: (song: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const setNewActiveSong = ({
  song,
  setActiveSong,
  setIsPlaying,
}: SetNewActiveSong): void => {
  setActiveSong(song);
  setIsPlaying(false);
};

export { setNewActiveSong };

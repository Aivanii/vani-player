import type { Song } from "../../app/types/types";

interface SetNewActiveSong {
  song: Song;
  setActiveSong: (song: Song) => void;
}

const setNewActiveSong = ({ song, setActiveSong }: SetNewActiveSong): void => {
  setActiveSong(song);
};

export { setNewActiveSong };

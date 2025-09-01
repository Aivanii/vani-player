import type { Song } from "../../../types";

interface AddSongToPlaylist {
  song: Song;
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
}

const addSongToPlaylist = ({
  song,
  playlist,
  setPlaylist,
}: AddSongToPlaylist): void => {
  setPlaylist([...playlist, song]);
};

export { addSongToPlaylist };

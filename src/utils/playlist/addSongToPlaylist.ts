import type { Song } from "../../../app/types/types";

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

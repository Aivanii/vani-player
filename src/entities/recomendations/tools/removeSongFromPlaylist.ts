import type { Song } from "../../../types";

interface RemoveSongFromPlaylist {
  song: Song;
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
}

const removeSongFromPlaylist = ({
  song,
  playlist,
  setPlaylist,
}: RemoveSongFromPlaylist): void => {
  setPlaylist(
    playlist.filter((elem) => {
      if (elem.songUrl !== song.songUrl) return elem;
    })
  );
};

export { removeSongFromPlaylist };

import type { Song } from "../../../types";
interface IsSongInPlaylist {
  song: Song;
  playlist: Song[];
}

const isSongInPlaylist = ({ song, playlist }: IsSongInPlaylist): boolean => {
  return playlist.map((s) => s.url).includes(song.url);
};

export { isSongInPlaylist };

import type { Song } from "../../../types";

interface SetNextSong {
  activeSong: Song;
  playlist: Song[];
  setActiveSong: (song: Song) => void;
}

const SetNextSong = ({
  activeSong,
  playlist,
  setActiveSong,
}: SetNextSong) => {
  const handleFunc = () => {
    let currentSongIndex: number = -1;

    for (let i = 0; i < playlist.length; i++) {
      if (JSON.stringify(playlist[i]) === JSON.stringify(activeSong)) {
        currentSongIndex = i;
        break;
      }
    }

    if (currentSongIndex === -1 || currentSongIndex + 1 >= playlist.length) {
      return undefined;
    }
    setActiveSong({ ...playlist[currentSongIndex + 1] });
  };

  return handleFunc;
};

export { SetNextSong };

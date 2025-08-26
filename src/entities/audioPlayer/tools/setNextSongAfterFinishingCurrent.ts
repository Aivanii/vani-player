import type { Song } from "../../../types";

interface SetNextSongAfterFinishingCurrent {
  playlist: Song[];
  activeSong: Song;
  setActiveSong: (song: Song) => void;
}

const setNextSongAfterFinishingCurrent = ({
  playlist,
  activeSong,
  setActiveSong,
}: SetNextSongAfterFinishingCurrent) => {
  const handleFunc = () => {
    console.log("next song");
    let currentSongIndex: number = -1;

    for (let i = 0; i < playlist.length; i++) {
      if (JSON.stringify(playlist[i]) === JSON.stringify(activeSong)) {
        currentSongIndex = i;
        break;
      }
    }

    if (currentSongIndex === -1 || currentSongIndex + 1 >= playlist.length)
      return undefined;

    setActiveSong({ ...playlist[currentSongIndex + 1] });
  };

  return handleFunc;
};

export { setNextSongAfterFinishingCurrent };

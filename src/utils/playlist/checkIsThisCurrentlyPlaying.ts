import type { Song } from "../../../app/types/types";

const checkIsThisCurrentlyPlaying = (currentSong: Song, checkingSong: Song) => {
  return JSON.stringify(currentSong) === JSON.stringify(checkingSong);
};

export { checkIsThisCurrentlyPlaying };

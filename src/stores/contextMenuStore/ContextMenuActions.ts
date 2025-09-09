import type { Song } from "../../types";

import { currentPlaylistStore } from "../currentPlaylistStore/currentPlaylistStore";

const menuActions = {
  playImmediately: (song: Song) => {
    currentPlaylistStore.addSongNextAndPlay(song);
  },
  playNext: (song: Song) => {
    currentPlaylistStore.addSongNext(song);
  },
  addToQueue: (song: Song) => {
    currentPlaylistStore.addSong(song);
  },
  removeFromQueue: (song: Song) => {
    currentPlaylistStore.removeSong(song);
  }
};

export { menuActions };

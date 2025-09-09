import type { Song } from "../../types";

import { currentPlaylistStore } from "../currentPlaylistStore/currentPlaylistStore";

interface MenuTitles {
  playImmediately: string;
  playNext: string;
  addToQueue: string;
  removeFromQueue: string;
}

const menuTitles: MenuTitles = {
  playImmediately: "Play now",
  playNext: "Play next",
  addToQueue: "Add to playlist",
  removeFromQueue: "Remove from playlist",
};

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
  },
};

export { menuActions, menuTitles };

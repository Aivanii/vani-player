import type { Song } from "../../types";

import { currentPlaylistStore } from "../currentPlaylistStore/currentPlaylistStore";

const menuActions = {
  playNext: (song: Song) => {
    currentPlaylistStore.addSongNextAndPlay(song);
  },
};

export { menuActions };

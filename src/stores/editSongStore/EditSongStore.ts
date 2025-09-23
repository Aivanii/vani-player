import { makeAutoObservable } from "mobx";
import type { Song } from "../../types";

class EditSongStore {
  isOpen: boolean = false;
  activeSong: Song | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openSongEditing = (song: Song) => {
    this.isOpen = true;
    this.activeSong = song;
  };

  closeSongEditing = () => {
    this.isOpen = false;
  };
}

export const editSongStore = new EditSongStore();

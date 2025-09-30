import { makeAutoObservable } from "mobx";
import type { Song } from "../../types";
import { currentPlaylistStore } from "../currentPlaylistStore/currentPlaylistStore";

const { changeSongById } = currentPlaylistStore;
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

  updateSongDataById = (song: Song, id: string) => {
    changeSongById(song, id);
  };
}

export const editSongStore = new EditSongStore();

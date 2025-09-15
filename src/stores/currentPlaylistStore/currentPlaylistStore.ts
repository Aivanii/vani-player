import { makeAutoObservable } from "mobx";
import type { Song } from "../../types";

class CurrentPlaylistStore {
  playlist: Song[] = [
    {
      artist_name: "yuyoyuppe sick",
      name: "SICK Yanderu EP",
      album_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYW2Kr2xIM4bKzgXhOyHV7XUguj2LreQRvQg&s",
      url: "./yuyoyuppe_sick.mp3",
    },
  ];
  isPlaying: boolean = false;
  activeurl: string = this.playlist[0].url;
  //[0-1]
  volume: number = 1;
  isVolumeBarOnScreen: boolean = false;
  isMuted: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  togglePlay = () => {
    if (this.activeurl) {
      this.isPlaying = !this.isPlaying;
    }
  };

  toggleMute = () => {
    this.isMuted = !this.isMuted;
  };

  setIsVolumeBarOnScreen = (value: boolean) => {
    this.isVolumeBarOnScreen = value;
  };

  setNewActiveurl = (url: string) => {
    this.activeurl = url;
  };

  setPreviousSong = () => {
    if (this.activeurl === null) return;

    const newActiveurl =
      this.playlist.findIndex((song) => song.url === this.activeurl) - 1;
    if (newActiveurl >= 0) this.activeurl = this.playlist[newActiveurl].url;
  };

  setNextSong = () => {
    if (this.activeurl === null) return;

    const newActiveurl =
      this.playlist.findIndex((song) => song.url === this.activeurl) + 1;
    if (this.playlist[newActiveurl])
      this.activeurl = this.playlist[newActiveurl].url;
    else {
      this.isPlaying = false;
    }
  };

  setVolume = (volume: number) => {
    this.volume = volume;
  };

  addSong = (song: Song) => {
    const isSongInThePlaylist = this.playlist.find(
      (elem) => elem.url === song.url,
    );
    if (isSongInThePlaylist) return;
    this.playlist.push(song);
  };

  addSongNext = (song: Song) => {
    const currentSongIndex = this.playlist.findIndex(
      (elem) => elem.url === this.activeurl,
    );
    this.playlist = [
      ...this.playlist.splice(0, currentSongIndex + 1),
      song,
      ...this.playlist,
    ];
  };

  addSongNextAndPlay = (song: Song) => {
    this.addSongNext(song);
    this.activeurl = song.url;
    if (!this.isPlaying) {
      this.isPlaying = true;
    }
  };

  removeSong = (song: Song) => {
    if (song.url === this.activeurl) {
      let currentSongIndex = this.currentlyPlayingSongIndex;
      if (this.playlist.length - 1 > currentSongIndex) {
        currentSongIndex++;
      } else if (this.playlist.length > 1) {
        currentSongIndex--;
      } else {
        currentSongIndex = -1;
      }
      this.activeurl = this.playlist[currentSongIndex]?.url || "";

      if (this.activeurl === "") {
        this.isPlaying = false;
      }
    }
    this.playlist = this.playlist.filter(
      (playlistSong) => playlistSong.url !== song.url,
    );
  };

  isSongInPlaylist = (song: Song): boolean => {
    return !!this.playlist.find(
      (playlistSong) => song.url === playlistSong.url,
    );
  };

  get currenturl() {
    return this.activeurl;
  }

  get currentlyPlayingSongIndex() {
    return this.playlist.findIndex((song) => song.url === this.activeurl);
  }

  get isCurrentlyMuted() {
    return this.isMuted;
  }

  get currentVolume() {
    return this.volume;
  }

  get currentSong() {
    return this.playlist.find((song) => song.url === this.activeurl);
  }
}

export const currentPlaylistStore = new CurrentPlaylistStore();

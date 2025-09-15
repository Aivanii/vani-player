import { makeAutoObservable, toJS } from "mobx";
import type { Song } from "../../types";

class CurrentPlaylistStore {
  playlist: Song[] = [
    {
      id: "0",
      artist_name: "yuyoyuppe sick",
      artist_id: "dunno",
      name: "SICK Yanderu EP",
      album_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYW2Kr2xIM4bKzgXhOyHV7XUguj2LreQRvQg&s",
      album_name: "dunno",
      audio: "./yuyoyuppe_sick.mp3",
    },
  ];
  isPlaying: boolean = false;
  activeurl: string = this.playlist[0].audio;
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
      this.playlist.findIndex((song) => song.audio === this.activeurl) - 1;
    if (newActiveurl >= 0) this.activeurl = this.playlist[newActiveurl].audio;
  };

  setNextSong = () => {
    if (this.activeurl === null) return;

    const newActiveurl =
      this.playlist.findIndex((song) => song.audio === this.activeurl) + 1;
    if (this.playlist[newActiveurl])
      this.activeurl = this.playlist[newActiveurl].audio;
    else {
      this.isPlaying = false;
    }
  };

  setVolume = (volume: number) => {
    this.volume = volume;
  };

  addSong = (song: Song) => {
    const isSongInThePlaylist = this.playlist.find(
      (elem) => elem.audio === song.audio,
    );
    if (isSongInThePlaylist) return;
    this.playlist.push(song);
  };

  addSongNext = (song: Song) => {
    const currentSongIndex = this.playlist.findIndex(
      (elem) => elem.audio === this.activeurl,
    );
    this.playlist = [
      ...this.playlist.splice(0, currentSongIndex + 1),
      song,
      ...this.playlist,
    ];
  };

  addSongNextAndPlay = (song: Song) => {
    if (!this.isSongInPlaylist(song)) {
      this.addSongNext(song);
    }
    this.activeurl = song.audio;
  };

  removeSong = (song: Song) => {
    if (song.audio === this.activeurl) {
      let currentSongIndex = this.currentlyPlayingSongIndex;
      if (this.playlist.length - 1 > currentSongIndex) {
        currentSongIndex++;
      } else if (this.playlist.length > 1) {
        currentSongIndex--;
      } else {
        currentSongIndex = -1;
      }
      this.activeurl = this.playlist[currentSongIndex]?.audio || "";

      if (this.activeurl === "") {
        this.isPlaying = false;
      }
    }
    this.playlist = this.playlist.filter(
      (playlistSong) => playlistSong.audio !== song.audio,
    );
  };

  isSongInPlaylist = (song: Song): boolean => {
    return !!this.playlist.find(
      (playlistSong) => song.audio === playlistSong.audio,
    );
  };

  get currenturl() {
    return this.activeurl;
  }

  get currentlyPlayingSongIndex() {
    return this.playlist.findIndex((song) => song.audio === this.activeurl);
  }

  get isCurrentlyMuted() {
    return this.isMuted;
  }

  get currentVolume() {
    return this.volume;
  }

  get currentSong() {
    return this.playlist.find((song) => song.audio === this.activeurl);
  }
}

export const currentPlaylistStore = new CurrentPlaylistStore();

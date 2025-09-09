import { makeAutoObservable } from "mobx";
import type { Song } from "../../types";

class CurrentPlaylistStore {
  playlist: Song[] = [
    {
      authorName: "yuyoyuppe sick",
      songName: "SICK Yanderu EP",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYW2Kr2xIM4bKzgXhOyHV7XUguj2LreQRvQg&s",
      songUrl: "./yuyoyuppe_sick.mp3",
    },
  ];
  isPlaying: boolean = false;
  activeSongUrl: string = this.playlist[0].songUrl;
  //[0-1]
  volume: number = 1;
  isVolumeBarOnScreen: boolean = false;
  isMuted: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  togglePlay = () => {
    if (this.activeSongUrl) {
      this.isPlaying = !this.isPlaying;
    }
  };

  toggleMute = () => {
    this.isMuted = !this.isMuted;
  };

  setIsVolumeBarOnScreen = (value: boolean) => {
    this.isVolumeBarOnScreen = value;
  };

  setNewActiveSongUrl = (url: string) => {
    this.activeSongUrl = url;
  };

  setPreviousSong = () => {
    if (this.activeSongUrl === null) return;

    const newActiveSongUrl =
      this.playlist.findIndex((song) => song.songUrl === this.activeSongUrl) -
      1;
    if (newActiveSongUrl >= 0)
      this.activeSongUrl = this.playlist[newActiveSongUrl].songUrl;
  };

  setNextSong = () => {
    if (this.activeSongUrl === null) return;

    const newActiveSongUrl =
      this.playlist.findIndex((song) => song.songUrl === this.activeSongUrl) +
      1;
    if (this.playlist[newActiveSongUrl])
      this.activeSongUrl = this.playlist[newActiveSongUrl].songUrl;
    else {
      this.isPlaying = false;
    }
  };

  setVolume = (volume: number) => {
    this.volume = volume;
  };

  addSong = (song: Song) => {
    this.playlist.push(song);
  };

  addSongNextAndPlay = (song: Song) => {
    const currentSongIndex = this.playlist.findIndex(
      (elem) => elem.songUrl === this.activeSongUrl
    );
    this.playlist = [
      ...this.playlist.splice(0, currentSongIndex + 1),
      song,
      ...this.playlist,
    ];
  };

  removeSong = (song: Song) => {
    if (song.songUrl === this.activeSongUrl) {
      let currentSongIndex = this.currentlyPlayingSongIndex;
      if (this.playlist.length - 1 > currentSongIndex) {
        currentSongIndex++;
      } else if (this.playlist.length > 1) {
        currentSongIndex--;
      } else {
        currentSongIndex = -1;
      }
      this.activeSongUrl = this.playlist[currentSongIndex]?.songUrl || "";

      if (this.activeSongUrl === "") {
        this.isPlaying = false;
      }
    }
    this.playlist = this.playlist.filter(
      (playlistSong) => playlistSong.songUrl !== song.songUrl
    );
  };

  isSongInPlaylist = (song: Song): boolean => {
    return !!this.playlist.find(
      (playlistSong) => song.songUrl === playlistSong.songUrl
    );
  };

  get currentSongUrl() {
    return this.activeSongUrl;
  }

  get currentlyPlayingSongIndex() {
    return this.playlist.findIndex(
      (song) => song.songUrl === this.activeSongUrl
    );
  }

  get isCurrentlyMuted() {
    return this.isMuted;
  }

  get currentVolume() {
    return this.volume;
  }

  get currentSong() {
    return this.playlist.find((song) => song.songUrl === this.activeSongUrl);
  }
}

export const currentPlaylistStore = new CurrentPlaylistStore();

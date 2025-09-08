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
    {
      authorName: " vocalokat",
      songName: "self proclaimed angel",
      songThumbnail:
        "https://moc.muzyet.com/images/cover/vocalokat/vocalokat-self-proclaimed-angel.jpg",
      songUrl: "./self_proclaimed_angel.mp3",
    },
    {
      authorName: "Kanna Yanagi",
      songName: "Speedy Speed Boy",
      songThumbnail: "https://i.ytimg.com/vi/gqi8AWtDJ74/maxresdefault.jpg",
      songUrl: "./speedySpeedBoy.mp3",
    },
    {
      authorName: "bitbreaker",
      songName: "God Only Knows",
      songThumbnail:
        "https://images.genius.com/3b7612f22a4c2a1f5dcb1032dda1aef2.300x300x1.png",
      songUrl: "./godOnlyKnows.mp3",
    },
    {
      authorName: "vocaCircus",
      songName: "【DEX】 Misery Loves Company",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
      songUrl: "./mlcc.mp3",
    },
  ];
  isPlaying: boolean = false;
  currentSongIndex: number | null = 1;
  //[0-1]
  volume: number = 1;
  isVolumeBarOnScreen: boolean = false;
  isMuted: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  togglePlay = () => {
    this.isPlaying = !this.isPlaying;
  };

  toggleMute = () => {
    this.isMuted = !this.isMuted;
  };

  setIsVolumeBarOnScreen = (value: boolean) => {
    this.isVolumeBarOnScreen = value;
  };

  setNewCurrentSongIndex = (index: number) => {
    this.currentSongIndex = index;
  };

  setPreviousSong = () => {
    if (!this.currentSongIndex) return;
    this.currentSongIndex = Math.max(0, this.currentSongIndex - 1);
  };

  setNextSong = () => {
    if (this.currentSongIndex === null) return;
    this.currentSongIndex = Math.min(
      this.playlist.length - 1,
      this.currentSongIndex + 1
    );
  };

  setVolume = (volume: number) => {
    this.volume = volume;
  };

  setNewPlaylist = (songs: Song[]) => {
    this.playlist = songs;
  }

  removeSong = (index: number) => {
    this.playlist.splice(index, 1);
  };

  swapSongIndexes = (index1: number, index2: number) => {
    if (this.currentSongIndex === index1) {
      this.currentSongIndex = index2;
    }
    if (this.currentSongIndex === index2) {
      this.currentSongIndex = index1;
    }

    [this.playlist[index1], this.playlist[index2]] = [
      this.playlist[index2],
      this.playlist[index1],
    ];
  };

  get currentlyPlayingSongIndex() {
    return this.currentSongIndex;
  }

  get isCurrentlyMuted() {
    return this.isMuted;
  }

  get currentVolume() {
    return this.volume;
  }

  get isVolumeBarCurrentlyOnScreen() {
    return this.isVolumeBarOnScreen;
  }

  get currentlyPlaying() {
    return this.isPlaying;
  }

  get currentSong() {
    if (this.currentSongIndex === null) return undefined;
    return this.playlist[this.currentSongIndex];
  }

  get playlistLength() {
    return this.playlist.length;
  }
}

export const currentPlaylistStore = new CurrentPlaylistStore();

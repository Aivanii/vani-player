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
  activeSongUrl: string = this.playlist[2].songUrl;
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
    else{
      this.isPlaying = false;
    }
  };

  setVolume = (volume: number) => {
    this.volume = volume;
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

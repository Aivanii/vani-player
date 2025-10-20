import { makeAutoObservable } from "mobx";
import type { Song } from "../../types/types";
import { makePersistable } from "mobx-persist-store";

class CurrentPlaylistStore {
  playlist: Song[] = [];
  isPlaying: boolean = false;
  activeurl: string | null = this?.playlist[0]?.audio || null;
  isVolumeBarOnScreen: boolean = false;
  isMuted: boolean = false;
  isLooped: boolean = false;

  //[0-1]
  volume: number = 1;

  currentAudioTimeMS: number = 0;
  audioDurationMS: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.initPersist();
  }

  private initPersist = async () => {
    await makePersistable(this, {
      name: "current-playlist",
      properties: [
        "playlist",
        "activeurl",
        "isMuted",
        "isLooped",
        "volume",
        "currentAudioTimeMS",
        "isPlaying",
      ],
      storage: window.localStorage,
    });
  };

  togglePlay = () => {
    if (this.activeurl) {
      this.isPlaying = !this.isPlaying;
    }
  };

  toggleMute = () => {
    this.isMuted = !this.isMuted;
  };

  toggleLoop = () => {
    this.isLooped = !this.isLooped;
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

  setIsPlaying = (value: boolean) => {
    this.isPlaying = value;
  };

  setCurrentAudioTimeMS = (time: number) => {
    this.currentAudioTimeMS = time;
  };

  setAudioDurationMS = (duration: number) => {
    this.audioDurationMS = duration;
  };

  getCurrentAudioTimeMSByPercent = (percent: number) => {
    return (this.audioDurationMS / 100) * percent;
  };

  addSong = (song: Song) => {
    const isSongInThePlaylist = this.playlist.find(
      (elem) => elem.audio === song.audio,
    );
    if (isSongInThePlaylist) return;
    this.playlist.push(song);
    if (this.playlist.length === 1) {
      this.activeurl = song.audio;
    }
  };

  addSongNext = (song: Song) => {
    if (this.isSongInPlaylist(song)) {
      this.removeSong(song);
    }
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
        console.log("no songs");
        this.isPlaying = false;
        this.currentAudioTimeMS = 0;
        this.audioDurationMS = 0;
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

  jumpSeconds = (secs: number) => {
    this.setCurrentAudioTimeMS(this.currentAudioTimeMS + secs * 1000);
    if (this.currentAudioTimeMS < 0) {
      this.setCurrentAudioTimeMS(0);
    }
    if (this.currentAudioTimeMS > this.audioDurationMS) {
      this.setCurrentAudioTimeMS(this.audioDurationMS);
    }
  };

  moveVolume = (percents: number) => {
    this.volume += percents / 100;
    if (this.volume > 1) {
      this.volume = 1;
    }
    if (this.volume < 0) {
      this.volume = 0;
    }
  };

  changeSongById = (song: Song, id: string) => {
    const songIndex = this.playlist.findIndex((elem) => elem.id === id);
    if (!songIndex) return;

    this.playlist[songIndex] = song;
  };

  get isNextSongInPlaylist() {
    const index = this.playlist.findIndex(
      (elem) => elem.audio === this.activeurl,
    );
    const isNextSong = index + 1 < this.playlist.length;
    return isNextSong;
  }

  get isPreviousSongInPlaylist() {
    const index = this.playlist.findIndex(
      (elem) => elem.audio === this.activeurl,
    );
    const isPreviosSong = index > 0;
    return isPreviosSong;
  }

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

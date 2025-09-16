import { makeAutoObservable } from "mobx";
import type { Song } from "../../types";

class CurrentPlaylistStore {
  playlist: Song[] = [
    {
      id: "-3",
      artist_name: "Mili",
      artist_id: "dunno",
      name: "Compass",
      album_image: "https://i.ytimg.com/vi/92E0X59wzeg/mqdefault.jpg",
      album_name: "dunno",
      audio: "./compass.mp3",
    },
    {
      id: "-2",
      artist_name: "Mili",
      artist_id: "dunno",
      name: "Through Patches of Violet",
      album_image: "https://i.ytimg.com/vi/G_JfKOjwzwo/mqdefault.jpg",
      album_name: "dunno",
      audio: "./tpov.mp3",
    },
    {
      id: "-1",
      artist_name: "Michi Mochievee & Camila",
      artist_id: "dunno",
      name: "Kill V. Maim - Michi Mochievee & Camila (COVER)",
      album_image: "https://i.ytimg.com/vi/H4jRi4E-dvA/maxresdefault.jpg",
      album_name: "dunno",
      audio: "./mcv.mp3",
    },
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
    {
      id: "2",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: " vocalokat",
      name: "self proclaimed angel",
      album_image:
        "https://moc.muzyet.com/images/cover/vocalokat/vocalokat-self-proclaimed-angel.jpg",
      audio: "./self_proclaimed_angel.mp3",
    },
    {
      id: "3",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "JubyPhonic",
      name: "Electric Angel",
      album_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9t15jtwy2djQ7jti4KxHavL02xQU2_qdpRg&s",
      audio: "./electricAngel.mp3",
    },
    {
      id: "4",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "Kanna Yanagi",
      name: "Speedy Speed Boy",
      album_image: "https://i.ytimg.com/vi/gqi8AWtDJ74/maxresdefault.jpg",
      audio: "./speedySpeedBoy.mp3",
    },
    {
      id: "5",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "bitbreaker",
      name: "God Only Knows",
      album_image:
        "https://images.genius.com/3b7612f22a4c2a1f5dcb1032dda1aef2.300x300x1.png",
      audio: "./godOnlyKnows.mp3",
    },
    {
      id: "6",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "vocaCircus",
      name: "【DEX】 Misery Loves Company",
      album_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
      audio: "./mlcc.mp3",
    },
    {
      id: "7",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "король и шут",
      name: "Дайте людям рому!",
      album_image:
        "https://korol-i-shut.su/images/albums/prodavets-koshmarov.jpg",
      audio: "./kisdlr.mp3",
    },
    {
      id: "8",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "Will Stetson",
      name: "Override",
      album_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZUCXw9WkET76F8BPfTW4TPfA0IuIqh-jmQ&s",
      audio: "./override.mp3",
    },
  ];
  isPlaying: boolean = false;
  activeurl: string = this.playlist[0].audio;
  isVolumeBarOnScreen: boolean = false;
  isMuted: boolean = false;

  //[0-1]
  volume: number = 1;

  currentAudioTimeMS: number = 0;
  audioDurationMS: number = 0;

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

  setCurrentAudioTimeMS = (time: number) => {
    this.currentAudioTimeMS = time;
  };

  setAudioDurationMS = (duration: number) => {
    this.audioDurationMS = duration;
  };

  addSong = (song: Song) => {
    const isSongInThePlaylist = this.playlist.find(
      (elem) => elem.audio === song.audio,
    );
    if (isSongInThePlaylist) return;
    this.playlist.push(song);
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

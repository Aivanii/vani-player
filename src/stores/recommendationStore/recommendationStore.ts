import { makeAutoObservable } from "mobx";
import { currentPlaylistStore } from "../currentPlaylistStore/currentPlaylistStore";

import type { Song } from "../../types";

class RecommendationStore {
  recommendations: Song[] = [
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
      authorName: "JubyPhonic",
      songName: "Electric Angel",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9t15jtwy2djQ7jti4KxHavL02xQU2_qdpRg&s",
      songUrl: "./electricAngel.mp3",
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
    {
      authorName: "король и шут",
      songName: "Дайте людям рому!",
      songThumbnail:
        "https://korol-i-shut.su/images/albums/prodavets-koshmarov.jpg",
      songUrl: "./kisdlr.mp3",
    },
    {
      authorName: "Will Stetson",
      songName: "Override",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZUCXw9WkET76F8BPfTW4TPfA0IuIqh-jmQ&s",
      songUrl: "./override.mp3",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addSongIntoCurrentPlaylist = (song: Song) => {
    const isSongInPlaylist = currentPlaylistStore.isSongInPlaylist(song);
    if (!isSongInPlaylist) {
      currentPlaylistStore.addSong(song);
    }
  };

  removeSongFromCurrentPlaylist = (song: Song) => {
    const isSongInPlaylist = currentPlaylistStore.isSongInPlaylist(song);
    if (isSongInPlaylist) {
      currentPlaylistStore.removeSong(song);
    }
  };

  isCanBeAddedIntoCurrentPlaylist = (song: Song) => {
    return currentPlaylistStore.isSongInPlaylist(song);
  };
}

export const recommendationStore = new RecommendationStore();

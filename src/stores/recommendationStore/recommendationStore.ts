import { makeAutoObservable } from "mobx";
import { currentPlaylistStore } from "../currentPlaylistStore/currentPlaylistStore";

import type { Song } from "../../types";

class RecommendationStore {
  recommendations: Song[] = [
    {
      id: "1",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "yuyoyuppe sick",
      name: "SICK Yanderu EP",
      album_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYW2Kr2xIM4bKzgXhOyHV7XUguj2LreQRvQg&s",
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

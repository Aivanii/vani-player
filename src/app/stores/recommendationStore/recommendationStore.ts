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
      album_image: "./thumbnails/sick.jpeg",
      audio: "./yuyoyuppe_sick.mp3",
    },
    {
      id: "2",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: " vocalokat",
      name: "self proclaimed angel",
      album_image: "./thumbnails/spa.jpeg",
      audio: "./self_proclaimed_angel.mp3",
    },
    {
      id: "3",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "JubyPhonic",
      name: "Electric Angel",
      album_image: "./thumbnails/ea.jpeg",
      audio: "./electricAngel.mp3",
    },
    {
      id: "4",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "Kanna Yanagi",
      name: "Speedy Speed Boy",
      album_image: "./thumbnails/ssb.jpeg",
      audio: "./speedySpeedBoy.mp3",
    },
    {
      id: "5",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "bitbreaker",
      name: "God Only Knows",
      album_image: "./thumbnails/gok.jpeg",
      audio: "./godOnlyKnows.mp3",
    },
    {
      id: "6",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "vocaCircus",
      name: "【DEX】 Misery Loves Company",
      album_image: "./thumbnails/mlc.jpeg",
      audio: "./mlcc.mp3",
    },
    {
      id: "7",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "король и шут",
      name: "Дайте людям рому!",
      album_image: "./thumbnails/dlr.jpeg",
      audio: "./kisdlr.mp3",
    },
    {
      id: "8",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "Will Stetson",
      name: "Override",
      album_image: "./thumbnails/or.jpeg",
      audio: "./override.mp3",
    },
    {
      id: "9",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "Paul Owen Music",
      name: "Butcher Vanity",
      album_image: "./thumbnails/bv.jpeg",
      audio: "./bv.mp3",
    },
    {
      id: "10",
      artist_id: "dunno",
      album_name: "dunno",
      artist_name: "Anya Melfissa2",
      name: "Chronik",
      album_image: "./thumbnails/ch.jpeg",
      audio: "./ch.mp3",
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

import { useState } from "react";

import type { Song } from "../../types";
import type { RecommendationProps } from "./recomendations.types";

import { RecommendedSong } from "./recommendedSong";

const Recomendations = ({ playlist, setPlaylist }: RecommendationProps) => {
  const [recomendationSongs, setRecomendationSongs] = useState<Song[]>([
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
  ]);
  return (
    <div className="relative block border-1 w-full h-full shadow-standart bg-entity-bg border-standart-border rounded-4xl p-6 self-stretch">
      <div className="">
        <h3 className="text-2xl font-bold truncate">Recommended for you</h3>
      </div>
      <div className="flex justify-center items-center">
        <div className="pt-6 flex flex-row gap-4 flex-wrap justify-start max-w-204">
          {recomendationSongs.map((song) => {
            return (
              <RecommendedSong
                key={song.songUrl}
                song={song}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Recomendations };

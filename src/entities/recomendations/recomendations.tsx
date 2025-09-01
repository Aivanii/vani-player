import { useState } from "react";

import type { Song } from "../../types";
import type { RecommendationProps } from "./recomendations.types";

import { RecommendedSong } from "./recommendedSong";

const Recomendations = ({ playlist, setPlaylist }: RecommendationProps) => {
  const [recomendationSongs, setRecomendationSongs] = useState<Song[]>([
    {
      authorName: "Yasuo",
      songName: "Electric Angel",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9t15jtwy2djQ7jti4KxHavL02xQU2_qdpRg&s",
      songUrl: "./electricAngel.mp3",
    },
  ]);
  return (
    <div className="relative block border-1 w-full h-full shadow-standart bg-entity-bg border-standart-border rounded-4xl p-6 self-stretch">
      <div className="">
        <h3 className="text-2xl font-bold truncate">Recommended for you</h3>
      </div>
      <div className="pt-6">
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
  );
};

export { Recomendations };

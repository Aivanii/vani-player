import { useState } from "react";
import type { Song } from "../../types";
import { checkIsThisCurrentlyPlaying } from "./tools/checkIsThisCurrentlyPlaying";
import { setNewActiveSong } from "./tools/setNewActiveSong";

import type { CurrentPlaylistProps } from "./currentPlaylist.types";

const CurrentPlaylist = ({
  activeSong,
  setActiveSong,
  setIsPlaying,
}: CurrentPlaylistProps) => {
  const [playlist, setPlaylist] = useState<Song[]>([
    {
      authorName: "Rin Tezuka",
      songName: "Something cool",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjIooFlTgcIGVC7PnaFLc9x1CMZxrBFVsaw&s",
      songUrl: "https://dl1.mp3party.net/online/10471206.mp3",
    },
    {
      authorName: "yuyoyuppe sick",
      songName: "SICK Yanderu EP",
      songThumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYW2Kr2xIM4bKzgXhOyHV7XUguj2LreQRvQg&s",
      songUrl: "./yuyoyuppe_sick.mp3",
    },{
      authorName: " vocalokat",
      songName: "self proclaimed angel",
      songThumbnail:
        "https://moc.muzyet.com/images/cover/vocalokat/vocalokat-self-proclaimed-angel.jpg",
      songUrl: "./self_proclaimed_angel.mp3",
    },
  ]);

  return (
    <aside className="relative block border-2 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {playlist.map((song) => {
            return (
              <li
                className={`border-1 border-standart-border p-2 rounded-2xl transition delay-50 cursor-pointer 
                  hover:scale-105
                  ${
                    checkIsThisCurrentlyPlaying(activeSong, song)
                      ? "bg-draggable-active-elem-bg border-2 shadow-standart"
                      : "bg-draggable-elem-bg"
                  } `}
                data-audio-url={song.songUrl}
                key={song.songUrl}
              >
                <div className="flex flex-row gap-3">
                  <div className="relative">
                    <img
                      className="relative w-16 aspect-square object-cover rounded-md shadow-[0_0_0_2px_#ffffff1f]"
                      src={song.songThumbnail}
                      alt="img alt"
                    ></img>
                    <div
                      className="w-full h-full aspect-square absolute left-0 top-0 opacity-0 rounded-md transition duration-150 p-2 z-10 bg-transparent
                    hover:opacity-100 hover:backdrop-blur-[2px] hover:bg-[rgba(0,0,0,0.5)]"
                      onClick={() => {
                        setNewActiveSong({ song, setActiveSong, setIsPlaying });
                      }}
                    >
                      <img
                        className="z-20 invert-100"
                        src="https://img.icons8.com/puffy/32/play.png"
                        alt="play this song"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full h-full items-start gap-2">
                    <span className="block truncate">{song.songName}</span>
                    <span className="block text-important truncate">
                      {song.authorName}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export { CurrentPlaylist };

import { useState } from "react";
import { AudioPlayer } from "../entities/audioPlayer/audioPlayer";
import { CurrentPlaylist } from "../entities/currentPlaylist/currentPlaylist";
import { Recomendations } from "../entities/recomendations/recomendations";
import { ContextMenu } from "../entities/contextMenu/contextMenuSong";

import type { Song } from "../types";

function Main() {
  const [activeSong, setActiveSong] = useState<Song>({
    authorName: "Rin Tezuka",
    songName: "Something cool",
    songThumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjIooFlTgcIGVC7PnaFLc9x1CMZxrBFVsaw&s",
    songUrl: "https://dl1.mp3party.net/online/10471206.mp3",
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
    },
    {
      authorName: " vocalokat",
      songName: "self proclaimed angel",
      songThumbnail:
        "https://moc.muzyet.com/images/cover/vocalokat/vocalokat-self-proclaimed-angel.jpg",
      songUrl: "./self_proclaimed_angel.mp3",
    },
  ]);

  return (
    <main className="w-full h-full">
      <div className="flex justify-center items-start w-full h-full gap-6">
        <CurrentPlaylist
          activeSong={activeSong}
          setActiveSong={setActiveSong}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
        <div className="flex justify-center items-center gap-6 flex-col max-w-4xl w-full h-full">
          <AudioPlayer
            activeSong={activeSong}
            setActiveSong={setActiveSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playlist={playlist}
          />
          <Recomendations playlist={playlist} setPlaylist={setPlaylist} />
        </div>
      </div>
      <ContextMenu />
    </main>
  );
}

export default Main;

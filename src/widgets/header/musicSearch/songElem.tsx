import type { Song } from "../../../app/types/types";

import { useSongContextMenu } from "../../../hooks/useContextMenu";

interface SongElemProps {
  song: Song;
  isPlaying: boolean;
  isThisSongActive: boolean;
  index: number;
  addSongNextAndPlay: (song: Song) => void;
  togglePlay: () => void;
}

const SongElem = ({
  song,
  isPlaying,
  isThisSongActive,
  addSongNextAndPlay,
  togglePlay,
}: SongElemProps) => {
  const handleContextMenu = useSongContextMenu(song);

  return (
    <li
      className={`border-standart-border hover:shadow-standart w-full cursor-pointer rounded-2xl border-1 p-2 transition duration-150 hover:scale-105 ${
        isThisSongActive
          ? "shadow-standart draggable-active-elem border-2"
          : "bg-draggable-elem-bg"
      }`}
      data-audio-url={song.id}
      key={song.id}
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-row gap-3">
        <div className="relative">
          <img
            className="relative aspect-square w-20 rounded-md object-cover shadow-[0_0_0_2px_#ffffff1f]"
            src={song.album_image}
            alt="img alt"
          ></img>
          <div
            className="absolute top-0 left-0 z-10 aspect-square h-full w-full rounded-md bg-transparent p-2 opacity-0 transition duration-150 hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100 hover:backdrop-blur-[2px]"
            onClick={() => {
              addSongNextAndPlay(song);
              if (!isThisSongActive && !isPlaying) {
                togglePlay();
              } else if (isThisSongActive) {
                togglePlay();
              }
            }}
          >
            <img
              className="z-20 invert"
              src={
                isThisSongActive && isPlaying
                  ? "https://img.icons8.com/sf-regular-filled/48/pause.png"
                  : "https://img.icons8.com/puffy/32/play.png"
              }
              alt="play this song"
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-start gap-2">
          <span className="block max-w-52 truncate">{song.name}</span>
          <span className="text-important block max-w-52 truncate">
            {song.artist_name}
          </span>
        </div>
      </div>
    </li>
  );
};

export { SongElem };

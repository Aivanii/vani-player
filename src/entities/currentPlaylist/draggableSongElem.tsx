import type { Song } from "../../types";
import { setNewActiveSong } from "./tools/setNewActiveSong";

interface DraggableSongElemProps {
  song: Song;
  isPlayingNow: boolean;
  setActiveSong: (song: Song) => void;
}

const DraggableSongElem = ({
  song,
  isPlayingNow,
  setActiveSong,
}: DraggableSongElemProps) => {
  return (
    <li
      className={`border-1 border-standart-border p-2 rounded-2xl transition delay-50 cursor-pointer 
                  hover:scale-105
                  ${
                    isPlayingNow
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
              setNewActiveSong({ song, setActiveSong });
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
};

export { DraggableSongElem };

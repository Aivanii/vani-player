import type { Song } from "../../types";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { useRef } from "react";
import { useDrag, useDrop, type XYCoord } from "react-dnd";
import { DragAndDropTypes } from "../../dragAndDrop.types";

interface DraggableSongElemProps {
  song: Song;
  isActiveSong: boolean;
  index: number;
  isPlaying: boolean;
  isThisSongCurrentlyPlaying: boolean;
  setNewCurrentSongIndex: (index: number) => void;
  togglePlay: () => void;
}

const DraggableSongElem = ({
  song,
  index,
  isPlaying,
  isThisSongCurrentlyPlaying,
  setNewCurrentSongIndex,
  togglePlay,
}: DraggableSongElemProps) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className={`border-1 border-standart-border p-2 rounded-2xl transition duration-150 cursor-pointer 
                  hover:scale-105 hover:shadow-standart`}
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
              setNewCurrentSongIndex(index);
              if (!isThisSongCurrentlyPlaying && !isPlaying) {
                togglePlay();
              } else if (isThisSongCurrentlyPlaying) {
                togglePlay();
              }
            }}
          >
            <img
              className="z-20 invert-100"
              src={
                isThisSongCurrentlyPlaying
                  ? "https://img.icons8.com/sf-regular-filled/48/pause.png"
                  : "https://img.icons8.com/puffy/32/play.png"
              }
              alt="play this song"
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-full items-start gap-2">
          <span className="block truncate max-w-90">{song.songName}</span>
          <span className="block text-important truncate">
            {song.authorName}
          </span>
        </div>
      </div>
    </li>
  );
};

export { DraggableSongElem };

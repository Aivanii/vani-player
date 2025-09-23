import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop, type DragSourceMonitor } from "react-dnd";
import type { Song } from "../../types";
import { useRef } from "react";
import { dragAndDropTypes } from "../../dnd.types";

import { useSongContextMenu } from "../../hooks/useContextMenu";

interface DraggableSongElemProps {
  song: Song;
  isPlaying: boolean;
  isThisSongActive: boolean;
  index: number;
  setNewActiveurl: (url: string) => void;
  togglePlay: () => void;
  moveSong: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSongElem = ({
  song,
  isPlaying,
  isThisSongActive,
  index,
  setNewActiveurl,
  togglePlay,
  moveSong,
}: DraggableSongElemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const handleContextMenu = useSongContextMenu(song);

  const [, drop] = useDrop<Song, void, { handlerId: Identifier | null }>({
    accept: dragAndDropTypes.SONG,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(song: Song, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = song.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex || dragIndex === undefined) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveSong(dragIndex, hoverIndex);
      song.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dragAndDropTypes.SONG,
    item: () => {
      return song;
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`border-standart-border hover:shadow-standart mt-2 mr-6 mb-2 ml-5 max-w-140 cursor-pointer rounded-2xl border-1 p-2 backdrop-blur-sm transition duration-150 hover:scale-105 ${
        isThisSongActive
          ? "shadow-standart draggable-active-elem border-2"
          : "bg-draggable-elem-bg"
      } ${isDragging ? "opacity-30 backdrop-blur-sm" : "opacity-100"}`}
      data-audio-url={song.audio}
      key={song.id}
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-row gap-3">
        <div className="relative flex-shrink-0">
          <img
            className="relative block aspect-square w-16 flex-1 flex-shrink-0 rounded-md object-cover shadow-[0_0_0_2px_#ffffff1f]"
            src={song.album_image || "./thumbnailSongPreview.png"}
            alt="img alt"
          ></img>
          <div
            className="absolute top-0 left-0 z-10 aspect-square h-full w-full rounded-md bg-transparent p-2 opacity-0 transition duration-150 hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100 hover:backdrop-blur-[2px]"
            onClick={() => {
              setNewActiveurl(song.audio);
              if (!isThisSongActive && !isPlaying) {
                togglePlay();
              } else if (isThisSongActive) {
                togglePlay();
              }
            }}
          >
            <img
              className="z-20 invert-100"
              src={
                isThisSongActive && isPlaying
                  ? "https://img.icons8.com/sf-regular-filled/48/pause.png"
                  : "https://img.icons8.com/puffy/32/play.png"
              }
              alt="play this song"
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-start gap-2 pr-6">
          <span className="block max-w-84 truncate">{song.name}</span>
          <span className="text-important block max-w-84 truncate">
            {song.artist_name}
          </span>
        </div>
      </div>
    </li>
  );
};

export { DraggableSongElem };

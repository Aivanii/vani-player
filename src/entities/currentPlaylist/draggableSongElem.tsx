import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop, type DragSourceMonitor } from "react-dnd";
import type { Song } from "../../types";
import { useRef } from "react";
import { dragAndDropTypes } from "../../dnd.types";

interface DraggableSongElemProps {
  song: Song;
  isPlaying: boolean;
  isThisSongActive: boolean;
  index: number;
  setNewActiveSongUrl: (url: string) => void;
  togglePlay: () => void;
  moveSong: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSongElem = ({
  song,
  isPlaying,
  isThisSongActive,
  index,
  setNewActiveSongUrl,
  togglePlay,
  moveSong,
}: DraggableSongElemProps) => {
  const ref = useRef<HTMLLIElement>(null);

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
      className={`border-1 border-standart-border p-2 rounded-2xl transition duration-150 cursor-pointer hover:scale-105 hover:shadow-standart ${
        isThisSongActive
          ? "border-2 shadow-standart draggable-active-elem"
          : "bg-draggable-elem-bg"
      } ${isDragging ? "opacity-30 backdrop-blur-sm" : "backdrop-opacity-100"}`}
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
              setNewActiveSongUrl(song.songUrl);
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

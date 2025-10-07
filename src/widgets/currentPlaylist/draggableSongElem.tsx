import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop, type DragSourceMonitor } from "react-dnd";
import type { Song } from "../../app/types/types";
import { useRef } from "react";
import { dragAndDropTypes } from "../../app/types/dnd.types";

import { useSongContextMenu } from "../../hooks/useContextMenu";
import { editSongStore } from "../../app/stores/editSongStore/EditSongStore";

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

  const { openSongEditing } = editSongStore;

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
      className={`border-standart-border hover:shadow-standart backdrop-blur-dynamic rounded-dynamic border-size-dynamic mt-2 mr-6 mb-2 ml-5 cursor-pointer p-2 transition duration-150 hover:scale-105 ${
        isThisSongActive
          ? "shadow-standart draggable-active-elem border-size-dynamic"
          : "bg-draggable-elem-bg"
      } ${isDragging ? "backdrop-blur-dynamic opacity-30" : "opacity-100"}`}
      data-audio-url={song.audio}
      key={song.id}
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-row gap-3">
        <div className="relative flex-shrink-0">
          <img
            className="rounded-dynamic relative block aspect-square w-16 flex-1 flex-shrink-0 object-cover shadow-[0_0_0_2px_#ffffff1f]"
            src={song.album_image || "./thumbnailSongPreview.png"}
            alt="img alt"
          ></img>
          <div
            className="hover:backdrop-blur-dynamic rounded-dynamic absolute top-0 left-0 z-10 aspect-square h-full w-full bg-transparent p-2 opacity-0 transition duration-150 hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100"
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
              className="invert-icon z-20"
              src={
                isThisSongActive && isPlaying
                  ? "https://img.icons8.com/sf-regular-filled/48/pause.png"
                  : "https://img.icons8.com/puffy/32/play.png"
              }
              alt="play this song"
            />
          </div>
        </div>
        <div className="flex h-full w-full min-w-0 flex-row items-center justify-center gap-2">
          <div
            className={`flex min-w-0 flex-1 flex-col items-start gap-2 ${song.isAddedByUser ? "max-w-[77%]" : "max-w-[88%]"}`}
          >
            <span className="block w-full truncate" title={song.name}>
              {song.name}
            </span>
            <span
              className="text-important block w-full truncate"
              title={song.album_name}
            >
              {song.artist_name}
            </span>
          </div>
          {song.isAddedByUser && (
            <button
              className="ml-auto opacity-60 transition-all duration-300 hover:opacity-100"
              onClick={() => {
                openSongEditing(song);
              }}
            >
              <img
                className="invert-icon rounded-dynamic aspect-square w-12 p-1"
                src="https://img.icons8.com/?size=100&id=14311&format=png&color=000000"
                alt="song added by user"
              />
            </button>
          )}
          <div className="border-standart-border rounded-dynamic border-size-dynamic mt-1 flex aspect-square h-full w-14 flex-col items-center justify-center gap-2 p-2">
            <span className="border-standart-border border-size-dynamic block w-full"></span>
            <span className="border-standart-border border-size-dynamic block w-full"></span>
            <span className="border-standart-border border-size-dynamic block w-full"></span>
          </div>
        </div>
      </div>
    </li>
  );
};

export { DraggableSongElem };

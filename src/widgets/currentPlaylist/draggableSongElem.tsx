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
  setCurrentAudioTimeMS: (currentTimeMs: number) => void;
}

const DraggableSongElem = ({
  song,
  isPlaying,
  isThisSongActive,
  index,
  setNewActiveurl,
  togglePlay,
  moveSong,
  setCurrentAudioTimeMS,
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
      className={`border-standart-border inner-glow hover:hover:hover-glow-enhanced backdrop-blur-dynamic rounded-dynamic border-size-dynamic duration-dynamic mt-2 mr-6 mb-2 ml-5 cursor-pointer p-2 transition-all hover:scale-105 ${
        isThisSongActive
          ? "shadow-standart draggable-active-elem border-size-dynamic"
          : "bg-draggable-elem-bg"
      } ${isDragging ? "backdrop-blur-dynamic opacity-30" : "opacity-100"}`}
      data-audio-url={song.audio}
      key={song.id}
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-row">
        <div className="relative flex-shrink-0">
          <img
            className="rounded-dynamic relative block aspect-square w-16 flex-1 flex-shrink-0 object-cover p-1 shadow-[0_0_0_2px_#ffffff1f]"
            src={song.album_image || "./thumbnailSongPreview.png"}
            alt={`${song.album_name} song preview`}
          ></img>
          <div
            className="hover:backdrop-blur-dynamic rounded-dynamic duration-dynamic absolute top-0 left-0 z-10 aspect-square h-full w-full bg-transparent opacity-0 transition-all hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100"
            onClick={() => {
              setNewActiveurl(song.audio);
              if (!isThisSongActive) {
                setCurrentAudioTimeMS(0);
                if (!isPlaying) {
                  togglePlay();
                }
              } else {
                togglePlay();
              }
            }}
          >
            <img
              className="invert-icon absolute top-1/2 left-1/2 z-20 -translate-1/2"
              src={
                isThisSongActive && isPlaying
                  ? "https://img.icons8.com/sf-regular-filled/48/pause.png"
                  : "https://img.icons8.com/puffy/32/play.png"
              }
              alt="play this song"
            />
          </div>
        </div>
        <div className="flex h-full w-full min-w-0 flex-row items-center justify-center gap-4 md:ml-4">
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
          <div className="flex gap-2">
            {song.isAddedByUser && (
              <button
                className="duration-dynamic ml-auto opacity-60 transition-all hover:opacity-100"
                onClick={() => {
                  openSongEditing(song);
                }}
              >
                <img
                  className="invert-icon rounded-dynamic aspect-square w-16 p-1"
                  src="https://img.icons8.com/?size=100&id=14311&format=png&color=000000"
                  alt="song added by user"
                />
              </button>
            )}
            <div className="inner-glow border-standart-border rounded-dynamic border-size-dynamic flex aspect-square h-full w-16 flex-col items-center justify-center gap-2 p-2">
              <span className="border-standart-border rounded-dynamic block w-full border-2"></span>
              <span className="border-standart-border rounded-dynamic block w-full border-2"></span>
              <span className="border-standart-border rounded-dynamic block w-full border-2"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export { DraggableSongElem };

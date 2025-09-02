import type { Song } from "../../types";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { useRef } from "react";

interface DraggableSongElemProps {
  song: Song;
  isPlayingNow: boolean;
  index: number;
  //onMoveSong: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSongElem = ({
  song,
  isPlayingNow,
  index,
}: DraggableSongElemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const isDragging = false;

  const { setNewCurrentSongIndex } = currentPlaylistStore;

  /*
  const [, drop] = useDrop(() => ({
    accept: DragAndDropTypes.SONG,
    hover: (draggedItem: { song: Song }, monitor) => {
      if (!ref.current) return;

      const dragIndex = draggedItem.song.index;
      const hoverIndex = song.index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex === undefined || hoverIndex === undefined) return;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      //onMoveSong(dragIndex, hoverIndex);
      draggedItem.song.index = hoverIndex;
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragAndDropTypes.SONG,
    item: { song },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));
  */
  return (
    <li
      ref={ref}
      className={`border-1 border-standart-border p-2 rounded-2xl transition duration-150 cursor-pointer 
                  hover:scale-105 hover:shadow-standart
                  ${
                    isPlayingNow
                      ? "border-2 shadow-standart draggable-active-elem"
                      : "bg-draggable-elem-bg"
                  } 
                  ${
                    isDragging
                      ? "opacity-50 backdrop-blur-sm"
                      : "backdrop-opacity-100"
                  }
                  `}
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

import update from "immutability-helper";
import { checkIsThisCurrentlyPlaying } from "./tools/checkIsThisCurrentlyPlaying";
import { DraggableSongElem } from "./draggableSongElem";
import { useDrop } from "react-dnd";

import { DragAndDropTypes } from "../../dragAndDrop.types";
import type { CurrentPlaylistProps } from "./currentPlaylist.types";
import { useCallback } from "react";
import type { Song } from "../../types";

const CurrentPlaylist = ({
  activeSong,
  setActiveSong,
  playlist,
  setPlaylist,
}: CurrentPlaylistProps) => {
  const [, drop] = useDrop(() => ({ accept: DragAndDropTypes.SONG }));

  const onMoveSong = useCallback((dragIndex: number, hoverIndex: number) => {
    const newPlaylist = (prevCards: Song[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Song],
        ],
      });
    setPlaylist(newPlaylist);
  }, [setPlaylist]);

  return (
    <aside className="relative block border-2 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4" ref={drop}>
          {playlist.map((song, index) => {
            song.index = index;
            return (
              <DraggableSongElem
                key={song.songUrl}
                song={song}
                isPlayingNow={checkIsThisCurrentlyPlaying(activeSong, song)}
                setActiveSong={setActiveSong}
                onMoveSong={onMoveSong}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export { CurrentPlaylist };

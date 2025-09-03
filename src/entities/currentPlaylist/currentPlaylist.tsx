import update from "immutability-helper"
import { DraggableSongElem } from "./draggableSongElem";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { observer } from "mobx-react-lite";
import type { Song } from "../../types";
import { useCallback, useState } from "react";

const CurrentPlaylist = observer(() => {
  const {
    playlist,
    currentlyPlayingSongIndex,
    currentlyPlaying,
    togglePlay,
    swapSongIndexes,
  } = currentPlaylistStore;

  const [localStatePlaylist, setLocalStatePlaylist] =
    useState<Song[]>(playlist);

  const onMoveSong = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newPlaylist = (prevCards: Song[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Song],
          ],
        });
      setLocalStatePlaylist(newPlaylist);
    },
    [setLocalStatePlaylist]
  );

  return (
    <aside className="relative block border-1 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4 self-stretch">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {localStatePlaylist.map((song, index) => {
            const songWithIndex = { ...song, index: index };
            return (
              <DraggableSongElem
                key={songWithIndex.songUrl}
                song={songWithIndex}
                index={index}
                isActiveSong={index === currentlyPlayingSongIndex}
                isThisSongCurrentlyPlaying={
                  currentlyPlaying && index === currentlyPlayingSongIndex
                }
                isPlaying={currentlyPlaying}
                togglePlay={togglePlay}
                swapSongIndexes={swapSongIndexes}
                onMoveSong={onMoveSong}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
});

export default CurrentPlaylist;

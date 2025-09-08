import update from "immutability-helper";
import { DraggableSongElem } from "./draggableSongElem";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { observer } from "mobx-react-lite";
import type { Song } from "../../types";
import { useCallback, useEffect, useState } from "react";

const CurrentPlaylist = observer(() => {
  const {
    currentlyPlayingSongIndex,
    currentlyPlaying,
    togglePlay,
    playlist,
    setNewCurrentSongIndex,
  } = currentPlaylistStore;

  return (
    <aside className="relative block border-1 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4 self-stretch">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {playlist.map((song, index) => {
            const songWithIndex = { ...song, index: index };
            return (
              <DraggableSongElem
                key={songWithIndex.songUrl}
                song={songWithIndex}
                index={index}
                isPlaying={currentlyPlaying}
                isThisSongCurrentlyPlaying={
                  currentlyPlaying && index === currentlyPlayingSongIndex
                }
                setNewCurrentSongIndex={setNewCurrentSongIndex}
                togglePlay={togglePlay}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
});

export default CurrentPlaylist;

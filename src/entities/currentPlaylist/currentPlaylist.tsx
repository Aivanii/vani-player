import update from "immutability-helper";
import { DraggableSongElem } from "./draggableSongElem";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import type { Song } from "../../types";

const CurrentPlaylist = observer(() => {
  const { activeSongUrl, isPlaying, togglePlay, setNewActiveSongUrl } =
    currentPlaylistStore;

  //we need copyPlaylist for Drag-N-Drop
  const [copyPlaylist, setCopyPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    const { playlist } = currentPlaylistStore;
    setCopyPlaylist(playlist);
  }, []);

  const moveSong = useCallback((dragIndex: number, hoverIndex: number) => {
    setCopyPlaylist((prevPlaylist: Song[]) =>
      update(prevPlaylist, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevPlaylist[dragIndex] as Song],
        ],
      })
    );
  }, []);

  return (
    <aside className="relative block border-1 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4 self-stretch">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {copyPlaylist.map((song, index) => {
            const songWithIndex = { ...song, index: index };
            return (
              <DraggableSongElem
                key={songWithIndex.songUrl}
                song={songWithIndex}
                isPlaying={isPlaying}
                isThisSongActive={activeSongUrl === songWithIndex.songUrl}
                index={index}
                setNewActiveSongUrl={setNewActiveSongUrl}
                togglePlay={togglePlay}
                moveSong={moveSong}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
});

export default CurrentPlaylist;

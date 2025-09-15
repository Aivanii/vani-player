import update from "immutability-helper";
import { DraggableSongElem } from "./draggableSongElem";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import type { Song } from "../../types";

const CurrentPlaylist = observer(() => {
  const { activeurl, isPlaying, togglePlay, setNewActiveurl } =
    currentPlaylistStore;
  const { playlist } = currentPlaylistStore;

  //we need copyPlaylist for Drag-N-Drop
  const [copyPlaylist, setCopyPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    setCopyPlaylist(playlist);
  }, [playlist]);

  const moveSong = useCallback((dragIndex: number, hoverIndex: number) => {
    setCopyPlaylist((prevPlaylist: Song[]) =>
      update(prevPlaylist, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevPlaylist[dragIndex] as Song],
        ],
      }),
    );
  }, []);

  return (
    <aside className="shadow-standart bg-entity-bg border-standart-border relative block h-full w-full max-w-120 self-stretch rounded-4xl border-1 p-4 backdrop-blur-sm">
      <h2 className="truncate text-center text-2xl font-bold">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {copyPlaylist.map((song, index) => {
            const songWithIndex = { ...song, index: index };
            return (
              <DraggableSongElem
                key={songWithIndex.url}
                song={songWithIndex}
                isPlaying={isPlaying}
                isThisSongActive={activeurl === songWithIndex.url}
                index={index}
                setNewActiveurl={setNewActiveurl}
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

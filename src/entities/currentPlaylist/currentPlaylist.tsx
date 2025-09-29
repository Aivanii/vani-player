import update from "immutability-helper";
import { DraggableSongElem } from "./draggableSongElem";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import type { Song } from "../../types";
import InputFile from "./inputFile";
import { createPortal } from "react-dom";
import EditSongPanel from "./EditSongPanel";

const CurrentPlaylist = observer(() => {
  const { activeurl, isPlaying, playlist, togglePlay, setNewActiveurl } =
    currentPlaylistStore;

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
    <>
      <aside className="shadow-standart bg-entity-bg border-standart-border relative z-0 block h-full max-h-full w-full max-w-140 self-stretch rounded-4xl border-1 py-4 backdrop-blur-sm">
        <h2 className="truncate text-center text-2xl font-bold">
          Your playlist
        </h2>
        <div className="pt-4">
          <ul className="shadow-t-standart-shadow scroll flex h-full max-h-270 w-130 flex-col overflow-x-hidden overflow-y-auto">
            {copyPlaylist.map((song, index) => {
              const songWithIndex = { ...song, index: index };
              return (
                <DraggableSongElem
                  key={songWithIndex.audio}
                  song={songWithIndex}
                  isPlaying={isPlaying}
                  isThisSongActive={activeurl === songWithIndex.audio}
                  index={index}
                  setNewActiveurl={setNewActiveurl}
                  togglePlay={togglePlay}
                  moveSong={moveSong}
                />
              );
            })}
            <li className="px-18 py-4">
              <InputFile />
            </li>
          </ul>
        </div>
      </aside>
      {createPortal(<EditSongPanel />, document.body)}
    </>
  );
});

export default CurrentPlaylist;

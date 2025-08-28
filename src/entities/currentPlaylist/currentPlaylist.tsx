import { useState } from "react";
import type { Song } from "../../types";
import { checkIsThisCurrentlyPlaying } from "./tools/checkIsThisCurrentlyPlaying";
import { setNewActiveSong } from "./tools/setNewActiveSong";
import { DraggableSongElem } from "./draggableSongElem";

import type { CurrentPlaylistProps } from "./currentPlaylist.types";

const CurrentPlaylist = ({
  activeSong,
  setActiveSong,
  setIsPlaying,
  playlist,
}: CurrentPlaylistProps) => {
  return (
    <aside className="relative block border-2 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {playlist.map((song) => {
            return (
              <DraggableSongElem
                song={song}
                isPlayingNow={checkIsThisCurrentlyPlaying(activeSong, song)}
                setActiveSong={setActiveSong}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export { CurrentPlaylist };

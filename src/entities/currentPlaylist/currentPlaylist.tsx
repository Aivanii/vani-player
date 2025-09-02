import { checkIsThisCurrentlyPlaying } from "./tools/checkIsThisCurrentlyPlaying";
import { DraggableSongElem } from "./draggableSongElem";

import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";

const CurrentPlaylist = () => {
  const { playlist, isPlaying } = currentPlaylistStore;
  /*
  const onMoveSong = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newPlaylist = (prevCards: Song[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Song],
          ],
        });
      setPlaylist(newPlaylist);
    },
    [setPlaylist]
  );
*/

  return (
    <aside className="relative block border-1 w-full h-full max-w-120 shadow-standart bg-entity-bg border-standart-border rounded-4xl p-4 self-stretch">
      <h2 className="font-bold text-2xl text-center truncate">Your playlist</h2>
      <div className="pt-4">
        <ul className="flex flex-col gap-4">
          {playlist.map((song, index) => {
            song.index = index;
            return (
              <DraggableSongElem
                key={song.songUrl}
                song={song}
                index={index}
                isPlayingNow={isPlaying}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export { CurrentPlaylist };

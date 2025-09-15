import { RecommendedSong } from "./recommendedSong";
import { recommendationStore } from "../../stores/recommendationStore/recommendationStore";
import { observer } from "mobx-react-lite";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import { toJS } from "mobx";

const Recomendations = observer(() => {
  const {
    recommendations,
    addSongIntoCurrentPlaylist,
    removeSongFromCurrentPlaylist,
    isCanBeAddedIntoCurrentPlaylist,
  } = recommendationStore;

  const { playlist } = currentPlaylistStore;

  return (
    <div className="shadow-standart bg-entity-bg border-standart-border relative block h-full w-full self-stretch rounded-4xl border-1 p-6 backdrop-blur-sm">
      <div className="">
        <h3 className="truncate text-2xl font-bold">Recommended for you</h3>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex max-w-204 flex-row flex-wrap justify-start gap-4 pt-6">
          {recommendations.map((song) => {
            return (
              <RecommendedSong
                key={song.url}
                song={song}
                isSongInPlaylist={isCanBeAddedIntoCurrentPlaylist(song)}
                addSongIntoCurrentPlaylist={addSongIntoCurrentPlaylist}
                removeSongFromCurrentPlaylist={removeSongFromCurrentPlaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Recomendations;

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

  const {playlist} = currentPlaylistStore;

  return (
    <div className="relative block border-1 w-full h-full shadow-standart bg-entity-bg border-standart-border rounded-4xl p-6 self-stretch">
      <div className="">
        <h3 className="text-2xl font-bold truncate">Recommended for you</h3>
      </div>
      <div className="flex justify-center items-center">
        <div className="pt-6 flex flex-row gap-4 flex-wrap justify-start max-w-204">
          {recommendations.map((song) => {
            return (
              <RecommendedSong
                key={song.songUrl}
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

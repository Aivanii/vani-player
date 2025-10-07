import { RecommendedSong } from "./recommendedSong";
import { recommendationStore } from "../../app/stores/recommendationStore/recommendationStore";
import { observer } from "mobx-react-lite";

const Recommendations = observer(() => {
  const {
    recommendations,
    addSongIntoCurrentPlaylist,
    removeSongFromCurrentPlaylist,
    isCanBeAddedIntoCurrentPlaylist,
  } = recommendationStore;

  return (
    <div className="shadow-standart bg-entity-bg border-standart-border backdrop-blur-dynamic relative z-0 mx-auto mb-2 block h-max w-dvw self-stretch overflow-hidden rounded-4xl border-1 px-2 py-6 sm:w-full sm:px-6 md:max-h-[540px]">
      <div className="py-2">
        <h3 className="truncate text-2xl font-bold">Recommended for you</h3>
      </div>
      <div className="mx-auto mt-2 mb-2 flex max-h-168 items-center justify-center overflow-y-auto">
        <div className="mx-auto my-4 flex max-h-[430px] w-full flex-row flex-wrap justify-center gap-4">
          {recommendations.map((song) => {
            return (
              <RecommendedSong
                key={song.audio}
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

export default Recommendations;

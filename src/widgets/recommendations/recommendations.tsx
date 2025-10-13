import { RecommendedSong } from "./recommendedSong";
import { recommendationStore } from "../../app/stores/recommendationStore/recommendationStore";
import { observer } from "mobx-react-lite";
import { SettingsStore } from "../../app/stores/settingsStore/settingsStore";

const Recommendations = observer(() => {
  const {
    recommendations,
    addSongIntoCurrentPlaylist,
    removeSongFromCurrentPlaylist,
    isCanBeAddedIntoCurrentPlaylist,
  } = recommendationStore;

  const { recsStyle } = SettingsStore;

  return (
    <div className="shadow-standart inner-glow bg-entity-bg border-standart-border backdrop-blur-dynamic rounded-dynamic border-size-dynamic relative z-0 mx-auto mb-2 block h-max w-dvw self-stretch px-2 py-6 sm:w-full sm:px-6 md:max-h-[540px]">
      <div className="py-2">
        <h3 className="truncate text-2xl font-bold">Recommended for you</h3>
      </div>
      <div className="mx-auto mt-2 mb-2 flex max-h-152 items-start justify-center overflow-y-auto">
        <div
          className={`mx-auto my-4 flex w-full justify-center gap-4 ${recsStyle === "horizontal" ? "max-h-[430px] flex-row flex-wrap" : "flex-col flex-nowrap"}`}
        >
          {recommendations.map((song) => {
            return (
              <RecommendedSong
                key={song.audio}
                song={song}
                isSongInPlaylist={isCanBeAddedIntoCurrentPlaylist(song)}
                addSongIntoCurrentPlaylist={addSongIntoCurrentPlaylist}
                removeSongFromCurrentPlaylist={removeSongFromCurrentPlaylist}
                recsStyle={recsStyle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Recommendations;

import AudioPlayer from "../widgets/audioPlayer/audioPlayer";
import CurrentPlaylist from "../widgets/currentPlaylist/currentPlaylist";
import Recommendations from "../widgets/recommendations/recommendations";
import { ContextMenu } from "../features/contextMenu/contextMenuSong";
import ToSettingsFixedBtn from "../components/toSettingsFixedBtn/toSettingsFixedBtn";

function Main() {
  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden md:max-h-dvh">
      <div className="flex h-full flex-col items-start justify-start gap-6 overflow-hidden md:max-h-[820px] md:flex-row">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6">
          <AudioPlayer />
          <Recommendations />
        </div>
        <div className="mx-auto max-h-[1080px]">
          <CurrentPlaylist />
        </div>
      </div>
      <ContextMenu />
      <ToSettingsFixedBtn />
    </main>
  );
}

export default Main;

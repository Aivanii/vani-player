import AudioPlayer from "../entities/audioPlayer/audioPlayer";
import CurrentPlaylist from "../entities/currentPlaylist/currentPlaylist";
import Recomendations from "../entities/recomendations/recomendations";
import { ContextMenu } from "../entities/contextMenu/contextMenuSong";

function Main() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="flex h-full max-h-[1080px] min-w-min flex-col items-start justify-start gap-6 md:flex-row">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6">
          <AudioPlayer />
          <Recomendations />
        </div>
        <div className="mx-auto max-h-[1080px]">
          <CurrentPlaylist />
        </div>
      </div>
      <ContextMenu />
    </main>
  );
}

export default Main;

import AudioPlayer from "../entities/audioPlayer/audioPlayer";
import CurrentPlaylist from "../entities/currentPlaylist/currentPlaylist";
import Recomendations from "../entities/recomendations/recomendations";
import { ContextMenu } from "../entities/contextMenu/contextMenuSong";

function Main() {
  return (
    <main className="w-full h-full">
      <div className="flex justify-center items-start w-full h-full gap-6">
        <CurrentPlaylist />

        <div className="flex justify-center items-center gap-6 flex-col max-w-4xl w-full h-full">
          <AudioPlayer />
          <Recomendations />
        </div>
      </div>
      <ContextMenu />
    </main>
  );
}

export default Main;

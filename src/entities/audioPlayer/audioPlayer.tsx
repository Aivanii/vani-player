import { useEffect, useRef, useState, type ReactElement } from "react";
import { handlePlay } from "./tools/handlePlay";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    const playBtn = playBtnRef.current;

    if (!playBtn) return;

    const handlePlayLogic = handlePlay({ audio, setIsPlaying });

    if (!handlePlayLogic) return;

    playBtn.addEventListener("click", handlePlayLogic);

    return () => {
      playBtn.removeEventListener("click", handlePlayLogic);
    };
  }, []);

  return (
    <main className="w-full max-w-4xl p-6 flex justify-center items-center flex-col border-standart-border border-1 rounded-md shadow-standart bg-entity-bg">
      <audio
        id="audio"
        loop={false}
        muted={false}
        controls
        preload="metadata"
        src="https://dl1.mp3party.net/online/4414262.mp3"
        ref={audioRef}
      ></audio>
      <div className="flex justify-between items-center">
        <div className="inline-block">
          <img
            className="w-32 h-32 rounded-md object-cover shadow-[0_0_0_4px_#ffffff1f]"
            src="https://i.ytimg.com/vi/N3I7V6zvnVI/maxresdefault.jpg"
            alt="audio preview"
          />
        </div>
        <div className="inline-flex gap-6 items-center">
          <button className="aspect-square h-12">
            <img
              className="invert-100"
              width="32"
              height="32"
              src="https://img.icons8.com/ios/32/left--v1.png"
              alt="previous track"
            />
          </button>
          <button className="aspect-square h-16" id="playBtn" ref={playBtnRef}>
            <img
              id="playBtnImgElem"
              className="invert-100"
              width="32"
              height="32"
              src={
                isPlaying
                  ? "https://img.icons8.com/sf-regular-filled/48/pause.png"
                  : "https://img.icons8.com/puffy/32/play.png"
              }
              alt="play button"
            />
          </button>
          <button className="aspect-square h-12">
            <img
              className="invert-100"
              width="32"
              height="32"
              src="https://img.icons8.com/ios/32/right--v1.png"
              alt="next track"
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export { AudioPlayer };

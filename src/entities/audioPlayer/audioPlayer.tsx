import { useEffect, useRef, useState, type ReactElement } from "react";
import { handlePlay } from "./tools/handlePlay";
import { formatTime } from "./tools/formatTime";
import { calculateProgressAudio } from "./tools/calculateProgressAudio";
import { changePlayedTime } from "./tools/changePlayedTime";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioDurationMS, setAudioDurationMS] = useState<number>(0);
  const [currentAudioTimeMS, setCurrentAudioTimeMS] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const progressAudioStaticRef = useRef<HTMLDivElement>(null);

  //audio play/stop button
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

  //audio change audioDurationMS
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setAudioDurationMS(audio.duration * 1000);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (audio.duration > 0) {
      setAudioDurationMS(audio.duration);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  //audio change currentAudioTimeMS by user
  useEffect(() => {
    const audioBarStatic = progressAudioStaticRef.current;

    if (!audioBarStatic) return;

    const handleChangingTimeByUser = changePlayedTime(
      audioBarStatic,
      audioDurationMS,
      setCurrentAudioTimeMS
    );

    if (!handleChangingTimeByUser) return;

    audioBarStatic.addEventListener("click", handleChangingTimeByUser);

    return () => {
      audioBarStatic.removeEventListener("click", handleChangingTimeByUser);
    };
  }, [audioDurationMS]);

  //audio change currentAudioTimeMS when time changes
  useEffect(() => {
    const audio = audioRef.current;
    
    if(!audio) return;

    audio.currentTime = currentAudioTimeMS / 1000;
  }, [currentAudioTimeMS])
  
  return (
    <main className="w-full max-w-4xl p-6 flex justify-center items-center flex-col border-standart-border border-1 rounded-md shadow-standart bg-entity-bg">
      <audio
        id="audio"
        loop={false}
        muted={false}
        preload="metadata"
        src="https://dl1.mp3party.net/online/4414262.mp3"
        ref={audioRef}
      ></audio>
      <div className="flex justify-between items-center flex-col">
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
        <div className="flex flex-row justify-between items-center gap-4 mt-4">
          <span>{formatTime(currentAudioTimeMS)}</span>
          <div className="relative block h-1 hover:h-2">
            <div
              className="relative w-48 h-full bg-[#3D4F64] z-10 rounded-md cursor-pointer"
              ref={progressAudioStaticRef}
            ></div>
            <div
              className={`absolute top-0 left-0 h-full bg-progressAudioGradient z-20 rounded-md pointer-events-none`}
              style={{
                width: calculateProgressAudio(
                  currentAudioTimeMS,
                  audioDurationMS
                ),
              }}
            ></div>
          </div>
          <span>{formatTime(audioDurationMS)}</span>
        </div>
      </div>
    </main>
  );
};

export { AudioPlayer };

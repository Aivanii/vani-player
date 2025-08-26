import { useEffect, useRef, useState } from "react";
import { handlePlay } from "./tools/handlePlay";
import { formatTime } from "./tools/formatTime";
import { calculateProgressAudio } from "./tools/calculateProgressAudio";
import { changePlayedTimeByUser } from "./tools/changePlayedTimeByUser";
import { setNextSongAfterFinishingCurrent } from "./tools/setNextSongAfterFinishingCurrent";

import type { AudioPlayerProps } from "./audioPlayer.types";

import { AudioVisualizer } from "./audioVisualizer/audioVisualizer";

const AudioPlayer = ({
  activeSong,
  setActiveSong,
  isPlaying,
  setIsPlaying,
  playlist,
}: AudioPlayerProps) => {
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
    const audio = audioRef.current;

    if (!audioBarStatic || !audio) return;

    const handleChangingTimeByUser = changePlayedTimeByUser(
      audioBarStatic,
      audioDurationMS,
      audio
    );

    if (!handleChangingTimeByUser) return;

    audioBarStatic.addEventListener("click", handleChangingTimeByUser);

    return () => {
      audioBarStatic.removeEventListener("click", handleChangingTimeByUser);
    };
  }, [audioDurationMS]);

  //audio change currentAudioTimeMS when audio playing
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeChange = () => {
      setCurrentAudioTimeMS(audio.currentTime * 1000);
    };

    audio.addEventListener("timeupdate", handleTimeChange);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeChange);
    };
  }, []);

  //audio auto start playing when new active song
  useEffect(() => {
    setCurrentAudioTimeMS(0);
  }, [activeSong, isPlaying]);

  //audio change to next song in current playlist when current song finishes
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleNextSongLogic = setNextSongAfterFinishingCurrent({
      playlist,
      activeSong,
      setActiveSong,
    });

    if (!handleNextSongLogic) return;

    audio.addEventListener("ended", handleNextSongLogic);

    return () => {
      audio.removeEventListener("ended", handleNextSongLogic);
    };
  }, []);

  return (
    <div
      className="w-full max-w-4xl p-6 flex items-center flex-row border-standart-border border-1 
      rounded-4xl shadow-standart bg-entity-bg"
    >
      <div className="flex gap-4 flex-col">
        <audio
          id="audio"
          loop={false}
          muted={false}
          preload="auto"
          src={activeSong.songUrl}
          ref={audioRef}
        ></audio>

        <div className="flex justify-between items-center flex-col">
          <div className="inline-block">
            <img
              className="w-52 h-52 rounded-md object-cover shadow-[0_0_0_4px_#ffffff1f]"
              src={activeSong.songThumbnail}
              alt="audio preview"
            />
          </div>
        </div>
        <span className="text-2xl text-center font-bold w-50 truncate">
          {activeSong.songName}
        </span>
        <span className="text-center text-important w-50 truncate">
          by {activeSong.authorName}
        </span>
      </div>

      <div className="flex flex-col justify-between items-center gap-4 mt-4 w-full h-full">
        <AudioVisualizer isPlaying={isPlaying} />
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
        <div className="flex justify-around items-center gap-4 ">
          <span className="cursor-default text-important">
            {formatTime(currentAudioTimeMS)}
          </span>
          <div className="relative block transition-300 h-1 hover:h-2">
            <div
              className="relative w-64 h-full bg-progressAudioGradient opacity-15 z-10 rounded-md cursor-pointer"
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
          <span className="cursor-default text-important">
            {formatTime(audioDurationMS)}
          </span>
        </div>
      </div>
    </div>
  );
};

export { AudioPlayer };

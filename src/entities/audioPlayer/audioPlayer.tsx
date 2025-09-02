import { useEffect, useRef, useState } from "react";
import { formatTime } from "./tools/formatTime";
import { calculateProgressAudio } from "./tools/calculateProgressAudio";
import { changePlayedTimeByUser } from "./tools/changePlayedTimeByUser";
import { changeAudioVolumeByUser } from "./tools/changeAudioVolumeByUser";
import { AudioVisualizer } from "./audioVisualizer/audioVisualizer";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const AudioPlayer = observer(() => {
  const { currentSong, togglePlay, isPlaying } = currentPlaylistStore;

  const [audioDurationMS, setAudioDurationMS] = useState<number>(0);
  const [currentAudioTimeMS, setCurrentAudioTimeMS] = useState<number>(0);
  //[0-1]
  const [audioVolume, setAudioVolume] = useState<number>(1);
  const [isAudioChangingMenuOn, setIsAudioChangingMenuOn] =
    useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const progressAudioStaticRef = useRef<HTMLDivElement>(null);

  const audioVolumeButtonRef = useRef<HTMLButtonElement>(null);
  const audioVolumeBarStaticRef = useRef<HTMLDivElement>(null);

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

  //audio change audioVolume by user
  useEffect(() => {
    const audioVolumeBarStatic = audioVolumeBarStaticRef.current;

    if (!audioVolumeBarStatic) return;

    const handleLogic = changeAudioVolumeByUser({
      audioVolumeBarStatic,
      setAudioVolume,
    });

    if (!handleLogic) return;

    audioVolumeBarStatic.addEventListener("click", handleLogic);

    return () => {
      audioVolumeBarStatic.removeEventListener("click", handleLogic);
    };
  }, []);

  //audio set to play/stop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="w-full max-w-4xl p-6 flex items-center flex-row border-standart-border border-1 
      rounded-4xl shadow-standart bg-entity-bg self-stretch"
    >
      <div className="flex gap-4 flex-col">
        <audio
          id="audio"
          loop={false}
          muted={false}
          preload="auto"
          src={currentSong?.songUrl}
          ref={audioRef}
        ></audio>

        <div className="flex justify-between items-center flex-col">
          <div className="inline-block">
            <img
              className="w-52 h-52 rounded-md object-cover shadow-[0_0_0_4px_#ffffff1f]"
              src={currentSong?.songThumbnail}
              alt="audio preview"
            />
          </div>
        </div>
        <span className="text-2xl text-center font-bold w-50 truncate">
          {currentSong?.songName}
        </span>
        <span className="text-center text-important w-50 truncate">
          by {currentSong?.authorName}
        </span>
      </div>

      <div className="flex flex-col justify-between items-center gap-4 mt-4 w-full h-full relative">
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
          <button
            className="aspect-square h-16"
            id="playBtn"
            onClick={() => {
              togglePlay();
            }}
          >
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
          <div className=" flex flex-col items-center justify-center relative">
            <div>
              <button
                className="p-2"
                ref={audioVolumeButtonRef}
                onClick={() => {
                  setIsAudioChangingMenuOn(!isAudioChangingMenuOn);
                }}
              >
                <img
                  className="aspect-square invert-100"
                  width="24"
                  height="24"
                  src="https://img.icons8.com/?size=100&id=41563&format=png&color=000000"
                  alt="sound changing button"
                />
              </button>
              <div
                className={`duration-200 block ${
                  isAudioChangingMenuOn ? "opacity-100 w-32" : "opacity-0 w-0"
                }`}
              >
                <div className="absolute h-1 left-16 bottom-1/2 translate-y-[50%] w-full transition-300 hover:h-2">
                  <div
                    className="relative w-full h-full bg-audioVolumeBar rounded-md opacity-15 z-10 cursor-pointer transition-300"
                    ref={audioVolumeBarStaticRef}
                  ></div>
                  <div className="absolute h-full w-32 left-0 bottom-1/2 translate-y-[50%] transition-300">
                    <div
                      className={`relative h-full bg-audioVolumeBar rounded-md z-20 pointer-events-none transition-300`}
                      style={{ width: `${100 * audioVolume}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center gap-4 ">
          <span className="cursor-default text-important">
            {formatTime(currentAudioTimeMS)}
          </span>
          <div className="relative block transition-300 h-1 hover:h-2">
            <div
              className="relative w-64 h-full bg-progressAudioGradient opacity-15 z-10 rounded-md cursor-pointer transition-300"
              ref={progressAudioStaticRef}
            ></div>
            <div
              className={`absolute top-0 left-0 h-full bg-progressAudioGradient z-20 rounded-md pointer-events-none transition-300`}
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
});

export { AudioPlayer };

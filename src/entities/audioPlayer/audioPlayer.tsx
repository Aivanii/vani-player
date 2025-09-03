import { useEffect, useRef, useState } from "react";
import { formatTime } from "./tools/formatTime";
import { calculateProgressAudio } from "./tools/calculateProgressAudio";
import { changePlayedTimeByUser } from "./tools/changePlayedTimeByUser";
import { AudioVisualizer } from "./audioVisualizer/audioVisualizer";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";

import { getAudioPercentageFromClick } from "../../utils/dom/getAudioPercentageFromClick";

import { observer } from "mobx-react-lite";

const AudioPlayer = observer(() => {
  const {
    currentSong,
    togglePlay,
    isPlaying,
    setPreviousSong,
    setNextSong,
    setVolume,
    isVolumeBarOnScreen,
    currentVolume,
    setIsVolumeBarOnScreen,
    toggleMute,
    isCurrentlyMuted,
  } = currentPlaylistStore;

  const [audioDurationMS, setAudioDurationMS] = useState<number>(0);
  const [currentAudioTimeMS, setCurrentAudioTimeMS] = useState<number>(0);
  //[0-1]

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioVolumeBarStatic = useRef<HTMLDivElement>(null);
  const progressAudioStaticRef = useRef<HTMLDivElement>(null);

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

  //audio set to play/stop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  //audio change volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = currentVolume;
  }, [currentVolume]);

  return (
    <div
      className="w-full max-w-4xl p-6 flex items-center flex-row border-standart-border border-1 
      rounded-4xl shadow-standart bg-entity-bg self-stretch"
    >
      <div className="flex gap-4 flex-col">
        <audio
          id="audio"
          loop={false}
          muted={isCurrentlyMuted}
          preload="auto"
          src={currentSong?.songUrl}
          ref={audioRef}
          onEnded={setNextSong}
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
          <button className="aspect-square h-12" onClick={setPreviousSong}>
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
            onClick={togglePlay}
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
          <button className="aspect-square h-12" onClick={setNextSong}>
            <img
              className="invert-100"
              width="32"
              height="32"
              src="https://img.icons8.com/ios/32/right--v1.png"
              alt="next track"
            />
          </button>

          <div
            className="relative w-fit flex justify-start"
            onMouseOut={() => {
              setIsVolumeBarOnScreen(false);
            }}
            onMouseOver={() => {
              setIsVolumeBarOnScreen(true);
            }}
          >
            <div className="flex flex-row items-center justify-center">
              <button className="p-2" onClick={toggleMute}>
                <img
                  className="aspect-square invert-100"
                  width="24"
                  height="24"
                  src={` ${
                    isCurrentlyMuted
                      ? "https://img.icons8.com/ios-filled/100/no-audio--v1.png"
                      : "https://img.icons8.com/ios-filled/100/high-volume--v1.png"
                  }`}
                  alt="sound changing button"
                />
              </button>
              <div className="relative h-18 w-fit flex justify-center items-center ml-4">
                <div
                  className={`duration-300 block ${
                    isVolumeBarOnScreen ? "opacity-100 w-32" : "opacity-0 w-0"
                  }`}
                >
                  <div className="absolute h-1 bottom-1/2 translate-y-[50%] w-full transition-300 hover:h-2">
                    <div
                      className="relative w-full h-full bg-audioVolumeBar rounded-md opacity-15 z-10 cursor-pointer transition-300"
                      ref={audioVolumeBarStatic}
                      onClick={(event) => {
                        setVolume(
                          getAudioPercentageFromClick({
                            audioVolumeBarStatic,
                            event,
                          })
                        );
                      }}
                    />
                    <div className="absolute h-full w-32 left-0 bottom-1/2 translate-y-[50%] transition-300">
                      <div
                        className={`relative h-full bg-audioVolumeBar rounded-md z-20 pointer-events-none transition-300`}
                        style={{ width: `${100 * currentVolume}%` }}
                      ></div>
                    </div>
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

export default AudioPlayer;

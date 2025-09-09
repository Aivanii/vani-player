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
    activeSongUrl,
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
  }, [activeSongUrl]);

  //audio change currentAudioTimeMS by user
  useEffect(() => {
    const audioBarStatic = progressAudioStaticRef.current;
    const audio = audioRef.current;

    if (!audioBarStatic || !audio) return;

    const handleChangingTimeByUser = changePlayedTimeByUser(
      audioBarStatic,
      audioDurationMS,
      audio,
    );

    if (!handleChangingTimeByUser) return;

    audioBarStatic.addEventListener("click", handleChangingTimeByUser);

    return () => {
      audioBarStatic.removeEventListener("click", handleChangingTimeByUser);
    };
  }, [audioDurationMS]);

  //audio change currentAudioTimeMS when audio playing
  //or change currentAudioTimeMS to 0 when there is no songs
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
    <div className="border-standart-border shadow-standart bg-entity-bg flex w-full max-w-4xl flex-row items-center self-stretch rounded-4xl border-1 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <audio
          id="audio"
          loop={false}
          muted={isCurrentlyMuted}
          preload="auto"
          src={currentSong?.songUrl}
          ref={audioRef}
          onEnded={setNextSong}
        ></audio>

        <div className="flex flex-col items-center justify-between">
          <div className="inline-block h-52 w-52 rounded-md shadow-[0_0_0_4px_#ffffff1f]">
            {currentSong?.songThumbnail && (
              <img
                className="h-52 w-52 rounded-md object-cover"
                src={currentSong.songThumbnail}
                alt={"current song preview"}
              />
            )}
          </div>
        </div>
        <span className="w-50 truncate text-center text-2xl font-bold">
          {currentSong?.songName}
        </span>
        {currentSong?.authorName && (
          <span className="text-important w-50 truncate text-center">
            by {currentSong?.authorName}
          </span>
        )}
      </div>

      <div className="relative mt-4 flex h-full w-full flex-col items-center justify-between gap-4">
        <AudioVisualizer isPlaying={isPlaying} />
        <div className="inline-flex items-center gap-6">
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
            className="relative flex w-fit justify-start"
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
              <div className="relative ml-4 flex h-18 w-fit items-center justify-center">
                <div
                  className={`block duration-300 ${
                    isVolumeBarOnScreen ? "w-32 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="transition-300 absolute bottom-1/2 h-1 w-full translate-y-[50%] hover:h-2">
                    <div
                      className="bg-audioVolumeBar transition-300 relative z-10 h-full w-full cursor-pointer rounded-md opacity-15"
                      ref={audioVolumeBarStatic}
                      onClick={(event) => {
                        setVolume(
                          getAudioPercentageFromClick({
                            audioVolumeBarStatic,
                            event,
                          }),
                        );
                      }}
                    />
                    <div className="transition-300 absolute bottom-1/2 left-0 h-full w-32 translate-y-[50%]">
                      <div
                        className={`bg-audioVolumeBar transition-300 pointer-events-none relative z-20 h-full rounded-md`}
                        style={{ width: `${100 * currentVolume}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around gap-4">
          <span className="text-important cursor-default">
            {formatTime(currentAudioTimeMS)}
          </span>
          <div className="transition-300 relative block h-1 hover:h-2">
            <div
              className="bg-progressAudioGradient transition-300 relative z-10 h-full w-64 cursor-pointer rounded-md opacity-15"
              ref={progressAudioStaticRef}
            ></div>
            <div
              className={`bg-progressAudioGradient transition-300 pointer-events-none absolute top-0 left-0 z-20 h-full rounded-md`}
              style={{
                width: calculateProgressAudio(
                  currentAudioTimeMS,
                  audioDurationMS,
                ),
              }}
            ></div>
          </div>
          <span className="text-important cursor-default">
            {formatTime(audioDurationMS)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default AudioPlayer;

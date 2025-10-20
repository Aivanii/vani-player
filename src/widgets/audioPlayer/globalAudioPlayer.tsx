import { useEffect, useRef } from "react";
import { formatTime } from "../../utils/audio/formatTime";
import { calculateProgressAudio } from "../../utils/audio/calculateProgressAudio";
import { changePlayedTimeByUser } from "../../utils/audio/changePlayedTimeByUser";
import { currentPlaylistStore } from "../../app/stores/currentPlaylistStore/currentPlaylistStore";

import { getAudioPercentageFromClick } from "../../utils/dom/getAudioPercentageFromClick";

import { observer } from "mobx-react-lite";

import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";
import { getMainPageNavigationConfig } from "../../config/keyboardNavigationConfig";

const GlobalAudioPlayer = observer(() => {
  const {
    activeurl,
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
    currentAudioTimeMS,
    setCurrentAudioTimeMS,
    audioDurationMS,
    setAudioDurationMS,
    isLooped,
    toggleLoop,
    isNextSongInPlaylist,
    isPreviousSongInPlaylist,
    setIsPlaying,
  } = currentPlaylistStore;
  //[0-1]
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioVolumeBarStatic = useRef<HTMLDivElement>(null);
  const progressAudioStaticRef = useRef<HTMLDivElement>(null);

  //keyboard navigation
  let config = {};
  if (audioRef.current) {
    config = getMainPageNavigationConfig(audioRef.current);
  }
  useKeyboardNavigation(config);

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
  }, [activeurl, setAudioDurationMS]);

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

  //audio change currentAudioTimeMS when audio is playing
  //or change currentAudioTimeMS to 0 when there is no songs
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!activeurl) {
      setCurrentAudioTimeMS(0);
      return;
    }

    const handleTimeChange = () => {
      setCurrentAudioTimeMS(audio.currentTime * 1000);
    };

    audio.addEventListener("timeupdate", handleTimeChange);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeChange);
    };
  }, [activeurl]);

  //audio set to play/stop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    const handlePlay = () => {
      if (!isPlaying) {
        togglePlay();
      }
      setIsPlaying(true);
    };
    const handlePause = () => {
      if (isPlaying) {
        togglePlay();
      }
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [isPlaying, currentSong]);

  //audio change volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = currentVolume;
  }, [currentVolume]);

  return (
    <div className="bg-entity-bg inner-glow shadow-standart border-standart-border backdrop-blur-dynamic border-size-dynamic fixed right-0 bottom-0 left-0 flex h-28 w-full">
      <div className="border-size-dynamic border-standart-border rounded-dynamic absolute block h-2 w-full hover:h-3">
        <div
          className="bg-progressAudioGradient rounded-dynamic relative z-10 h-full w-full cursor-pointer opacity-15 sm:w-64"
          ref={progressAudioStaticRef}
        ></div>
        <div
          className={`bg-progressAudioGradient rounded-dynamic border-size-dynamic border-standart-border pointer-events-none absolute top-0 left-0 z-20 h-full max-w-full`}
          style={{
            width: calculateProgressAudio(currentAudioTimeMS, audioDurationMS),
          }}
        ></div>
      </div>
      <div className="flex w-full flex-row-reverse content-center items-center justify-center justify-items-center [grid-template-areas:'start'_'middle'_'end'] sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:px-4">
        <div className="relative z-10 mx-auto flex h-full w-[320px] flex-1 flex-col items-start justify-center sm:w-full sm:gap-4">
          <div className="ml-auto inline-flex w-fit items-center justify-center gap-4 sm:mr-auto sm:gap-6">
            <button
              className={`aspect-square h-12 ${!isPreviousSongInPlaylist && "no-scale"}`}
              onClick={setPreviousSong}
              title="previous"
              disabled={!isPreviousSongInPlaylist}
              style={
                !isPreviousSongInPlaylist
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            >
              <img
                className="invert-icon"
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
              title="play"
            >
              <img
                id="playBtnImgElem"
                className="invert-icon"
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
            <button
              className={`aspect-square h-12 ${!isNextSongInPlaylist && "no-scale"}`}
              onClick={setNextSong}
              disabled={!isNextSongInPlaylist}
              style={
                !isNextSongInPlaylist ? { opacity: "0.5" } : { opacity: "1" }
              }
              title="next"
            >
              <img
                className="invert-icon"
                width="32"
                height="32"
                src="https://img.icons8.com/ios/32/right--v1.png"
                alt="next track"
              />
            </button>

            <div className="hidden items-center justify-around gap-4 md:flex">
              <span className="text-important cursor-default">
                {formatTime(currentAudioTimeMS)} / {formatTime(audioDurationMS)}
              </span>
            </div>
          </div>
        </div>

        <div className="[grid-area: 'middle'] z-10 flex w-fit flex-shrink-0 px-4 sm:gap-4">
          <audio
            id="audio"
            loop={isLooped}
            muted={isCurrentlyMuted}
            preload="auto"
            src={currentSong?.audio}
            ref={audioRef}
            onEnded={setNextSong}
          ></audio>

          <div className="hidden flex-col items-center justify-center sm:flex">
            <div className="rounded-dynamic inline-block aspect-square w-16 shadow-[0_0_0_4px_#ffffff1f]">
              {currentSong && (
                <img
                  className="rounded-dynamic aspect-square w-16 object-cover"
                  src={currentSong.album_image || "./thumbnailSongPreview.png"}
                  alt={"current song preview"}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="w-50 truncate text-center text-2xl font-bold">
              {currentSong?.name}
            </span>

            {currentSong?.artist_name && (
              <span className="text-important w-50 truncate text-center">
                by {currentSong?.artist_name}
              </span>
            )}
          </div>
        </div>
        <div className="relative hidden w-fit min-w-xs flex-1 items-center justify-end sm:flex">
          <button
            className="aspect-square h-12"
            style={isLooped ? { opacity: "1" } : { opacity: "0.5" }}
            title="loop"
          >
            <img
              onClick={toggleLoop}
              className="invert-icon p-1"
              width="32"
              height="32"
              src="https://img.icons8.com/?size=100&id=83204&format=png&color=000000"
              alt="loop"
            />
          </button>
          <div
            className="hidden flex-row items-center justify-center gap-4 px-4 md:flex"
            onMouseOut={() => {
              setIsVolumeBarOnScreen(false);
            }}
            onMouseOver={() => {
              setIsVolumeBarOnScreen(true);
            }}
          >
            <button className="p-2" onClick={toggleMute} title="mute">
              <img
                className="invert-icon aspect-square"
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
                className={`duration-dynamic duration-all block ${
                  isVolumeBarOnScreen
                    ? "w-20 opacity-100 sm:w-32"
                    : "w-0 opacity-0"
                }`}
              >
                <div className="duration-dynamic border-size-dynamic border-standart-border rounded-dynamic duration-all absolute bottom-1/2 h-2 w-full translate-y-[50%] hover:h-3">
                  <div
                    className="bg-audioVolumeBar duration-dynamic rounded-dynamic duration-all relative z-10 h-full w-full cursor-pointer opacity-15"
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
                  <div className="duration-dynamic duration-all absolute bottom-1/2 left-0 h-full w-20 translate-y-[50%] opacity-100 sm:w-32">
                    <div
                      className={`bg-audioVolumeBar duration-dynamic rounded-dynamic border-size-dynamic border-standart-border duration-all pointer-events-none relative z-20 h-full`}
                      style={{ width: `${100 * currentVolume}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GlobalAudioPlayer;

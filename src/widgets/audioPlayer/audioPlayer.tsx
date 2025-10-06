import { useEffect, useRef } from "react";
import { formatTime } from "../../utils/audio/formatTime";
import { calculateProgressAudio } from "../../utils/audio/calculateProgressAudio";
import { changePlayedTimeByUser } from "../../utils/audio/changePlayedTimeByUser";
import { AudioVisualizer } from "./audioVisualizer/audioVisualizer";
import { currentPlaylistStore } from "../../app/stores/currentPlaylistStore/currentPlaylistStore";

import { getAudioPercentageFromClick } from "../../utils/dom/getAudioPercentageFromClick";

import { observer } from "mobx-react-lite";

import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";
import { getMainPageNavigationConfig } from "../../config/keyboardNavigationConfig";
import KeyboardHelpModal from "../../features/keyboardHelpModal/keyboardHelpModal";

const AudioPlayer = observer(() => {
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
    <div className="border-standart-border shadow-standart bg-entity-bg mx-auto flex h-full w-dvw min-w-[320px] flex-col items-center self-stretch rounded-4xl border-1 py-6 backdrop-blur-sm sm:w-full sm:max-w-4xl sm:flex-row sm:px-6">
      <div className="flex flex-col gap-4">
        <audio
          id="audio"
          loop={isLooped}
          muted={isCurrentlyMuted}
          preload="auto"
          src={currentSong?.audio}
          ref={audioRef}
          onEnded={setNextSong}
        ></audio>

        <div className="flex flex-col items-center justify-between">
          <div className="inline-block aspect-square w-52 rounded-md shadow-[0_0_0_4px_#ffffff1f]">
            {currentSong && (
              <img
                className="aspect-square w-52 rounded-md object-cover"
                src={currentSong.album_image || "./thumbnailSongPreview.png"}
                alt={"current song preview"}
              />
            )}
          </div>
        </div>
        <span className="w-50 truncate text-center text-2xl font-bold">
          {currentSong?.name}
        </span>
        {currentSong?.artist_name && (
          <span className="text-important w-50 truncate text-center">
            by {currentSong?.artist_name}
          </span>
        )}
      </div>

      <div className="relative mx-auto mt-4 flex h-full w-[320px] flex-col items-center justify-between gap-4 sm:w-full">
        <AudioVisualizer isPlaying={isPlaying} />
        <div className="inline-flex items-center gap-6">
          <button
            className={`aspect-square h-12 ${!isPreviousSongInPlaylist && "no-scale"}`}
            onClick={setPreviousSong}
            title="previous"
            disabled={!isPreviousSongInPlaylist}
            style={
              !isPreviousSongInPlaylist ? { opacity: "0.5" } : { opacity: "1" }
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

          <div
            className="relative hidden w-fit justify-start sm:flex"
            onMouseOut={() => {
              setIsVolumeBarOnScreen(false);
            }}
            onMouseOver={() => {
              setIsVolumeBarOnScreen(true);
            }}
          >
            <div className="flex flex-row items-center justify-center">
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
                  className={`block duration-300 ${
                    isVolumeBarOnScreen
                      ? "w-20 opacity-100 sm:w-32"
                      : "w-0 opacity-0"
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
                    <div className="transition-300 absolute bottom-1/2 left-0 h-full w-20 translate-y-[50%] opacity-100 sm:w-32">
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
        </div>
        <div className="flex items-center justify-around gap-4">
          <span className="text-important cursor-default">
            {formatTime(currentAudioTimeMS)}
          </span>
          <div className="transition-300 relative block h-1 hover:h-2">
            <div
              className="bg-progressAudioGradient transition-300 relative z-10 h-full w-56 cursor-pointer rounded-md opacity-15 sm:w-64"
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
          <KeyboardHelpModal />
        </div>
      </div>
    </div>
  );
});

export default AudioPlayer;

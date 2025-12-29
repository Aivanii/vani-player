import { useEffect, useRef } from "react";
import { formatTime } from "../../utils/audio/formatTime";
import { calculateProgressAudio } from "../../utils/audio/calculateProgressAudio";
import { AudioVisualizer } from "./audioVisualizer/audioVisualizer";
import { currentPlaylistStore } from "../../app/stores/currentPlaylistStore/currentPlaylistStore";

import { getAudioPercentageFromClick } from "../../utils/dom/getAudioPercentageFromClick";

import { observer } from "mobx-react-lite";

import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";
import { getMainPageNavigationConfig } from "../../config/keyboardNavigationConfig";
import KeyboardHelpModal from "../../features/keyboardHelpModal/keyboardHelpModal";
import { SettingsStore } from "../../app/stores/settingsStore/settingsStore";
import FancyAudioVisualizer from "./audioVisualizer/fancyAudioVisualizer";
import useAudioChangeTimeByUser from "../../hooks/useAudioChangeTimeByUser";
import useAudioPlayback from "../../hooks/useAudioPlayback";
import useAudioDuration from "../../hooks/useAudioDuration";
import useAudioTime from "../../hooks/useAudioTime";
import { useAudio } from "../../hooks/useAudio";

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

  const audioVolumeBarStatic = useRef<HTMLDivElement>(null);
  const progressAudioStaticRef = useRef<HTMLDivElement>(null);

  const { visualizerStyle } = SettingsStore;

  return (
    <div className="border-standard-border inner-glow shadow-standard bg-entity-bg backdrop-blur-dynamic rounded-dynamic border-size-dynamic mx-auto flex h-full w-dvw min-w-[320px] flex-col items-center self-stretch py-6 sm:w-full sm:max-w-4xl sm:flex-row sm:px-6">
      {visualizerStyle === "fancy" && (
        <FancyAudioVisualizer isPlaying={isPlaying} />
      )}
      <div className="z-10 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-between">
          <div className="rounded-dynamic inline-block aspect-square w-52 shadow-[0_0_0_4px_#ffffff1f]">
            {currentSong && (
              <img
                id="currentSongThumbnail"
                data-testid="currentSongThumbnail"
                className="rounded-dynamic aspect-square w-52 object-cover"
                src={currentSong.album_image || "./thumbnailSongPreview.png"}
                alt={"current song preview"}
              />
            )}
          </div>
        </div>

        {currentSong?.name && (
          <span
            className="w-50 truncate text-center text-2xl font-bold"
            id="currentSongName"
            data-testid="currentSongName"
          >
            {currentSong.name}
          </span>
        )}
        {currentSong?.artist_name && (
          <span
            className="text-important w-50 truncate text-center"
            id="currentArtistName"
            data-testid="currentArtistName"
          >
            by {currentSong.artist_name}
          </span>
        )}
      </div>

      <div className="relative z-10 mx-auto mt-4 flex h-full w-[320px] flex-col items-center justify-between gap-4 sm:w-full">
        {visualizerStyle === "standard" && (
          <AudioVisualizer isPlaying={isPlaying} />
        )}

        <div className="inline-flex items-center gap-6">
          <button
            className={`aspect-square h-12 ${!isPreviousSongInPlaylist && "no-scale"}`}
            onClick={() => {
              setCurrentAudioTimeMS(0);
              setPreviousSong();
            }}
            id="previousSongBtn"
            data-testid="previousSongBtn"
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
              src="./icons/previousTrack.png"
              alt="previous track"
            />
          </button>
          <button
            className="aspect-square h-16"
            id="playBtn"
            data-testid="playBtn"
            onClick={togglePlay}
            title="play"
          >
            <img
              id="playBtnImgElem"
              className="invert-icon"
              width="32"
              height="32"
              src={isPlaying ? "./icons/pause.png" : "./icons/play.png"}
              alt="play button"
            />
          </button>
          <button
            className={`aspect-square h-12 ${!isNextSongInPlaylist && "no-scale"}`}
            onClick={() => {
              setCurrentAudioTimeMS(0);
              setNextSong();
            }}
            disabled={!isNextSongInPlaylist}
            style={
              !isNextSongInPlaylist ? { opacity: "0.5" } : { opacity: "1" }
            }
            id="nextSongBtn"
            data-testid="nextSongBtn"
            title="next"
          >
            <img
              className="invert-icon"
              width="32"
              height="32"
              src="./icons/nextTrack.png"
              alt="next track"
            />
          </button>

          <div
            id="hoverableVolumeBarVisualizer"
            data-testid="hoverableVolumeBarVisualizer"
            className="relative hidden w-fit justify-start sm:flex"
            onMouseOut={() => {
              setIsVolumeBarOnScreen(false);
            }}
            onMouseOver={() => {
              setIsVolumeBarOnScreen(true);
            }}
          >
            <div className="flex flex-row items-center justify-center">
              <button
                className="p-2"
                onClick={toggleMute}
                title="mute"
                id="muteBtn"
                data-testid="muteBtn"
              >
                <img
                  id="muteBtnImg"
                  data-testid="muteBtnImg"
                  className="invert-icon aspect-square"
                  width="24"
                  height="24"
                  src={` ${
                    isCurrentlyMuted
                      ? "./icons/volumeOff.png"
                      : "./icons/volumeOn.png"
                  }`}
                  alt="sound changing button"
                />
              </button>
              <div className="relative ml-4 flex h-18 w-fit items-center justify-center">
                <div
                  data-testid="audioVolumeBar"
                  id="audioVolumeBar"
                  className={`duration-dynamic block transition-all ${
                    isVolumeBarOnScreen
                      ? "block w-20 opacity-100 sm:w-32"
                      : "hidden w-0 opacity-0"
                  }`}
                >
                  <div className="duration-dynamic border-size-dynamic border-standard-border rounded-dynamic absolute bottom-1/2 h-2 w-full translate-y-[50%] transition-all hover:h-3">
                    <div
                      id="clickableAudioVolumeBar"
                      data-testid="clickableAudioVolumeBar"
                      className="bg-audioVolumeBar duration-dynamic rounded-dynamic relative z-10 h-full w-full cursor-pointer opacity-15 transition-all"
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
                    <div className="duration-dynamic absolute bottom-1/2 left-0 h-full w-20 translate-y-[50%] opacity-100 transition-all sm:w-32">
                      <div
                        className={`bg-audioVolumeBar duration-dynamic rounded-dynamic border-size-dynamic border-standard-border pointer-events-none relative z-20 h-full transition-all`}
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
            id="loopBtn"
            data-testid="loopBtn"
          >
            <img
              onClick={toggleLoop}
              className="invert-icon p-1"
              width="32"
              height="32"
              src="./icons/loop.png"
              alt="loop"
            />
          </button>
        </div>
        <div className="flex items-center justify-around gap-4">
          <span className="text-important cursor-default">
            {formatTime(currentAudioTimeMS)}
          </span>
          <div className="transition-300 border-size-dynamic border-standard-border rounded-dynamic relative block h-2 hover:h-3">
            <div
              className="bg-progressAudioGradient transition-300 rounded-dynamic relative z-10 h-full w-56 cursor-pointer opacity-15 sm:w-64"
              ref={progressAudioStaticRef}
            ></div>
            <div
              className={`bg-progressAudioGradient transition-300 rounded-dynamic border-size-dynamic border-standard-border pointer-events-none absolute top-0 left-0 z-20 h-full max-w-56`}
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

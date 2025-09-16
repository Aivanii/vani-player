import type { KeyboardNavigationConfig } from "../types";
import { currentPlaylistStore } from "../stores/currentPlaylistStore/currentPlaylistStore";

export const getMainPageNavigationConfig = (
  audio: HTMLAudioElement,
): KeyboardNavigationConfig => {
  const {
    jumpSeconds,
    togglePlay,
    moveVolume,
    toggleMute,
    setPreviousSong,
    setNextSong,
    getCurrentAudioTimeMSByPercent,
  } = currentPlaylistStore;

  const config: KeyboardNavigationConfig = {
    onLeft: () => {
      jumpSeconds(-5);
      audio.currentTime = audio.currentTime - 5;
    },
    onRight: () => {
      jumpSeconds(5);
      audio.currentTime = audio.currentTime + 5;
    },
    onSpace: () => {
      togglePlay();
    },
    onEnter: () => {
      togglePlay();
    },

    onArrowUp: () => {
      moveVolume(5);
    },
    onArrowDown: () => {
      moveVolume(-5);
    },

    onKeyM: () => {
      toggleMute();
    },

    onComma: () => {
      setPreviousSong();
    },
    onPeriod: () => {
      setNextSong();
    },

    onDigit1: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(10);
      audio.currentTime = timeMS / 1000;
    },
    onDigit2: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(20);
      audio.currentTime = timeMS / 1000;
    },
    onDigit3: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(30);
      audio.currentTime = timeMS / 1000;
    },
    onDigit4: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(40);
      audio.currentTime = timeMS / 1000;
    },
    onDigit5: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(50);
      audio.currentTime = timeMS / 1000;
    },
    onDigit6: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(60);
      audio.currentTime = timeMS / 1000;
    },
    onDigit7: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(70);
      audio.currentTime = timeMS / 1000;
    },
    onDigit8: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(80);
      audio.currentTime = timeMS / 1000;
    },
    onDigit9: () => {
      const timeMS = getCurrentAudioTimeMSByPercent(90);
      audio.currentTime = timeMS / 1000;
    },
  };
  return config;
};

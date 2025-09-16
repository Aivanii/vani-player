import type { KeyboardNavigationConfig } from "../types";
import { currentPlaylistStore } from "../stores/currentPlaylistStore/currentPlaylistStore";

export const getMainPageNavigationConfig = (
  audio: HTMLAudioElement,
): KeyboardNavigationConfig => {
  const { jumpSeconds } = currentPlaylistStore;

  const config: KeyboardNavigationConfig = {
    onLeft: () => {
      jumpSeconds(-5);
      audio.currentTime = audio.currentTime - 5;
    },
    onRight: () => {
      jumpSeconds(5);
      audio.currentTime = audio.currentTime + 5;
    },
    enabled: true,
    preventDefault: true,
  };
  return config;
};

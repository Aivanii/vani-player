import type { KeyboardNavigationConfig } from "../types";

export const getMainPageNavigationConfig = (
  audio: HTMLAudioElement,
): KeyboardNavigationConfig => {
  const config: KeyboardNavigationConfig = {
    enabled: true,
    preventDefault: true,
  };
  return config;
};

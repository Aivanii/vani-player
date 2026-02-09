import { removeObserver } from "mobx/dist/internal";
import { currentPlaylistStore } from "../../providers";
import * as React from "react";

jest.mock(
  "../../app/stores/currentPlaylistStore/currentPlaylistStore.ts",
  () => ({
    currentPlaylistStore: {
      activeurl: null,
      currentSong: null,
      isPlaying: false,
      currentVolume: 1,
      isCurrentlyMuted: false,
      currentAudioTimeMS: 0,
      isLooped: false,
      togglePlay: jest.fn(),
      setNextSong: jest.fn(),
      setCurrentAudioTimeMS: jest.fn(),
      setAudioDurationMS: jest.fn(),
      setIsPlaying: jest.fn(),
    },
  }),
);

jest.mock("../../hooks/useKeyboardNavigation.ts", () => ({
  useKeyboardNavigation: jest.fn(),
}));
jest.mock("../../config/keyboardNavigationConfig.ts", () => ({
  getMainPageNavigationConfig: jest.fn(),
}));
jest.mock("../../hooks/useAudioPlayback.ts", () => ({
  useAudioPlayback: jest.fn(),
}));
jest.mock("../../hooks/useAudioDuration.ts", () => ({
  useAudioDuration: jest.fn(),
}));
jest.mock("../../hooks/useAudioTime.ts", () => ({
  useAudioTime: jest.fn(),
}));

const mockAudio = {
  volume: 0,
  loop: false,
  muted: false,
  src: "",
  currentTime: 0,
  duration: 0,
  play: jest.fn(),
  stop: jest.fn(),
  load: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};

let mockAudioRef = () => {
  const ref = { current: mockAudio };
  jest.spyOn(React, "useRef").mockReturnValue(ref);
  return ref;
};

describe("audioProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(currentPlaylistStore, "activeurl", {
      value: null,
      writable: true,
    });
    Object.defineProperty(currentPlaylistStore, "currentSong", {
      value: null,
      writable: true,
    });
    Object.defineProperty(currentPlaylistStore, "isPlaying", {
      value: false,
      writable: true,
    });
    mockAudioRef();
  });
});

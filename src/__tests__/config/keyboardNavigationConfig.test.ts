import { fireEvent } from "@testing-library/dom";
import {
  currentPlaylistStore,
  getMainPageNavigationConfig,
} from "../../providers";
import { runInAction } from "mobx";

jest.mock(
  "../../app/stores/currentPlaylistStore/currentPlaylistStore.ts",
  () => ({
    currentPlaylistStore: {
      jumpSeconds: jest.fn(),
      togglePlay: jest.fn(),
      moveVolume: jest.fn(),
      toggleMute: jest.fn(),
      setPreviousSong: jest.fn(),
      setNextSong: jest.fn(),
      getCurrentAudioTimeMSByPercent: jest.fn(),
      setIsVolumeBarOnScreen: jest.fn(),
    },
  }),
);

describe("keyboardNavigationConfig", () => {
  let config: any;
  let mockAudio: HTMLAudioElement;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAudio = { currentTime: 100 } as HTMLAudioElement;
    config = getMainPageNavigationConfig(mockAudio);
  });

  describe("navigation controls", () => {
    it("onLeft should call jumbSeconds with -5", () => {
      config.onLeft();

      expect(currentPlaylistStore.jumpSeconds).toHaveBeenCalledWith(-5);
      expect(mockAudio.currentTime).toBe(95);
    });

    it("onRight should call jumbSeconds with 5", () => {
      config.onRight();

      expect(currentPlaylistStore.jumpSeconds).toHaveBeenCalledWith(5);
      expect(mockAudio.currentTime).toBe(105);
    });
  });

  describe("playback controls", () => {
    it("onSpace calls togglePlay", () => {
      config.onSpace();

      expect(currentPlaylistStore.togglePlay).toHaveBeenCalled();
    });
    it("onEnter calls togglePlay", () => {
      config.onEnter();

      expect(currentPlaylistStore.togglePlay).toHaveBeenCalled();
    });
  });

  describe("volume controls", () => {
    it("onArrowUp should call setIsVolumeBarOnScreen and moveVolume(5)", () => {
      config.onArrowUp();

      expect(currentPlaylistStore.setIsVolumeBarOnScreen).toHaveBeenCalled();
      expect(currentPlaylistStore.moveVolume).toHaveBeenCalledWith(5);
    });
    it("onArrowDown should call setIsVolumeBarOnScreen and moveVolume(-5)", () => {
      config.onArrowDown();

      expect(currentPlaylistStore.setIsVolumeBarOnScreen).toHaveBeenCalled();
      expect(currentPlaylistStore.moveVolume).toHaveBeenCalledWith(-5);
    });
    it("onKeyM calls toggleMute", () => {
      config.onKeyM();

      expect(currentPlaylistStore.toggleMute).toHaveBeenCalled();
    });
  });

  describe("track navigation", () => {
    it("onComma calls setPreviousSong", () => {
      config.onComma();

      expect(currentPlaylistStore.setPreviousSong).toHaveBeenCalled();
    });
    it("onPeriod calls setNextSong", () => {
      config.onPeriod();

      expect(currentPlaylistStore.setNextSong).toHaveBeenCalled();
    });
  });

  describe("quick seek controls (1-9)", () => {
    const testCases = [
      {
        key: "onDigit1",
        percent: 10,
        expectedTime: 10,
      },
      {
        key: "onDigit2",
        percent: 20,
        expectedTime: 20,
      },
      {
        key: "onDigit3",
        percent: 30,
        expectedTime: 30,
      },
      {
        key: "onDigit4",
        percent: 40,
        expectedTime: 40,
      },
      {
        key: "onDigit5",
        percent: 50,
        expectedTime: 50,
      },
      {
        key: "onDigit6",
        percent: 60,
        expectedTime: 60,
      },
      {
        key: "onDigit7",
        percent: 70,
        expectedTime: 70,
      },
      {
        key: "onDigit8",
        percent: 80,
        expectedTime: 80,
      },
      {
        key: "onDigit9",
        percent: 90,
        expectedTime: 90,
      },
    ];

    test.each(testCases)(
      "$key should seek to $percent%",
      ({ key, percent, expectedTime }) => {
        (
          currentPlaylistStore.getCurrentAudioTimeMSByPercent as jest.Mock
        ).mockReturnValue(percent * 1000);
        mockAudio.currentTime = 100;

        config[key]();

        expect(
          currentPlaylistStore.getCurrentAudioTimeMSByPercent,
        ).toHaveBeenCalledWith(percent);
        expect(mockAudio.currentTime).toBe(expectedTime);
      },
    );
  });
});

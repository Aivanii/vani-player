import { renderHook } from "@testing-library/react";
import { useAudioPlayback } from "../../providers";

describe("useAudioPlayback", () => {
  const mockTogglePlay = jest.fn();
  const mockSetIsPlaying = jest.fn();
  const mockCurrentSong = {
    id: "1",
    artist_id: "dunno",
    album_name: "dunno",
    artist_name: "vocalokat",
    name: "self proclaimed angel",
    album_image: "./thumbnails/spa.jpeg",
    audio: "./self_proclaimed_angel.mp3",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handlePlay (isPlaying = false)", () => {
    let savedPlayHandler: (() => void) | null = null;

    const mockAudioElement = {
      play: jest.fn(),
      pause: jest.fn(),
      addEventListener: jest.fn((event: string, handler: () => void) => {
        if (event === "play") {
          savedPlayHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
    } as unknown as HTMLAudioElement;

    const audioRef = { current: mockAudioElement };
    let isPlaying: boolean = false;

    renderHook(() =>
      useAudioPlayback(
        audioRef,
        isPlaying,
        mockCurrentSong,
        mockTogglePlay,
        mockSetIsPlaying,
      ),
    );

    if (savedPlayHandler) {
      (savedPlayHandler as jest.Mock)();
    }

    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);
  });

  it("handlePlay (isPlaying = true)", () => {
    let savedPlayHandler: (() => void) | null = null;

    const mockAudioElement = {
      play: jest.fn(),
      pause: jest.fn(),
      addEventListener: jest.fn((event: string, handler: () => void) => {
        if (event === "play") {
          savedPlayHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
    } as unknown as HTMLAudioElement;

    const audioRef = { current: mockAudioElement };
    let isPlaying: boolean = true;

    renderHook(() =>
      useAudioPlayback(
        audioRef,
        isPlaying,
        mockCurrentSong,
        mockTogglePlay,
        mockSetIsPlaying,
      ),
    );

    if (savedPlayHandler) {
      (savedPlayHandler as jest.Mock)();
    }

    expect(mockTogglePlay).toHaveBeenCalledTimes(0);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);
  });


  it("handlePause (isPlaying = true)", () => {
    let savedPauseHandler: (() => void) | null = null;

    const mockAudioElement = {
      play: jest.fn(),
      pause: jest.fn(),
      addEventListener: jest.fn((event: string, handler: () => void) => {
        if (event === "pause") {
          savedPauseHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
    } as unknown as HTMLAudioElement;

    const audioRef = { current: mockAudioElement };
    let isPlaying: boolean = true;

    renderHook(() =>
      useAudioPlayback(
        audioRef,
        isPlaying,
        mockCurrentSong,
        mockTogglePlay,
        mockSetIsPlaying,
      ),
    );

    if (savedPauseHandler) {
      (savedPauseHandler as jest.Mock)();
    }

    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(false);
  });

  it("no callbacks when audioRef.current is null", () => {
    const audioRef = { current: null };
    let isPlaying = false;

    renderHook(() =>
      useAudioPlayback(
        audioRef,
        isPlaying,
        mockCurrentSong,
        mockTogglePlay,
        mockSetIsPlaying,
      ),
    );

    expect(mockTogglePlay).not.toHaveBeenCalled();
  });

  it("handlePause (isPlaying = false)", () => {
    let savedPauseHandler: (() => void) | null = null;

    const mockAudioElement = {
      play: jest.fn(),
      pause: jest.fn(),
      addEventListener: jest.fn((event: string, handler: () => void) => {
        if (event === "pause") {
          savedPauseHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
    } as unknown as HTMLAudioElement;

    const audioRef = { current: mockAudioElement };
    let isPlaying: boolean = false;

    renderHook(() =>
      useAudioPlayback(
        audioRef,
        isPlaying,
        mockCurrentSong,
        mockTogglePlay,
        mockSetIsPlaying,
      ),
    );

    if (savedPauseHandler) {
      (savedPauseHandler as jest.Mock)();
    }

    expect(mockTogglePlay).toHaveBeenCalledTimes(0);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(false);
  });

  it("no callbacks when audioRef.current is null", () => {
    const audioRef = { current: null };
    let isPlaying = false;

    renderHook(() =>
      useAudioPlayback(
        audioRef,
        isPlaying,
        mockCurrentSong,
        mockTogglePlay,
        mockSetIsPlaying,
      ),
    );

    expect(mockTogglePlay).not.toHaveBeenCalled();
  });
});

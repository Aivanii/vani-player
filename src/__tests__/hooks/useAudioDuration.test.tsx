import { renderHook } from "@testing-library/react";
import { useAudioDuration } from "../../providers";

describe("useAudioDuration", () => {
  const mockSetAudioDuration = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("called setAudioDurationMS on loadedmetadata", () => {
    let savedHandleLoadedMetadata: (() => void) | null = null;

    const mockAudioElement = {
      currentTime: 100,
      duration: 200,
      addEventListener: jest.fn((event: string, handler: () => void) => {
        if (event === "loadedmetadata") {
          savedHandleLoadedMetadata = handler;
        }
      }),
      removeEventListener: jest.fn(),
    } as unknown as HTMLAudioElement;

    const mockAudioRef = { current: mockAudioElement };
    let currentAudioTimeMS: number = 100000;
    let activeurl = "./self_proclaimed_angel.mp3";

    renderHook(() =>
      useAudioDuration(
        mockAudioRef,
        currentAudioTimeMS,
        activeurl,
        mockSetAudioDuration,
      ),
    );

    if (savedHandleLoadedMetadata) {
      (savedHandleLoadedMetadata as jest.Mock)();
    }

    expect(mockSetAudioDuration).toHaveBeenCalledTimes(1);
    expect(mockSetAudioDuration).toHaveBeenNthCalledWith(1, 200000);
  });

  it("no callbacks when audioRef.current = null", () => {
    const mockAudioRef = { current: null };
    let currentAudioTimeMS: number = 100000;
    let activeurl = null;

    renderHook(() =>
      useAudioDuration(
        mockAudioRef,
        currentAudioTimeMS,
        activeurl,
        mockSetAudioDuration,
      ),
    );

    expect(mockSetAudioDuration).not.toHaveBeenCalled();
  });
});

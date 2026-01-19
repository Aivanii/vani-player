import { renderHook } from "@testing-library/react";
import { currentPlaylistStore, useAudioTime } from "../../providers";
import { runInAction } from "mobx";

describe("useAudioTime", () => {
  const mockSetCurrentTime = jest.fn();

  it("shouldn't be called setCurrentTime when there is no audioRef.current", () => {
    const audioRef = { current: null };

    renderHook(() =>
      useAudioTime(audioRef, "./self_proclaimed_angel.mp3", mockSetCurrentTime),
    );

    expect(mockSetCurrentTime).not.toHaveBeenCalled();
  });

  it("shouldn't be called setCurrentTime(0) when there is no activeurl", () => {
    const mockAudioElement = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      currentTime: 100,
    } as unknown as HTMLAudioElement;

    const audioRef = { current: mockAudioElement };

    renderHook(() => useAudioTime(audioRef, null, mockSetCurrentTime));

    expect(mockSetCurrentTime).toHaveBeenCalledWith(0);
    expect(mockAudioElement.addEventListener).not.toHaveBeenCalled();
  });

  it("should call setCurrentAudioTimeMS on audio.timeupdate", () => {
    runInAction(() => {
      currentPlaylistStore.playlist = [
        {
          id: "1",
          artist_id: "dunno",
          album_name: "dunno",
          artist_name: "vocalokat",
          name: "self proclaimed angel",
          album_image: "./thumbnails/spa.jpeg",
          audio: "./self_proclaimed_angel.mp3",
        },
      ];
      currentPlaylistStore.activeurl = "./self_proclaimed_angel.mp3";
    });

    let savedHandler: (() => void) | null = null;

    const mockAudioElement = {
      addEventListener: jest.fn((event, handler) => {
        if (event === "timeupdate") {
          savedHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
      currentTime: 45.5, //45.5 seconds
    } as unknown as HTMLAudioElement;

    const audioRef = { current: mockAudioElement };
    console.log(currentPlaylistStore.activeurl);
    renderHook(() =>
      useAudioTime(
        audioRef,
        currentPlaylistStore.activeurl,
        mockSetCurrentTime,
      ),
    );

    if (savedHandler) {
      (savedHandler as jest.Mock)();
    }

    expect(mockSetCurrentTime).toHaveBeenCalledWith(45500); //ms
  });
});

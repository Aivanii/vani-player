import { cleanup, render, screen } from "@testing-library/react";
import { AudioProvider } from "../../../providers/AudioProvider";
import { currentPlaylistStore } from "../../../providers";
import { runInAction } from "mobx";

describe("audio sound volume", () => {
  let originalVolume = currentPlaylistStore.volume;

  beforeEach(() => {
    jest.clearAllMocks();
    originalVolume = currentPlaylistStore.volume;
  });

  afterEach(() => {
    cleanup();
    runInAction(() => {
      currentPlaylistStore.volume = originalVolume;
    });
  });

  it("audio elem's sound volume changes when the volume varriable changes", () => {
    const initVolume = 0.99;
    runInAction(() => {
      currentPlaylistStore.volume = initVolume;
    });
    render(<AudioProvider />);
    const audioElem: HTMLAudioElement = screen.getByTestId("audio");
    expect(audioElem.volume).toBe(initVolume);
  });
});

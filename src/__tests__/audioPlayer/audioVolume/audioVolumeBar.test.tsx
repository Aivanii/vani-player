import { cleanup, render, screen } from "@testing-library/react";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { currentPlaylistStore } from "../../../app/stores/currentPlaylistStore/currentPlaylistStore";
import { runInAction } from "mobx";

describe("AudioPlayerBar rendering", () => {
  let originalIsVolumeBarOnScreen: boolean =
    currentPlaylistStore.isVolumeBarOnScreen;
  let originalVolume: number = currentPlaylistStore.volume;

  beforeEach(() => {
    jest.clearAllMocks();
    originalIsVolumeBarOnScreen = currentPlaylistStore.isVolumeBarOnScreen;
    originalVolume = currentPlaylistStore.volume;
  });

  afterEach(() => {
    cleanup();
    runInAction(() => {
      currentPlaylistStore.isVolumeBarOnScreen = originalIsVolumeBarOnScreen;
      currentPlaylistStore.volume = originalVolume;
    });
  });

  it("volume bar is rendered inside the audioPlayer", () => {
    render(<AudioPlayer />);
    const audioVolumeBar = screen.getByTestId("audioVolumeBar");
    expect(audioVolumeBar).toBeInTheDocument();
    expect(audioVolumeBar).toHaveAttribute("id", "audioVolumeBar");
  });

  it("volume bar is invisible when isVolumeBarOnScreen == false", () => {
    runInAction(() => {
      currentPlaylistStore.isVolumeBarOnScreen = false;
    });
    render(<AudioPlayer />);
    const audioVolumeBar = screen.getByTestId("audioVolumeBar");
    expect(currentPlaylistStore.isVolumeBarOnScreen).toBe(false);
    expect(audioVolumeBar).toHaveClass("hidden");
  });

  it("volume bar is visible when isVolumeBarOnScreen == true", () => {
    runInAction(() => {
      currentPlaylistStore.isVolumeBarOnScreen = true;
    });
    render(<AudioPlayer />);
    const audioVolumeBar = screen.getByTestId("audioVolumeBar");
    expect(currentPlaylistStore.isVolumeBarOnScreen).toBe(true);
    expect(audioVolumeBar).not.toHaveClass("hidden");
  });
});

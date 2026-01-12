import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { currentPlaylistStore } from "../../../app/stores/currentPlaylistStore/currentPlaylistStore";
import { runInAction } from "mobx";
import { getAudioPercentageFromClick } from "../../../utils/dom/getAudioPercentageFromClick";
import { createRef } from "react";

describe("AudioPlayerBar", () => {
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

  it("volume bar changes its visibility depending on mouse hovering", () => {
    runInAction(() => {
      currentPlaylistStore.isVolumeBarOnScreen = false;
    });
    render(<AudioPlayer />);
    const hoverableElem = screen.getByTestId("hoverableVolumeBarVisualizer");

    fireEvent.mouseEnter(hoverableElem);
    expect(currentPlaylistStore.isVolumeBarOnScreen).toBe(true);

    fireEvent.mouseLeave(hoverableElem);
    expect(currentPlaylistStore.isVolumeBarOnScreen).not.toBe(true);
  });

  it("volume changes proportionally to the click position along the audio bar's horizontal axis", () => {
    runInAction(() => {
      currentPlaylistStore.volume = 1;
      currentPlaylistStore.isVolumeBarOnScreen = true;
    });
    render(<AudioPlayer />);
    const audioClickableVolumeBar = screen.getByTestId(
      "clickableAudioVolumeBar",
    );
    audioClickableVolumeBar.style.width = "100px";
    audioClickableVolumeBar.style.height = "2px";

    audioClickableVolumeBar.getBoundingClientRect = jest.fn(
      () =>
        ({
          left: 100,
          top: 200,
          width: 100,
          height: 2,
          right: 200,
          bottom: 202,
          x: 100,
          y: 200,
        }) as DOMRect,
    );

    const rect = audioClickableVolumeBar.getBoundingClientRect();
    const clickX = rect.left + 30;
    const clickY = rect.top + 1;

    fireEvent.click(audioClickableVolumeBar, {
      clientX: clickX,
      clientY: clickY,
    });

    expect(currentPlaylistStore.volume).toBe(0.3);
  });
});

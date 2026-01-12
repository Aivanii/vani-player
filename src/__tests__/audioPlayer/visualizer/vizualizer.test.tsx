import { runInAction } from "mobx";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { act, render, screen } from "@testing-library/react";
import { currentPlaylistStore } from "../../../providers";

describe("visualizer", () => {
  it("it renders as the standard visualizer when visualizerStyle is not 'fancy'", () => {
    runInAction(() => {
      SettingsStore.visualizerStyle = "standard";
    });
    render(<AudioPlayer />);
    const standardAudioVisualizer = screen.queryByTestId(
      "standardAudioVisualizer",
    );
    const fancyAudioVisualizer = screen.queryByTestId("fancyAudioVisualizer");
    expect(standardAudioVisualizer).not.toBeNull();
    expect(fancyAudioVisualizer).toBeNull();
  });

  it("renders as the fancy visualizer when visualizerStyle is 'fancy'", () => {
    runInAction(() => {
      SettingsStore.visualizerStyle = "fancy";
    });
    render(<AudioPlayer />);
    const standardAudioVisualizer = screen.queryByTestId(
      "standardAudioVisualizer",
    );
    const fancyAudioVisualizer = screen.queryByTestId("fancyAudioVisualizer");
    expect(standardAudioVisualizer).toBeNull();
    expect(fancyAudioVisualizer).not.toBeNull();
  });

  it("fancy visualizer's is playing status is synchronized with the global is playing status", () => {
    runInAction(() => {
      currentPlaylistStore.isPlaying = false;
      SettingsStore.visualizerStyle = "fancy";
    });

    render(<AudioPlayer />);

    const fancyAudioVisualizer = screen.getByTestId("fancyAudioVisualizer");
    expect(fancyAudioVisualizer).toHaveAttribute("data-isplaying", "false");

    act(() => {
      runInAction(() => {
        currentPlaylistStore.isPlaying = true;
      });
    });

    expect(fancyAudioVisualizer).toHaveAttribute("data-isplaying", "true");
  });
});

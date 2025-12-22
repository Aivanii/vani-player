import { runInAction } from "mobx";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { render, screen } from "@testing-library/react";

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
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import { currentPlaylistStore } from "../../../providers";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { runInAction } from "mobx";

describe("clicks on audioPlayer buttons", () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });
  afterEach(() => {});

  it("toggle play button", async () => {
    runInAction(() => {
      currentPlaylistStore.activeurl = "some-url";
    });

    render(<AudioPlayer />);

    const playbackButton = screen.getByTestId("playBtn");

    const playStatusBeforeTests = currentPlaylistStore.isPlaying;
    await act(async () => {
      fireEvent.click(playbackButton);
    });
    const playStatusAfterOneClick = currentPlaylistStore.isPlaying;
    await act(async () => {
      fireEvent.click(playbackButton);
    });
    const playStatusAfterSecondClick = currentPlaylistStore.isPlaying;

    expect(playStatusBeforeTests).toBe(playStatusAfterSecondClick);
    expect(playStatusBeforeTests).not.toBe(playStatusAfterOneClick);
  });
});

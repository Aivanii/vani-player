import { getByTestId, render, screen } from "@testing-library/react";
import { currentPlaylistStore } from "../../../providers";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { AudioProvider } from "../../../providers/AudioProvider";
import { runInAction } from "mobx";
import { act } from "react";

describe("loop button", () => {
  it("to be unlooped by default", () => {
    expect(currentPlaylistStore.isLooped).toBe(false);
  });

  it("check button opacity when it's off (0.5) and on (1)", () => {
    runInAction(() => {
      currentPlaylistStore.isLooped = false;
    });

    render(<AudioPlayer />);
    const loopBtn = screen.getByTestId("loopBtn");
    expect(loopBtn.style.opacity).toBe("0.5");
    act(() => {
      runInAction(() => {
        currentPlaylistStore.isLooped = true;
      });
    });

    expect(loopBtn.style.opacity).toBe("1");
  });

  it("check if loop does actually loop", () => {
    runInAction(() => {
      currentPlaylistStore.playlist = [
        {
          id: "1",
          artist_id: "-",
          album_name: "-",
          artist_name: "-",
          name: "-",
          album_image: "-",
          audio: "-",
        },
      ];
      currentPlaylistStore.isLooped = true;
      currentPlaylistStore.isPlaying = true;
    });

    render(<AudioProvider />);

    const audio: HTMLAudioElement = screen.getByTestId("audio");

    expect(audio.loop).toBe(true);
  });
});

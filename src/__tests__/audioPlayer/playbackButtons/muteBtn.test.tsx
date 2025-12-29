import { runInAction } from "mobx";
import { currentPlaylistStore } from "../../../providers";
import CurrentPlaylist from "../../../widgets/currentPlaylist/currentPlaylist";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import { AudioProvider } from "../../../providers/AudioProvider";

describe("mute button", () => {
  it("the muteBtnImg is synchronized with mute status", async () => {
    runInAction(() => {
      currentPlaylistStore.isMuted = false;
    });

    render(<AudioPlayer />);

    const muteBtnImg = screen.getByTestId("muteBtnImg");
    expect(muteBtnImg).toHaveAttribute("src", " ./volumeOn.png");
    expect(currentPlaylistStore.isMuted).toBe(false);

    const muteBtn = screen.getByTestId("muteBtn");
    await act(async () => {
      fireEvent.click(muteBtn);
    });
    expect(muteBtnImg).toHaveAttribute("src", " ./volumeOff.png");
    expect(currentPlaylistStore.isMuted).toBe(true);
  });

  it("the audio volume is 0 when mute status is on", () => {
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
      currentPlaylistStore.volume = 1;
      currentPlaylistStore.isMuted = true;
    });

    render(<AudioProvider />);

    const audioElem: HTMLAudioElement = screen.getByTestId("audio");

    expect(audioElem.muted).toBe(true);
  });
});

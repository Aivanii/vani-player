import { act, fireEvent, render, screen } from "@testing-library/react";
import { currentPlaylistStore } from "../../../providers";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { runInAction } from "mobx";

describe("previous song button", () => {
  it("previous track button when there is no previous songs", async () => {
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
      currentPlaylistStore.activeurl = "-";
    });

    render(<AudioPlayer />);

    const previousSongBtn = screen.getByTestId("previousSongBtn");
    await act(async () => {
      fireEvent.click(previousSongBtn);
    });

    expect(previousSongBtn).toBeDisabled();
    expect(currentPlaylistStore.activeurl).toBe("-");
  });

  it("previous track button when there is a previous song", async () => {
    runInAction(() => {
      currentPlaylistStore.playlist = [
        {
          id: "0",
          artist_id: "+",
          album_name: "+",
          artist_name: "+",
          name: "+",
          album_image: "+",
          audio: "+",
        },
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
    });

    render(<AudioPlayer />);

    const previousSongBtn = screen.getByTestId("previousSongBtn");

    expect(previousSongBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(previousSongBtn);
    });

    expect(previousSongBtn).toBeDisabled();
    expect(currentPlaylistStore.activeurl).toBe("+");
  });
});

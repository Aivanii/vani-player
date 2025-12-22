import { act, fireEvent, render, screen } from "@testing-library/react";
import { currentPlaylistStore } from "../../../providers";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { runInAction } from "mobx";

describe("next song button", () => {
  it("next track button when there is no next songs", async () => {
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

    const nextSongBtn = screen.getByTestId("nextSongBtn");
    await act(async () => {
      fireEvent.click(nextSongBtn);
    });

    expect(nextSongBtn).toBeDisabled();
    expect(currentPlaylistStore.activeurl).toBe("-");
  });

  it("next track button when there is a next song", async () => {
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
      currentPlaylistStore.activeurl = "+";
    });

    render(<AudioPlayer />);

    const nextSongBtn = screen.getByTestId("nextSongBtn");

    expect(nextSongBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(nextSongBtn);
    });

    expect(nextSongBtn).toBeDisabled();
    expect(currentPlaylistStore.activeurl).toBe("-");
  });
});

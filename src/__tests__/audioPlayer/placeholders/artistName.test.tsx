import { runInAction } from "mobx";
import { currentPlaylistStore } from "../../../providers";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";

describe("audioPlayer artist's name render", () => {
  it("no render when there is no current song", () => {
    runInAction(() => {
      currentPlaylistStore.playlist = [];
      currentPlaylistStore.activeurl = null;
    });

    render(<AudioPlayer />);

    const currentArtistNameSpan = screen.queryByTestId("currentArtistName");
    expect(currentArtistNameSpan).toBeNull();
  });

  it("renders the artist's name when a song is selected", () => {
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
    });

    render(<AudioPlayer />);

    const currentArtistNameSpan: HTMLSpanElement =
      screen.getByTestId("currentArtistName");
    expect(currentArtistNameSpan).toHaveTextContent("by vocalokat");
  });
});

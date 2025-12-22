import { runInAction } from "mobx";
import { currentPlaylistStore } from "../../../providers";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";

describe("audioPlayer song's name render", () => {
  it("no render when there is no current song", () => {
    runInAction(() => {
      currentPlaylistStore.playlist = [];
      currentPlaylistStore.activeurl = null;
    });

    render(<AudioPlayer />);

    const currentSongNameSpan = screen.queryByTestId("currentSongName");
    expect(currentSongNameSpan).toBeNull();
  });

  it("render song's name when there is a current song", () => {
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

    const currentSongNameSpan: HTMLSpanElement =
      screen.getByTestId("currentSongName");
    expect(currentSongNameSpan).toHaveTextContent("self proclaimed angel");
  });
});

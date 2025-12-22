import { runInAction } from "mobx";
import { currentPlaylistStore } from "../../../providers";
import AudioPlayer from "../../../widgets/audioPlayer/audioPlayer";
import { render, screen } from "@testing-library/react";

describe("audioPlayer song's thumbnail visualization", () => {
  it("render song's thumbnail when there is one", () => {
    const thumbnailPath = "thumbnails/spa.jpeg";
    runInAction(() => {
      currentPlaylistStore.playlist = [
        {
          id: "1",
          artist_id: "-",
          album_name: "-",
          artist_name: "-",
          name: "-",
          album_image: thumbnailPath,
          audio: "-",
        },
      ];
      currentPlaylistStore.activeurl = "-";
    });

    render(<AudioPlayer />);

    const ImgElem: HTMLImageElement = screen.getByTestId(
      "currentSongThumbnail",
    );

    expect(ImgElem.src).toContain(thumbnailPath);
  });

  it("render placeholder song's thumbnail when the is no a real image path", () => {
    runInAction(() => {
      currentPlaylistStore.playlist = [
        {
          id: "1",
          artist_id: "-",
          album_name: "-",
          artist_name: "-",
          name: "-",
          album_image: "",
          audio: "-",
        },
      ];
      currentPlaylistStore.activeurl = "-";
    });

    render(<AudioPlayer />);

    const ImgElem: HTMLImageElement = screen.getByTestId(
      "currentSongThumbnail",
    );

    expect(ImgElem.src).toContain("/thumbnailSongPreview.png");
  });
});

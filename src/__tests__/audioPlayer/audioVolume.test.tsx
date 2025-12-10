import { render, screen } from "@testing-library/react";
import AudioPlayer from "../../widgets/audioPlayer/audioPlayer";
import { currentPlaylistStore } from "../../providers";

describe("AudioPlayer Volume", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("volume bar is rendered inside the audioPlayer", () => {
    render(<AudioPlayer />);
    const audioVolumeBar = screen.getByTestId("audioVolumeBar");
    expect(audioVolumeBar).toBeInTheDocument();
    expect(audioVolumeBar).toHaveAttribute("id", "audioVolumeBar");
  });

  test("volume bar is invisible when isVolumeBarOnScreen == false", () => {
    //
  });
});

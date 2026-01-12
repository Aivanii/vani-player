import { runInAction } from "mobx";
import { currentPlaylistStore } from "../../../providers";
import { getAudioPercentageFromClick } from "../../../utils/dom/getAudioPercentageFromClick";
import { createRef } from "react";

describe("getAudioPercentageFromClick", () => {
  it("getAudioPercentageFromClick returns currentVolume when params are incorrect", () => {
    runInAction(() => {
      currentPlaylistStore.volume = 0.74;
    });

    const volume = getAudioPercentageFromClick({
      audioVolumeBarStatic: createRef<HTMLDivElement>(),
      event: { clientX: 0 },
    });

    expect(volume).toBe(currentPlaylistStore.volume);
  });
});

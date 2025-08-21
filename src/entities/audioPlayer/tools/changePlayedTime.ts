import type { ReactFormState } from "react-dom/client";

const changePlayedTime = (
  progressAudioBarStatic: HTMLDivElement,
  audioDurationMS: number,
  setCurrentAudioTimeMS: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!progressAudioBarStatic || !setCurrentAudioTimeMS) return undefined;

  const handleClick = (event) => {
    const rect = progressAudioBarStatic.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    //[0-1]
    const percentage = (clickX / rect.width);

    const newTimeMs = audioDurationMS * percentage;
    console.log(audioDurationMS, percentage)
    setCurrentAudioTimeMS(newTimeMs);
  };

  return handleClick;
};

export { changePlayedTime };

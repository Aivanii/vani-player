import React, { useEffect } from "react";

const useAudioTime = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  activeurl: string | null,
  setCurrentAudioTimeMS: (currentTimeMs: number) => void,
) => {
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!activeurl) {
      setCurrentAudioTimeMS(0);
      return;
    }

    const handleTimeChange = () => {
      setCurrentAudioTimeMS(audio.currentTime * 1000);
    };

    audio.addEventListener("timeupdate", handleTimeChange);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeChange);
    };
  }, [activeurl]);
};
export default useAudioTime;

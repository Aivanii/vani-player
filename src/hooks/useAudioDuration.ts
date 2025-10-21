import { useEffect } from "react";

const useAudioDuration = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  currentAudioTimeMS: number,
  activeurl: string | null,
  setAudioDurationMS: (durationMS: number) => void,
) => {
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setAudioDurationMS(audio.duration * 1000);
    };

    if (currentAudioTimeMS > 0) {
      audio.currentTime = currentAudioTimeMS / 1000;
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (audio.duration > 0) {
      setAudioDurationMS(audio.duration);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [activeurl, setAudioDurationMS]);
};

export default useAudioDuration;

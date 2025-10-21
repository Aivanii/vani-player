import { createContext, useCallback, useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { currentPlaylistStore } from "./index";
import { useKeyboardNavigation } from "./index";
import { getMainPageNavigationConfig } from "./index";
import { useAudioPlayback } from "./index";
import { useAudioDuration } from "./index";
import { useAudioTime } from "./index";

interface AudioContext {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const AudioContext = createContext<AudioContext | null>(null);

export const AudioProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const {
      activeurl,
      currentSong,
      togglePlay,
      isPlaying,
      setNextSong,
      currentVolume,
      isCurrentlyMuted,
      currentAudioTimeMS,
      setCurrentAudioTimeMS,
      setAudioDurationMS,
      isLooped,
      setIsPlaying,
    } = currentPlaylistStore;

    const audioRef = useRef<HTMLAudioElement>(null);

    const navigationConfig = useMemo(
      () =>
        audioRef.current ? getMainPageNavigationConfig(audioRef.current) : {},
      [audioRef],
    );

    useKeyboardNavigation(navigationConfig);

    const stableSetAudioDurationMS = useCallback(setAudioDurationMS, []);
    useAudioDuration(
      audioRef,
      currentAudioTimeMS,
      activeurl,
      stableSetAudioDurationMS,
    );

    const stableSetCurrentAudioTimeMS = useCallback(setCurrentAudioTimeMS, []);
    useAudioTime(audioRef, activeurl, stableSetCurrentAudioTimeMS);

    const stableTogglePlay = useCallback(togglePlay, []);
    const stableSetIsPlaying = useCallback(setIsPlaying, []);
    useAudioPlayback(
      audioRef,
      isPlaying,
      currentSong,
      stableTogglePlay,
      stableSetIsPlaying,
    );

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = currentVolume;
    }, [currentVolume]);

    return (
      <AudioContext.Provider value={{ audioRef }}>
        <audio
          className="hidden"
          id="audio"
          loop={isLooped}
          muted={isCurrentlyMuted}
          preload="auto"
          src={currentSong?.audio}
          ref={audioRef}
          onEnded={setNextSong}
        />
        {children}
      </AudioContext.Provider>
    );
  },
);

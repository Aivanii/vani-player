import { useMemo, memo } from "react";
import "./fancyAudioVisualizer.styles.css";

const FancyAudioVisualizer = memo(({ isPlaying }: { isPlaying: boolean }) => {
  const bars = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: i,
      height: Math.random() * 80 + 20,
      delay: i * 0.01,
      duration: 1.0 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="rounded-dynamic gradientBg2 pointer-events-none absolute bottom-0 z-0 -ml-6 grid h-full w-full grid-cols-60 gap-1 overflow-hidden opacity-70 backdrop-blur-sm">
      {bars.map((bar) => (
        <div
          key={bar.id}
          className="relative flex w-full items-end justify-start overflow-hidden rounded-t-lg"
          style={{ height: "100%" }}
        >
          <div
            className={`gradientBg2 w-full transition-all duration-300 ${
              isPlaying ? "animate-pulse-bar" : "opacity-50"
            }`}
            style={{
              height: `${bar.height}%`,
              animationDelay: `${bar.delay}s`,
              animationDuration: `${bar.duration}s`,
              boxShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
              transformOrigin: "bottom",
            }}
          />
        </div>
      ))}
    </div>
  );
});

export default FancyAudioVisualizer;

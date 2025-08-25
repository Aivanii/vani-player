import "./audioVisualizer.styles.css";

const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="wave-container">
      {[...Array(14)].map((_, index) => (
        <span
          key={index}
          className="wave-bar"
          style={{
            animationDelay: `${index * 0.1}s`,
            animation: isPlaying 
              ? `waveAnimation 2s ease-in-out infinite -${index * 1/5}s`
              : "none"
          }}
        />
      ))}
    </div>
  );
};

export { AudioVisualizer };
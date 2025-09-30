const MainBg = () => {
  // Фиксированные позиции для 70 кругов с приглушённой цветовой схемой
  const fixedCircles = [
    { left: 120, top: 80, size: 24, color: "rgba(255, 255, 255, 0.15)" },
    { left: 350, top: 420, size: 48, color: "rgba(0, 0, 0, 0.12)" },
    { left: 880, top: 150, size: 32, color: "rgba(255, 107, 107, 0.1)" },
    { left: 1120, top: 560, size: 40, color: "rgba(255, 159, 243, 0.08)" },
    { left: 250, top: 720, size: 28, color: "rgba(255, 255, 255, 0.18)" },
    { left: 1500, top: 320, size: 52, color: "rgba(0, 0, 0, 0.1)" },
    { left: 680, top: 480, size: 36, color: "rgba(255, 107, 107, 0.12)" },
    { left: 920, top: 820, size: 44, color: "rgba(0, 0, 0, 0.14)" },
    { left: 1320, top: 180, size: 30, color: "rgba(255, 159, 243, 0.09)" },
    { left: 160, top: 920, size: 56, color: "rgba(255, 255, 255, 0.16)" },
    { left: 420, top: 280, size: 26, color: "rgba(0, 0, 0, 0.11)" },
    { left: 1080, top: 680, size: 38, color: "rgba(255, 107, 107, 0.07)" },
    { left: 780, top: 240, size: 42, color: "rgba(255, 255, 255, 0.13)" },
    { left: 320, top: 580, size: 34, color: "rgba(255, 159, 243, 0.11)" },
    { left: 1420, top: 760, size: 46, color: "rgba(0, 0, 0, 0.09)" },
    { left: 580, top: 120, size: 22, color: "rgba(255, 107, 107, 0.14)" },
    { left: 220, top: 360, size: 50, color: "rgba(255, 255, 255, 0.17)" },
    { left: 960, top: 440, size: 28, color: "rgba(0, 0, 0, 0.13)" },
    { left: 1280, top: 600, size: 36, color: "rgba(255, 159, 243, 0.06)" },
    { left: 400, top: 860, size: 44, color: "rgba(255, 107, 107, 0.08)" },
    { left: 1520, top: 200, size: 32, color: "rgba(255, 255, 255, 0.14)" },
    { left: 180, top: 640, size: 40, color: "rgba(0, 0, 0, 0.15)" },
    { left: 720, top: 320, size: 28, color: "rgba(255, 159, 243, 0.1)" },
    { left: 1040, top: 780, size: 52, color: "rgba(255, 107, 107, 0.09)" },
    { left: 280, top: 240, size: 34, color: "rgba(255, 255, 255, 0.12)" },
    { left: 1360, top: 520, size: 46, color: "rgba(0, 0, 0, 0.08)" },
    { left: 560, top: 880, size: 24, color: "rgba(255, 159, 243, 0.07)" },
    { left: 940, top: 160, size: 38, color: "rgba(255, 107, 107, 0.11)" },
    { left: 1200, top: 680, size: 42, color: "rgba(255, 255, 255, 0.15)" },
    { left: 200, top: 480, size: 30, color: "rgba(0, 0, 0, 0.12)" },
    { left: 440, top: 760, size: 48, color: "rgba(255, 159, 243, 0.08)" },
    { left: 820, top: 280, size: 26, color: "rgba(255, 107, 107, 0.13)" },
    { left: 1160, top: 920, size: 36, color: "rgba(255, 255, 255, 0.16)" },
    { left: 320, top: 120, size: 44, color: "rgba(0, 0, 0, 0.1)" },
    { left: 760, top: 560, size: 28, color: "rgba(255, 159, 243, 0.09)" },
    { left: 1080, top: 240, size: 52, color: "rgba(255, 107, 107, 0.07)" },
    { left: 1400, top: 680, size: 34, color: "rgba(255, 255, 255, 0.14)" },
    { left: 160, top: 820, size: 40, color: "rgba(0, 0, 0, 0.11)" },
    { left: 520, top: 360, size: 32, color: "rgba(255, 159, 243, 0.12)" },
    { left: 880, top: 720, size: 46, color: "rgba(255, 107, 107, 0.1)" },
    { left: 1240, top: 180, size: 24, color: "rgba(255, 255, 255, 0.17)" },
    { left: 240, top: 540, size: 38, color: "rgba(0, 0, 0, 0.09)" },
    { left: 680, top: 880, size: 42, color: "rgba(255, 159, 243, 0.06)" },
    { left: 1000, top: 320, size: 30, color: "rgba(255, 107, 107, 0.15)" },
    { left: 1320, top: 760, size: 48, color: "rgba(255, 255, 255, 0.13)" },
    { left: 360, top: 200, size: 26, color: "rgba(0, 0, 0, 0.14)" },
    { left: 800, top: 640, size: 36, color: "rgba(255, 159, 243, 0.11)" },
    { left: 1120, top: 480, size: 44, color: "rgba(255, 107, 107, 0.08)" },
    { left: 1480, top: 840, size: 32, color: "rgba(255, 255, 255, 0.15)" },
    { left: 200, top: 280, size: 40, color: "rgba(0, 0, 0, 0.12)" },
    { left: 600, top: 720, size: 28, color: "rgba(255, 159, 243, 0.07)" },
    { left: 920, top: 160, size: 52, color: "rgba(255, 107, 107, 0.09)" },
    { left: 1280, top: 600, size: 34, color: "rgba(255, 255, 255, 0.16)" },
    { left: 280, top: 880, size: 46, color: "rgba(0, 0, 0, 0.1)" },
    { left: 720, top: 240, size: 24, color: "rgba(255, 159, 243, 0.08)" },
    { left: 1040, top: 680, size: 38, color: "rgba(255, 107, 107, 0.13)" },
    { left: 1360, top: 520, size: 42, color: "rgba(255, 255, 255, 0.14)" },
    { left: 160, top: 760, size: 30, color: "rgba(0, 0, 0, 0.11)" },
    { left: 480, top: 320, size: 48, color: "rgba(255, 159, 243, 0.09)" },
    { left: 840, top: 880, size: 26, color: "rgba(255, 107, 107, 0.07)" },
    { left: 1160, top: 200, size: 36, color: "rgba(255, 255, 255, 0.17)" },
    { left: 320, top: 560, size: 44, color: "rgba(0, 0, 0, 0.13)" },
    { left: 760, top: 720, size: 32, color: "rgba(255, 159, 243, 0.1)" },
    { left: 1080, top: 360, size: 40, color: "rgba(255, 107, 107, 0.12)" },
    { left: 1400, top: 840, size: 28, color: "rgba(255, 255, 255, 0.15)" },
    { left: 240, top: 120, size: 52, color: "rgba(0, 0, 0, 0.08)" },
    { left: 680, top: 480, size: 34, color: "rgba(255, 159, 243, 0.06)" },
    { left: 1000, top: 820, size: 46, color: "rgba(255, 107, 107, 0.11)" },
  ];

  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
      {fixedCircles.map((circle, index) => (
        <span
          key={index}
          className="absolute block aspect-square rounded-full"
          style={{
            left: `${circle.left}px`,
            top: `${circle.top}px`,
            width: `${circle.size}px`,
            backgroundColor: circle.color,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      ))}
    </div>
  );
};

export { MainBg };

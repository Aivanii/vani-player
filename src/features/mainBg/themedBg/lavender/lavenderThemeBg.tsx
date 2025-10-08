// LavenderThemeBg.tsx
const LavenderThemeBg = () => {
  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden bg-gradient-to-br from-[#2a2438] via-[#352f4f] to-[#413a5a]">
      {/* ЛИНИИ ВЫСОТОЙ В ТРЕТЬ ЭКРАНА */}

      {/* Линия 1 - Верхняя (занимает 33% высоты) */}
      <div className="absolute top-0 left-0 h-1/3 w-full">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0,200 
               C150,50 300,350 450,100 
               C600,-150 750,380 900,200 
               C1050,20 1200,300 1200,300"
            stroke="rgba(200, 180, 230, 0.15)"
            strokeWidth="120"
            fill="none"
            strokeLinecap="round"
            className="animate-pulse-slow"
          />
        </svg>
      </div>

      {/* Линия 2 - Центральная (занимает 33% высоты) */}
      <div className="absolute top-1/3 left-0 h-1/3 w-full">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0,100 
               C200,350 400,20 600,300 
               C800,580 1000,-50 1200,200"
            stroke="rgba(180, 160, 220, 0.12)"
            strokeWidth="100"
            fill="none"
            strokeLinecap="round"
            className="animate-pulse-medium"
          />
        </svg>
      </div>

      {/* Линия 3 - Нижняя (занимает 33% высоты) */}
      <div className="absolute top-2/3 left-0 h-1/3 w-full">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0,300 
               C250,50 500,380 750,120 
               C1000,-140 1150,350 1200,250"
            stroke="rgba(160, 140, 200, 0.1)"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
            className="animate-pulse-slow"
          />
        </svg>
      </div>

      {/* КРУГИ ПОВЕРХ ЛИНИЙ */}

      {/* Большие круги */}
      <div className="animate-float-slow absolute top-1/6 left-1/4 h-96 w-96 rounded-full bg-purple-300/8 blur-3xl"></div>
      <div className="animate-float-medium absolute right-1/4 bottom-1/6 h-80 w-80 rounded-full bg-violet-400/6 blur-3xl"></div>
      <div className="animate-float-fast absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-pink-300/10 blur-2xl"></div>

      {/* Средние круги */}
      <div className="animate-float-slow absolute top-1/4 right-1/3 h-64 w-64 rounded-full bg-indigo-300/12 blur-2xl"></div>
      <div className="animate-float-medium absolute bottom-1/4 left-1/3 h-56 w-56 rounded-full bg-blue-400/8 blur-2xl"></div>
      <div className="animate-float-fast absolute top-3/4 right-1/6 h-60 w-60 rounded-full bg-purple-400/15 blur-xl"></div>

      {/* Маленькие круги */}
      <div className="absolute top-1/3 right-1/5 h-48 w-48 rounded-full bg-violet-300/18 blur-xl"></div>
      <div className="absolute bottom-1/3 left-1/5 h-52 w-52 rounded-full bg-pink-400/12 blur-xl"></div>
      <div className="absolute top-2/3 left-2/3 h-44 w-44 rounded-full bg-indigo-400/10 blur-lg"></div>

      {/* ЛАВАНДОВЫЕ ПУЗЫРИ */}

      <div className="animate-float-slow absolute top-40 left-40">
        <Bubble size="xl" color="lavender-glow" />
      </div>

      <div className="animate-float-medium absolute top-20 right-52">
        <Bubble size="2xl" color="lavender-light" />
      </div>

      <div className="animate-float-slow absolute bottom-40 left-60">
        <Bubble size="lg" color="lavender-glow" />
      </div>

      <div className="animate-float-fast absolute right-60 bottom-32">
        <Bubble size="xl" color="lavender-dark" />
      </div>

      <div className="animate-float-medium absolute top-60 left-1/3">
        <Bubble size="lg" color="lavender-light" />
      </div>

      <div className="animate-float-slow absolute top-1/2 right-1/2">
        <Bubble size="2xl" color="lavender-glow" />
      </div>
    </div>
  );
};

// Компонент Bubble
const Bubble = ({
  size = "lg",
  color = "lavender-light",
}: {
  size?: "md" | "lg" | "xl" | "2xl";
  color?: "lavender-light" | "lavender-dark" | "lavender-glow";
}) => {
  const sizeClasses = {
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-80 h-80",
    "2xl": "w-96 h-96",
  };

  const colorClasses = {
    "lavender-light": {
      gradient: "from-purple-200/25 via-violet-200/20 to-pink-200/15",
      shadows:
        "shadow-[inset_0_0_60px_rgba(200,180,230,0.3),inset_15px_0_100px_rgba(180,160,220,0.25),0_0_50px_rgba(200,180,230,0.4)]",
      highlights: "bg-purple-100/50",
      border: "border-purple-300/30",
    },
    "lavender-dark": {
      gradient: "from-purple-900/25 via-violet-900/20 to-indigo-900/15",
      shadows:
        "shadow-[inset_0_0_60px_rgba(90,70,120,0.35),inset_15px_0_100px_rgba(70,50,100,0.3),0_0_50px_rgba(120,100,160,0.45)]",
      highlights: "bg-purple-800/55",
      border: "border-purple-700/35",
    },
    "lavender-glow": {
      gradient: "from-purple-300/25 via-violet-300/20 to-pink-300/15",
      shadows:
        "shadow-[inset_0_0_80px_rgba(220,200,250,0.35),inset_20px_0_120px_rgba(200,180,230,0.3),0_0_60px_rgba(220,200,250,0.5)]",
      highlights: "bg-purple-200/65",
      border: "border-purple-400/40",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div
        className={`h-full w-full bg-gradient-to-br ${currentColor.gradient} rounded-full ${currentColor.shadows} border ${currentColor.border} rotate-3 transform backdrop-blur-2xl`}
      >
        <div
          className={`absolute top-8 left-10 h-1/8 w-1/4 ${currentColor.highlights} -rotate-12 transform rounded-full blur-xl`}
        ></div>
        <div
          className={`absolute top-16 right-12 h-1/12 w-1/6 ${currentColor.highlights} rotate-45 transform rounded-full blur-xl`}
        ></div>
      </div>
    </div>
  );
};

export { LavenderThemeBg };

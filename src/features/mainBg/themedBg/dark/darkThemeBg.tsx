import "./darkThemeBg.styles.css";

const DarkThemeBg = () => {
  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
      <div className="animate-float-slow absolute top-10 left-10">
        <Bubble size="2xl" color="dark" />
      </div>

      <div className="animate-float-medium absolute top-20 right-20">
        <Bubble size="3xl" color="light" />
      </div>

      <div className="animate-float-slow absolute bottom-20 left-40">
        <Bubble size="2xl" color="dark" />
      </div>

      <div className="animate-float-fast absolute right-40 bottom-10">
        <Bubble size="3xl" color="light" />
      </div>

      <div className="animate-float-medium absolute top-40 left-1/4">
        <Bubble size="xl" color="dark" />
      </div>

      <div className="animate-float-slow absolute top-1/3 right-1/3">
        <Bubble size="xl" color="light" />
      </div>

      <div className="animate-float-fast absolute bottom-1/3 left-1/6">
        <Bubble size="xl" color="dark" />
      </div>

      <div className="animate-float-medium absolute top-2/3 right-1/6">
        <Bubble size="xl" color="light" />
      </div>

      <div className="animate-float-fast absolute top-1/4 left-3/4">
        <Bubble size="lg" color="dark" />
      </div>

      <div className="animate-float-slow absolute top-3/4 left-1/2">
        <Bubble size="lg" color="light" />
      </div>

      <div className="animate-float-medium absolute right-1/4 bottom-1/4">
        <Bubble size="lg" color="dark" />
      </div>

      <div className="animate-float-fast absolute top-1/6 right-1/2">
        <Bubble size="lg" color="light" />
      </div>

      <div className="animate-float-fast absolute top-16 left-1/2">
        <Bubble size="md" color="dark" />
      </div>

      <div className="animate-float-medium absolute right-16 bottom-32">
        <Bubble size="md" color="light" />
      </div>

      <div className="animate-float-slow absolute top-56 left-16">
        <Bubble size="md" color="dark" />
      </div>

      <div className="animate-float-fast absolute bottom-48 left-3/4">
        <Bubble size="md" color="light" />
      </div>

      <div className="animate-float-medium absolute top-3/4 right-32">
        <Bubble size="md" color="dark" />
      </div>

      <div className="animate-float-slow absolute top-12 right-44">
        <Bubble size="md" color="light" />
      </div>

      <div className="animate-float-fast absolute top-24 left-32">
        <Bubble size="sm" color="dark" />
      </div>

      <div className="animate-float-medium absolute right-56 bottom-24">
        <Bubble size="sm" color="light" />
      </div>

      <div className="animate-float-slow absolute top-44 left-56">
        <Bubble size="sm" color="dark" />
      </div>

      <div className="animate-float-fast absolute bottom-36 left-24">
        <Bubble size="sm" color="light" />
      </div>
    </div>
  );
};

const Bubble = ({
  size = "lg",
  color = "light",
}: {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: "light" | "dark";
}) => {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
    "2xl": "w-80 h-80",
    "3xl": "w-96 h-96",
  };

  const colorClasses = {
    light: {
      gradient: "from-white/15 via-white/8 to-white/3",
      shadows:
        "shadow-[inset_0_0_80px_rgba(255,255,255,0.2),inset_20px_0_120px_rgba(255,255,255,0.15),inset_-20px_0_120px_rgba(255,255,255,0.1),0_0_60px_rgba(255,255,255,0.25)]",
      highlights: "bg-white/40",
      border: "border-white/25",
    },
    dark: {
      gradient: "from-gray-400/20 via-gray-600/15 to-gray-800/10",
      shadows:
        "shadow-[inset_0_0_80px_rgba(0,0,0,0.3),inset_20px_0_120px_rgba(0,0,0,0.25),inset_-20px_0_120px_rgba(0,0,0,0.2),0_0_60px_rgba(0,0,0,0.4)]",
      highlights: "bg-gray-300/50",
      border: "border-gray-400/30",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div
        className={`h-full w-full bg-gradient-to-br ${currentColor.gradient} rounded-full ${currentColor.shadows} border ${currentColor.border} rotate-3 transform backdrop-blur-2xl`}
      >
        <div
          className={`absolute top-6 left-8 h-1/8 w-1/4 ${currentColor.highlights} -rotate-12 transform rounded-full blur-md`}
        ></div>
        <div
          className={`absolute top-12 right-12 h-1/12 w-1/6 ${currentColor.highlights} rotate-45 transform rounded-full blur-md`}
        ></div>
        <div
          className={`absolute bottom-8 left-16 h-1/16 w-1/5 ${currentColor.highlights} rotate-12 transform rounded-full blur-md`}
        ></div>

        <div
          className={`absolute top-20 left-20 h-8 w-8 ${currentColor.highlights} rotate-30 transform rounded-full blur-lg`}
        ></div>
      </div>

      <div
        className={`absolute inset-0 rounded-full opacity-50 blur-xl ${color === "light" ? "bg-white/10" : "bg-black/20"} `}
      ></div>
    </div>
  );
};

export { DarkThemeBg };

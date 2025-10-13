import "./lavenderThemeBg.styles.css";

const LavenderThemeBg = () => {
  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full">
      <img
        className="h-full w-full object-cover blur-md"
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FcJRR7LE.jpg&f=1&nofb=1&ipt=f23961f4feb9106e2cae973ed73129ec6b4f9888a6d57c88ba135409d433d1aa"
        alt="lavender theme bg"
      />

      <div className="animate-levitate-slow absolute top-10 left-10">
        <GlowingOrb size="2xl" color="primary" />
      </div>

      <div className="animate-levitate-medium absolute top-5 right-20">
        <GlowingOrb size="xl" color="accent" />
      </div>

      <div className="animate-levitate-rotate absolute bottom-20 left-1/4">
        <Crystal size="lg" color="secondary" />
      </div>

      <div className="animate-levitate-slow absolute right-10 bottom-10">
        <GlowingOrb size="2xl" color="primary" />
      </div>

      <div className="animate-levitate-medium absolute top-1/3 right-1/3">
        <GlowingOrb size="lg" color="accent" />
      </div>

      <div className="animate-levitate-rotate-delayed absolute top-1/4 left-2/3">
        <Crystal size="md" color="secondary" />
      </div>

      <div className="animate-levitate-slow absolute top-2/3 left-1/5">
        <GlowingOrb size="lg" color="primary" />
      </div>

      <div className="animate-levitate-medium absolute right-1/5 bottom-1/3">
        <Crystal size="md" color="accent" />
      </div>

      <div className="animate-levitate-fast absolute top-40 left-1/2">
        <FloatingBubble size="md" color="secondary" />
      </div>

      <div className="animate-levitate-rotate absolute top-20 left-3/4">
        <FloatingBubble size="sm" color="primary" />
      </div>

      <div className="animate-levitate-fast absolute top-2/3 right-1/4">
        <FloatingBubble size="md" color="accent" />
      </div>

      <div className="animate-levitate-medium absolute top-1/2 left-1/6">
        <FloatingBubble size="sm" color="secondary" />
      </div>

      <div className="animate-levitate-rotate-delayed absolute right-1/2 bottom-40">
        <FloatingBubble size="md" color="primary" />
      </div>

      <div className="animate-levitate-fast absolute top-3/4 right-3/4">
        <FloatingBubble size="sm" color="accent" />
      </div>

      <div className="animate-levitate-slow absolute top-1/6 left-1/3">
        <FloatingBubble size="md" color="secondary" />
      </div>

      <div className="animate-levitate-rotate absolute bottom-1/4 left-3/5">
        <FloatingBubble size="sm" color="primary" />
      </div>

      <div className="animate-levitate-medium absolute top-1/5 right-1/6">
        <Crystal size="sm" color="accent" />
      </div>

      <div className="animate-levitate-rotate-delayed absolute bottom-1/6 left-4/5">
        <Crystal size="sm" color="primary" />
      </div>

      <div className="animate-levitate-slow absolute top-4/5 right-2/5">
        <Crystal size="sm" color="secondary" />
      </div>
    </div>
  );
};

const GlowingOrb = ({
  size = "md",
  color = "primary",
}: {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  color?: "primary" | "secondary" | "accent";
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
    "2xl": "w-64 h-64",
  };

  const colorClasses = {
    primary: "bg-[rgba(180,160,220,0.25)]",
    secondary: "bg-[rgba(160,140,200,0.25)]",
    accent: "bg-[rgba(200,180,230,0.25)]",
  };

  const glowClasses = {
    primary: "bg-[rgba(180,160,220,0.3)]",
    secondary: "bg-[rgba(160,140,200,0.3)]",
    accent: "bg-[rgba(200,180,230,0.3)]",
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div
        className={`h-full w-full rounded-full ${colorClasses[color]} border border-white/20 shadow-[0_0_60px_rgba(180,160,220,0.4)] backdrop-blur-lg`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm"></div>
      </div>
      <div
        className={`absolute -inset-6 rounded-full opacity-25 blur-2xl ${glowClasses[color]}`}
      ></div>
    </div>
  );
};

const Crystal = ({
  size = "md",
  color = "primary",
}: {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const colorClasses = {
    primary: "border-[rgba(180,160,220,0.4)]",
    secondary: "border-[rgba(160,140,200,0.4)]",
    accent: "border-[rgba(200,180,230,0.4)]",
  };

  const glowClasses = {
    primary: "bg-[rgba(180,160,220,0.2)]",
    secondary: "bg-[rgba(160,140,200,0.2)]",
    accent: "bg-[rgba(200,180,230,0.2)]",
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div
        className={`h-full w-full rotate-45 transform border-2 ${colorClasses[color]} bg-[rgba(255,255,255,0.1)] shadow-[0_0_30px_rgba(180,160,220,0.3)] backdrop-blur-md`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/15 to-transparent"></div>
      </div>
      <div
        className={`absolute -inset-3 rounded-full opacity-20 blur-lg ${glowClasses[color]}`}
      ></div>
    </div>
  );
};

const FloatingBubble = ({
  size = "md",
  color = "primary",
}: {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    primary: "bg-[rgba(180,160,220,0.35)]",
    secondary: "bg-[rgba(160,140,200,0.35)]",
    accent: "bg-[rgba(200,180,230,0.35)]",
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div
        className={`h-full w-full rounded-full ${colorClasses[color]} shadow-[0_0_20px_rgba(180,160,220,0.5)] backdrop-blur-sm`}
      >
        <div className="absolute inset-1 rounded-full bg-white/25 blur-sm"></div>
      </div>
    </div>
  );
};

export { LavenderThemeBg };

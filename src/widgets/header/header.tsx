import MusicSearch from "./musicSearch/musicSearch";

const Header = () => {
  return (
    <>
      <header className="border-standart-border shadow-standart bg-entity-bg border-size-dynamic relative z-100 flex items-center justify-start px-6 py-4">
        <a href="/" className="pointer">
          <div className="flex items-center gap-3">
            <span className="rounded-dynamic flex h-8 w-8 items-center justify-center bg-gradient-to-tr from-[#41C7AD] to-[#9A868D]">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle
                  cx="14"
                  cy="14"
                  r="13"
                  fill="url(#pulse-logo-gradient)"
                ></circle>
                <path
                  d="M9 19v-7l8-2v7"
                  stroke="#FFD700"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <defs>
                  <linearGradient
                    id="pulse-logo-gradient"
                    x1="0"
                    y1="0"
                    x2="28"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#43E97B"></stop>
                    <stop offset="0.5" stopColor="#38F9D7"></stop>
                    <stop offset="1" stopColor="#FF6A88"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text-color-primary hidden text-2xl font-bold tracking-tight select-none sm:block">
              vani-player
            </span>
          </div>
        </a>

        <nav className="mx-auto hidden md:block">
          <ul className="flex items-center justify-between gap-6">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/playlists">Playlists</a>
            </li>
          </ul>
        </nav>

        <MusicSearch />
      </header>
    </>
  );
};

export { Header };

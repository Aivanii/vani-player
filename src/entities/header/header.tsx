import MusicSearch from "./musicSearch/musicSearch";

const Header = () => {
  return (
    <>
      <header className="border-standart-border shadow-standart bg-entity-bg z-50 flex items-center justify-between border-2 px-6 py-4 backdrop-blur-md">
        <a href="/" className="pointer">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#41C7AD] to-[#9A868D]">
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
            <span className="text-2xl font-bold tracking-tight text-[#F5F8FF] select-none">
              vani-player
            </span>
          </div>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center justify-between gap-6">
            <li>
              <a href="#">Browse</a>
            </li>
            <li>
              <a href="#">Playlists</a>
            </li>
            <li>
              <a href="#">Discover</a>
            </li>
            <li>
              <a href="#">Radio</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>

        <div className="relative z-50 mr-28 flex w-68 items-center justify-between">
          <div className="border-standart-border h-10 w-10 rounded-full border-1 bg-[#ffffff1a]"></div>
        </div>
      </header>

      <MusicSearch />
    </>
  );
};

export { Header };

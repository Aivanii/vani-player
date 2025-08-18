const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 border-2 border-standart-border shadow-standart backdrop-blur-md bg-entity-bg">
      <a href="/" className="pointer">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#41C7AD] to-[#9A868D] flex items-center justify-center">
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
                stroke-width="2.1"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                  <stop stop-color="#43E97B"></stop>
                  <stop offset="0.5" stop-color="#38F9D7"></stop>
                  <stop offset="1" stop-color="#FF6A88"></stop>
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
        <ul className="flex justify-between items-center gap-6">
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

      <div className="flex justify-between items-center gap-4">
        <input
          type="search"
          placeholder="Search music..."
          aria-label="Search music..."
        ></input>
        <div className="w-10 h-10 rounded-full bg-[#ffffff1a] border-1 border-standart-border"></div>
      </div>
    </header>
  );
};

export { Header };

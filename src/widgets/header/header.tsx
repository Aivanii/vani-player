import MusicSearch from "./musicSearch/musicSearch";

const Header = () => {
  return (
    <>
      <header className="border-standart-border shadow-standart bg-entity-bg border-size-dynamic relative z-100 flex items-center justify-start px-6 py-4">
        <a href="/" className="pointer">
          <div className="flex items-center gap-3">
            <img
              src="./favicon.svg"
              alt="site logo"
              className="border-size-dynamic border-standart-border aspect-square w-10 rounded-full"
            />
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

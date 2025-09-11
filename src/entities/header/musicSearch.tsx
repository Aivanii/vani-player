import { useEffect, useState } from "react";
import useMusicAPI from "../../hooks/useMusicAPI";
import { createPortal } from "react-dom";

const MusicSearch = () => {
  const [searchText, setSearchText] = useState<string>("");
  //empty = no using API at the time
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { data, isLoading, error } = useMusicAPI(
    searchQuery ? `tracks/?namesearch=${encodeURIComponent(searchQuery)}` : "",
  );
  console.log(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchText.trim() || "");
      setIsMenuOpen(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);
  ///api/tracks/?namesearch=song&client_id=01b9424c&format=jsonpretty&limit=5 useMusicAPI.ts:17:16

  return (
    <div className="absolute top-0 right-0 z-50 mt-5 mr-5">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={() => setIsMenuOpen(true)}
        className="h-10 w-84 px-4"
        type="text"
        placeholder="Search music..."
        aria-label="Search music..."
      ></input>
      {isMenuOpen && (
        <>
          <ul className="border-standart-border shadow-standart absolute z-70 flex w-full flex-col gap-4 rounded-2xl p-4 backdrop-blur-sm duration-150">
            {data &&
              data.results.map((elem) => {
                return (
                  <li
                    key={elem.id}
                    className="z-50 flex w-64 flex-row items-center justify-start gap-3"
                  >
                    <div>
                      <img
                        src={elem.album_image}
                        alt={elem.album_name}
                        className="aspect-square w-16 rounded-md object-cover shadow-[0_0_0_2px_#ffffff1f]"
                      />
                    </div>
                    <div>
                      <span className="block max-w-48 truncate">
                        {elem.name}
                      </span>
                      <span className="text-important block max-w-48 truncate">
                        {elem.artist_name}
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div>
            {createPortal(
              <div
                className="fixed top-0 left-0 z-60 h-full w-full"
                onClick={() => setIsMenuOpen(false)}
                onContextMenu={() => setIsMenuOpen(false)}
              ></div>,
              document.body,
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MusicSearch;

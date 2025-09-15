import { useEffect, useState } from "react";
import useMusicAPI from "../../../hooks/useMusicAPI";
import LoadingELem from "../../loadingElem/loadingElem";
import SongElem from "./songElem";

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
      <>
        {isMenuOpen && (
          <ul className="border-standart-border shadow-standart bg-entity-bg absolute z-70 flex min-h-24 w-full flex-col gap-2 rounded-2xl p-4 backdrop-blur-sm duration-150">
            {isLoading ? (
              <div>
                <LoadingELem />
              </div>
            ) : (
              <>
                {data &&
                  data.results.map((elem) => {
                    return <SongElem song={elem} key={elem.id} />;
                  })}
              </>
            )}
          </ul>
        )}
      </>
    </div>
  );
};

export default MusicSearch;

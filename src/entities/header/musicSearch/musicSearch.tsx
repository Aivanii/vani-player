import { useEffect, useState } from "react";
import useMusicAPI from "../../../hooks/useMusicAPI";
import LoadingELem from "../../loadingElem/loadingElem";
import { currentPlaylistStore } from "../../../stores/currentPlaylistStore/currentPlaylistStore";
import type { Song } from "../../../types";
import { SongElem } from "./songElem";
import { observer } from "mobx-react-lite";

const MusicSearch = observer(() => {
  const [searchText, setSearchText] = useState<string>("");
  //empty = no using API at the time
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data, isLoading } = useMusicAPI(
    searchQuery ? `tracks/?namesearch=${encodeURIComponent(searchQuery)}` : "",
  );
  const { activeurl, isPlaying, togglePlay, addSongNextAndPlay } =
    currentPlaylistStore;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchText.trim() || "");
      if (searchQuery) {
        setIsMenuOpen(true);
      }
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
          <ul
            className="border-standart-border shadow-standart bg-entity-bg absolute z-1100 flex min-h-24 w-full flex-col gap-2 rounded-2xl p-4 backdrop-blur-sm duration-150"
            hidden={!isMenuOpen}
          >
            {isLoading ? (
              <div>
                <LoadingELem />
              </div>
            ) : (
              <>
                {data &&
                  data?.results.length > 0 &&
                  data.results.map((elem: Song, index: number) => {
                    return (
                      <SongElem
                        song={elem}
                        key={elem.id}
                        isPlaying={isPlaying}
                        isThisSongActive={activeurl === elem.audio}
                        index={index}
                        addSongNextAndPlay={addSongNextAndPlay}
                        togglePlay={togglePlay}
                      />
                    );
                  })}
              </>
            )}
          </ul>
        )}
      </>
      <>
        {isMenuOpen && (
          <div
            className="fixed top-0 left-0 z-1000 h-full w-full"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </>
    </div>
  );
});

export default MusicSearch;

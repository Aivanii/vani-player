import { useEffect, useState } from "react";
import useMusicAPI from "../../../hooks/useMusicAPI";
import LoadingELem from "../../../features/loadingElem/loadingElem";
import { currentPlaylistStore } from "../../../app/stores/currentPlaylistStore/currentPlaylistStore";
import type { Song } from "../../../app/types/types";
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
    <div className="relative z-100 mr-5 ml-auto flex h-full items-center justify-center">
      <input
        name="musicSearch"
        id="musicSearch"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={() => setIsMenuOpen(true)}
        className="relative block h-10 w-84 px-4"
        type="text"
        placeholder="Search music..."
        aria-label="Search music..."
      ></input>
      {isMenuOpen && (
        <>
          <div className="shadow-standart border-standart-border bg-entity-bg backdrop-blur-dynamic rounded-dynamic absolute top-full left-0 z-1100 w-full border-1 p-4 backdrop-opacity-100">
            <ul
              className="z-1100 flex min-h-24 w-full flex-col items-center justify-center gap-2 duration-150"
              hidden={!isMenuOpen}
            >
              {isLoading ? (
                <LoadingELem />
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
              {!isLoading && !data?.results.length && searchText && (
                <span className="relative block w-full text-center">
                  No results for your request
                </span>
              )}
            </ul>
          </div>
        </>
      )}
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

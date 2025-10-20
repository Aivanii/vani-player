import { useEffect, useRef, useState } from "react";
import type { Song } from "../../app/types/types";

import { useSongContextMenu } from "../../hooks/useContextMenu";

interface RecommendedSong {
  song: Song;
  isSongInPlaylist: boolean;
  addSongIntoCurrentPlaylist: (song: Song) => void;
  removeSongFromCurrentPlaylist: (song: Song) => void;
  recsStyle: "horizontal" | "vertical";
}

const RecommendedSong = ({
  song,
  isSongInPlaylist,
  addSongIntoCurrentPlaylist,
  removeSongFromCurrentPlaylist,
  recsStyle,
}: RecommendedSong) => {
  const handleContextMenu = useSongContextMenu(song);
  const [isNameHovering, setIsNameHovering] = useState<boolean>(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const scrollFrameDuration = useRef(5);

  const scrollToEnd = (scrollStep: number) => {
    if (!spanRef.current) return;
    const elem = spanRef.current;

    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }

    if (elem.scrollWidth <= elem.clientWidth) {
      return;
    }

    scrollInterval.current = setInterval(() => {
      if (!spanRef.current) return;

      let currentScroll = spanRef.current.scrollLeft;
      const maxScroll =
        spanRef.current.scrollWidth - spanRef.current.clientWidth;

      spanRef.current.scrollLeft += scrollStep;
      currentScroll += scrollStep;
      if (currentScroll >= maxScroll) {
        if (scrollInterval.current) {
          clearInterval(scrollInterval.current);
          scrollInterval.current = null;
        }
      }
    }, scrollFrameDuration.current);
  };

  const scrollToStart = (scrollStep: number) => {
    if (!spanRef.current) return;
    const elem = spanRef.current;

    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
    if (elem.scrollWidth <= elem.clientWidth) {
      return;
    }

    scrollInterval.current = setInterval(() => {
      if (!spanRef.current) return;

      spanRef.current.scrollLeft -= scrollStep;
      const currentScroll = spanRef.current.scrollLeft;

      if (currentScroll <= 0) {
        if (scrollInterval.current) {
          clearInterval(scrollInterval.current);
          scrollInterval.current = null;
        }
      }
    }, scrollFrameDuration.current);
  };
  useEffect(() => {
    if (isNameHovering) {
      scrollToEnd(2);
    } else {
      scrollToStart(4);
    }
  }, [isNameHovering]);

  return (
    <div
      key={song.id}
      className={`inner-glow no-class-button border-standart-border bg-draggable-elem-bg hover:hover-glow-enhanced rounded-dynamic border-size-dynamic no-scale duration-dynamic backdrop-opacity-100 transition-all hover:scale-105 ${
        recsStyle === "vertical"
          ? "flex h-18 w-47/50 items-center gap-4 self-center pr-2"
          : "flex h-58 w-48 flex-col items-center justify-center gap-2 py-4"
      }`}
      onContextMenu={handleContextMenu}
    >
      <img
        src={song.album_image || "./thumbnailSongPreview.png"}
        alt={`${song.name} thumbnail`}
        className={`rounded-dynamic aspect-square object-cover p-1 shadow-[0_0_0_2px_#ffffff1f] ${
          recsStyle === "vertical" ? "h-16 w-16 flex-shrink-0" : "h-26 w-26"
        }`}
      />
      <div
        className={`flex flex-col justify-center ${
          recsStyle === "vertical" ? "min-w-0 flex-1" : "w-full text-center"
        }`}
        onMouseEnter={() => setIsNameHovering(true)}
        onMouseLeave={() => setIsNameHovering(false)}
      >
        <span
          className={`line-clamp-1 block overflow-hidden scroll-smooth whitespace-nowrap ${
            isNameHovering ? "overflow-x-auto" : "text-ellipsis"
          }`}
          style={{ scrollbarWidth: "none" }}
          ref={spanRef}
        >
          {song.name}
        </span>
        <span className="text-important block overflow-ellipsis">
          {song.artist_name}
        </span>
      </div>
      {!isSongInPlaylist ? (
        <button
          className={`${
            recsStyle === "vertical" ? "h-12 w-12 flex-shrink-0" : "w-1/2 py-2"
          }`}
          onClick={() => addSongIntoCurrentPlaylist(song)}
        >
          {recsStyle === "vertical" ? (
            <img
              className="invert-icon aspect-square w-12"
              src="https://img.icons8.com/?size=100&id=85479&format=png&color=000000"
              alt={`add ${song.name} song to playlist`}
            />
          ) : (
            "Add"
          )}
        </button>
      ) : (
        <button
          className={`${
            recsStyle === "vertical" ? "h-12 w-12 flex-shrink-0" : "w-1/2 py-2"
          }`}
          onClick={() => removeSongFromCurrentPlaylist(song)}
        >
          {recsStyle === "vertical" ? (
            <img
              className="invert-icon aspect-square w-12"
              src="https://img.icons8.com/?size=100&id=nMbf3MBxBxG7&format=png&color=000000"
              alt={`add ${song.name} song to playlist`}
            />
          ) : (
            "Remove"
          )}
        </button>
      )}
    </div>
  );
};

export { RecommendedSong };

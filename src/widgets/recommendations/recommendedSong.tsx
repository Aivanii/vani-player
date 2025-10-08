import { useEffect, useRef, useState } from "react";
import type { Song } from "../../app/types/types";

import { useSongContextMenu } from "../../hooks/useContextMenu";

interface RecommendedSong {
  song: Song;
  isSongInPlaylist: boolean;
  addSongIntoCurrentPlaylist: (song: Song) => void;
  removeSongFromCurrentPlaylist: (song: Song) => void;
}

const RecommendedSong = ({
  song,
  isSongInPlaylist,
  addSongIntoCurrentPlaylist,
  removeSongFromCurrentPlaylist,
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
      className="inner-glow border-standart-border bg-draggable-elem-bg hover:hover-glow-enhanced rounded-dynamic border-size-dynamic flex h-58 w-48 flex-col items-center justify-center gap-1 backdrop-opacity-100 transition-all duration-300 hover:scale-105"
      onContextMenu={handleContextMenu}
    >
      <img
        src={song.album_image}
        alt={`${song.name} thumbnail`}
        className="rounded-dynamic aspect-square w-24 object-cover shadow-[0_0_0_2px_#ffffff1f]"
      />
      <span
        className={`line-clamp-1 block w-full overflow-hidden scroll-smooth px-2 text-center whitespace-nowrap ${isNameHovering ? "overflow-x-auto" : "text-ellipsis"}`}
        style={{ scrollbarWidth: "none" }}
        onMouseEnter={() => setIsNameHovering(true)}
        onMouseLeave={() => setIsNameHovering(false)}
        ref={spanRef}
      >
        {song.name}
      </span>
      <span className="text-important block px-2 overflow-ellipsis">
        {song.artist_name}
      </span>
      {!isSongInPlaylist ? (
        <button
          className="px-6 py-1"
          onClick={() => addSongIntoCurrentPlaylist(song)}
        >
          Add
        </button>
      ) : (
        <button
          className="px-6 py-1"
          onClick={() => removeSongFromCurrentPlaylist(song)}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export { RecommendedSong };

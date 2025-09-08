import type { Song } from "../../types";

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

  return (
    <div
      key={song.songUrl}
      className="rounded-2xl border-1 border-standart-border w-48 h-58 flex flex-col justify-center gap-1 items-center duration-150
              backdrop-opacity-100 bg-draggable-elem-bg hover:shadow-standart"
      onContextMenu={handleContextMenu}
    >
      <img
        src={song.songThumbnail}
        alt={`${song.songName} thumbnail`}
        className="aspect-square w-24 rounded-md shadow-[0_0_0_2px_#ffffff1f] object-cover"
      />
      <span
        className={`block overflow-ellipsis text-[1.2rem] w-full text-center line-clamp-2 px-2 h-${
          song.songName && song.songName.length > 24 ? "14" : "6"
        }`}
      >
        {song.songName}
      </span>
      <span className="block overflow-ellipsis text-important px-2">
        {song.authorName}
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

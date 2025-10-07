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

  return (
    <div
      key={song.id}
      className="border-standart-border bg-draggable-elem-bg hover:shadow-standart rounded-dynamic flex h-58 w-48 flex-col items-center justify-center gap-1 border-1 backdrop-opacity-100 duration-150"
      onContextMenu={handleContextMenu}
    >
      <img
        src={song.album_image}
        alt={`${song.name} thumbnail`}
        className="rounded-dynamic aspect-square w-24 object-cover shadow-[0_0_0_2px_#ffffff1f]"
      />
      <span
        className={`line-clamp-2 block w-full px-2 text-center text-[1.2rem] overflow-ellipsis h-${
          song.name && song.name.length > 24 ? "14" : "6"
        }`}
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

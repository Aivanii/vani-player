import type { Song } from "../../types";

import { addSongToPlaylist } from "./tools/addSongToPlaylist";
import { removeSongFromPlaylist } from "./tools/removeSongFromPlaylist";
import { isSongInPlaylist } from "./tools/isSongInPlaylist";

interface RecommendedSong {
  song: Song;
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
}

const RecommendedSong = ({ song, playlist, setPlaylist }: RecommendedSong) => {
  return (
    <div
      key={song.songUrl}
      className="rounded-2xl border-1 border-standart-border w-48 h-58 flex flex-col justify-center gap-1 items-center duration-150
              backdrop-opacity-100 bg-draggable-elem-bg hover:shadow-standart"
    >
      <img
        src={song.songThumbnail}
        alt={`${song.songName} thumbnail`}
        className="aspect-square w-24 rounded-md shadow-[0_0_0_2px_#ffffff1f]"
      />
      <span
        className={`block overflow-ellipsis text-[1.2rem] w-full text-center line-clamp-2 px-2 h-${
          song.songName?.length > 24 ? "14" : "6"
        }`}
      >
        {song.songName}
      </span>
      <span className="block overflow-ellipsis text-important px-2">
        {song.authorName}
      </span>
      {!isSongInPlaylist({ song, playlist }) ? (
        <button
          className="px-6 py-1"
          onClick={() => {
            addSongToPlaylist({
              song,
              playlist,
              setPlaylist,
            });
          }}
        >
          Add
        </button>
      ) : (
        <button
          className="px-6 py-1"
          onClick={() => {
            removeSongFromPlaylist({ song, playlist, setPlaylist });
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export { RecommendedSong };

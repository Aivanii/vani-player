const SongElem = ({ song }) => {
  return (
    <li className="hover:shadow-standart bg-draggable-elem-bg border-standart-border z-50 flex flex-row items-center justify-start gap-3 rounded-2xl border-1 p-2 duration-150 hover:scale-105">
      <div className="relative block h-16 w-16 flex-shrink-0">
        <img
          src={song.album_image}
          alt={song.album_name}
          className="h-16 w-16 rounded-md object-cover shadow-[0_0_0_2px_#ffffff1f]"
        />
      </div>

      <div className="relative min-w-0 flex-1">
        <span className="block w-full truncate">{song.name}</span>
        <span className="text-important block w-full truncate">
          {song.artist_name}
        </span>
      </div>
    </li>
  );
};

export default SongElem;

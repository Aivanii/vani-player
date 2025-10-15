import type { Song } from "../../app/types/types";

interface PlaylistComponent {
  songs: Song[];
  name: string;
  description?: string;
  image?: string;
}

const PlaylistComponent = ({
  songs,
  name,
  description,
  image,
}: PlaylistComponent) => {
  return (
    <div className="w-64">
      <div
        className={`border-standart-border inner-glow hover:hover:hover-glow-enhanced backdrop-blur-dynamic rounded-dynamic border-size-dynamic duration-dynamic relative flex aspect-square w-full cursor-pointer flex-col gap-2 p-2 transition-all hover:scale-105`}
      >
        <img
          className="rounded-dynamic aspect-square w-full object-cover"
          alt={`${name} thumbnail`}
          src={image || songs[0].album_image}
        />
      </div>
      <div className="p-2">
        <span className="text-important block w-full truncate text-center text-lg">
          {name}
        </span>
      </div>
    </div>
  );
};

export default PlaylistComponent;

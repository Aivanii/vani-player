import PlaylistComponent from "../widgets/playlists/playlistIComponent";

const Playlists = () => {
  const playlists = [
    {
      id: "1",
      songs: [
        {
          id: "6",
          artist_id: "dunno",
          album_name: "dunno",
          artist_name: "vocaCircus",
          name: "【DEX】 Misery Loves Company",
          album_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
          audio: "./mlcc.mp3",
        },
      ],
      name: "playlist1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: "https://anime-pictures.net/assets/modern-logo-full.avif",
    },
    {
      id: "2",
      songs: [
        {
          id: "6",
          artist_id: "dunno",
          album_name: "dunno",
          artist_name: "vocaCircus",
          name: "【DEX】 Misery Loves Company",
          album_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
          audio: "./mlcc.mp3",
        },
      ],
      name: "playlist2",
      description: "description2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq0ZJXJlJtqZ2Yv_KHdaE8fEl_XW4wrzlFzQ&s",
    },
    {
      id: "3",
      songs: [
        {
          id: "8",
          artist_id: "dunno",
          album_name: "dunno",
          artist_name: "vocaCircus",
          name: "【DEX】 Misery Loves Company",
          album_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
          audio: "./mlcc.mp3",
        },
      ],
      name: "playlist3",
      description: "description3",
      image: "",
    },
    {
      id: "4",
      songs: [
        {
          id: "8",
          artist_id: "dunno",
          album_name: "dunno",
          artist_name: "vocaCircus",
          name: "【DEX】 Misery Loves Company",
          album_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
          audio: "./mlcc.mp3",
        },
      ],
      name: "playlist4",
      description: "description4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBwKkul5zPiWbvDuQKzmgqHp6r46e2ZIYuw&s",
    },
    {
      id: "5",
      songs: [
        {
          id: "8",
          artist_id: "dunno",
          album_name: "dunno",
          artist_name: "vocaCircus",
          name: "【DEX】 Misery Loves Company",
          album_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFnZSjAaKI99uKBZ3-nLEawDVmovGlDjBUw&s",
          audio: "./mlcc.mp3",
        },
      ],
      name: "playlist5",
      description: "description5",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQskcvGVdg4e278UNjwS22J3kQyu2NjZDqNQ&s",
    },
  ];
  return (
    <main className="bg-entity-bg border-standart-border shadow-standart backdrop-blur-dynamic rounded-dynamic border-size-dynamic mx-auto h-full max-w-7xl self-stretch p-6 py-6 md:max-h-dvh">
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] place-items-center items-center gap-4">
        {playlists.map((playlist) => (
          <PlaylistComponent
            key={playlist.id}
            name={playlist.name}
            songs={playlist.songs}
            description={playlist.description}
            image={playlist.image}
          />
        ))}
      </div>
    </main>
  );
};

export default Playlists;

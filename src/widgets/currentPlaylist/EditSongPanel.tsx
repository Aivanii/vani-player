import { observer } from "mobx-react-lite";
import { editSongStore } from "../../app/stores/editSongStore/EditSongStore";
import { useEffect, useRef, useState } from "react";
import type { Song } from "../../app/types/types";

const EditSongPanel = observer(() => {
  const { isOpen, closeSongEditing, activeSong, updateSongDataById } =
    editSongStore;
  const [song, setSong] = useState<Song | null>(null);

  const changeImgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeSong) {
      setSong(activeSong);
    }
  }, [activeSong]);

  const setNewImgLocally = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !song) return;
    setSong({
      ...song,
      album_image: URL.createObjectURL(selectedFile),
    } as Song);
  };

  const saveChanges = () => {
    if (!song?.id) return;
    updateSongDataById(song, song.id);
  };

  return (
    <>
      <div
        className={`fixed ${isOpen ? "left-0" : "-left-[100%]"} bg-entity-bg border-standart-border shadow-standart backdrop-blur-dynamic top-0 z-200 h-full w-full max-w-140 border-1 p-12 transition-all duration-700`}
        id="editSongPanel"
      >
        <div className="flex items-center justify-center">
          <div className="relative block">
            <img
              className="border-standart-border relative block aspect-square w-100 rounded-4xl border-2 object-cover"
              src={song?.album_image || "./thumbnailSongPreview.png"}
              alt="custom audio thumbnail"
            />
            <div
              title="change song thumbnail"
              onClick={() => {
                if (changeImgInputRef.current) {
                  changeImgInputRef.current.click();
                }
              }}
              className="hover:backdrop-blur-dynamic absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center rounded-4xl bg-transparent p-2 opacity-0 transition-all duration-300 hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100"
            >
              <img
                className="invert-icon"
                src="https://img.icons8.com/?size=100&id=99292&format=png&color=000000"
                alt="change song thumbnail"
              />
              <input
                className="hidden"
                accept="image/*"
                onChange={setNewImgLocally}
                type="file"
                ref={changeImgInputRef}
              />
            </div>
          </div>
        </div>
        {song && (
          <div className="mx-auto flex w-100 flex-col gap-8 pt-20">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="songNameInput" className="w-32 text-left">
                Song name:
              </label>
              <input
                className="mr-auto w-54 p-2"
                id="songNameInput"
                placeholder="Input song name"
                value={song.name}
                onChange={(e) => {
                  setSong({
                    ...song,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="songAuthorInput" className="w-32">
                Author:
              </label>
              <input
                className="mr-auto w-54 p-2"
                id="songAuthorInput"
                placeholder="Input author"
                value={song.artist_name}
                onChange={(e) => {
                  setSong({
                    ...song,
                    artist_name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        )}
        <div className="mt-20 flex items-center justify-center gap-8">
          <button className="px-12 py-2" onClick={closeSongEditing}>
            close
          </button>
          <button
            className="px-12 py-2"
            onClick={() => {
              saveChanges();
              closeSongEditing();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
});

export default EditSongPanel;

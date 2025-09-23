import { observer } from "mobx-react-lite";
import { editSongStore } from "../../stores/editSongStore/EditSongStore";
import { useEffect, useState } from "react";
import type { Song } from "../../types";

const EditSongPanel = observer(() => {
  const { isOpen, closeSongEditing, activeSong } = editSongStore;
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    if (activeSong) {
      setSong(activeSong);
    }
  }, [activeSong]);

  return (
    <>
      <div
        className={`fixed ${isOpen ? "left-0" : "-left-full"} bg-entity-bg border-standart-border shadow-standart top-0 z-20 h-full w-140 border-1 p-12 backdrop-blur-lg transition-all duration-1000`}
        id="editSongPanel"
      >
        <div className="flex items-center justify-center">
          <img
            className="border-standart-border aspect-square w-100 rounded-4xl border-1 object-cover"
            src={song?.album_image || "./thumbnailSongPreview.png"}
            alt="custom audio thumbnail"
          />
        </div>
        {song && (
          <div>
            <input
              value={song.name}
              onChange={(e) => {
                setSong({ ...song, name: e.target.value });
              }}
            />
          </div>
        )}
        <button className="px-6 py-2" onClick={closeSongEditing}>
          close
        </button>
      </div>
    </>
  );
});

export default EditSongPanel;

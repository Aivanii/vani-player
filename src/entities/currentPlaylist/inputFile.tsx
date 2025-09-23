import { useRef, useId } from "react";
import { currentPlaylistStore } from "../../stores/currentPlaylistStore/currentPlaylistStore";
import type { Song } from "../../types";

const InputFile = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addSong } = currentPlaylistStore;
  const generatedId = useId();

  const handleCustomButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const splitted_name = selectedFile.name.split(".");
      const name = splitted_name.splice(0, splitted_name.length - 1).join("");
      const selectedSong: Song = {
        id: generatedId,
        artist_name: "unknown artist",
        name: name,
        audio: URL.createObjectURL(selectedFile),
        file: selectedFile,
        isAddedByUser: true,
        artist_id: undefined,
        album_image: undefined,
        album_name: undefined,
      };
      addSong(selectedSong);
    }
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        accept="audio/*"
        ref={inputRef}
        onChange={(e) => handleFileChange(e)}
      ></input>
      <button className="w-full p-2" onClick={handleCustomButtonClick}>
        <img
          className="aspect-square w-6 invert"
          src="https://img.icons8.com/?size=100&id=62888&format=png&color=000000"
          alt="add custom song"
          title="add custom song"
        />
      </button>
    </>
  );
};

export default InputFile;

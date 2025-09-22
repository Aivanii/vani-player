import { useEffect, useRef, useState } from "react";

const InputFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFile) return;
  }, [selectedFile]);
  return (
    <input
      className="w-full p-2"
      title="add custom song"
      type="file"
      accept="audio/*"
      ref={inputRef}
    ></input>
  );
};

export default InputFile;

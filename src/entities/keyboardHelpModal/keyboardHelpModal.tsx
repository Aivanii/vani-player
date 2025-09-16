import { useState } from "react";

const KeyboardHelpModal = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <>
      <div
        className="fixed top-1/2 left-1/2 flex items-center justify-center bg-amber-200"
        hidden={isHidden}
      >
        hello i am help modal window
      </div>
      <div className="absolute right-0 bottom-0">
        <button
          className="aspect-square h-12"
          onClick={() => setIsHidden(!isHidden)}
        >
          ?
        </button>
      </div>
    </>
  );
};

export default KeyboardHelpModal;

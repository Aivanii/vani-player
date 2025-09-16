import { useCallback, useEffect } from "react";
import type { KeyboardNavigationConfig } from "../types";

const useKeyboardNavigation = (config: KeyboardNavigationConfig) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      console.log(event.key);
      switch (event.key) {
        case "ArrowLeft":
          config.onLeft?.();
          break;
        case "ArrowRight":
          config.onRight?.();
          break;
        case " ":
          config.onSpace?.();
      }
    },
    [config],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyboardNavigation;

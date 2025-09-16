import { useCallback, useEffect } from "react";
import type { KeyboardNavigationConfig } from "../types";

const useKeyboardNavigation = (config: KeyboardNavigationConfig) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    console.log(event.key);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyboardNavigation;

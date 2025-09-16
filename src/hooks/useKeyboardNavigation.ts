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
        case "ArrowUp":
          config.onArrowUp?.();
          break;
        case "ArrowDown":
          config.onArrowDown?.();
          break;
        case " ":
          config.onSpace?.();
          break;
        case "Enter":
          config.onEnter?.();
          break;
        case "m":
          config.onKeyM?.();
          break;
        case ",":
          config.onComma?.();
          break;
        case ".":
          config.onPeriod?.();
          break;
        case "1":
          config.onDigit1?.();
          break;
        case "2":
          config.onDigit2?.();
          break;
        case "3":
          config.onDigit3?.();
          break;
        case "4":
          config.onDigit4?.();
          break;
        case "5":
          config.onDigit5?.();
          break;
        case "6":
          config.onDigit6?.();
          break;
        case "7":
          config.onDigit7?.();
          break;
        case "8":
          config.onDigit8?.();
          break;
        case "9":
          config.onDigit9?.();
          break;
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

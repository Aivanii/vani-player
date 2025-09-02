import { useCallback } from "react";
import { contextMenuStore } from "../stores/contextMenuStore/ContextMenuStore";
import type { Song } from "../types";
import { menuItems } from "../stores/contextMenuStore/ContextMenuItems";

const useSongContextMenu = (song: Song) => {
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();

      contextMenuStore.open(event.clientX, event.clientY, menuItems);
    },
    [song]
  );
  return handleContextMenu;
};

export { useSongContextMenu };

import { useCallback } from "react";
import { contextMenuStore } from "../stores/contextMenuStore/ContextMenuStore";
import type { Song } from "../types";
import { menuActions } from "../stores/contextMenuStore/ContextMenuActions";

const useSongContextMenu = (song: Song) => {
  const settledMenuItems = [
    {
      label: "play next",
      action: () => {
        menuActions.playNext(song);
      },
    },
  ];

  const handleContextMenu = useCallback(
    (event: {
      preventDefault: () => void;
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();
      contextMenuStore.open(event.clientX, event.clientY, settledMenuItems);
    },
    [song]
  );
  return handleContextMenu;
};

export { useSongContextMenu };

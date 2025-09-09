import { act, useCallback } from "react";
import { contextMenuStore } from "../stores/contextMenuStore/ContextMenuStore";
import type { Song } from "../types";
import { menuActions } from "../stores/contextMenuStore/ContextMenuActions";
import { action } from "mobx";

const useSongContextMenu = (song: Song) => {
  const settledMenuItems = [
    {
      label: "Play",
      action: () => {
        menuActions.playImmediately(song);
      },
    },
    {
      label: "Play next",
      action: () => {
        menuActions.playNext(song);
      },
    },
    {
      label: "Add to playlist",
      action: () => {
        menuActions.addToQueue(song);
      },
    },
    {
      label: "Remove from playlist",
      action: () => {
        menuActions.removeFromQueue(song);
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

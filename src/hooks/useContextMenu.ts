import { useCallback } from "react";
import { contextMenuStore } from "../stores/contextMenuStore/ContextMenuStore";
import type { ContextMenuItem, Song } from "../types";
import { menuActions,  menuTitles} from "../stores/contextMenuStore/ContextMenuActions";

const useSongContextMenu = (song: Song) => {
  const settledMenuItems: ContextMenuItem[] = [
    {
      label: menuTitles.playImmediately,
      action: () => {
        menuActions.playImmediately(song);
      },
    },
    {
      label: menuTitles.playNext,
      action: () => {
        menuActions.playNext(song);
      },
    },
    {
      label: menuTitles.addToQueue,
      action: () => {
        menuActions.addToQueue(song);
      },
    },
    {
      label: menuTitles.removeFromQueue,
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

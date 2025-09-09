import { observer } from "mobx-react-lite";
import { contextMenuStore } from "../../stores/contextMenuStore/ContextMenuStore";
import type { ContextMenuItem } from "../../types";
import { createPortal } from "react-dom";

const ContextMenu = observer(() => {
  const { isOpen, x, y, items, close } = contextMenuStore;

  if (!isOpen) return;

  return (
    <>
      {createPortal(
        <>
          <div
            id="close_contextMenu_zone"
            className="fixed top-0 left-0 z-1000 h-full w-full"
            onClick={close}
            onContextMenu={close}
          ></div>

          <div
            className="border-standart-border shadow-standart fixed z-10000 rounded-2xl border-1 p-4 backdrop-blur-sm backdrop-opacity-100 duration-150"
            style={{ top: y, left: x }}
          >
            {items.map((item: ContextMenuItem, index: number) => {
              return (
                <button
                  className="h-10 w-46"
                  key={index}
                  onClick={() => {
                    item.action();
                    close();
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>,
        document.body,
      )}
    </>
  );
});

export { ContextMenu };

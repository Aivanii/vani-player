import { observer } from "mobx-react-lite";
import { contextMenuStore } from "../../app/stores/contextMenuStore/ContextMenuStore";
import type { ContextMenuItem } from "../../app/types/types";
import { createPortal } from "react-dom";

const ContextMenu = observer(() => {
  const { isOpen, x, y, items, close } = contextMenuStore;
  return (
    <>
      {createPortal(
        <>
          <div
            id="close_contextMenu_zone"
            className={` ${isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"} fixed top-0 left-0 z-1000 h-full w-full`}
            onClick={close}
            onContextMenu={close}
          ></div>

          <div
            className={`border-standart-border shadow-standart fixed z-10000 rounded-2xl border-1 p-4 backdrop-blur-sm backdrop-opacity-100 transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            style={{ top: y, left: x, transitionDelay: isOpen ? "0s" : "0.1s" }}
          >
            {items.map((item: ContextMenuItem, index: number) => {
              return (
                <button
                  className="h-10 w-46"
                  key={index}
                  onClick={() => {
                    item.action();
                    setTimeout(close, 500);
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

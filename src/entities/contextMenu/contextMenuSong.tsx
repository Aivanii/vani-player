import { observer } from "mobx-react-lite";
import { contextMenuStore } from "../../stores/contextMenuStore/ContextMenuStore";

const ContextMenu = observer(() => {
  const { isOpen, x, y, items, close } = contextMenuStore;

  if (!isOpen) return;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full z-100"
        onClick={close}
      ></div>

      <div className="fixed z-100" style={{ top: y, left: x }}>
        {items.map((item, index) => {
          return (
            <button
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
    </>
  );
});

export { ContextMenu };

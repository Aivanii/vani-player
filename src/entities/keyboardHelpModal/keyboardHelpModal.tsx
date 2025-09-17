import { useState } from "react";
import { createPortal } from "react-dom";

const KeyboardHelpModal = () => {
  const [shouldRender, setShouldRender] = useState(false);

  return (
    <>
      {createPortal(
        <div
          className={`fixed top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-600 ${shouldRender ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          onClick={(event) => {
            if (event.currentTarget === event.target) setShouldRender(false);
          }}
        >
          <div
            className={`bg-entity-bg border-standart-border shadow-standart flex h-[80vh] max-h-320 w-[80vw] max-w-7xl flex-col items-center justify-center rounded-4xl border-1 px-12 transition-all duration-150 ${shouldRender ? "backdrop-blur-lg" : "backdrop-blur-none"}`}
          >
            <span className="py-8 text-3xl">Keyboard shortcuts</span>
            <div className="h-[80vh] max-h-320 w-[80vw] max-w-7xl overflow-y-auto px-12">
              <span className="text-3xl font-semibold">Playback</span>
              <ul className="my-16 flex w-full flex-col gap-4 text-2xl">
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Toggle play/pause</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border flex items-center justify-center rounded-md border-1 px-2">
                      Space
                    </kbd>
                    ,
                    <kbd className="border-standart-border rounded-md border-1 p-2">
                      Enter
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Toggle mute</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      m
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Rewind 5 seconds</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      ←
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Fast forward 5 seconds</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      →
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Increase volume</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      ↑
                    </kbd>
                  </div>
                </li>

                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Decrease volume</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      ↓
                    </kbd>
                  </div>
                </li>
              </ul>
              <span className="text-3xl font-semibold">Track Navigation</span>
              <ul className="my-16 flex w-full flex-col gap-4 text-2xl">
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Prevous track</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      ,
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Next track</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      .
                    </kbd>
                  </div>
                </li>
              </ul>
              <span className="text-3xl font-semibold">Quick Seek</span>
              <ul className="my-16 flex w-full flex-col gap-4 text-2xl">
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 10%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      1
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 20%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      2
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 30%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      3
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 40%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      4
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 50%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      5
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 60%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      6
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 70%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      7
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 80%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      8
                    </kbd>
                  </div>
                </li>
                <li className="border-color-primary flex w-full items-center justify-between border-t-1 px-4 pt-4">
                  <span>Seek to 90%</span>
                  <div className="flex w-1/3 gap-x-2">
                    <kbd className="border-standart-border mr-auto flex min-w-min items-center justify-start rounded-md border-1 px-2">
                      9
                    </kbd>
                  </div>
                </li>
              </ul>
            </div>
            <div className="py-6">
              <button
                className="px-6 py-2"
                onClick={() => setShouldRender(false)}
              >
                close
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
      <div className="absolute right-0 bottom-0">
        <button
          className="aspect-square h-12"
          onClick={() => setShouldRender(true)}
        >
          ?
        </button>
      </div>
    </>
  );
};

export default KeyboardHelpModal;

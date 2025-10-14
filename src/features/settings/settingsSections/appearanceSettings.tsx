import { observer } from "mobx-react-lite";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";

const AppearanceSettings = observer(() => {
  const { activeBlur, setActiveBlur } = SettingsStore;
  const { activeRounding, setActiveRounding } = SettingsStore;
  const { activeBorderSize, setActiveBorderSize } = SettingsStore;
  const { recsStyle, setRecsStyle } = SettingsStore;
  const { activeAnimSpeedMs, setActiveAnimSpeedMs } = SettingsStore;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <span className="text-important text-3xl">Appearance</span>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 gap-y-8">
        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="grid grid-cols-4 gap-2">
            <label
              htmlFor="blurInput"
              className="col-span-3 col-start-1 text-center font-bold"
            >
              Blur
            </label>
            <input
              className="accent-important col-span-3 col-start-1 h-4 cursor-pointer appearance-none"
              id="blurInput"
              name="blurInput"
              value={activeBlur}
              min={0}
              max={16}
              type="range"
              onChange={(event) => setActiveBlur(event.target.value)}
            />
            <span className="col-span-1 col-start-4">{activeBlur}px</span>
            <button
              onClick={() => setActiveBlur("8")}
              className="col-span-3 col-start-1 px-8 py-2"
            >
              reset
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="grid grid-cols-4 gap-2">
            <label
              htmlFor="roundInput"
              className="col-span-3 col-start-1 text-center font-bold"
            >
              Rounding
            </label>
            <input
              className="accent-important col-span-3 col-start-1 h-4 cursor-pointer appearance-none"
              id="roundInput"
              name="roundInput"
              value={activeRounding}
              min={0}
              max={80}
              type="range"
              onChange={(event) => setActiveRounding(event.target.value)}
            />
            <span className="col-span-1 col-start-4">{activeRounding}px</span>
            <button
              className="col-span-3 col-start-1 px-8 py-2"
              onClick={() => setActiveRounding("40")}
            >
              reset
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="grid grid-cols-4 gap-2">
            <label
              htmlFor="roundInput"
              className="col-span-3 col-start-1 text-center font-bold"
            >
              Border Size
            </label>
            <input
              className="accent-important col-span-3 col-start-1 h-4 cursor-pointer appearance-none"
              id="roundInput"
              name="roundInput"
              value={activeBorderSize}
              min={0}
              max={3}
              type="range"
              onChange={(event) => setActiveBorderSize(event.target.value)}
            />
            <span className="col-span-1 col-start-4">{activeBorderSize}px</span>
            <button
              className="col-span-3 col-start-1 px-8 py-2"
              onClick={() => setActiveBorderSize("1")}
            >
              reset
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="grid grid-cols-4 gap-2">
            <label
              htmlFor="speedAnimInput"
              className="col-span-3 col-start-1 text-center font-bold"
            >
              Animations speed
            </label>
            <input
              className="accent-important col-span-3 col-start-1 h-4 cursor-pointer appearance-none"
              id="speedAnimInput"
              name="speedAnimInput"
              value={activeAnimSpeedMs}
              min={0}
              step={50}
              max={900}
              type="range"
              onChange={(event) => setActiveAnimSpeedMs(event.target.value)}
            />
            <span className="col-span-1 col-start-4">
              {activeAnimSpeedMs} ms
            </span>
            <button
              className="col-span-3 col-start-1 px-8 py-2"
              onClick={() => setActiveAnimSpeedMs("200")}
            >
              reset
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-center gap-2">
          <div className="grid grid-cols-4 gap-2">
            <span className="col-span-4 col-start-1 text-center font-bold">
              Recommendation songs style
            </span>
            <div className="col-span-2 col-start-1 flex items-center justify-center gap-2">
              <div
                className={`rounded-dynamic bg-active border-size-dynamic duration-dynamic aspect-square h-8 w-8 cursor-pointer transition-all ${recsStyle === "horizontal" ? "gradientBg1 border-active-border border-2" : "gradientBg2 border-standart-border border-1"}`}
                onClick={() => setRecsStyle("horizontal")}
              ></div>
              <input
                className="hidden"
                type="radio"
                id="recsStyleHorizontal"
                name="recsStyleHorizontal"
                value="horizontal"
                checked={recsStyle === "horizontal"}
                onChange={() => setRecsStyle("horizontal")}
              />
              <label htmlFor="recsStyleHorizontal">Horizontal</label>
            </div>
            <div className="col-span-2 col-start-3 flex items-center justify-center gap-2">
              <div
                className={`rounded-dynamic bg-active border-size-dynamic duration-dynamic aspect-square h-8 w-8 cursor-pointer transition-all ${recsStyle === "vertical" ? "gradientBg1 border-active-border border-2" : "gradientBg2 border-standart-border border-1"}`}
                onClick={() => setRecsStyle("vertical")}
              ></div>
              <input
                className="hidden"
                type="radio"
                id="recsStyleVertical"
                name="recsStyleVertical"
                value="vertical"
                checked={recsStyle === "vertical"}
                onChange={() => setRecsStyle("vertical")}
              />
              <label htmlFor="recsStyleVertical">Vertical</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppearanceSettings;

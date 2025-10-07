import { observer } from "mobx-react-lite";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";

const AppearanceSettings = observer(() => {
  const { activeBlur, setActiveBlur } = SettingsStore;
  const { activeRounding, setActiveRounding } = SettingsStore;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <span className="text-important text-3xl">Appearance</span>
      </div>
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
            onClick={() => setActiveRounding("6")}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
});

export default AppearanceSettings;

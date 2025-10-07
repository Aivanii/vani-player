import { observer } from "mobx-react-lite";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";

const AppearanceSettings = observer(() => {
  const { activeBlur, setActiveBlur } = SettingsStore;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <span className="text-important text-3xl">Appearance</span>
      </div>
      <div className="flex flex-row flex-wrap gap-20">
        <div className="grid grid-cols-2 gap-2">
          <label
            htmlFor="blurInput"
            className="col-start-1 text-center font-bold"
          >
            Blur
          </label>
          <input
            className="accent-important col-start-1 h-4 cursor-pointer appearance-none"
            id="blurInput"
            name="blurInput"
            value={activeBlur}
            min={0}
            max={16}
            type="range"
            onChange={(event) => setActiveBlur(event.target.value)}
          />
          <span className="col-start-2">{activeBlur}px</span>
          <button
            onClick={() => setActiveBlur("8")}
            className="col-start-1 px-8 py-2"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
});

export default AppearanceSettings;

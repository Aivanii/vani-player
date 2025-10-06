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
        <div>
          <label htmlFor="blurInput">Blur:</label>
          <input
            id="blurInput"
            name="blurInput"
            value={activeBlur}
            min={0}
            max={16}
            type="range"
            onChange={(event) => setActiveBlur(event.target.value)}
          />
          <span>px</span>
        </div>
      </div>
    </div>
  );
});

export default AppearanceSettings;

import { observer } from "mobx-react-lite";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";

const AppearanceSettings = observer(() => {
  const { theme, setTheme } = SettingsStore;

  return (
    <div>
      <div className="flex items-center justify-center gap-12">
        <div
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "light" ? "text-active" : ""}`}
          onClick={() => setTheme("light")}
        >
          <div className="border-standart-border shadow-standart bg-entity-bg aspect-square w-32 rounded-2xl border-2" />
          <span>Light</span>
        </div>

        <div
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "dark" ? "text-active" : ""}`}
          onClick={() => setTheme("dark")}
        >
          <div className="border-standart-border shadow-standart aspect-square w-32 rounded-2xl border-2 bg-white" />
          <span>Light</span>
        </div>

        <div
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "auto" ? "text-active" : ""}`}
          onClick={() => setTheme("auto")}
        >
          <div className="border-standart-border shadow-standart aspect-square w-32 rounded-2xl border-2 bg-amber-700" />
          <span>Auto</span>
        </div>
      </div>
    </div>
  );
});

export default AppearanceSettings;

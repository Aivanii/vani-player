import { observer } from "mobx-react-lite";
import { SettingsStore } from "../../../app/stores/settingsStore/settingsStore";

const ThemesSettings = observer(() => {
  const { theme, setTheme } = SettingsStore;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <span className="text-important text-3xl">Themes</span>
      </div>
      <div className="flex flex-row flex-wrap gap-20">
        <div>
          <div className="flex items-center justify-center">
            <span className="text-2xl">Dark themes</span>
          </div>
          <div className="mt-2 flex flex-row flex-wrap gap-12">
            <div
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "dark" ? "text-important" : ""}`}
              onClick={() => setTheme("dark")}
            >
              <div
                className={`shadow-standart rounded-dynamic aspect-square w-32 bg-[#100F17] ${theme === "dark" ? "border-active-border border-size-dynamic" : "border-standart-border border-size-dynamic"}`}
              />
              <span>Dark</span>
            </div>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "lavender" ? "text-important" : ""}`}
              onClick={() => setTheme("lavender")}
            >
              <div
                className={`shadow-standart rounded-dynamic aspect-square w-32 bg-[#291F34] ${theme === "lavender" ? "border-active-border border-size-dynamic" : "border-standart-border border-size-dynamic"}`}
              />
              <span>Lavender</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center">
            <span className="text-2xl">Light themes</span>
          </div>

          <div className="mt-2 flex flex-row flex-wrap gap-12">
            <div
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "light" ? "text-important" : ""}`}
              onClick={() => setTheme("light")}
            >
              <div
                className={`shadow-standart rounded-dynamic aspect-square w-32 bg-[#F6F7F8] ${theme === "light" ? "border-active-border border-size-dynamic" : "border-standart-border border-size-dynamic"}`}
              />
              <span>Light</span>
            </div>

            <div
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${theme === "mint" ? "text-important" : ""}`}
              onClick={() => setTheme("mint")}
            >
              <div
                className={`shadow-standart rounded-dynamic aspect-square w-32 bg-[#D2EBE6] ${theme === "mint" ? "border-important border-size-dynamic" : "border-standart-border border-size-dynamic"}`}
              />
              <span>Mint</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ThemesSettings;

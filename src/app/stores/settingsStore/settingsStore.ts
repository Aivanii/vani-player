import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class settingsStore {
  theme: "light" | "dark" | "auto" | "mint" | "lavender" = "auto";

  constructor() {
    makeAutoObservable(this);
    this.initPersist();
  }

  private initPersist = async () => {
    await makePersistable(this, {
      name: "vani-player-settings",
      properties: ["theme"],
      storage: window.localStorage,
    });

    this.applyThemeToDOM();
  };

  private applyThemeToDOM = () => {
    const root = document.documentElement;

    let actualTheme = this.theme;
    if (actualTheme === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      actualTheme = isDark ? "dark" : "light";
    }

    root.setAttribute("data-theme", actualTheme);

    console.log("data-theme:", actualTheme);
  };

  setTheme = (theme: "light" | "dark" | "auto" | "mint" | "lavender") => {
    this.theme = theme;
    this.applyThemeToDOM();
  };
}

export const SettingsStore = new settingsStore();

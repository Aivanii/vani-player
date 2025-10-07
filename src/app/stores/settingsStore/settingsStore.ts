import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class settingsStore {
  theme: "light" | "dark" | "auto" | "mint" | "lavender" = "auto";
  activeBlur: string = "16";

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
    this.applyAllStylesToDOM();
  };

  private applyAllStylesToDOM = () => {
    this.applyThemeToDOM();
    this.applyActiveBlurToDOM();
  };

  private applyThemeToDOM = () => {
    const root = document.documentElement;
    let actualTheme = this.theme;
    if (actualTheme === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      actualTheme = isDark ? "dark" : "light";
    }
    root.setAttribute("data-theme", actualTheme);
  };
  private applyActiveBlurToDOM = () => {
    const root = document.documentElement;
    root.style.setProperty("--data-active-blur", `${this.activeBlur}px`);
  };

  setTheme = (theme: "light" | "dark" | "auto" | "mint" | "lavender") => {
    this.theme = theme;
    this.applyThemeToDOM();
  };

  setActiveBlur = (activeBlur: string) => {
    this.activeBlur = activeBlur;
    this.applyActiveBlurToDOM();
  };
}

export const SettingsStore = new settingsStore();

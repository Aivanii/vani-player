import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class settingsStore {
  theme: "light" | "dark" | "auto" | "mint" | "lavender" = "auto";
  activeBlur: string = "16";
  activeRounding: string = "28";
  activeBorderSize: string = "1";

  recsStyle: "horizontal" | "vertical" = "horizontal";

  constructor() {
    makeAutoObservable(this);
    this.initPersist();
  }

  private initPersist = async () => {
    await makePersistable(this, {
      name: "vani-player-settings",
      properties: [
        "theme",
        "activeBlur",
        "activeRounding",
        "activeBorderSize",
        "recsStyle",
      ],
      storage: window.localStorage,
    });
    this.applyAllStylesToDOM();
  };

  private applyAllStylesToDOM = () => {
    this.applyThemeToDOM();
    this.applyActiveBlurToDOM();
    this.applyActiveRoundingToDOM();
    this.applyActiveBorderSize();
    this.applyRecsStyleToDOM();
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
  private applyActiveRoundingToDOM = () => {
    const root = document.documentElement;
    root.style.setProperty(
      "--data-active-rounding",
      `${this.activeRounding}px`,
    );
  };
  private applyActiveBorderSize = () => {
    const root = document.documentElement;
    root.style.setProperty(
      "--data-active-border-size",
      `${this.activeBorderSize}px`,
    );
  };
  private applyRecsStyleToDOM = () => {
    const root = document.documentElement;
    root.style.setProperty("--data-active-recs-style", this.recsStyle);
  };

  setTheme = (theme: "light" | "dark" | "auto" | "mint" | "lavender") => {
    this.theme = theme;
    this.applyThemeToDOM();
  };
  setRecsStyle = (recsStyle: "horizontal" | "vertical") => {
    this.recsStyle = recsStyle;
    this.applyRecsStyleToDOM();
  };

  setActiveBlur = (activeBlur: string) => {
    this.activeBlur = activeBlur;
    this.applyActiveBlurToDOM();
  };

  setActiveRounding = (activeRounding: string) => {
    this.activeRounding = activeRounding;
    this.applyActiveRoundingToDOM();
  };

  setActiveBorderSize = (activeBorderSize: string) => {
    this.activeBorderSize = activeBorderSize;
    this.applyActiveBorderSize();
  };
}

export const SettingsStore = new settingsStore();

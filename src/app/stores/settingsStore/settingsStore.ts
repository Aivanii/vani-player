import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class settingsStore {
  theme: "light" | "dark" | "auto" = "auto";

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "vani-player-settings",
      properties: ["theme"],
      storage: window.localStorage,
    });
  }

  setTheme = (theme: "light" | "dark" | "auto") => {
    this.theme = theme;
  };
}

export const SettingsStore = new settingsStore();

import ThemesSettings from "./themesSettings";
import GeneralSettings from "./generalSettings";
import type { SettingSection } from "./settingSection.type";
import AppearanceSettings from "./appearanceSettings";

const settingsSections: SettingSection[] = [
  {
    id: "general",
    label: "General",
    icon: "./icons/generalSettings.png",
    component: GeneralSettings,
  },
  {
    id: "themes",
    label: "Themes",
    icon: "./icons/themesSettings.png",
    component: ThemesSettings,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: "./icons/appearanceSettings.png",
    component: AppearanceSettings,
  },
];

export { ThemesSettings, GeneralSettings, settingsSections };
export type { SettingSection };

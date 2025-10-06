import ThemesSettings from "./themesSettings";
import GeneralSettings from "./generalSettings";
import type { SettingSection } from "./settingSection.type";
import AppearanceSettings from "./appearanceSettings";

const settingsSections: SettingSection[] = [
  {
    id: "general",
    label: "General",
    icon: "https://img.icons8.com/?size=100&id=118295&format=png&color=000000",
    component: GeneralSettings,
  },
  {
    id: "themes",
    label: "Themes",
    icon: "https://img.icons8.com/?size=100&id=1058&format=png&color=000000",
    component: ThemesSettings,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: "https://img.icons8.com/?size=100&id=24756&format=png&color=000000",
    component: AppearanceSettings,
  },
];

export { ThemesSettings, GeneralSettings, settingsSections };
export type { SettingSection };

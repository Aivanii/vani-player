import ThemesSettings from "./themesSettings";
import GeneralSettings from "./generalSettings";
import type { SettingSection } from "./settingSection.type";

const settingsSections: SettingSection[] = [
  {
    id: "general",
    label: "General",
    icon: "https://img.icons8.com/?size=100&id=118295&format=png&color=000000",
    component: GeneralSettings,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: "https://img.icons8.com/?size=100&id=1058&format=png&color=000000",
    component: ThemesSettings,
  },
];

export { ThemesSettings, GeneralSettings, settingsSections };
export type { SettingSection };

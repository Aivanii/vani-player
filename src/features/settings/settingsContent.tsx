import { settingsSections } from "./settingsSections/index";
import type { SettingSection } from "./settingsSections/index";

interface SettingsContent {
  activeSection: SettingSection;
}

const SettingsContent = ({ activeSection }: SettingsContent) => {
  const section = settingsSections.find(
    (section) => section.id === activeSection.id,
  );

  return (
    <div className="relative flex h-full w-dvw max-w-[960px] items-center justify-center self-stretch">
      {section && <section.component />}
    </div>
  );
};
export default SettingsContent;

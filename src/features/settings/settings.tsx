import { useState } from "react";
import SettingsSideBar from "./settingsSidebar";
import SettingsContent from "./settingsContent";

import { settingsSections } from "./settingsSections/index";
import type { SettingSection } from "./settingsSections/index";

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingSection>(
    settingsSections[0],
  );

  return (
    <main className="bg-entity-bg border-standart-border shadow-standart backdrop-blur-dynamic rounded-dynamic mx-auto h-full max-w-7xl self-stretch border-1 py-6 md:max-h-dvh">
      <div className="flex items-start justify-between">
        <SettingsSideBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <SettingsContent activeSection={activeSection} />
      </div>
    </main>
  );
};

export default Settings;

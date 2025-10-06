import { settingsSections } from "./settingsSections/index";

import type { SettingSection } from "./settingsSections/index";

interface SettingsSideBar {
  activeSection: SettingSection;
  setActiveSection: (section: SettingSection) => void;
}

const SettingsSideBar = ({
  activeSection,
  setActiveSection,
}: SettingsSideBar) => {
  return (
    <ul className="border-standart-border flex h-full w-dvw max-w-[260px] flex-col gap-4 self-stretch border-r-1 px-8">
      {settingsSections.map((section) => (
        <li className="py-1" key={section.id}>
          <div
            onClick={() => setActiveSection(section)}
            className={`border-standart-border hover:shadow-standart bg-draggable-elem-bg flex w-full cursor-pointer items-center justify-start gap-2 rounded-2xl border-1 p-2 px-12 text-left opacity-100 backdrop-blur-sm transition-all duration-150 hover:scale-105 ${
              activeSection.id === section.id
                ? "shadow-standart draggable-active-elem border-2"
                : "bg-draggable-elem-bg"
            }`}
            key={section.id}
          >
            <img
              src={section.icon}
              alt={section.id}
              className="invert-icon aspect-square w-8"
            />
            <span className="relative block w-full">{section.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SettingsSideBar;

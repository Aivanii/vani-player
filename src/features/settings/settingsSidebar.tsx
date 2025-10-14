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
    <ul className="border-standart-border border-r-size-dynamic flex h-full w-dvw max-w-[260px] flex-col gap-4 self-stretch px-8">
      {settingsSections.map((section) => (
        <li className="py-1" key={section.id}>
          <button
            onClick={() => setActiveSection(section)}
            className={`border-standart-border hover:shadow-standart inner-glow bg-draggable-elem-bg backdrop-blur-dynamic rounded-dynamic border-size-dynamic duration-dynamic flex w-full cursor-pointer items-center justify-start gap-2 p-2 px-12 text-left opacity-100 transition-all hover:scale-105 ${
              activeSection.id === section.id
                ? "shadow-standart draggable-active-elem border-size-dynamic"
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
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SettingsSideBar;

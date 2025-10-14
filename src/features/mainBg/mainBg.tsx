import { observer } from "mobx-react-lite";
import { DarkThemeBg } from "./themedBg/dark/darkThemeBg";
import { SettingsStore } from "../../app/stores/settingsStore/settingsStore";
import { LavenderThemeBg } from "./themedBg/lavender/lavenderThemeBg";

const MainBg = observer(() => {
  const { theme } = SettingsStore;

  let bgContent;
  switch (theme) {
    case "dark":
    case "auto":
      bgContent = <DarkThemeBg />;
      break;
    case "lavender":
      bgContent = <LavenderThemeBg />;
      break;
    default:
      bgContent = <></>;
      break;
  }

  return <>{bgContent}</>;
});

export { MainBg };

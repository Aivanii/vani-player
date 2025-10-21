import "./styles/index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Header } from "./widgets/header/header.tsx";
import { MainBg } from "./features/mainBg/mainBg.tsx";
import RoutesComponent from "./app/router/router.tsx";
import { useLocation } from "react-router";
import GlobalAudioPlayer from "./widgets/audioPlayer/globalAudioPlayer.tsx";
import { memo } from "react";
import { AudioProvider } from "./providers/AudioProvider.tsx";

const MemoizedGlobalAudioPlayer = memo(GlobalAudioPlayer);

const App = () => {
  const location = useLocation();
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <RoutesComponent />
      <MemoizedGlobalAudioPlayer isMainPage={location.pathname === "/"} />
      <MainBg />
    </DndProvider>
  );
};

export default App;

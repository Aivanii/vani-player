import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Header } from "./widgets/header/header.tsx";
import { MainBg } from "./features/mainBg/mainBg.tsx";
import RoutesComponent from "./app/router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Header />

      <RoutesComponent />

      <MainBg />
    </DndProvider>
  </StrictMode>,
);

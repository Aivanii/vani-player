import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./pages/main.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Header } from "./entities/header.tsx";
import { MainBg } from "./entities/mainBg/mainBg.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Main />
      <MainBg />
    </DndProvider>
  </StrictMode>,
);

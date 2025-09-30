import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./pages/main.tsx";
import Settings from "./pages/settings.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Header } from "./entities/header/header.tsx";
import { MainBg } from "./entities/mainBg/mainBg.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
      <MainBg />
    </DndProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./pages/main.tsx";

import { Header } from "./entities/header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Main />
  </StrictMode>
);

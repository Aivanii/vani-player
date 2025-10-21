import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { AudioProvider } from "./providers/AudioProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AudioProvider>
  </StrictMode>,
);

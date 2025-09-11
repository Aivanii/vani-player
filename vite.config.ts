// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.jamendo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/v3.0"),
      },
    },
  },
});

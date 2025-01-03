import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 29292 },
  base: "syn-msg",
  build: { outDir: "docs" },
});

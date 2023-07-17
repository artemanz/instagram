import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  root: resolve("src"),
  publicDir: resolve("public"),
  build: {
    outDir: resolve("dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "#": resolve("src"),
      "#icons/outline": resolve("node_modules/@heroicons/react/24/outline"),
      "#icons/solid": resolve("node_modules/@heroicons/react/24/solid"),
    },
  },
});

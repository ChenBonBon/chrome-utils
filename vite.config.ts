import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "extension",
    rollupOptions: {
      output: {
        chunkFileNames: "static/[name].js",
        entryFileNames: "static/[name].js",
        assetFileNames: "static/[name].[ext]",
      },
    },
  },
});

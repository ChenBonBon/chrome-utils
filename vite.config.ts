import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
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

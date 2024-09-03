import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    react(),
    nodePolyfills({
      include: ["buffer"],
    }),
    dts({ tsconfigPath: "./tsconfig.build.json" }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "LaserEyesModal",
      fileName: "lasereyes-modal-vue",
    },
    rollupOptions: {
      external: ["vue"],
      
      output: {
        entryFileNames: "[name].js",
        globals: {
          vue: "Vue",
          react: "React",
        },
      },
    },
  },
});

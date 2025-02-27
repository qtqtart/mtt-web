import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { compilerOptions } from "./tsconfig.paths.json";

const resolveAlias = (paths: Record<string, string[]>) =>
  Object.entries(paths).reduce(
    (acc, [alias, path]) => {
      acc[alias] = resolve(__dirname, ...path);
      return acc;
    },
    {} as Record<string, string>,
  );

export default defineConfig({
  build: {
    cssMinify: true,
    minify: true,
  },
  plugins: [
    react(),
    svgr(),
    visualizer({
      filename: "visualizer.html",
      template: "treemap",
      open: false,
    }),
  ],
  resolve: {
    alias: resolveAlias(compilerOptions.paths),
  },
});

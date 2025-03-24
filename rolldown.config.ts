import { defineConfig } from "rolldown";

export default defineConfig({
  platform: "node",
  input: "src/index.ts",
  output: {
    esModule: true,
    file: "dist/index.js",
    format: "es",
    sourcemap: true,
  },
});

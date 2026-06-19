import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.integration.tsx"],
    css: false,
    globals: true,
    include: ["src/**/*.integration.test.ts", "src/**/*.integration.test.tsx"],
  },
});

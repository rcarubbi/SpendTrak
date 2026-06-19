import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.tsx"],
    css: false,
    globals: true,
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.tsx", "src/utils/**/*.ts", "src/stores/**/*.ts", "src/stores/**/*.tsx"],
      exclude: ["**/*.test.*", "src/components/Icons.tsx", "src/utils/fileSystem.ts"],
    },
  },
});

// @ts-nocheck
import { defineConfig } from "@stryker-mutator/core/config";

export default defineConfig({
  packageManager: "pnpm",
  plugins: ["@stryker-mutator/vitest-runner"],
  testRunner: "@stryker-mutator/vitest-runner",
  vitest: {
    configFile: "vitest.config.ts",
  },
  mutate: [
    "src/components/**/*.tsx",
    "src/utils/**/*.ts",
    "src/stores/**/*.ts",
    "src/stores/**/*.tsx",
    "src/pages/**/*.tsx",
    "!src/**/*.test.*",
    "!src/**/*.integration.test.*",
    "!src/components/Icons.tsx",
    "!src/utils/fileSystem.ts",
  ],
  reporters: ["progress", "html"],
  htmlReporter: {
    baseDir: "reports/mutation",
  },
  thresholds: {
    high: 80,
    low: 60,
    break: null,
  },
  concurrency: 4,
  tempDirName: "stryker-temp",
  cleanTempDir: true,
  timeoutMS: 10000,
});

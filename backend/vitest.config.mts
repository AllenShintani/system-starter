import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    setupFiles: [path.resolve(__dirname, "tests/setup.ts")],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: [
        "src/features/**/*.ts",
        "src/schemas/**/*.ts",
        "src/utils/verifyAuth.ts",
        "src/utils/s3/generateFileUpload.ts",
        "src/routers/**/*.ts",
      ],
      exclude: [
        "src/features/**/ports/**/*.ts",
        "src/routers/index.ts",
        "src/routers/**/index.ts",
        "**/__tests__/**",
        "tests/**",
        "node_modules/**",
        "dist/**",
        "prisma/**",
        "src/generated/**",
        "src/server.ts",
        "src/config/**",
        "src/lib/**",
        "src/utils/createContext.ts",
        "src/utils/s3Client.ts",
      ],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

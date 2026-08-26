import { defineConfig, globalIgnores } from "eslint/config";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptRules from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat config, so the @eslint/eslintrc
 * FlatCompat bridge the old config used is no longer needed — and throws.
 */
export default defineConfig([
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "src/design/tokens.generated.ts",
  ]),
  coreWebVitals,
  typescriptRules,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);

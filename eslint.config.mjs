// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
);

import eslint from "@eslint/js";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnusedimports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    name: "test-preparation-apps/ignore-globally",
    ignores: [
      "**/node_modules",
      "**/.next",
      "**/__tests__",
      "**/*.test.{js,ts,jsx,tsx}",
      "components/ui/*",
    ],
  },
  {
    name: "test-preparation-apps/load-plugins",
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "unused-imports": eslintPluginUnusedimports,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@next/next": eslintPluginNext,
    },
    settings: {
      react: {
        version: "detect",
      },
      next: {
        rootDir: "./*",
      },
    },
  },
  {
    name: "my-monorepo/global-tuning",
    extends: [eslint.configs.recommended],
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    name: "test-preparation-apps/for-typescript",
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.strict,
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat["jsx-runtime"],
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-namespace": "off",
      "react/prop-types": "off",
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  {
    name: "test-preparation-apps/for-nextjs",
    files: ["app/*.{ts,tsx,js,jsx}"],
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  }
);

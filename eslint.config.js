/* spellchecker:ignore lintstagedrc, tseslint */

import babelParser from "@babel/eslint-parser"
import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  {
    ignores: ["build/*"]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    }
  },
  eslintConfigPrettier,
  {
    rules: {
      "no-console": "error",
      "no-var": "error",
      "object-shorthand": "error",
      strict: "error",
      "@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }]
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  {
    files: ["rollup.config.js"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: ["@babel/plugin-syntax-import-assertions"]
        }
      }
    }
  },
  {
    files: ["**/*.js", ".lintstagedrc.js"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        project: false
      }
    }
  }
)

/* spellchecker:ignore lintstagedrc */

import babelParser from "@babel/eslint-parser"
import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  {
    ignores: ["build/*"]
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "no-console": "error",
      strict: "error"
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  {
    files: ["rollup.config.js"],
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
    files: ["test/**/*-spec.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        expect: "readonly",
        it: "readonly"
      }
    }
  }
]

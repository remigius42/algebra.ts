/* spellchecker:ignore lintstagedrc */

import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  {
    ignores: ["build/*"]
  },
  {
    ignores: [".lintstagedrc.mjs", "eslint.config.mjs"] // ignore these ES modules until `sourceType` in `package.json` is changed to `module` since it leads to parsing errors otherwise
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "no-console": "error"
    },
    languageOptions: {
      sourceType: "commonjs"
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
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

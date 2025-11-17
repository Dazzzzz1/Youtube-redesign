import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      myJs: js,
    },
    extends: ['myJs/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-console': 'warn',
      // 'eqeqeq': 'warn',
      // 'curly': 'warn',
      ...eslintConfigPrettier.rules,
    },
  },
])

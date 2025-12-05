/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: { browser: true, es2021: true, node: true },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true, allowExportNames: ['useTheme', 'useLanguage'] }],
    '@typescript-eslint/consistent-type-imports': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['src/test/**/*'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
}


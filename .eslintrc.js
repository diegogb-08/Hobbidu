// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:unicorn/recommended',
    'plugin:cypress/recommended',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/jest-testing-library'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'unused-imports',
    'import',
    'jsx-a11y',
    'prettier',
    'unicorn',
    'cypress'
  ],
  rules: {
    camelcase: 'off',
    'import/no-absolute-path': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 0,
    'unicorn/filename-case': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'no-nested-ternary': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/no-thenable': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        checkFilenames: false,
        replacements: {
          props: false,
          ref: false,
          params: false,
          args: false,
          i: false
        }
      }
    ],
    'unicorn/no-array-reduce': 'off',
    'prettier/prettier': 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {}
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {}
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {}
    }
  ],
  settings: {
    react: {
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    }
  }
}

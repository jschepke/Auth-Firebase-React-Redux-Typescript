module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname, // Linting with Type Information https://typescript-eslint.io/linting/typed-linting
    project: ['./tsconfig.json', './website/tsconfig.json'], // Specify where to find the root tsconfig file of your project.
    ecmaVersion: 2021, // ECMAScript version supported in the project.
    sourceType: 'module', // set to `module` because we ue ECMAScript modules.
    ecmaFeatures: {
      jsx: true, // enable jsx for React.
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'simple-import-sort',
    'prettier',
  ],
  extends: [
    'eslint:recommended', // Eslint recommended configuration by eslint.
    'plugin:@typescript-eslint/recommended', // Turns on rules from TypeScript-specific plugin.
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // rules that specifically require type information https://typescript-eslint.io/linting/typed-linting
    'plugin:react/recommended', // Recommended react linting configs.
    'plugin:react-hooks/recommended', // Recommended react hooks linting configs.
    'plugin:jsx-a11y/recommended', // Turns on a11y rules for JSX.
    'plugin:import/recommended', // Linting of ES2015+ import/export syntax.
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Turns off all rules that are unnecessary or might conflict with Prettier.
  ],

  rules: {
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'error',
    'import/no-named-as-default-member': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
        noSortAlphabetically: true,
      },
    ],
    // quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'max-len': [
      'warn',
      { comments: 100, ignoreStrings: true, ignoreTemplateLiterals: true },
    ],
    'import/no-unresolved': [
      2,
      { ignore: ['^@theme', '^@docusaurus', '^@site'] },
    ],
  },
  env: {
    es6: true, // enable ES2015 features.
    browser: true, // enable use of global browser variables like `windows`.
    node: true, // enable use of global node variables like `process`.
  },
  settings: {
    react: {
      version: 'detect', // auto-detect React version from package.json.
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'], // use typescript-eslint parser for .ts|tsx files.
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`.
      },
    },
  },
  overrides: [
    {
      files: ['./website/src/components/HomepageFeatures/index.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};

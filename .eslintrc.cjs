/* cSpell:disable */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   // tsconfigRootDir: "../Users/jakubschepke/web projects/react/vite/towarowa-app-redux",
  //   // tsconfigRootDir: "///Users/jakubschepke/web%20projects/react/vite/towarowa-app-redux/",
  //   // project: ["./tsconfig.json"],
  // },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    //  max-len: ["error", { "comments": 65 }]
    "max-len": ["warn", { comments: 100 }],
    // "no-console": "error",
  },
};

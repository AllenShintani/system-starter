const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // TypeScriptルール
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",

      // 危険な型の禁止とlet/varの制限
      "no-restricted-syntax": [
        "error",
        {
          selector: "VariableDeclaration[kind='let']",
          message: "Use const instead of let.",
        },
        {
          selector: "VariableDeclaration[kind='var']",
          message: "Use const instead of var.",
        },
      ],

      // 一般的なルール
      "prefer-template": "error",
      "no-unreachable": "error",
      "no-console": ["warn", { allow: ["warn", "error", "debug", "info"] }],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "**/*.js", "mysql_data/"],
  },
];

const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const unusedImports = require("eslint-plugin-unused-imports");
const prettierPlugin = require("eslint-plugin-prettier");

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
      "import": importPlugin,
      "unused-imports": unusedImports,
      "prettier": prettierPlugin,
    },
    rules: {
      // Prettier
      "prettier/prettier": "error",

      // Unused imports
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],

      // Import order
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": "error",

      // TypeScript rules
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
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
    ignores: ["dist/", "node_modules/", "**/*.js", "mysql_data/", "eslint.config.js"],
  },
];

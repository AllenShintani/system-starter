const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const sonarjs = require("eslint-plugin-sonarjs");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    ignores: ["src/generated/**/*"],
  },
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
      "sonarjs": sonarjs,
      "import": importPlugin,
    },
    rules: {
      // Unused variables and imports - Using @typescript-eslint built-in rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
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
      "import/no-relative-parent-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Use the '@/...' alias instead of parent relative imports.",
            },
            {
              group: ["./*"],
              message: "Use the '@/...' alias instead of sibling relative imports.",
            },
          ],
        },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "never",
        },
      ],

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
        {
          selector: "ForStatement",
          message: "Use array helpers instead of for loops.",
        },
        {
          selector: "ForInStatement",
          message: "Use Object.entries() helpers instead of for...in loops.",
        },
        {
          selector: "ForOfStatement",
          message: "Use array helpers instead of for...of loops.",
        },
        {
          selector: "FunctionDeclaration",
          message: "Use const arrow functions instead of function declarations.",
        },
        {
          selector: "FunctionExpression",
          message: "Use arrow functions instead of function expressions.",
        },
        {
          selector: "TSInterfaceDeclaration",
          message: "Use type aliases instead of interfaces.",
        },
        {
          selector: "TSAnyKeyword",
          message: "Use specific types instead of any",
        },
        {
          selector: "TSUnknownKeyword",
          message: "Use specific types instead of unknown",
        },
        {
          selector: "TSNeverKeyword",
          message: "Use specific types instead of never",
        },
      ],

      // 一般的なルール
      "prefer-template": "error",
      "no-unreachable": "error",
      "no-console": ["error", { allow: ["error", "info"] }],
      "no-dupe-else-if": "error",
      "max-lines": ["error", 400],

      // SonarJSルール
      "sonarjs/cognitive-complexity": ["error", 10],
      "sonarjs/no-duplicate-string": "error",
      "sonarjs/no-identical-functions": "error",
      "sonarjs/prefer-immediate-return": "error",
    },
  },
  {
    // テストファイル専用の設定
    files: ["tests/**/*.{ts,tsx}", "**/*.test.ts", "**/*.test.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.test.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "sonarjs": sonarjs,
      "import": importPlugin,
    },
    rules: {
      // Unused variables and imports（テストファイル）
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "never",
        },
      ],

      // テストファイルでは行数制限を緩和
      "max-lines": ["error", 2800],
      // テストファイルでは重複文字列を許可
      "sonarjs/no-duplicate-string": "off",
      "import/no-relative-parent-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Use the '@/...' alias instead of parent relative imports.",
            },
            {
              group: ["./*"],
              message: "Use the '@/...' alias instead of sibling relative imports.",
            },
          ],
        },
      ],
      // 危険な型の禁止とlet/varの制限（テストファイル用）
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
        {
          selector: "ForStatement",
          message: "Use array helpers instead of for loops.",
        },
        {
          selector: "ForInStatement",
          message: "Use Object.entries() helpers instead of for...in loops.",
        },
        {
          selector: "ForOfStatement",
          message: "Use array helpers instead of for...of loops.",
        },
        {
          selector: "FunctionDeclaration",
          message: "Use const arrow functions instead of function declarations.",
        },
        {
          selector: "FunctionExpression",
          message: "Use arrow functions instead of function expressions.",
        },
        {
          selector: "TSInterfaceDeclaration",
          message: "Use type aliases instead of interfaces.",
        },
        {
          selector: "TSAnyKeyword",
          message: "Use specific types instead of any",
        },
      ],
    },
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      "**/*.js",
      "coverage/",
      "postgres_data/",
      "*.config.ts",
      "*.config.js",
      "vitest.config.ts",
      "build/",
      "generated/**/*",
      "scripts/**/*",
      "__mocks__/**/*",
    ],
  },
];

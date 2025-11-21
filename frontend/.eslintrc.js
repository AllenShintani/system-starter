module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "sonarjs", "import", "unused-imports"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true, // 常にStrictMode
    },
  },
  rules: {
    // Restrict API type imports to backend schemas only
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/src/types/api/**", "**/types/api/**"],
            message: "Import API types only from @project_name/backend/schemas.",
          },
        ],
      },
    ],
    // Unused imports
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
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
        "pathGroups": [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/newline-after-import": "error",
    // React / TypeScript specifics
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "prefer-template": "error",
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-assertions": "off",
    // General
    "no-unreachable": "error",
    "no-console": ["error", { allow: ["error", "info"] }],
    "no-dupe-else-if": "error",
    "max-lines": ["error", 400],
    "sonarjs/cognitive-complexity": ["error", 10],
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
        selector: "WhileStatement",
        message: "Use map instead of while.",
      },
      {
        selector: "ForStatement",
        message: "Use map instead of for.",
      },
      {
        selector: "ForInStatement",
        message: "Use Object.entries() などのユーティリティを利用してください。",
      },
      {
        selector: "ForOfStatement",
        message: "Use array helpers instead of for...of.",
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
        selector: "IfStatement[alternate]",
        message: "Avoid using else/else if. Use early return pattern instead.",
      },
      {
        selector:
          'TSAsExpression:not([typeAnnotation.type="TSTypeReference"][typeAnnotation.typeName.name="const"])',
        message: 'Type assertions are not allowed except for "as const".',
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
  },
  overrides: [
    {
      files: ["src/localization/*.ts"],
      rules: {
        "max-lines": "off",
      },
    },
  ],
};

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "sonarjs"],
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
    },
  },
  ecmaFeatures: {
    impliedStrict: true, // 常にStrictMode
  },
  rules: {
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "prefer-template": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          unknown: {
            message: "Use specific types instead of unknown",
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-assertions": "off",
    "no-unreachable": "error", // 到達できないコードはエラー
    "no-console": ["error", { allow: ["warn", "error", "debug", "info"] }],
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
        selector: "IfStatement > BlockStatement ~ IfStatement",
        message: "Avoid using else if.",
      },
      {
        selector: "IfStatement > BlockStatement ~ BlockStatement",
        message: "Avoid using else.",
      },
      {
        selector:
          'TSAsExpression:not([typeAnnotation.type="TSTypeReference"][typeAnnotation.typeName.name="const"])',
        message: 'Type assertions are not allowed except for "as const".',
      },
    ],
  },
  // テストファイルに対する特別な設定を追加
  overrides: [
    {
      files: [
        "**/*test.ts",
        "**/*test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/userdDataDelete.ts",
        "**/auth.ts",
        "**/tokenTracker.ts",
      ],
      rules: {
        "max-lines": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-restricted-syntax": "off",
      },
    },
    {
      files: ["src/batch/**/*.ts"],
      rules: {
        "no-restricted-syntax": [
          "error",
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
            selector: "IfStatement > BlockStatement ~ IfStatement",
            message: "Avoid using else if.",
          },
          {
            selector: "IfStatement > BlockStatement ~ BlockStatement",
            message: "Avoid using else.",
          },
        ],
      },
    },
  ],
};

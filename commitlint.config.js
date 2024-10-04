module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feature", "fix", "docs", "style", "refactor", "test", "chore"],
    ],
  },
};
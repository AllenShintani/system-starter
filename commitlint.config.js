const allowedTypes = [
  "feature",
  "fix",
  "docs",
  "style",
  "refactor",
  "test",
  "chore",
  "version",
];

const headerPattern =
  /^(?<type>feature|fix|docs|style|refactor|test|chore|version)-(?<ticket>LA-\d{2,4}):\s(?<subject>.+)$/u;

const ticketPattern = /^LA-\d{2,4}$/u;

const laTicketPlugin = {
  rules: {
    "require-la-ticket": (parsed, when = "always") => {
      const ticket = parsed?.ticket ?? "";
      const hasValidTicket = ticketPattern.test(ticket);
      const isValid = when === "always" ? hasValidTicket : !hasValidTicket;
      return [
        isValid,
        "コミットメッセージには feature-LA-xx: の形式でチケット番号を含めてください。",
      ];
    },
  },
};

module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern,
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
  plugins: [laTicketPlugin],
  rules: {
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [2, "always", allowedTypes],
    "subject-case": [0, "always"],
    "require-la-ticket": [2, "always"],
  },
};

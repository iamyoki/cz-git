const { execSync } = require("child_process");
const fg = require("fast-glob");

// @description: git branch name = feature/cli_33 => auto get defaultIssues = #33
const issue = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim()
  .split("_")[1];

// @description: monorepo dynamic get name
const packages = fg.sync('*', { cwd: "packages/@cz-git", onlyDirectories: true });

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["cz-git", "site", "cli", ...packages]],
    "subject-min-length": [2, "always", 2],
    "subject-empty": [2, "never"]
  },
  prompt: {
    // @see: https://github.com/Zhengqbbb/cz-git#options
    alias: { 
      f: "docs: fix typos",
      r: "docs: update README",
      c: "chore: update config",
      b: "chore: bump dependencies",
      table: "chore: update project using table data",
    },
    themeColorCode: "38;5;043",
    issuePrefixs: [
      { value: "link",   name: "link:     Work in processing to ISSUES" },
      { value: "closed", name: "closed:   ISSUES has been processed" }
    ],
    customIssuePrefixsAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
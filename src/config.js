let config = {
  Slack: {
    webhook: "https://hooks.slack.com/services/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",
    channel: "#zbeul",
  },
  SQLite: {
    initFile: __dirname + "/../assets/punchlines.sql",
  }
};

module.exports = config;
module.exports = {
  db: {
    schemaPath: __dirname + "/../assets/punchlines.sql",
    path: __dirname + "/../data/punchlines.sqlite",
  },
  slack: {
    webhook: "--YOUR SLACK WEBHOOK HERE--",
    channel: "#general",
  },
  discord: {
    webhook: "--YOUR DISCORD WEBHOOK HERE--",
  },
};

const fs = require("fs");
const config = require("./config");
const { generateSchema, getRandomPunchline } = require("./database");
const slack = require("./connectors/slack");
const discord = require("./connectors/discord");

switch (process.argv[2]) {
  case "--generate":
    generate();
    break;

  case "--slack":
    randomSlackPunchline();
    break;

  case "--discord":
    randomDiscordPunchline();
    break;

  default:
    help();
}

async function generate() {
  try {
    await generateSchema(config.db.schemaPath, config.db.path);

    console.log(
      `Database initialised from ${fs.realpathSync(config.db.schemaPath)} file.`
    );
  } catch (e) {
    console.error(e);
  }
}

async function randomSlackPunchline() {
  try {
    const punchline = await getRandomPunchline(config.db.path);
    await slack.sendPunchline(
      { webhook: config.slack.webhook, channel: config.slack.channel },
      punchline
    );
    console.log("Punchline sent on Slack !");
  } catch (e) {
    console.log(e);
  }
}

async function randomDiscordPunchline() {
  try {
    const punchline = await getRandomPunchline(config.db.path);
    await discord.sendPunchline({ webhook: config.discord.webhook }, punchline);
    console.log("Punchline sent to Slack !");
  } catch (e) {
    console.log(e);
  }
}

function help() {
  console.log(
    `Unknown parameter ${process.argv[2]}, refer to the README for usage instructions...`
  );
}

import fs from "node:fs";
import { parseArgs } from "@std/cli";

import { config } from "./config.ts";
import { generateSchema, getRandomPunchline } from "./database.ts";
import { createSlackConnector } from "./connectors/slack.ts";
import { createDiscordConnector } from "./connectors/discord.ts";
import { createCliConnector } from "./connectors/cli.ts";

import { Connector } from "./types.ts";

const cliArgs = parseArgs(Deno.args);

if (cliArgs.generate) {
  generate();
  Deno.exit(0);
}

function createConnector(connector: string) {
  switch (connector) {
    case "slack":
      return createSlackConnector(config.slack);

    case "discord":
      return createDiscordConnector(config.discord);

    case "cli":
      return createCliConnector();

    default:
      throw new Error(`Unknown connector: ${connector}`);
  }
}

if (cliArgs.connector) {
  const connector = await createConnector(cliArgs.connector);
  await sendRandomPunchline(connector);
  Deno.exit(0);
}

help();

async function generate() {
  try {
    await generateSchema(config.db.schemaPath, config.db.path);

    console.log(
      `Database initialised from ${
        fs.realpathSync(config.db.schemaPath)
      } file.`,
    );
  } catch (e) {
    console.error(e);
  }
}

async function sendRandomPunchline(connector: Connector) {
  try {
    const punchline = await getRandomPunchline(config.db.path);
    await connector.sendPunchline(punchline);
  } catch (e) {
    console.log(e);
  }
}

function help() {
  console.log(`Unknown command, refer to the README for usage instructions...`);
}

import { dirname, fromFileUrl, join } from "@std/path";

const __dirname = dirname(fromFileUrl(import.meta.url));

export const config = {
  db: {
    schemaPath: join(__dirname, "../assets/punchlines.sql"),
    path: join(__dirname, "../data/punchlines.sqlite"),
  },
  slack: {
    webhook: "--YOUR SLACK WEBHOOK HERE--",
    channel: "#general",
  },
  discord: {
    webhook: "--YOUR DISCORD WEBHOOK HERE--",
  },
};

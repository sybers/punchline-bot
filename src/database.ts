import { DatabaseSync } from "node:sqlite";
import { Punchline } from "./types.ts";

function getDatabase(databasePath: string): DatabaseSync {
  const db = new DatabaseSync(databasePath);

  return db;
}

export async function generateSchema(schemaPath: string, databasePath: string) {
  const db = getDatabase(databasePath);
  const initCommand = await Deno.readTextFile(schemaPath);

  db.exec(initCommand);

  db.close();
}

export async function getRandomPunchline(
  databasePath: string,
): Promise<Punchline> {
  const db = getDatabase(databasePath);

  const punchline = db.prepare(
    "SELECT * FROM punchlines ORDER BY RANDOM() LIMIT 1",
  ).get() as Punchline | undefined;

  if (!punchline) {
    throw new Error("No punchline found, did you generate the database ?");
  }

  return punchline;
}

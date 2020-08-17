let sqlite = require("sqlite3");
let fs = require("fs");

/**
 * Get database connection.
 *
 * @param {String} databasePath
 * @returns {import('sqlite3').Database}
 */
const getDatabase = async (databasePath) =>
  new Promise((resolve, reject) => {
    const db = new sqlite.Database(databasePath, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(db);
    });
  });

/**
 * Generate database schema from migration file.
 *
 * @param {String} schemaPath
 * @param {String} databasePath
 */
const generateSchema = async (schemaPath, databasePath) => {
  const db = await getDatabase(databasePath);
  const initCommand = fs.readFileSync(schemaPath, "utf8");

  return new Promise((resolve, reject) => {
    db.exec(initCommand, (err) => {
      db.close();

      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

const getRandomPunchline = async (databasePath) => {
  const db = await getDatabase(databasePath);

  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM punchlines ORDER BY RANDOM() LIMIT 1", (err, res) => {
      db.close();

      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  });
};

module.exports = {
  generateSchema,
  getRandomPunchline,
};

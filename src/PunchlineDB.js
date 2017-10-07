let sqlite = require('sqlite3');
let Promise = require('promise');
let fs = require('fs');

module.exports = class PunchlineDB {
    constructor() {
        this.databasePath = __dirname + '/../persist/punchlineDB.sqlite';
        this.db = new sqlite.Database(this.databasePath);
    }

    generateFromFile(path) {
        return new Promise((resolve, reject) => {
            let initCommand = fs.readFileSync(path, 'utf8');

            this.db.exec(initCommand, (err) => {
                if(err) reject(err);
                resolve();
            });
        });
    }

    getRandomPunchline() {
        return new Promise( (resolve, reject) => {
            this.db.get("SELECT * FROM punchlines ORDER BY RANDOM() LIMIT 1", function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }

    close() {
        this.db.close();
    }
};
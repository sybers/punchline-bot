let mysql = require('mysql');
let Promise = require('promise');

module.exports = class PunchlineDB {
    constructor() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'localuser',
            password: 'eclipse123',
            database: 'punchlines',
            port: 8889
        });
        this.db.connect();
    }

    getRandomPunchline() {
        return new Promise( function(resolve, reject) {
            this.db.query("SELECT * FROM punchlines ORDER BY RAND() LIMIT 1", function (err, res, fields) {
                if (err) reject(err)
                else resolve(res[0]);
            });
        }.bind(this));
    }

    close() {
        this.db.end();
    }
};
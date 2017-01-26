const PunchLineDB = require('./PunchlineDB');
const Slack = require('./Slack');

let punchlineDB = new PunchLineDB();
let slack = new Slack("https://hooks.slack.com/services/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");

punchlineDB.getRandomPunchline()
    .then( (res) => {
        console.log(res);
        return slack.sendPunchline(res);
    }).then((res) => {
        console.log("Punchline postée sur slack !");
    }).catch( (err) => {
        console.log(err);
    }).finally(() => {
        punchlineDB.close();
    });
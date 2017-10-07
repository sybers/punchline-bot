const PunchLineDB = require(__dirname + '/PunchlineDB');
const Slack = require(__dirname + '/Slack');
const config = require(__dirname + '/config.js');
const fs = require('fs');

let slack = new Slack(config.Slack.webhook);

switch(process.argv[2]) {
  case '--generate':
    generate();
    break;

  case undefined:
    randomPunchline();
    break;

  default:
    wrongParam();
}

function generate() {
  let punchlineDB = new PunchLineDB();
  punchlineDB.generateFromFile(config.SQLite.initFile)
    .then( () => {
      console.log('Database initialised from ' + fs.realpathSync(config.SQLite.initFile) + ' file !' );
    }).catch( (err) => {
      console.error(err);
    }).finally( ( ) => {
      punchlineDB.close();
    });
}

function randomPunchline() {
  let punchlineDB = new PunchLineDB();
  punchlineDB.getRandomPunchline()
    .then( (res) => {
      console.log(res);
      return slack.sendPunchline(res);
    }).then(() => {
      console.log('Punchline sent on Slack !');
    }).catch( (err) => {
      console.log(err);
    }).finally(() => {
      punchlineDB.close();
    });
}

function wrongParam() {
  console.log('Unknown parameter ' + process.argv[2] + ', refer to the README for usage instructions...');
}
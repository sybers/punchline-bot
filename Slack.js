const NodeSlack = require('slack-node');
const Promise = require('promise');


module.exports = class Slack {

    constructor(webhookURL) {
        this.slack = new NodeSlack();
        this.slack.setWebhook(webhookURL);
    }

    sendPunchline(punchlineData) {
        let content = "*" + punchlineData.content + "*";
        if(punchlineData.album !== 'null') content += '\n_Album : ' + punchlineData.album + "_";
        if(punchlineData.track !== 'null') content += ', _Track : ' + punchlineData.track + "_";
        return new Promise( function(resolve, reject) {
            this.slack.webhook({
                channel: '#tests',
                username: punchlineData.author + " - Daily Punchline",
                icon_emoji: punchlineData.image_src,
                text: content
            }, function (err, res) {
                if(err) reject(err);
                else resolve(res);
            })
        }.bind(this));
    }
};
const NodeSlack = require("slack-node");

/**
 * Send punchline to Slack channel.
 *
 * @param {Object} config
 * @param {Object} punchline
 */
const sendPunchline = (config, punchline) => {
  const nodeSlack = new NodeSlack();
  nodeSlack.setWebhook(config.webhook);

  return new Promise((resolve, reject) => {
    nodeSlack.webhook(
      {
        channel: config.channel,
        username: punchline.author + " - Daily Punchline",
        icon_emoji: punchline.image_src,
        text: formatPunchline(punchline),
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      }
    );
  });
};

/**
 * Format a punchline for Slack output.
 *
 * @param {Object} punchline
 * @returns {String}
 */
const formatPunchline = (punchline) => {
  let content = `*${punchline.content}*`;

  if (punchline.album !== "null") {
    content += `\n_Album : ${punchline.album}_`;
  }

  if (punchline.track !== "null") {
    content += `\n_Track : ${punchline.track}_`;
  }

  return content;
};

module.exports = {
  sendPunchline,
};

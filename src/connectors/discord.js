const { Webhook } = require("discord-webhook-node");

/**
 * Send punchline to Discord.
 *
 * @param {Object} config
 * @param {Object} punchline
 */
const sendPunchline = (config, punchline) => {
  const webhook = new Webhook(config.webhook);
  webhook.setUsername(`${punchline.author} - Daily Punchline`);
  webhook.setAvatar(punchline.image_src);

  return webhook.send(formatPunchline(punchline));
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

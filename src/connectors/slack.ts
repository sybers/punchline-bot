import NodeSlack from "slack-node";
import type { Connector, Punchline } from "../types.ts";

export async function createSlackConnector(config: any): Promise<Connector> {
  const nodeSlack = new NodeSlack();
  nodeSlack.setWebhook(config.webhook);

  return {
    sendPunchline: (punchline: Punchline) => {
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
          },
        );
      });
    },
  };
}

function formatPunchline(punchline: Punchline): string {
  let content = `*${punchline.content}*`;

  if (punchline.album !== "null") {
    content += `\n_Album : ${punchline.album}_`;
  }

  if (punchline.track !== "null") {
    content += `\n_Track : ${punchline.track}_`;
  }

  return content;
}

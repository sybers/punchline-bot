import { Webhook } from "discord-webhook-node";
import type { Connector, Punchline } from "../types.ts";

export async function createDiscordConnector(config: any): Promise<Connector> {
  const webhook = new Webhook(config.webhook);

  return {
    sendPunchline: (punchline: Punchline): Promise<void> => {
      webhook.setUsername(`${punchline.author} - Daily Punchline`);
      webhook.setAvatar(punchline.image_src);

      return webhook.send(formatPunchline(punchline));
    },
  };
}

function formatPunchline(punchline: Punchline) {
  let content = `*${punchline.content}*`;

  if (punchline.album !== "null") {
    content += `\n_Album : ${punchline.album}_`;
  }

  if (punchline.track !== "null") {
    content += `\n_Track : ${punchline.track}_`;
  }

  return content;
}

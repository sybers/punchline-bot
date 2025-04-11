import type { Connector, Punchline } from "../types.ts";

export async function createCliConnector(): Promise<Connector> {
  return {
    sendPunchline: (punchline) => {
      console.log(formatPunchline(punchline));
      return Promise.resolve();
    },
  };
}

function formatPunchline(punchline: Punchline) {
  const boxWidth = 50;

  // Titre avec l'auteur
  const authorTitle = `=== ${punchline.author} ===`;
  const paddedAuthor = authorTitle
    .padStart(Math.ceil(boxWidth - 2 + authorTitle.length) / 2)
    .padEnd(boxWidth - 2);
  const headerSection = paddedAuthor;

  // Contenu de la punchline
  const contentSection = punchline.content;

  // Détails (album et track)
  const details = [];

  if (punchline.album !== "null" && punchline.album !== null) {
    details.push(`Album: ${punchline.album}`);
  }

  if (punchline.track !== "null" && punchline.track !== null) {
    details.push(`Track: ${punchline.track}`);
  }

  const sections = [headerSection, contentSection];

  if (details.length > 0) {
    const detailsText = details.join(" | ");
    sections.push(detailsText);
  }

  return formatBox(sections, boxWidth);
}

function formatBox(sections: string[], boxWidth = 50) {
  const horizontalLine = "+" + "=".repeat(boxWidth - 2) + "+";
  const separatorLine = "| " + "-".repeat(boxWidth - 4) + " |\n";

  let content = horizontalLine + "\n";

  for (let i = 0; i < sections.length; i++) {
    const sectionLines = sections[i].match(
      new RegExp(`.{1,${boxWidth - 6}}(\\s|$)`, "g"),
    ) || [sections[i]];

    for (const line of sectionLines) {
      content += "| " + line.trimEnd().padEnd(boxWidth - 4) + " |\n";
    }

    // Ajouter un séparateur entre les sections, mais pas après la dernière
    if (i < sections.length - 1) {
      content += separatorLine;
    }
  }

  content += horizontalLine;

  return content;
}

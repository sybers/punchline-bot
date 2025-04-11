# Punchline Bot

🎤 Les punchlines du Rap Game sur votre Discord/Slack 🎤

## Installation

1. Installez les dépendances avec `npm install`.
2. changez les paramètres (Slack, SQLite, etc.) dans le fichier `src/config.ts`.
3. Généréz la base sqlite avec `npm run generate` ou
   `deno src/index.ts --generate`.
4. Pour tester l'envoi d'une punchline, utilisez la commande
   `node src/index.js --discord` ou `node src/index.js --slack`.
5. Profitez :tada:

## Ajout de punchlines

Éditez `assets/punchlines.sql` et ajoutez vos propres punchlines à la fin du
fichier, en respectant la syntaxe SQL.

Régénérez ensuite la base de données avec `npm run generate` ou
`node src/index.js --generate`.

## Automatiser l'envoi

En définissant une tâche CRON, il est possible d'automatiser l'envoi des
punchlines.

Par exemple :

- Commande `crontab -e`
- Ajout de la ligne suivante à la fin du fichier :
  `0 13 * * * /chemin/vers/node /chemin/vers/punchlines/src/index.js --discord`

Cette commande va envoyer une punchline sur Discord tous les jours à 13h !

## Credits

Les punchlines proviennent du site http://www.punchline.fr

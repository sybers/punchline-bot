# Daily Punchline
🎤 Les punchlines du Rap Game sur votre Slack 🎤

## Installation
  1. Installez les dépendances avec `npm install`.
  2. changez les paramètres (Slack, SQLite, etc.) dans le fichier `src/config.js`.
  3. Généréz la base sqlite avec `npm run generate` ou `node src/index.js --generate`. 
  4. Profitez :tada:

## Ajout de punchlines

Éditez `assets/punchlines.sql` et ajoutez vos propres punchlines à la fin du fichier, en respectant la syntaxe SQL.

Régénérez ensuite la base de données avec `npm run generate` ou `node src/index.js --generate`.

## Automatiser l'envoi sur Slack

En définissant une tâche CRON, il est possible d'automatiser l'envoi des punchlines.

Par exemple :
 - Commande `crontab -e`
 - Ajout de la ligne suivante à la fin du fichier : `0 13 * * * /chemin/vers/node /chemin/vers/punchlines/src/index.js`

Cette commande va envoyer une punchline sur Slack tous les jours à 13h pétante !

## Credits
Les punchlines proviennent du site http://www.punchline.fr

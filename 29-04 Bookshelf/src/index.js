// Pour une présentation de notre séléction littéraire
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const http = require("http");
const books = require("../modules/bookInfos");
const table = require("../modules/createTable");

// Création de notre serveur
const server = http.createServer((req, res) => {
    // On court-circuite l'appel automatique du navigateur au favicon.ico
    // sinon l'appel au script ce fera 2 fois et il ecrira "Hum, 50 alors ?" dedans
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end();
        return;
    }

    // On envoi les header de la réponse http
    // ici nous voulons une réponse de type text encodé en UTF-8
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // On écrit l'entête de notre page html
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">    
      <title>Document</title>
      <style>
        body {
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
        }
        table, th, td {
          border: 1px solid black;
          padding: 5px;
        }

        thead {
          text-align: center;
        }
      </style>
    </head>
    <body>`);

    // Corps de la page
    res.write(`
    <table>
      <thead>
        <th>Titre</th>
        <th>Langue</th>
        <th>Pays</th>
        <th>Auteur</th>
        <th>Date de parution</th>
        <th>Âge</th>
      </thead>
      <tbody>
  `);

    for (const informations of books) {
        res.write(table.getRowTableBookInformation(informations));
    }

    res.write(`</tbody></table>`);

    // On écrit le pied de page de notre page html
    // On à fini d'envoyer nos informations au client
    res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000);


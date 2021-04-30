// Récupération du module readline
const readline = require("readline");
// Récupération du module os
const os = require("os");
// Configuration du module
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const getNewProposition = (min, max) => {
    return Math.floor((max + min) / 2);
};

let minBoundary = 1;
let maxBoundary = 100;
let proposition = getNewProposition(minBoundary, maxBoundary);

const ask = (question) => {
    rl.question(
        `Est ce que ton nombre est ${proposition} ?${os.EOL}`,
        (response) => {
            // SI la réponse est correcte, afficher "Génial!"
            // SINON SI C'EST moins ALORS afficher "C'est moins min tio"
            // SINON SI C'EST plus ALORS afficher "C'est plus min gran"
            // SINON afficher "Y'a un soucis? :c"
            switch (response) {
                case "+":
                    console.log("C'est plus");
                    // Le nombre à trouver est inférieur, on va changer la borne max en la mettant à la dernière proposition faîte
                    minBoundary = proposition;
                    // Une fois la borde changée, je vais changer ma nouvelle proposition avec les bornes à jour
                    proposition = getNewProposition(minBoundary, maxBoundary);
                    // Enfin, je vais reposer la question à l'utilisateur avec ma nouvelle proposition
                    ask();
                    break;
                case "-":
                    console.log("C'est moins");
                    // Le nombre à trouver est supérieur, on va changer la borne min en la mettant à la dernière proposition faîte
                    maxBoundary = proposition;
                    // Une fois la borde changée, je vais changer ma nouvelle proposition avec les bornes à jour
                    proposition = getNewProposition(minBoundary, maxBoundary);
                    // Enfin, je vais reposer la question à l'utilisateur avec ma nouvelle proposition
                    ask();
                    break;
                case "=":
                    // Le programme a trouvé ma proposition, on est content et on va s'arrêter ici. On ne repose pas la question
                    console.log("Génial =D");
                    // Ferme la ligne de commande
                    rl.close();
                    break;
                default:
                    // Le programme n'a pas compris la réponse et va reposer la question
                    console.log("Y'a un soucis? :c");
                    proposition = getNewProposition(minBoundary, maxBoundary);
                    ask();
            }
        }
    );
};

// Une question qui n'attend pas de réponse du programme, on fait un simple console.log
console.log(`Choisis un nombre, dans ta tête, entre ${minBoundary} et ${maxBoundary}, je vais le deviner!`);
ask();

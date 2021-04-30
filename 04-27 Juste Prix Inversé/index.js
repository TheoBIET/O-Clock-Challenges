const readline = require('readline');
const os = require('os');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let currentMax = 10;
let currentMin = 0;
let nbOfTries = 0;

const requestMax = () => {
    rl.question(`Quelle sera le plus grand nombre de votre fourchette?`, (aws) => {
        if(isNaN(parseInt(aws))) {
            requestMax()
        }
        currentMax = parseInt(aws)
        requestMin();
    });
}

const requestMin = () => {
    rl.question(`Quelle sera le plus petit nombre de votre fourchette?`, (aws) => {
        if(isNaN(parseInt(aws))) {
            requestMin()
        } else if (aws > currentMax) {
            nbOfTries++;
            rl.write(`C'est pas compliqué d'entrer un nombre plus petit quand même! Recommence${os.EOL}`);
            requestMax()
        } else if (nbOfTries === 3) {
            nbOfTries = 0;
            startGame();
        }
        currentMin = parseInt(aws)
        startGame();
    });
}

const startGame = () => {
    rl.write(`Pensez à un nombre entre ${currentMin} et ${currentMax}.Je vais le deviner!${os.EOL}Si votre nombre est supérieur entrez +, s'il est inférieur entrez -, si j'ai trouvé votre nombre entrez gg${os.EOL}`);
    submitANumber()
}


const submitANumber = () => {
    const nb = getNewProposition(currentMin, currentMax)
    verifyCurrentNumber(nb);
}

const verifyCurrentNumber = (nb) => {
    rl.question(`Ce nombre est-il ${nb}?`, (aws) => {
        switch(aws) {
            case '+':
                currentMin = nb
                break;
            case '-':
                currentMax = nb
                break;
            case 'gg':
                return rl.write(`${os.EOL}J'ai gagné! Le nombre mystère était ${nb}!`);
            default:
                verifyCurrentNumber(nb);

        }
        submitANumber();
    });
}

const getNewProposition = (min, max) => {
    return Math.floor((max + min) / 2);
};

requestMax();
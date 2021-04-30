const App = {
    colors: ["red", "green", "blue", "yellow"],
    sequence: [],
    endScore: 0,
    startButton: window.document.getElementById("go"),
    messageBox: document.getElementById("message"),
    playground: window.document.getElementById("playground"),

    drawCells() {
        App.playground = document.getElementById("playground");
        for (const color of App.colors) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = color;
            cell.style.backgroundColor = color;
            App.playground.appendChild(cell);
        }
    },

    newGame() {
        App.resetGame();
        App.startButton.style.display = "none";
        for (let index = 0; index < 3; index++) {
            App.addColorToSequence();
        }
        // start the "Simon Says" sequence
        App.simonSays(App.sequence);
    },

    resetGame() {
        App.endScore = 0;
        App.sequence = [];
    },

    addColorToSequence() {
        let random = Math.floor(Math.random() * 4);
        App.sequence.push(App.colors[random]);
    },

    simonSays(sequence) {
        if (sequence && sequence.length) {
            // after 500ms, bump the first cell
            setTimeout(App.bumpCell, 500, sequence[0]);
            // plays the rest of the sequence after a longer pause
            setTimeout(App.simonSays, 850, sequence.slice(1));
        } else {
            App.playerRepeat();
        }
    },

    playerRepeat() {
        let indiceInSeq = 0;
        let currentColor = App.sequence[indiceInSeq];
        App.playground.addEventListener("click", (event) => {
            App.verifyPlayerSequence(event, currentColor);
        });
    },

    verifyPlayerSequence(event, currentColor) {
        // console.log('Réponse attendue', currentColor);
        // console.log('Réponse utilisateur', event.target.id);
        let clickedBox = event.target.id;
        App.bumpCell(clickedBox);
        if (currentColor === clickedBox) {
            App.playerRepeat();
        } else {
            console.log("Loose");
            App.showMessage(`Perdu! ${App.endScore}`);
        }
    },

    init() {
        console.log("Initialisation OK");
        App.drawCells();
        App.startButton.addEventListener("click", App.newGame);
    },
};

App.init("");

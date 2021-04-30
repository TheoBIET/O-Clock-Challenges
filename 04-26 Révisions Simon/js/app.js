const app = {
    colors: ['red','green','blue','yellow'],
    // this var will contain the sequence said by Simon
    sequence: [],
    endScore: 0,
    playerIndice: 0,
    indiceInSeq: 0,
    startButton: window.document.getElementById('go'),
    messageBox: document.getElementById('message'),
    playground: window.document.getElementById('playground'),
    beep: new Audio('../beep.mp3'),    

    newGame:() => {
        app.resetGame()
        app.startButton.style.display = 'none';
        for (let index = 0; index < 3; index++) {
            app.addColorToSequence()
        }
        // start the "Simon Says" sequence
        app.simonSays(app.sequence);
    },

    resetGame:() => {
        app.hideMessage()
        app.sequence = [];
        app.endScore = 0;
    },

    addColorToSequence:() => {
        let random = Math.floor(Math.random()*4);
        app.sequence.push(app.colors[random]);
    },

    drawCells: () => {
        app.playground = document.getElementById('playground');
        for (const color of app.colors) {
          let cell = document.createElement('div');
          cell.className = 'cell';
          cell.id = color;
          cell.style.backgroundColor = color;
          app.playground.appendChild(cell);
        }
      },
    
      bumpCell: (color) => {
        app.beep.play();
        // let's modify the syle directly
        document.getElementById(color).style.transition = '.3s ease-in-out';
        document.getElementById(color).style.transform = 'scale(0.8)';
        // and reset the same style, after a small pause (150 ms)
        setTimeout( () => {
          document.getElementById(color).style.transform = 'scale(1)';
        }, 150);
    
    
    },

    simonSays: (sequence) => {
        if (sequence && sequence.length) {
          // after 500ms, bump the first cell
          setTimeout( app.bumpCell, 500, sequence[0] );
          // plays the rest of the sequence after a longer pause
          setTimeout( app.simonSays, 850, sequence.slice(1));
        }else {
            app.playerRepeat();
        }
    },

    playerRepeat() {
        app.playground.addEventListener("click", handler = (event) => {
            app.verifyPlayerSequence(event,  app.sequence[app.indiceInSeq]);
        }, false);
    },

    verifyPlayerSequence(event, currentColor) {
        app.indiceInSeq++;
        let clickedBox = event.target.id;
        app.bumpCell(clickedBox);
        if (currentColor !== clickedBox) app.showMessage(`Partie terminée avec ${app.endScore} points!`);
        else if(currentColor === 'playground') return;
        else if(app.indiceInSeq === app.sequence.length) app.newSequence();
    },

    newSequence() {
        app.endScore++;
        app.playground.removeEventListener('click', handler);   
        app.indiceInSeq = 0;
        app.addColorToSequence();
        app.simonSays(app.sequence);
    },

    showMessage: (message) => {
        app.messageBox.innerHTML = message;
        app.messageBox.style.display = 'block';
        app.startButton.style.display = 'block';
        app.startButton.textContent = 'Rejouer!'
    },
    
    hideMessage: () => {
    app.messageBox.style.display = 'none';
    app.startButton.style.display = 'block';
    },


    init:() => {
        console.log('Partie Lancée');
        app.drawCells();
        app.startButton.addEventListener('click', app.newGame);
    },

}

app.init()
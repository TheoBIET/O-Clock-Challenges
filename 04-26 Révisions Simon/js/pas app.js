const app = {
  // just a utility var to remember all the colors
  colors: ['red','green','blue','yellow'],

  // this var will contain the sequence said by Simon
  sequence: [],

  endScore: 0,

  startButton: null,

  messageBox: null,

  playground: null,

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
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '45px';
    // and reset the same style, after a small pause (150 ms)
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);

  },

  newGame: () => {
    // start by reseting the sequence 
    app.sequence = [];
    app.endScore = 0;
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random()*4);
      // add the corresponding color to the sequence
      app.sequence.push( app.colors[random] );
    }

    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
  },

  showMessage: (message) => {
    app.messageBox.innerHTML = message;
    app.messageBox.style.display = 'block';
    app.startButton.style.display = 'none';
  },

  hideMessage: () => {
    app.messageBox.style.display = 'none';
    app.startButton.style.display = 'block';
  },

  simonSays: (sequence) => {
    if (sequence && sequence.length) {
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    }
    app.playerRepeat(sequence);
},

  playerRepeat: () => {
    let indice = 0;
    app.playground.addEventListener('click', () => {
      app.verifyPlayerSequence()
    })
},

  verifyPlayerSequence: (event) => {
    console.log(event.target);
    let clickedBox = event.target.id;
    if(sequence[indice] === clickedBox) {
      app.playerRepeat();
    } else {
      app.showMessage()
    }
  },


  init () {
    console.log('init');
    app.drawCells();

    app.startButton = document.getElementById('go');
    app.messageBox = document.getElementById("message");

    // listen click on the "go" button
    app.startButton.addEventListener('click', app.newGame);
  },
};

window.onload = () => {
  app.init()
}
// premier param : l'événement à écouter (click, une touche du clavuer, ou le DOM chargé en entier)
// deuxième param : la fonction ç appeler lorsque l'évènement aura lieu (ATTENTION: ne pas mettre les paranthèses, c'est une fonction de vallback qui sera appelé par la méthode addEventListener)

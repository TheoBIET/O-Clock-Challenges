// Récupération du plateau de jeu
let board = document.getElementById("player");

// Récupération du formulaire
let form = document.getElementById('form');
let input = document.getElementById('input');

const rollRandomDice = (nb = 1) => {
   for (i = 0; i < nb; i++) {
      const randomNumber = Math.floor(Math.random() * (6 - 1) ) + 1;
      const dice = document.createElement('div');
      const backgroundSize = 100;
      const backgroundPositionValue = backgroundSize - (backgroundSize*randomNumber);
      dice.className = 'dice';
      dice.style.animation = "roll 2s infinite";
      dice.style.backgroundPosition = `${backgroundPositionValue}px`;
      board.appendChild(dice);
   };
};

form.addEventListener('submit', (e) => {
   board.textContent = '';
   e.preventDefault();
   rollRandomDice(input.value);
});
// Configuration générale du jeu
let Game = {
   minNumber: 0,
   maxNumber: 100,
   maxTries : Infinity,
   // Sauvegarde des données utilisateur dans un sous-objet
   userScoreboard : {},
   // Génération d'un nombre aléatoire dans un interval de nombres
   getRandomNumberBetween() {
      return (Math.round(Math.random() * (this.maxNumber - this.minNumber)) + this.minNumber);
   },
   playGame() {
      let numberOfGames = 1;
      let numberToGuess = this.getRandomNumberBetween()
      console.log(numberToGuess);
      let numberOfUserTries = 1;
      // Stockage des éléments du DOM
      let logsContainer = document.querySelector(".container__logs");
      let scoreboardContainer = document.getElementById('scoreboard');
      let scoreboardModal = document.getElementById('scoreboard__modal');
      const scoreboardButton = document.getElementById('scoreboard-btn');
      const userInput = document.getElementById('form__input');
      const form = document.getElementById('form');
      const historyText = document.querySelector("#history");
      const intructionsText = document.querySelector("#instructions");
      const formBtn = document.querySelector("#form__btn");
      // Modification du DOM selon l'état actuel de la partie
      const modifyDOM = (isNewGame) => {
         if (isNewGame) {
            userInput.disabled = false;
            intructionsText.innerHTML = `Trouve le nombre entre 0 et 100!`
            historyText.textContent = 'Historique'
            formBtn.style.display = 'inline'
            logsContainer = document.querySelector(".container__logs");
            logsContainer.className = 'container__logs'
            document.querySelector("#restart-button").remove()
         } else {
            insertNewGameInUserScoreboard()
            // On actualise les informations du tableau des scores avec la nouvelle data
            updateScoreboard();
            userInput.disabled = true;
            intructionsText.innerHTML = `Félicitations, <br> Tu as trouvé le Juste Prix en ${numberOfUserTries} essai(s)!`
            historyText.textContent = 'Cliquez sur le bouton ci-dessous pour relancer une partie'
            formBtn.style.display = 'none'
            logsContainer.outerHTML = `
            <div class=" --reload container__logs">
               <div id="restart-button" style="display:flex">↻</div>
            </div>
            `
         };
      };
      // Vérification du nombre entré par l'utilisateur
      const verifyNumber = userNumber => {
         // Création d'une pop-up à chaque action de jeu
         let logs = document.createElement('div');
         if (userNumber > numberToGuess) {
            logs.textContent = `#${numberOfUserTries} Le juste prix est inférieur à ${userNumber}!`;
            logs.className = 'moins';
            logsContainer.prepend(logs);
            userInput.value = '';
         } else if (userNumber < numberToGuess) {
            logs.textContent = `#${numberOfUserTries} Le juste prix est supérieur à ${userNumber}!`;
            logs.className = 'plus';
            logsContainer.prepend(logs);
            userInput.value = '';
         } else {
            // On modifie les éléments du DOM pour afficher le message de félicitations et le button pour relancer
            modifyDOM(false);
            document.querySelector("#restart-button").addEventListener('click', () => {
               // Si l'utilisateur relance on modifie les éléments du DOM pour créer un nouveau template de jeu
               modifyDOM(true);
               userInput.value = '';
               numberOfUserTries = 1;
               numberToGuess = this.getRandomNumberBetween()
            });
         };
         numberOfUserTries++;
      };
      // Envoi dans la fonction verify() du chiffre entrée par l'utilisateur à l'envoi du formulaire
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         let userLastNumber = parseInt(userInput.value, 10);
         if (isNaN(userLastNumber)) {
            userInput.style.borderColor = "red";
         } else {
            verifyNumber(userLastNumber)
            userInput.style.borderColor = '#09C3A7';
         };
      });
      // Ajout d'une entrée dans l'objet avec les informations de la partie une fois terminée
      const insertNewGameInUserScoreboard = () => {
         this.userScoreboard[numberOfGames] = {
            gameNumber : numberOfGames,
            numberOfTries : numberOfUserTries,
            numberGuessed : numberToGuess,
         };
         numberOfGames++;
      };
      // Mise à jour du tableau des scores à chaque nouvelle partie
      const updateScoreboard = () => {
         const datas = Object.values(Game.userScoreboard);
         const data = datas[datas.length - 1]
         let scoreList = document.createElement('ul');
         scoreList.innerHTML = `
            <li>Partie n°${data.gameNumber}</li>
            <li>Juste Prix : ${data.numberGuessed}</li>
            <li>Nombre d'essais : ${data.numberOfTries}</li>`;
         scoreboardModal.append(scoreList);
      };
      // Fermeture du tableau des scores
      scoreboardContainer.addEventListener('click', () => {
         scoreboardContainer.style.display = 'none';
      });
      // Ouverture du tableau des scores
      scoreboardButton.addEventListener('click', () => {
         scoreboardContainer.style.display = 'block';
      });
   }
};
// Lancement de la partie
Game.playGame()

/*
⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆ 
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿ 
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀ 
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉
*/
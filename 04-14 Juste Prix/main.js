const randomNumber = Math.floor(Math.random() * 101);
let lastEntry;
console.log(randomNumber);

while (lastEntry !== randomNumber) {
   let lastEntry = parseInt(prompt("Trouver le nombre mystère caché entre 1 et 100"));
   if (randomNumber > lastEntry) {
      alert('Le nombre est plus petit');
   }else if (randomNumber < lastEntry) {
      alert('Le nombre est plus grand');
   }else {
      alert('Bien joué, vous avez gagné!')
   };
};
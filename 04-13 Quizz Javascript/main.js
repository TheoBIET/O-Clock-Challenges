let Questions = {
   1: {
      question: "Quelle mer borde la ville de Sébastopol ?",
      answer: "La mer Noire",
      QCM: ["La mer Égée", "La mer Rouge"],
   },
   2 : {
      question : 'Quel est l\'âge du Capitaine ?',
      answer : '63 ans',
      QCM : ['89 ans','74 ans']
   },
};

let currentQuestion = 1;
let numberOfQuestion = Object.keys(Questions).length;
let choices = document.getElementsByClassName("qcm");
let score = 0;

let question = Questions[currentQuestion].question;
let answer = Questions[currentQuestion].answer;
let otherAnwser = Questions[currentQuestion].QCM;

let quizzContainer = document.getElementById('quizz-container');
let goodAlert = document.getElementById('true');
let wrongAlert = document.getElementById('false');
let nextBtn = document.getElementById('btn-next');

UpdateQuestions = () => {
   goodAlert.style.display = 'none';
   wrongAlert.style.display = 'none';
   nextBtn.style.display = 'none';
   if (currentQuestion > numberOfQuestion) {
      quizzContainer.textContent = `Le quizz est terminé! Vous avez obtenu un score de ${score}/${numberOfQuestion}`;
   } else {
      question = Questions[currentQuestion].question;
      answer = Questions[currentQuestion].answer;
      otherAnwser = Questions[currentQuestion].QCM;
      ShowQuestions();
   };
};

ShowQuestions = () => {
   document.getElementById("question").textContent = question;
   document.getElementById("question-number").textContent = `Question ${currentQuestion}/${numberOfQuestion}`;
   document.getElementById("score").textContent = `Score : ${score}/${numberOfQuestion}`;
   
   let avalaibleIndex = [0, 1, 2];
   let randomIndex = Math.floor(Math.random() * 3);
   avalaibleIndex.splice(randomIndex, 1);
   choices[randomIndex].textContent = answer;
   choices[avalaibleIndex[0]].textContent = otherAnwser[0];
   choices[avalaibleIndex[1]].textContent = otherAnwser[1];
};

VerifyAnswer = (r) => {
   if (r === answer) {
      goodAlert.style.display = 'block';
      goodAlert.textContent = `Bonne réponse, il s\'agissait bien de : ${answer}`;
      score++;
   } else {
      wrongAlert.style.display = 'block';
      wrongAlert.textContent = `Mauvaise réponse! La réponse attendue était : ${answer}`;
   }
   nextBtn.style.display = 'block';
   currentQuestion ++;
};

ShowQuestions();

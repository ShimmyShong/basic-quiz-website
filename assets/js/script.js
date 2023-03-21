var objectQuestionAnswer = [
    {
    question: 'What is the tallest mountain in the world?',    
    answerPool: ['Mount Everest', 'Mount Kilimanjaro', 'Mount Fuji', 'Mount McKinley'],
    correctAnswerIndex: 0,
    },
    {
    question: 'What is the largest ocean in the world?',
    answerPool: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswerIndex: 3,
    },
    {
    question: 'Who painted the famous artwork "The Starry Night"?',
    answerPool: ['Claude Monet', 'Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci'],
    correctAnswerIndex: 2,
    },
    {
    question: 'What is the currency of Japan?',
    answerPool: ['Yuan', 'Yen', 'Dollar', 'Euro'],
    correctAnswerIndex: 1,
    },
    {
    question: 'What is the capital city of Brazil?',
    answerPool: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Belo Horizonte'],
    correctAnswerIndex: 2,
    },
    {
    question: 'What is the largest animal in the world?',
    answerPool: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswerIndex: 1,
    },
    {
    question: 'What is the highest grossing movie of all time?',
    answerPool: ['Avatar', 'Avengers: Endgame', 'Titanic', 'Star Wars: The Force Awakens'],
    correctAnswerIndex: 1,
    },
    {
    question: 'Who is the author of the "Harry Potter" series?',
    answerPool: ['J.K. Rowling', 'Stephen King', 'Dan Brown', 'George R.R. Martin'],
    correctAnswerIndex: 0,
    },
    {
    question: 'What is the largest country by land area?',
    answerPool: ['Russia', 'Canada', 'China', 'United States'],
    correctAnswerIndex: 0,
    },
    {
    question: 'What is the smallest planet in our solar system?',
    answerPool: ['Mars', 'Venus', 'Mercury', 'Neptune'],
    correctAnswerIndex: 2,
  },
];

var randomlyGeneratedArray = [];
var usedQuestionsArray = [];

var cards = document.querySelectorAll(".card");
var container = document.querySelector("#container");
var questionEl = document.querySelector('#questionText');
var accurateEl = document.querySelector('#accurate');
var timeEl = document.querySelector('#timer');
var timerInput = document.querySelector('#timer-input');
var buttonEl = document.querySelector('#button');
var button2El = document.querySelector('#button2');
var firstScreenEl = document.querySelector('#first-screen');
var secondScreenEl = document.querySelector('#second-screen');
var nameInputEl = document.querySelector('#name-input');
var currentQuestionIndex = 0;
var randomIndex = 0;
var userScore = 0;

secondScreenEl.setAttribute('style', 'display: none');
container.setAttribute("style", "display: none"); // TODO might want to set these ids to be display: none in the CSS
var timerInverval;
var time = 0;
var timeUsed = 0;
var timeCap = 10;
var correctAnswers = 0;
var nameInput = '';

function chooseRandomIndex(){
    randomIndex = Math.floor(Math.random() * objectQuestionAnswer[0].answerPool.length);
}

function chooseRandomAnswer(){
    randomlyGeneratedArray = []; // important to empty the array at the beginning so that it is different each time this function is called
    while(randomlyGeneratedArray.length < 4){
        chooseRandomIndex();
        if(randomlyGeneratedArray.includes(randomIndex)){
            continue;
        }
        else{
            randomlyGeneratedArray.push(randomIndex);
        }
    }
    return randomlyGeneratedArray;
}

function chooseRandomQuestion(){
    currentQuestionIndex = Math.floor(Math.random() * objectQuestionAnswer.length);
    return currentQuestionIndex;
}

function generateQuestionsAndAnswers(){
    chooseRandomQuestion();
    var answerPool = objectQuestionAnswer[currentQuestionIndex].answerPool;
    if (usedQuestionsArray.length == objectQuestionAnswer.length){ // conditions for when to end the game
        endGame();
    }
    else if (usedQuestionsArray.includes(currentQuestionIndex)){ // recalls function if question was already answered
        generateQuestionsAndAnswers();
    }
    else{ // adds questions and answers
        for (var i = 0; i < cards.length; i++){
            chooseRandomAnswer(); // adds the answers to each button
            for (var n = 0; n < randomlyGeneratedArray.length; n++){ 
                cards[n].textContent = answerPool[randomlyGeneratedArray[n]]; // randomlyGeneratedArray[n]
                questionEl.textContent = objectQuestionAnswer[currentQuestionIndex].question;
            }
        }
        usedQuestionsArray.push(currentQuestionIndex); // adds current current question index to an array
    }
    return currentQuestionIndex;
}

function endGame(){
    console.log("used up all questions");
    timeEl.setAttribute("style", "display: none");
    container.setAttribute("style", "display: none");
    console.log(userScore);
    secondScreenEl.setAttribute('style', 'display: block');
    button2El.addEventListener('click', function() {
        getName();
        saveScore();
    });
}

function answerClick(){
    cards.forEach(card =>{
        card.addEventListener("click", () =>{
            clickedAnswerIndex = Array.from(cards).indexOf(card); // when using querySelectorAll, this is how you would identify which of the elements were being clicked on
            var correctAnswerIndex = objectQuestionAnswer[currentQuestionIndex].correctAnswerIndex;
            var currentCorrectAnswer = objectQuestionAnswer[currentQuestionIndex].answerPool[correctAnswerIndex];
            if (cards[clickedAnswerIndex].textContent == currentCorrectAnswer){
                console.log("correct!");
                accurateEl.setAttribute('style', 'color: green');
                accurateEl.textContent = "Correct!";
                correctAnswers++;
            }
            else{
                console.log("incorrect");
                accurateEl.setAttribute('style', 'color: red');
                accurateEl.textContent = "Wrong!"
                time -= 5;
            }
            generateQuestionsAndAnswers();
        });
    });
}

function setTime(){
    if (time < 0){ // ensures the timer is more than 0 when submitting
        return;
    }
    else{
        timeEl.setAttribute("style", "display: block");
        var timerInterval = setInterval(function(){
            timeEl.textContent = "Time left: " + time;
            time--;
            timeUsed++;
            if (time < 0){
                endGame();
                clearInterval(timerInterval);
            }
        }, 1000);
    }

}

function submitTimer(){
    time = timerInput.value;
    console.log(time);
    setTime();
    initQuiz();
    return time;
}

buttonEl.addEventListener('click', submitTimer);

function initQuiz(){
    firstScreenEl.setAttribute('style', 'display: none');
    container.setAttribute('style', 'display: block');
    generateQuestionsAndAnswers();
    answerClick();
}

function calculateScore(){
    userScore = (correctAnswers * 100) - (timeUsed * 10);
    return userScore;
}

function getName(){
    nameInput = nameInputEl.value.trim();
    console.log(nameInputEl.value);
    console.log(nameInput);
    return nameInput;
}


function saveScore(){
    calculateScore();
    getName();
    newScore = {
        score: userScore
    };
    newName = {
        name: nameInput
    };
    console.log(newName.name);
    var localStorageHighScores = JSON.parse(localStorage.getItem("localStorageHighScores")) || [];
    var localStorageNames = JSON.parse(localStorage.getItem("localStorageNames")) || [];

    console.log(localStorageHighScores);
    console.log(localStorageNames);

    localStorageHighScores.push(newScore);
    localStorageNames.push(newName);

    localStorage.setItem("localStorageHighScores", JSON.stringify(localStorageHighScores));
    localStorage.setItem("localStorageNames", JSON.stringify(localStorageNames));

    location.href = 'highscores.html'; // TODO make sure this runs AFTER everything else happens
}


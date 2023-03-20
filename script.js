var objectQuestionAnswer = [
    {
        question: 'Which planet is closest to the sun?',
        answerPool: ['Venus', 'correct', 'Mars', 'Jupiter'],
        correctAnswerIndex: 1
    },
    {
        question: 'What is the smallest country in the world by land area?',
        answerPool: ['Monaco', 'correct', 'San Marino', 'Liechtenstein'],
        correctAnswerIndex: 1
    },
    {
        question: 'Who is the founder of Microsoft?',
        answerPool: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg', 'correct'],
        correctAnswerIndex: 3
    },
    {
        question: 'What is the capital city of Canada?',
        answerPool: ['correct', 'Vancouver', 'Ottawa', 'Montreal'],
        correctAnswerIndex: 0
    },
    {
        question: 'question5',
        answerPool: ['answer1', 'answer2', 'answer3', 'correct'],
        correctAnswerIndex: 3
    },
    {
        question: 'question6',
        answerPool: ['answasdasder1', 'ans123123213wer2', 'correct', 'ansdsw3qqweqw123413wer4'],
        correctAnswerIndex: 2
    },
    {
        question: 'question7',
        answerPool: ['answasdaser1', 'ansas4788dwer2', 'answedsar3', 'correct'],
        correctAnswerIndex: 3
    },
    {
        question: 'question8',
        answerPool: ['correct', 'ansp[]p[]asdwer2', 'answedsar3', 'anssdsawer4'],
        correctAnswerIndex: 0
    },
    {
        question: 'question9',
        answerPool: ['answasdaser1', 'ansaqwesdwer2', 'an231fvswedsar3', 'correct'],
        correctAnswerIndex: 3
    },
    {
        question: 'question10',
        answerPool: ['ansasdaswasdaser1', 'correct', 'answedsaqwer3', 'ans3sdsawer4'],
        correctAnswerIndex: 1
    },
]

var randomlyGeneratedArray = [];
var usedQuestionsArray = [];

var cards = document.querySelectorAll(".card");
var container = document.querySelector("#container");
var questionEl = document.querySelector('#questionText');
var accurateEl = document.querySelector('#accurate');
var timeEl = document.querySelector('#timer');
var timerInput = document.querySelector('#timer-input');
var buttonEl = document.querySelector('#button');
var firstScreenEl = document.querySelector('#first-screen');
var currentQuestionIndex = 0;
var randomIndex = 0;

container.setAttribute("style", "display: none"); // TODO might want to set these ids to be display: none in the CSS
var timerInverval;
var time = 0;
var timeCap = 10;
var correctAnswers = 0;

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
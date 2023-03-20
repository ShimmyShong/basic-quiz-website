var objectQuestionAnswer = [
    {
        question: 'Which planet is closest to the sun?',
        answerPool: ['Venus', 'Mercury', 'Mars', 'Jupiter'],
        correctAnswerIndex: 2
    },
    {
        question: 'What is the smallest country in the world by land area?',
        answerPool: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        correctAnswerIndex: 0
    },
    {
        question: 'Who is the founder of Microsoft?',
        answerPool: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg', 'Jeff Bezos'],
        correctAnswerIndex: 1
    },
    {
        question: 'What is the capital city of Canada?',
        answerPool: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
        correctAnswerIndex: 3
    },
    {
        question: 'question6',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 3
    },
    {
        question: 'question7',
        answerPool: ['answasdasder1', 'ans123123213wer2', 'aasdnswer3', 'ansdsw3qqweqw123413wer4'],
        correctAnswerIndex: 3
    },
    {
        question: 'question8',
        answerPool: ['answasdaser1', 'ansasdwer2', 'answedsar3', 'anssdsawer4'],
        correctAnswerIndex: 3
    },
]

var randomlyGeneratedArray = [];
var usedQuestionsArray = [];

var cards = document.querySelectorAll(".card");
var container = document.querySelector("#container");
var questionEl = document.querySelector('#questionText');
var randomIndex = 0;

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
    console.log(randomlyGeneratedArray);
    return randomlyGeneratedArray;
}

function chooseRandomQuestion(){
    randomIndex = Math.floor(Math.random() * objectQuestionAnswer.length);
    return randomIndex;
}


function generateQuestionsAndAnswers(){
    var currentQuestionIndex = chooseRandomQuestion(); // this represents the question number
    var answerPool = objectQuestionAnswer[currentQuestionIndex].answerPool;
    if (usedQuestionsArray.length == objectQuestionAnswer.length){ // ends game when all questions are answered
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
        usedQuestionsArray.push(currentQuestionIndex);
    }

    console.log(currentQuestionIndex);
    console.log(usedQuestionsArray);
}

function endGame(){
    console.log("used up all questions");
}

function answerClick(){
    for(var i = 0; i < cards.length; i++){
        cards[i].addEventListener("click", function(){
            generateQuestionsAndAnswers();
        })
    }
}

generateQuestionsAndAnswers();
answerClick();

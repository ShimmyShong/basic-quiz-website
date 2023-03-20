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
        answerPool: ['answasdaser1', 'ansaqwesdwer2', 'an231fvswedsar3', 'anssdqsawer4'],
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
var currentQuestionIndex = 0;
var randomIndex = 0;

var timerInverval;
var time = 0;
var timeCap = 10;
var correctAnswers = 0;

// container.setAttribute("style", "display: none"); THIS will hide the questions and answers
// container.setAttribute("style", "display: block"); THIS will bring the questions and answers back

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
    // console.log(randomlyGeneratedArray);
    return randomlyGeneratedArray;
}

function chooseRandomQuestion(){
    currentQuestionIndex = Math.floor(Math.random() * objectQuestionAnswer.length);
    return currentQuestionIndex;
}

// TODO the currentQuestionIndex changes for no reason??????
function generateQuestionsAndAnswers(){
    // currentQuestionIndex = chooseRandomQuestion(); // this represents the question number
    chooseRandomQuestion();
    console.log("current question index: " + currentQuestionIndex);
    var answerPool = objectQuestionAnswer[currentQuestionIndex].answerPool;
    if (usedQuestionsArray.length == objectQuestionAnswer.length){ // conditions for when to end the game // TODO make sure to add timer counting!!!
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
}

function answerClick(){
    cards.forEach(card =>{
        card.addEventListener("click", () =>{
            generateQuestionsAndAnswers();
            clickedAnswerIndex = Array.from(cards).indexOf(card); // when using querySelectorAll, this is how you would identify which of the elements were being clicked on
            console.log("current question index: " + currentQuestionIndex);
            // console.log("clicked answer index: " + clickedAnswerIndex);
            // console.log(cards[clickedAnswerIndex]);
            // console.log("correct answer Index of current question: " + objectQuestionAnswer[currentQuestionIndex].correctAnswerIndex);
            if (clickedAnswerIndex == objectQuestionAnswer[currentQuestionIndex].correctAnswerIndex){
                console.log("correct!");
            }
            
        });
    });
}

generateQuestionsAndAnswers();
answerClick();

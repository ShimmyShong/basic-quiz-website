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
        question: 'question5',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 3
    },
]

var randomlyGenerated = [];

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
    randomlyGenerated = []; // important to empty the array at the beginning so that it is different each time this function is called
    while(randomlyGenerated.length < 4){
        chooseRandomIndex();
        if(randomlyGenerated.includes(randomIndex)){
            continue;
        }
        else{
            randomlyGenerated.push(randomIndex);
        }
    }
    console.log(randomlyGenerated);
    return randomlyGenerated;
}

function chooseRandomQuestion(){
    randomIndex = Math.floor(Math.random(objectQuestionAnswer.length) * 4);
    return randomIndex;
}

function generateQuestions(){
    questionEl.textContent = objectQuestionAnswer[chooseRandomQuestion()].question;
}

// TODO when i click on the questions, new answers dont appear, fix this later
function generateAnswers(){
    var currentQuestionIndex = chooseRandomQuestion();
    var answerPool = objectQuestionAnswer[currentQuestionIndex].answerPool;
    for (var i = 0; i < cards.length; i++){
        chooseRandomAnswer();
        for (var n = 0; n < randomlyGenerated.length; n++){ 
            cards[n].textContent = objectQuestionAnswer[i].answerPool[randomlyGenerated[n]]; // randomlyGenerated[n]
            console.log(i);
        }
    }
    answerClick();
}


function answerClick(){
    cards.forEach((card) => {
        card.addEventListener("click", function(){
            generateAnswers();
            generateQuestions();
        })
    })
}

generateAnswers();
generateQuestions();

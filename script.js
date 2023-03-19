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

function chooseRandomIndex(){
    randomIndex = Math.floor(Math.random(objectQuestionAnswer[0].answerPool.length) * 4);
    return randomIndex;
}

// TODO sometimes only 3 elements are given in the array, fix this later
function chooseRandomAnswer(){
    while(randomlyGenerated.length < 4){
        chooseRandomIndex();
        if(randomlyGenerated.includes(randomIndex)){
            break;
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
    randomlyGenerated = chooseRandomAnswer();
    for (var i = 0; i < cards.length; i++){
        for (var n = 0; n < randomlyGenerated.length; n++){ 
            chooseRandomAnswer();
            cards[n].textContent = objectQuestionAnswer[chooseRandomIndex()].answerPool[randomlyGenerated[n]];
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


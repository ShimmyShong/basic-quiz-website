// var answerPool = [
//     'Something is ammuck',
//     'i cannot beleive this is happn',
//     'test2'
// ]
// var questionPool = [
//     'question1',
//     'question2',
//     'question3',
//     'question4'
// ]

var objectQuestionAnswer = [
    {
        question: 'question1',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 2
    },
    {
        question: 'question2',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 0
    },
    {
        question: 'question3',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 1
    },
    {
        question: 'question4',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 3
    },
    {
        question: 'question5',
        answerPool: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswerIndex: 3
    },
]

var cards = document.querySelectorAll(".card");
var container = document.querySelector("#container");
var questionEl = document.querySelector('#questionText');
var randomIndex = 0;

function chooseRandom(){
    // randomIndex = Math.floor(Math.random(answerPool.length) * 3);
    randomIndex = Math.floor(Math.random(4) * 3);
    return randomIndex;
}

function generateQuestions(){
    questionEl.textContent = objectQuestionAnswer[chooseRandom()].question;
}

function generateAnswers(){
    cards.forEach((card) => {
        for(i = 0; i < cards.length; i++){
            card.textContent = objectQuestionAnswer[chooseRandom()].answerPool[chooseRandom()]
        }
    })
    answerClick();
}


function answerClick(){
    cards.forEach((card) => {
        card.addEventListener("click", function() {
            card.textContent = objectQuestionAnswer.answerPool[chooseRandom()]
        })
    })
}

generateAnswers();
generateQuestions();



// container.addEventListener("click", function(){
//     generateAnswers();
//     generateQuestions();
// })

console.log(objectQuestionAnswer[0].answerPool[2]);
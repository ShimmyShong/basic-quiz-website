

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

var randomlyGenerated = [];

var cards = document.querySelectorAll(".card");
var container = document.querySelector("#container");
var questionEl = document.querySelector('#questionText');
var randomIndex = 0;

function chooseRandomAnswer(){
    randomIndex = Math.floor(Math.random(objectQuestionAnswer[0].answerPool.length) * 4);
    while(randomlyGenerated.length < 4){
        if(randomlyGenerated.includes(randomIndex)){
            break;
        }
        else{
            randomlyGenerated = randomlyGenerated.concat(randomIndex);
        }
    }
    console.log(randomlyGenerated);
    return randomIndex;
}

function chooseRandomQuestion(){
    randomIndex = Math.floor(Math.random(objectQuestionAnswer.length) * 4);
    return randomIndex;
}

function generateQuestions(){
    questionEl.textContent = objectQuestionAnswer[chooseRandomQuestion()].question;
}

function generateAnswers(){
    cards.forEach((card) => {
        for(i = 0; i < cards.length; i++){
            card.textContent = objectQuestionAnswer[chooseRandomAnswer()].answerPool[chooseRandomAnswer()];
        }
    })
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



// container.addEventListener("click", function(){
//     generateAnswers();
//     generateQuestions();
// })

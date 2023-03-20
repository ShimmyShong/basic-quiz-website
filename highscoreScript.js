var highScoresOlEl = document.querySelector('#highscores-ol');
var nameInputEl = document.querySelector('#name-input');
var buttonEl = document.querySelector('#button');

function submitName(){
    nameInput = nameInputEl.value.trim();
    if(!nameInput){
        return;
    }
    console.log(nameInput);
    // var localStorageHighScores = JSON.parse(localStorage.getItem('localStorageHighScores')) || [];
    return nameInput;
}
submitName();
buttonEl.addEventListener('click', submitName);


function displayHighScores(){
    var localStorageHighScores = JSON.parse(localStorage.getItem('score')) || [];

    const sortedScores = localStorageHighScores.sort(sortHighToLow);

    for(var i = 0; i < sortedScores.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = sortedScores[i].name + ": " + sortedScores[i].score + "Points!"
        liEl.classList.add("text-light", 'h4');
        highScoresOlEl.appendChild(liEl);
    }

};

function sortHighToLow (obj1, obj2){
    return obj1.score - obj2.score;
}

displayHighScores();
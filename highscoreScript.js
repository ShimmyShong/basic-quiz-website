var highScoresOlEl = document.querySelector('#highscores-ol');
var nameInputEl = document.querySelector('#name-input');
var buttonEl = document.querySelector('#button');



function displayHighScores(){
    var localStorageHighScores = JSON.parse(localStorage.getItem('localStorageHighScores')) || [];
    var localStorageNames = JSON.parse(localStorage.getItem("localStorageNames")) || [];

    console.log(localStorageHighScores)
    console.log(localStorageNames);

    const sortedScores = localStorageHighScores.sort(sortHighToLow);

    for(var i = 0; i < sortedScores.length; i++){
        var scoreIndex = localStorageHighScores.indexOf(sortedScores[i]);
        var name = localStorageNames[scoreIndex].name;
        var liEl = document.createElement('li');
        liEl.textContent = name + ": " + sortedScores[i].score + " Points!"
        liEl.classList.add("text-light");
        highScoresOlEl.appendChild(liEl);
    }

};

function sortHighToLow (obj1, obj2){
    return obj2.score - obj1.score;
}

displayHighScores();
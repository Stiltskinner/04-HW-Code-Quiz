// -- It will need to open with header text 'Coding Quiz Challenge' and p text describing the challenge, a start button, visible timer in the top-right, and view highscores in the top left -->

// <!-- It will need an event listener to look for a click on the start button element. That event listener will need to hide all of the starter text and start button and then display -question text and -4 buttons with answer choices in a list -->

// <!-- When any answer choice is clicked it will need to replace the question text and replace all of the text for answer choices. When an incorrect choice is clicked, it will need to subtract 10 seconds from the timer. If the correct answer is chosen, the following question should display the text "correct" below the answer choices, otherwise it should display "wrong"-->

// <!-- When the last question is answered OR the timer gets to 0, it will need to hide all question text and answer choices. It will need to display 'Quiz Complete'. It will need to display the score inside of the text "Your final score is ". It will need to prompt the user to complete a form with their initials. It will need a button to submit the form -->

// <!-- When the user submits the form, it will need to add the initials and the high score into a new  variable. This new variable should get added into a separate variable that contains all high scores. The all high scores variable will need to be stringified and saved to local storage, and the application should pull allhighscores from local storage to display to a list of high scores. -->

// <!-- There needs to be a clear high scores button that clears the local storage. There needs to be a play again button that returns to the quiz start page

// Variables

// Variables for sections of the document that need to be modified by JS
var timeDisplay = document.getElementById("viewtimer");
var viewScore = document.getElementById("viewscore");
var quizIntro = document.getElementById("quiz-intro");
var startButton = document.getElementById("start-button");
var quizQuestion = document.getElementById("quiz-question");
var questionText = document.getElementById("question-text");
var quizAnswers = document.getElementById("quiz-answers");
var enterScore = document.getElementById("enter-score");
var submitButton = document.getElementById("submit");
var initials = document.getElementById("initials");
var yourFinalScore = document.getElementById("your-final-score")
var scoreDisplay = document.getElementById("score-display");
var scoreList = document.getElementById("score-list");
var playAgain = document.getElementById("play-again");
var clearScoresButton = document.getElementById("clear-scores-button");
var rightWrongDisplay = document.getElementById("right-wrong");
var correctAlert = document.getElementById("Correct");
var incorrectAlert = document.getElementById("Incorrect");
// questions contains the text of the question asked of the user in order of question number
var questions = ["What is Earth's Largest Continent?", "What is the smallest country in the world?", "Which country has the most natural lakes?", "What is the capital of Denmark?", "In which U.S. State would you find Big Bend National Park?"];
// allCorrectAnswer contains the correct answers in order of question number
var allCorrectAnswer = ["Asia","Vatican City", "Canada", "Copenhagen", "Texas"];
// allAnswers is an array of arrays, and each nested array contains the answer choices for one question. They are in order of question number.
var allAnswers = new Array ( );
allAnswers[0] = new Array ("Asia", "Africa", "North America", "Australia");
allAnswers[1] = new Array ("Vatican City", "Luxembourg", "Lesotho", "Denmark");
allAnswers[2] = new Array ("Canada", "Nigeria", "China", "North America");
allAnswers[3] = new Array ("Copenhagen", "The Hague", "Budapest", "Reykjavik");
allAnswers[4] = new Array ("Texas", "Utah", "Nevada", "California");
// questionNumber tracks which question the user is on. 
var questionNumber = 0;
var timeRemaining = 60;
// finalScore stores the score at the end of the quiz for the user to enter into the high score board
var finalScore = 0;
// This looks for a click inside the quiz-intro div. If it was a button, it hides that div. It then calls the function that populates the quiz with a question and answers.
var highScores = [];
var timerInterval;

function countDown() {
    if (timeRemaining > 1) {
        timeDisplay.textContent = "Time Remaining: " + timeRemaining + " seconds";
        timeRemaining--;
    }
    else if (timeRemaining === 1) {
        timeDisplay.textContent = "Time Remaining: " + timeRemaining + " second";
        timeRemaining--;
    }
    else {
        timeDisplay.textContent = "";
        var enterScoreStatus = enterScore.dataset.state;
        enterScore.setAttribute("class","shown");
        enterScoreStatus = "shown";
        quizQuestion.dataset.state = "hidden";
        quizQuestion.setAttribute("class", "hidden");
        rightWrongDisplay.setAttribute("class","hidden");
        quizAnswers.innerHTML = "";
        storeTime();
        showFinalScore();
        stopCountDown();
    }
}

function stopCountDown() {
    clearInterval(timerInterval);
    timeDisplay.textContent= "";
}

function startQuiz() {

        var introState = quizIntro.getAttribute("data-state");

        if (introState === "shown") {
            // This hides the intro text and start quiz buttons and sets the data state for this div to hidden
            var introStatus = quizIntro.dataset.state;
            quizIntro.setAttribute("class","hidden");
            introStatus = "hidden";
            // This shows the quiz question div and sets its data set to shown
            quizQuestion.dataset.state = "shown";
            quizQuestion.setAttribute("class", "shown");
            populateQuiz();
            timerInterval = setInterval(countDown, 1000);
        
    }
};

// This function should pull question text from the first object in the array. It should also pull answer choices from questionOneAnswers and populate each list item in a random order without repeating any choices.
function populateQuiz() {
    questionText.textContent = questions[questionNumber];
    shuffle(allAnswers[questionNumber]);
    quizAnswers.innerHTML = "";
    for (var i = 0; i < allAnswers[questionNumber].length; i++) {
        var randAnswer = allAnswers[questionNumber][i];
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = randAnswer;
        li.appendChild(button);
        quizAnswers.appendChild(li);
    }
}

// stores the timeRemaining at end of quiz
function storeTime() {
    finalScore=timeRemaining;
}

function answerChosen(event) {
    var element = event.target;
    var answertext = element.textContent;
    if (element.matches("button")) {
        rightWrongDisplay.setAttribute("class","shown");
        if (answertext === allCorrectAnswer[questionNumber]) {
            showRight();
            hideWrong();
            continueQuiz();
        }
        else {
            rightWrongDisplay.setAttribute("class","shown");
            timeRemaining = timeRemaining-10;
            timeDisplay.textContent = "Time Remaining " + timeRemaining + " seconds";
            showWrong();
            hideRight();
            continueQuiz();
        }
    }
};

// This function should clear the question text and insert text for the next question. It should shuffle the answers for question 2, clear the current answer choices, and then create new list items and buttons for the new answer choice.
function continueQuiz() {
    questionNumber++;
    // This checks for the user answering the last question in the quiz, hides the quiz if it was the last question, and shows the enter high score div
    if (questionNumber >= questions.length) {
            var enterScoreStatus = enterScore.dataset.state;
            enterScore.setAttribute("class","shown");
            enterScoreStatus = "shown";
            quizQuestion.dataset.state = "hidden";
            quizQuestion.setAttribute("class", "hidden");
            rightWrongDisplay.setAttribute("class","hidden");
            quizAnswers.innerHTML = "";
            storeTime();
            timeDisplay.textContent= "";
            stopCountDown();
            showFinalScore();
        }
        // This generates the next question and set of answer choices
    else {
        questionText.textContent = "";
        questionText.textContent = questions[questionNumber];
        shuffle(allAnswers[questionNumber]);
        quizAnswers.innerHTML = "";
        for (var i = 0; i < allAnswers[questionNumber].length; i++) {
            var randAnswer = allAnswers[questionNumber][i];
            var li = document.createElement("li");
            var button = document.createElement("button");
            button.textContent = randAnswer;
            li.appendChild(button);
            quizAnswers.appendChild(li);
        }
    }
}

function hideRight() {
    correctAlert.setAttribute("class", "hidden")
}

function hideWrong() {
    incorrectAlert.setAttribute("class", "hidden")
}

function showRight() {
    correctAlert.setAttribute("class", "shown")
}

function showWrong() {
    incorrectAlert.setAttribute("class", "shown")
}

// The following shuffle function was borrowed from the Fisher-Yates Shuffle, found on stackerflow at the following url: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(answers) {
    let currentIndex = answers.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [answers[currentIndex], answers[randomIndex]] = [
            answers[randomIndex], answers[currentIndex]];
        
    }
    return answers;
}

function showFinalScore() {
    yourFinalScore.innerText = "Your final score is " + finalScore;
}

function saveScore(event) {
    event.preventDefault();

    if (initials.value === "") {
        return
    }

    var scoreToSave = initials.value + " ...................... " + finalScore;
    highScores.push(scoreToSave);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    initials.value = "";
    displayHighScores();
}

function displayHighScores () {
    quizIntro.setAttribute("class", "hidden");
    quizQuestion.setAttribute("class", "hidden");
    enterScore.setAttribute("class", "hidden");
    scoreDisplay.setAttribute("class", "shown");
    scoreList.innerHTML = "";
    stopCountDown();
    for (var i = 0; i < highScores.length; i++) {
        var li = document.createElement("li");
        li.innerText = highScores[i];
        scoreList.appendChild(li);
    }
}

function init() {
    var storedHighScores = (localStorage.getItem("highScores"));
    if (storedHighScores !== null) {
        storedHighScores = JSON.parse(localStorage.getItem("highScores"));
        highScores = [];
        highScores = storedHighScores;
    }
}

function restartGame() {
    scoreDisplay.setAttribute("class", "hidden");
    quizIntro.setAttribute("class", "shown");
    quizIntro.dataset.state = "shown";
    timeRemaining = 60;
    questionNumber = 0;
}

function clearScores () {
    highScores = [];
    localStorage.removeItem("highScores");
    scoreList.innerHTML = "";
}

init();

// Event listeners

startButton.addEventListener("click", startQuiz);
quizQuestion.addEventListener("click", answerChosen);
submitButton.addEventListener("click", saveScore);
playAgain.addEventListener("click", restartGame);
clearScoresButton.addEventListener("click", clearScores);
viewScore.addEventListener("click", displayHighScores);
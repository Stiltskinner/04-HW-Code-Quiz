// -- It will need to open with header text 'Coding Quiz Challenge' and p text describing the challenge, a start button, visible timer in the top-right, and view highscores in the top left -->

// <!-- It will need an event listener to look for a click on the start button element. That event listener will need to hide all of the starter text and start button and then display -question text and -4 buttons with answer choices in a list -->

// <!-- When any answer choice is clicked it will need to replace the question text and replace all of the text for answer choices. When an incorrect choice is clicked, it will need to subtract 10 seconds from the timer. If the correct answer is chosen, the following question should display the text "correct" below the answer choices, otherwise it should display "wrong"-->

// <!-- When the last question is answered OR the timer gets to 0, it will need to hide all question text and answer choices. It will need to display 'Quiz Complete'. It will need to display the score inside of the text "Your final score is ". It will need to prompt the user to complete a form with their initials. It will need a button to submit the form -->

// <!-- When the user submits the form, it will need to add the initials and the high score into a new  variable. This new variable should get added into a separate variable that contains all high scores. The all high scores variable will need to be stringified and saved to local storage, and the application should pull allhighscores from local storage to display to a list of high scores. -->

// <!-- There needs to be a clear high scores button that clears the local storage. There needs to be a play again button that returns to the quiz start page

// Variables
// Variables for sections of the document that need to be modified by JS
var timeDisplay = document.getElementById("viewtimer");
var quizIntro = document.getElementById("quiz-intro");
var quizQuestion = document.getElementById("quiz-question");
var questionText = document.getElementById("question-text");
var quizAnswers = document.getElementById("quiz-answers");
var enterScore = document.getElementById("enter-score");
var scoreDisplay = document.getElementById("score-display");
// questions contains the text of the question asked of the user in order of question number
var questions = ["I'm question 1", "I'm question 2", "I'm question 3", "I'm question 4", "I'm question 5"];
// allCorrectAnswer contains the correct answers in order of question number
var allCorrectAnswer = ["I'm the correct answer","I'm really the correct answer", "I'm really the correct answer", "I'm really the correct answer", "I'm really the correct answer"];
// allAnswers is an array of arrays, and each nested array contains the answer choices for one question. They are in order of question number.
var allAnswers = new Array ( );
allAnswers[0] = new Array ("I'm the correct answer", "I'm the wrong answer1", "I'm the wrong answer2", "I'm the wrong answer3");
allAnswers[1] = new Array ("I'm really the correct answer", "I'm really the wrong answer1", "I'm really the wrong answer2", "I'm really the wrong answer3");
allAnswers[2] = new Array ("I'm really the correct answer", "I'm really the wrong answer1", "I'm really the wrong answer2", "I'm really the wrong answer3");
allAnswers[3] = new Array ("I'm really the correct answer", "I'm really the wrong answer1", "I'm really the wrong answer2", "I'm really the wrong answer3");
allAnswers[4] = new Array ("I'm really the correct answer", "I'm really the wrong answer1", "I'm really the wrong answer2", "I'm really the wrong answer3");
// questionNumber tracks which question the user is on. 
var questionNumber = 0;
var timeRemaining = 75;


timeDisplay.textContent = "Time Remaining: " + timeRemaining;
// This looks for a click inside the quiz-intro div. If it was a button, it hides that div. It then calls the function that populates the quiz with a question and answers.

quizIntro.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button")) {
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
        }
    }
});

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

quizQuestion.addEventListener("click", function(event) {
    var element = event.target;
    var answertext = element.textContent;
    if (element.matches("button")) {
        if (answertext === allCorrectAnswer[questionNumber]) {
            continueQuiz();
        }
        else {
            timeRemaining = timeRemaining-10;
            timeDisplay.textContent = "Time Remaining: " + timeRemaining;
            continueQuiz();
        }
    }
});

// This function should clear the question text and insert text for the next question. It should shuffle the answers for question 2, clear the current answer choices, and then create new list items and buttons for the new answer choice.
function continueQuiz() {
    questionNumber++;
    if (questionNumber >= questions.length) {
            var enterScoreStatus = enterScore.dataset.state;
            enterScore.setAttribute("class","shown");
            enterScoreStatus = "shown";
            // This shows the quiz question div and sets its data set to shown
            quizQuestion.dataset.state = "hidden";
            quizQuestion.setAttribute("class", "hidden");
            quizAnswers.innerHTML = "";
        }
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

# 04-HW-Code-Quiz
A quiz on geography with a timer and a high score feature
## Borrowed Code:
I used a shuffle function called the Fisher-Yates Shuffle, found on stackerflow at the following url: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

This quiz works by starting with an html file that has divs containing each page that I want to be able to display, as well as a header containing the view high scores button (always visible) and the timer (starts hidden, displays while the quiz is running)

There are css classes to hide and show these elements when functions execute that call for them to hide and show

I built the quiz questions into an array, the correct answers into a separate array, and all answer choices into a nested array that contains 4 sets of answers for each question, in order.

I realized after I had built most of the quiz that it would probably have made more sense to use objects and properties for each question and then just make an array of those objects, but my solution was already working so I left it as is.

There is a function to start the quiz when the start quiz button is pressed. This hides the starter div and displays the div that contains the questions. It also starts the timer interval that powers the CountDown function

Countdown displays to the user how much time is remaining in the top-right, and it corrects grammar at 1 second to the singular. If the timer reaches 0, it ends the quiz, hides the questions, displays the enter score screen, and calls on several other functions that power the scoreboard features

populateQuiz is a function that is fired by startQuiz, and it pulls the appropriate question from the array of questions based on the question number, which starts at 0. It also shuffles the answer choices for the first question and pulls all of the answer choices from the nested array of choices and creates list elements in the html that are also buttons containing the answer choice text. It appends these list items to the ul in the html.

the answerChosen function fires when any answer is chosen, and it shows the div that contains text telling the user whether their choice was correct or incorrect. If their answer was correct, it shows the text telling the user they were right, otherwise it tells them the text that they were wrong. If they were wrong, it subtracts 10 seconds from the timer and updates the timer display. In either case, it fires the continueQuiz function.

conitinueQuiz adds 1 to the quizNumber, then checks to see if the quiz is over first. If it is, it hides the quiz and displays the screen to enter initials to the high score board. It fires the storeTime function, hides the timer, stops the countdown, and fires the function that shows the user their final score. If the quiz is not over, it replaces the question with the next one, shuffles the answer choices, clears the previous list items, then creates new list items from the shuffled answer choices.

saveScore accepts input from the user for their initials, and it saves that input plus their score into an array called highScores. Then it saves that array into localstorage and resets the input value. Then it fires the displayHighScores function

displayHighScores hides everything else, clears anything from the list of scores that may have been there from previous plays, stops the countdown in case the user clicked view high scores mid-quiz, and then it creates a list of high scores form the highScores variable and appends them to the html.

init fires as soon as the page is loaded and checks to see if there are any high scores in local storage. If there are, it parses them, clears the high scores array, and replaces the high scores array with the contents of local storage.

restartGame hides the score display div and shows the intro div, it resets the time remaining to 60 and resets the question number to 0

clearScores clears everything in the highScores variable and the localStorage, and deletes the high scores list items.

the eventlisteners check for various button clicks and answer choice selections and then fire the appropriate functions

Repository Link: https://github.com/Stiltskinner/Geography-Quiz
Deployed webpage: https://stiltskinner.github.io/Geography-Quiz/
![Gif of webpage](./Assets/Coding%20Quiz.gif)
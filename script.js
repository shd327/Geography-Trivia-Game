// Query selectors to grab HTML elements
const startButton = document.getElementById("start-btn");
const playAgainBTN = document.getElementById("playAgain-btn");
const questionElement = document.getElementById("questions");
const answerElements = document.getElementById("answers-btns");
const questionContainer = document.getElementById("question-container");
startButton.addEventListener("click", startGame);
var timerElement = document.getElementById("timerText");
var bodyTag = document.querySelector("body");
var gameOverElement = document.getElementById("gameOver");
var displayScores = document.getElementById("displayScore");
var initial = document.getElementById("initial");
var submitAnswer = document.getElementById("submit-answer");
var finalScoresDisplay = document.getElementById("finalScoresDisplay");
var clearScores = document.getElementById("clearScores-btn");
var isAnswerDisplay = document.getElementById("isAnswerDisplay")
var showAnswer = document.getElementById("showAnswer")
var displayAnswerList = document.getElementById("displayAnswerList")
var displayArrayScore = [];
var gameRules = document.getElementById("gameRules")
// var finalScoresDisplay = document.getElementById("finalScoresDisplay")

// Global variables

var finalScores;
var randomizeQuestions;
var currentQuestionIndex = 0;
var timer = 80;
var clock;
// Object Array for questions and answers
const questions = [
    {
        question: "What is the name of the tallest mountain in the world?",
        answers: [
            {
                choice: "Mount Everest",
            },
            {
                choice: "Mount Kilimanjaro",
            },

            {
                choice: "Mount Makalu",
            },
            {
                choice: "Mount Kanchendzonga",
            },
        ],
        isCorrect: "Mount Everest",
    },
    {
        question: "What is the only country that borders the United Kingdom",
        answers: [
            {
                choice: "Scotland",
            },
            {
                choice: "Ireland",
            },

            {
                choice: "Wales",
            },
            {
                choice: "Germany",
            },
        ],
        isCorrect: "Ireland",
    },
    {
        question: "Which continent is in all four hemispheres?",
        answers: [
            {
                choice: "Asia",
            },
            {
                choice: "Europe",
            },

            {
                choice: "North America",
            },
            {
                choice: "Africa",
            },
        ],
        isCorrect: "Africa",
    },
    {
        question: "What is the name of the longest river in Africa?",
        answers: [
            {
                choice: "The Nile River",
            },
            {
                choice: "The Orange River",
            },

            {
                choice: "The Congo River",
            },
            {
                choice: "The Zambezi River",
            },
        ],
        isCorrect: "The Nile River",
    },
    {
        question: "What American city is the Golden Gate Bridge located in?",
        answers: [
            {
                choice: "New York City",
            },
            {
                choice: "Buffalo",
            },

            {
                choice: "Denver",
            },
            {
                choice: "San Francisco",
            },
        ],
        isCorrect: "San Francisco",
    },
    {
        question: " What U.S. state is home to no documented poisonous snakes?",
        answers: [
            {
                choice: "Colordo",
            },
            {
                choice: "New Jersey",
            },

            {
                choice: "Alaska",
            },
            {
                choice: "Florida",
            },
        ],
        isCorrect: "Alaska",
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            {
                choice: "Toronto",
            },
            {
                choice: "Québec City",
            },

            {
                choice: "Ottawa",
            },
            {
                choice: "Montreal",
            },
        ],
        isCorrect: "Ottawa",
    },
];

// This function randomizes the question object array and saves the new array to randomizeQuestions
function shuffle() {
    randomizeQuestions = questions.sort(() => Math.random() - 0.5);
}

// This function will call run shuffle, decrementTime function
// Hides the start button and displays question container
// Sets timerElement text to initial timer value set globally
// Invokes setNextQuestion Function
function startGame() {
    gameRules.classList.add('hide')
    showAnswer.classList.add("hide")
    displayAnswerList.classList.add("hide")
    shuffle();
    decrementTime();
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    timerElement.innerText = timer;
    setNextQuestion();
}

// Checks if the current index of the randomizeQuestions array is undefined
// if its not undefined it will pass in the the current index of randomizeQuestion array to displayQuestions function
// Else it will run the gameOver function
function setNextQuestion() {
    if (randomizeQuestions[currentQuestionIndex] !== undefined) {
        displayQuestions(randomizeQuestions[currentQuestionIndex]);
    } else {
        gameOver();
    }
}

// This function will grab the selected answer and save the the text to selectedButton
// Then we grab the correct answer from the current randomizeQuestions array index and save it to correct answer
// Using a if statement we check if the text of button click event matches the string isCorrect of the current array index
// if they dont match it runs the wrongAnswerDecrement()
// Then we increment the currentIndex by 1 and invoke the setNextQuestion() function
function selectAnswer(e) {
    removeStatusColor();
    var selectedButton = e.target.innerText;
    var correctAnswer = randomizeQuestions[currentQuestionIndex].isCorrect;
    if (selectedButton !== correctAnswer) {
        displayArrayScore.push({
            question: questions[currentQuestionIndex].question,
            wrong: selectedButton,
            right: questions[currentQuestionIndex].isCorrect
        })
        wrongAnswerDecrement();
        setStatusWrong();
    } else {
        setStatusCorrect();
    }
    // console.log(displayArrayScore)
    currentQuestionIndex++;
    setNextQuestion();
}

// This function gets passed in the current index of the randomizeQuestion Array
// It displays the current objects at the current array index to the questionElement (HTML) text
// Then it passes the same array index object to the displayAnswers function
function displayQuestions(question) {
    questionElement.innerText = question.question;
    displayAnswers(question);
}

// This function will first clear the state of all the answer buttons to a empty string
// Then using a foreach loop it will loop through all the answers choice keys
// It creates a new button saves the value from each key in the current object to the button text
// it adds the btn css class and appends the button to html element
// Finally an addEventListener is added to each button which references the selectAnswer function upon button click
function displayAnswers(question) {
    clearState();
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.choice;
        button.classList.add("btn");
        answerElements.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}
// Clears answer buttons text each time a new question is rendered
function clearState() {
    answerElements.textContent = "";
}

// checks if the current index is undefine and clearsInterval if condition is met
// else it runs set interval and checks the following
// if timer is greater than 0 decrement timer by 1
// displays timer value to html element
// else if timer <=0 it clears the interval and runs gameOver function
// finally it saves the timer value to global var Clock which is used later for local storage
function decrementTime() {
    if (randomizeQuestions[currentQuestionIndex] == undefined) {
        clearInterval(clock);
    } else {
        clock = setInterval(function () {
            if (timer > 0) {
                timer -= 1;
                timerElement.innerText = timer;
            } else if (timer <= 0) {
                clearInterval(clock);
                gameOver();
            }
        }, 1000);
    }
}

// This function decrements the current timer value by 15
// if timer is less than 0 it resets the timer value to 0 to prevent negative values
// If timer is equal to 0 it runs game over function
function wrongAnswerDecrement() {
    timer -= 15;
    if (timer < 0) {
        timer = 0;
    }
    timerElement.innerText = timer;
    if (timer === 0) {
        gameOver();
    }
}
// This function hides the question container and displays the html element for adding initals
function gameOver() {
    displayAnswerList.classList.remove("hide")
    clearInterval(clock);
    showAnswer.remove()
    displayScores.classList.remove("hide");
    gameOverElement.classList.remove("hide");
    questionContainer.classList.add("hide");

    displayIncorrectAnswers()
}

// If user clicks playAgain button
// reloads the the window and invoked startGame() function
playAgainBTN.addEventListener("click", function () {
    location.reload();
    startGame();
});

// Gets "scores" from local storage and saves the array to var sorted
// using .sort() the sorted array is now sorted from largest to smallest score value
// Using a for loop I loop through the sorted array and create li elements and append it to the ul element
function ScoreDisplay() {
    removeStatusColor();

    playAgainBTN.classList.remove("hide");
    clearScores.classList.remove("hide");
    displayScores.classList.add("hide");
    var parseScores = JSON.parse(localStorage.getItem("scores"));
    var sorted = parseScores;
    sorted.sort(function (a, b) {
        return b.score - a.score;
    });

    for (let i = 0; i < sorted.length; i++) {
        var li = document.createElement("li");
        li.textContent = sorted[i].initials + " " + sorted[i].score;
        finalScoresDisplay.appendChild(li);
    }
}
// Styling for background color correct answer
function setStatusCorrect() {
    bodyTag.classList.add("correct");
    showAnswer.innerText = "correct"

}
// Styling for background color wrong answer
function setStatusWrong() {
    bodyTag.classList.add("wrong");
    showAnswer.classList.remove("hide")
    showAnswer.innerText = "wrong"
}
// removes background color for wrong or correct answer
function removeStatusColor() {
    bodyTag.classList.remove("wrong");
    showAnswer.classList.remove("hide")
    bodyTag.classList.remove("correct");
}

// Upon submit button click event the following will excute
// we save the input text of the users initials to new var
// We create a scoreObject and save the initial and the current timer value to scores
// We then grab the scores array from local storage and save it the global variable finalScores
// if there is no scores in global storage we set finalScores to an empty array
// We then push the new scores object to finalScores array
// Then we added our finalScores to the scores in local storage
// Then we invoke the function ScoreDisplay()
submitAnswer.addEventListener("click", function (event) {
    clearStateListItem()
    event.preventDefault();
    var initialEL = initial.value;
    var scoreObject = {
        initials: initialEL,
        score: timer,
    };
    if (localStorage.getItem("scores")) {
        finalScores = JSON.parse(localStorage.getItem("scores"));
    } else {
        finalScores = [];
    }
    finalScores.push(scoreObject);
    localStorage.setItem("scores", JSON.stringify(finalScores));
    ScoreDisplay();

});
// Clears local storage
clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Displays all wrong answers to HTML
function displayIncorrectAnswers() {

    for (let i = 0; i < displayArrayScore.length; i++) {
        let listItem = document.createElement("li");
        listItem.classList.remove("li")
        listItem.textContent = `question ${i + 1} : ${displayArrayScore[i].question}, 
         your answer:  ${displayArrayScore[i].wrong},
         correct answer:  ${displayArrayScore[i].right}`
        displayAnswerList.appendChild(listItem)



    }
}
// removes UL element
function clearStateListItem() {
    displayAnswerList.remove();
}
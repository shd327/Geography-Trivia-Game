// Query selectors to grab HTML elements
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("playAgain-btn");
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
    gamerOver();
  }
}

function selectAnswer(e) {
  removeStatusColor();
  var selectedButton = e.target.innerText;
  var correctAnswer = randomizeQuestions[currentQuestionIndex].isCorrect;
  if (selectedButton !== correctAnswer) {
    wrongAnswerDecrement();
    setStatusWrong();
  } else {
    setStatusCorrect();
  }
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
        gamerOver();
      }
    }, 1000);
  }
}

function wrongAnswerDecrement() {
  timer -= 15;
  if (timer < 0) {
    timer = 0;
  }
  timerElement.innerText = timer;
  if (timer === 0) {
    gamerOver();
  }
}

function gamerOver() {
  clearInterval(clock);
  displayScores.classList.remove("hide");
  gameOverElement.classList.remove("hide");
  questionContainer.classList.add("hide");
}

nextButton.addEventListener("click", function () {
  gamerOver();
  startGame();
  location.reload();
});

function ScoreDisplay() {
  removeStatusColor();
  nextButton.classList.remove("hide");
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

function setStatusCorrect() {
  bodyTag.classList.add("correct");
}
function setStatusWrong() {
  bodyTag.classList.add("wrong");
}
function removeStatusColor() {
  bodyTag.classList.remove("wrong");
  bodyTag.classList.remove("correct");
}

submitAnswer.addEventListener("click", function (event) {
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

clearScores.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

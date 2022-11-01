const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('playAgain-btn');
const questionElement = document.getElementById('questions')
const answerElements = document.getElementById('answers-btns')
const questionContainer = document.getElementById('question-container');
startButton.addEventListener('click', startGame);
var timerElement = document.getElementById('timerText')
var bodyTag = document.querySelector('body')
var gameOverElement = document.getElementById('gameOver')
var displayScores = document.getElementById('displayScore')
var initial = document.getElementById('initial')
var submitAnswer = document.getElementById('submit-answer')
var finalScoresDisplay = document.getElementById('finalScoresDisplay')
var finalScores;
var randomizeQuestions;
var currentQuestionIndex =0;
var timer = 10000;
var clock;
const questions = [
    {
        question: "What is the name of the tallest mountain in the world?",
        answers: [
            {
                choice: 'Mount Everest'
            },
               {
                choice: 'Mount Kilimanjaro'
            },
            
               {
                choice: 'Mount Makalu'
            },
               {
                choice: 'Mount Kanchendzonga'
            },
  
            
        ],
        isCorrect: "Mount Everest",
    },
        {
        question: "What is the only country that borders the United Kingdom",
        answers: [
            {
                choice: 'Scotland'
            },
               {
                choice: 'Ireland'
            },
            
               {
                choice: 'Wales'
            },
               {
                choice: 'Germany'
            },
            
            
            ],
        isCorrect : "Ireland"
    },
         {
        question: "Which continent is in all four hemispheres?",
        answers: [
            {
                choice: 'Asia'
            },
               {
                choice: 'Europe'
            },
            
               {
                choice: 'North America'
            },
               {
                choice: 'Africa'
            },
            
            
            ],
        isCorrect : "Africa"
    },
         {
        question: "What is the name of the longest river in Africa?",
        answers: [
            {
                choice: 'The Nile River'
            },
               {
                choice: 'The Orange River'
            },
            
               {
                choice: 'The Congo River'
            },
               {
                choice: 'The Zambezi River'
            },
            
            
            ],
        isCorrect : "The Nile River"
    },
         {
        question: "What American city is the Golden Gate Bridge located in?",
        answers: [
            {
                choice: 'New York City'
            },
               {
                choice: 'Buffalo'
            },
            
               {
                choice: 'Denver'
            },
               {
                choice: 'San Francisco'
            },
            
            
            ],
        isCorrect : "San Francisco"
    },
         {
        question: " What U.S. state is home to no documented poisonous snakes?",
        answers: [
            {
                choice: 'Colordo'
            },
               {
                choice: 'New Jersey'
            },
            
               {
                choice: 'Alaska'
            },
               {
                choice: 'Florida'
            },
            
            
            ],
        isCorrect : "Alaska"
    },
         {
        question: "What is the capital of Canada?",
        answers: [
            {
                choice: 'Toronto'
            },
               {
                choice: 'Québec City'
            },
            
               {
                choice: 'Ottawa'
            },
               {
                choice: 'Montreal'
            },
            
            
            ],
        isCorrect : "Ottawa"
    }
]

function shuffle() {
    randomizeQuestions = questions.sort(() => Math.random() - .5)

    // currentQuestionIndex = 0;
}

function startGame() {
    shuffle()
    decrementTime()
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    timerElement.innerText = timer;
   
    setNextQuestion()
    
}

function setNextQuestion() {
    if (randomizeQuestions[currentQuestionIndex] !== undefined) {
        displayQuestions(randomizeQuestions[currentQuestionIndex])
    } else {
        gamerOver()
    }
}

function selectAnswer(e) {
    removeStatusColor()
    var selectedButton = e.target.innerText
    var correctAnswer = randomizeQuestions[currentQuestionIndex].isCorrect

    if (selectedButton !== correctAnswer) {
     
        wrongAnswerDecrement()
        setStatusWrong()

    }
    
    else {
        setStatusCorrect()
    }

    currentQuestionIndex++
       
    

    setNextQuestion()
    

  
}

function displayFinalScore() {
    
}

function displayQuestions(question) {
    
    questionElement.innerText = question.question
    displayAnswers(question)
    
}
function displayAnswers(question) {
    clearState()
    

    question.answers.forEach(answer => {
       const button = document.createElement('button');
       button.innerText = answer.choice
        button.classList.add('btn') 
        answerElements.appendChild(button)
        button.addEventListener('click', selectAnswer)
   });
}

function clearState() {

    answerElements.textContent = "";
}




function decrementTime() {
    if (randomizeQuestions[currentQuestionIndex] == undefined) {
  clearInterval(clock);
    }
    else {
             clock =  setInterval(function () {
          if (timer > 0) {
                 timer -= 1000
              timerElement.innerText = timer
              
                // console.log(timer)
                // console.log(randomizeQuestions[currentQuestionIndex])

            }
            else if (timer <= 0) {
                console.log("games over")
                console.log(timer)
                clearInterval(clock);
                console.log(randomizeQuestions[currentQuestionIndex])
            }
        }, 1000)
        clearInterval(clock);
    }
}

function wrongAnswerDecrement() {
       
        if (timer === 0) {
            console.log("games over")
            console.log(timer)
        }
        else if (timer >= 0) {
            timer -= 2000
            timerElement.innerText = timer
            console.log(timer)
        }
  

}

function gamerOver() {
  
    displayScores.classList.remove("hide")
    gameOverElement.classList.remove('hide')
    questionContainer.classList.add('hide')

    
}

nextButton.addEventListener("click", function () {
    gamerOver()
    startGame()
   location.reload()
})

function ScoreDisplay() {
    removeStatusColor()
    nextButton.classList.remove('hide')
    displayScores.classList.add("hide")
    var parseScores = JSON.parse(localStorage.getItem("scores"))
    var sorted = parseScores
    sorted.sort(function (a, b) {
    return b.score - a.score
    })
   
        for (let i = 0; i < sorted.length; i++){
        var li = document.createElement('li')
        li.textContent = sorted[i].initials + " " + sorted[i].score
        finalScoresDisplay.appendChild(li)
    }
}

function setStatusCorrect() {

    bodyTag.classList.add('correct')
    
}
function setStatusWrong() {

    bodyTag.classList.add('wrong')
}
function removeStatusColor() {
    bodyTag.classList.remove('wrong')
    bodyTag.classList.remove('correct')
}


submitAnswer.addEventListener("click", function (event) {

    event.preventDefault();
    
    var initialEL = initial.value
    var scoreObject = {
        initials: initialEL,
        score: timer
        
    }
    if (localStorage.getItem("scores")) {
         finalScores = JSON.parse(localStorage.getItem("scores"))
    }
    else {
        finalScores = [];
    }
    finalScores.push(scoreObject)
    localStorage.setItem("scores", JSON.stringify(finalScores))
     ScoreDisplay() 
})


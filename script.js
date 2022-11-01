const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
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
        question: "what color is the sky",
        answers: [
            {
                choice: '3'
                // isCorrect: false
            },
               {
                choice: '5'
            },
            
               {
                choice: '4'
            },
               {
                choice: 'blue'
            },
  
            
        ],
        isCorrect: "blue",
    },
        {
        question: "what color is an apple",
        answers: [
            {
                choice: 'green'
            },
               {
                choice: 'black'
            },
            
               {
                choice: 'red'
            },
               {
                choice: 'blue'
            },
            
            
            ],
        isCorrect : "red"
    },
         {
        question: "who is god",
        answers: [
            {
                choice: 'jesus'
            },
               {
                choice: 'shiva'
            },
            
               {
                choice: 'frank'
            },
               {
                choice: 'tom'
            },
            
            
            ],
        isCorrect : "tom"
    }
]

// function shuffle() {
    randomizeQuestions = questions.sort(() => Math.random() - .5)

    // currentQuestionIndex = 0;
// }

function startGame() {

    decrementTime()
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    timerElement.innerText = timer;
    // shuffle()
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
    // var selectedQuestion = randomizeQuestions[currentQuestionIndex].question
    // alert()
    if (selectedButton !== correctAnswer) {
     
        wrongAnswerDecrement()
        setStatusWrong()
        // setTimeout(setStatusWrong, 1000)
    }
    
    else {
        setStatusCorrect()
    }
    // alert(selectedQuestion)
    // nextButton.classList.remove("hide")
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
    //   removeStatusColor()
    displayScores.classList.remove("hide")
    gameOverElement.classList.remove('hide')
    questionContainer.classList.add('hide')
    // var parseScores = JSON.parse(localStorage.getItem("scores"))
    // for (let i = 0; i < parseScores.length; i++){
    //     var li = document.createElement('li')
    //     li.textContent = parseScores[i].initials + " " + parseScores[i].score
    //     finalScoresDisplay.appendChild(li)
    // }
    
}


function ScoreDisplay() {
      removeStatusColor()
    displayScores.classList.add("hide")
    var parseScores = JSON.parse(localStorage.getItem("scores"))
    var sorted = parseScores
    sorted.sort(function (a, b) {
    return b.score - a.score
    })
    console.log(sorted)
   
        for (let i = 0; i < sorted.length; i++){
        var li = document.createElement('li')
        li.textContent = sorted[i].initials + " " + sorted[i].score
        finalScoresDisplay.appendChild(li)
    }
}

function setStatusCorrect() {
    // removeStatusColor()
    bodyTag.classList.add('correct')
    
}
function setStatusWrong() {
    // removeStatusColor()
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
        // finalScores.push(JSON.parse(localStorage.getItem("scores")))
    }
    else {
        finalScores = [];
    }
    finalScores.push(scoreObject)
    localStorage.setItem("scores", JSON.stringify(finalScores))
     ScoreDisplay() 
})


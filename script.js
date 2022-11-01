const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('questions')
const answerElements = document.getElementById('answers-btns')
const questionContainer = document.getElementById('question-container');
startButton.addEventListener('click', startGame);
var timerElement = document.getElementById('timerText')
var bodyTag = document.querySelector('body')
var gameOverElement = document.getElementById('gameOver')

var randomizeQuestions;
var currentQuestionIndex;
var timer = 10000;
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

function shuffle() {
    randomizeQuestions = questions.sort(() => Math.random() - .5)
    console.log(randomizeQuestions)
    currentQuestionIndex = 0;
}

function startGame() {
    console.log("hello")
    decrementTime()
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    timerElement.innerText = timer;
    shuffle()
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
    var selectedButton = e.target.innerText
    var correctAnswer = randomizeQuestions[currentQuestionIndex].isCorrect
    var selectedQuestion = randomizeQuestions[currentQuestionIndex].question
    // alert()
    if (selectedButton !== correctAnswer) {
     
        wrongAnswerDecrement()
        // setStatusWrong()
    } 
  

        // setStatusCorrect()
    
    // alert(selectedQuestion)
    // nextButton.classList.remove("hide")
    currentQuestionIndex++
    

    setNextQuestion()
    

  
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
// removeStatusColor()
    answerElements.textContent = "";
}


function validate(e) {
    // alert(e.target.innerText)
}


function decrementTime() {
    setInterval(function (){
        if (timer === 0) {
            console.log("games over")
            console.log(timer)
        }
        else if (timer >= 0) {
            timer -= 1000
            timerElement.innerText = timer
            console.log(timer)
        }
    }, 1000)
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
    alert("game over")
    gameOverElement.classList.remove('hide')
    questionContainer.classList.add('hide')
    

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
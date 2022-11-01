const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('questions')
const answerElements = document.getElementById('answers-btns')
const questionContainer = document.getElementById('question-container');
startButton.addEventListener('click', startGame);

var randomizeQuestions;
var currentQuestionIndex;
var timer = 1000;
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
    }
]

function shuffle() {
    randomizeQuestions = questions.sort(() => Math.random() - .5)
    console.log(randomizeQuestions)
    currentQuestionIndex = 0;
}

function startGame() {
     console.log("hello")
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    shuffle()
    setNextQuestion()
    decrementTime()
}

function setNextQuestion() {
    displayQuestions(randomizeQuestions[currentQuestionIndex])
}

function selectAnswer(e) {
    var selectedButton = e.target.innerText
    var correctAnswer = randomizeQuestions[currentQuestionIndex].isCorrect
    var selectedQuestion = randomizeQuestions[currentQuestionIndex].question
    // alert()
    if (selectedButton !== correctAnswer) {
        alert(selectedButton + "wrong" )
    } else {
         alert(selectedButton + "correct")
    }
    alert(selectedQuestion)
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

    answerElements.textContent = "";
}


function validate(e) {
    // alert(e.target.innerText)
}


function decrementTime() {
    if (timer !== -0) {
       console.log("games over")
    }
    else if (timer <= 0) {
         timer -= -1000
        console.log("check if timer is over")
    }
}


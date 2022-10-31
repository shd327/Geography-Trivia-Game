const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('questions')
const answerElements = document.getElementById('answers-btns')
const questionContainer = document.getElementById('question-container');
startButton.addEventListener('click', startGame);

var randomizeQuestions;
var currentQuestionIndex;

const questions = [
    {
        question: "what color is the sky",
        answers: [
            {
                choice: 'green', isCorrect: false
            },
               {
                choice: 'black', isCorrect: false
            },
            
               {
                choice: 'red', isCorrect: false
            },
               {
                choice: 'blue', isCorrect: true
            },
            
            
        ]
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
}

function setNextQuestion() {
    displayQuestions(randomizeQuestions[currentQuestionIndex])
}

function selectAnswer() {
    
}

function displayQuestions(question) {
    questionElement.innerText = question.question
    displayAnswers(question)
    
}
function displayAnswers(question) {
    question.answers.forEach(answer => {
       const button = document.createElement('button');
       button.innerText = answer.choice
          button.classList.add('btn') 
        answerElements.appendChild(button)
        button.addEventListener('click', displayAnswers)
   });
}

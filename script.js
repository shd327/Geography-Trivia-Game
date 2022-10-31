const startButton = document.getElementById('start-btn');

const questionContainer = document.getElementById('question-container');
startButton.addEventListener('click', startGame)


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



function startGame() {
     console.log("hello")
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
   
}

function setNextQuestion() {
    
}

function selectAnswer() {
    
}


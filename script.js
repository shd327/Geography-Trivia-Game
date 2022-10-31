const startButton = document.getElementById('start-btn');
const question = document.getElementById('questions')
console.log(startButton);
const questionContainer = document.getElementById('question-container');
startButton.addEventListener('click', startGame)

function startGame() {
     console.log("hello")
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
   
}

function setNextQuestion() {
    
}

function selectAnswer() {
    
}
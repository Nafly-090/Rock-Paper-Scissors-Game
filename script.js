const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const resultMessage = document.getElementById('resultMessage');
const resetButton = document.getElementById('resetButton'); // Reset button reference

let playerScore = 0;
let computerScore = 0;

const choices = {
    rock: '<i class="fas fa-hand-rock"></i>',
    paper: '<i class="fas fa-hand-paper"></i>',
    scissors: '<i class="fas fa-hand-scissors"></i>',
};

function getComputerChoice() {
    const choiceKeys = Object.keys(choices);
    const randomIndex = Math.floor(Math.random() * choiceKeys.length);
    return choiceKeys[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return 'You win!';
    } else {
        computerScore++;
        return 'Computer wins!';
    }
}

function updateScores() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function displayResult(playerChoice, computerChoice, result) {
    const computerIcon = choices[computerChoice];
    resultMessage.innerHTML = `${result} (Computer chose ${computerIcon})`;
}

function handleChoice(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    displayResult(playerChoice, computerChoice, result);
    updateScores();
}

// Add event listeners dynamically for each choice
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id; // The button's id corresponds to 'rock', 'paper', or 'scissors'
        handleChoice(playerChoice);
    });
});

// Reset the game
resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    resultMessage.innerHTML = "Make your choice!";
});

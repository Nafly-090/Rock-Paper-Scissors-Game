// Select DOM elements
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const resultMessage = document.getElementById('resultMessage');
const resetButton = document.getElementById('resetButton');
const choicesButtons = document.querySelectorAll('.choice');

// Game variables
let playerScore = 0;
let computerScore = 0;
let isGameActive = true;

// Choices map
const choices = {
    rock: '<i class="fas fa-hand-rock"></i>',
    paper: '<i class="fas fa-hand-paper"></i>',
    scissors: '<i class="fas fa-hand-scissors"></i>',
};

// Get a random computer choice
const getComputerChoice = () => {
    const choiceKeys = Object.keys(choices);
    return choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
};

// Determine the winner
const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) return 'It\'s a tie!';
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return 'You win!';
    }
    computerScore++;
    return 'Computer wins!';
};

// Update scores
const updateScores = () => {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
};

// Display result with animations
const displayResult = (playerChoice, computerChoice, result) => {
    resultMessage.innerHTML = `${result} (Computer chose ${choices[computerChoice]})`;
    resultMessage.className = ''; // Reset classes
    resultMessage.classList.add(result.includes('win') ? 'win' : result.includes('tie') ? 'tie' : 'lose');
};

// Handle player choice
const handleChoice = (playerChoice) => {
    if (!isGameActive) return;

    isGameActive = false; // Prevent spamming
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    displayResult(playerChoice, computerChoice, result);
    updateScores();

    // Reactivate the game after a delay
    setTimeout(() => (isGameActive = true), 1000);
};

// Add event listeners to choice buttons
choicesButtons.forEach(button => {
    button.addEventListener('click', () => handleChoice(button.id));
});

// Reset game
resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    resultMessage.textContent = 'Make your choice!';
    resultMessage.className = '';
});

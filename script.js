// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
const messageOverlay = document.getElementById('messageOverlay');
const messageText = document.getElementById('messageText');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear the text content of each cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    hideMessage(); // Hide the message overlay
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        showMessage(`${currentClass.toUpperCase()} Wins! 🤦‍♀️🤦‍♂️🎉`);
    } else if (isDraw()) {
        endGame(true);
        showMessage(`It's a Draw! 🤝😏`);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        console.log('Draw!');
    } else {
        console.log(`${oTurn ? "O's" : "X's"} Wins! 🤦‍♂️`);
    }
}

function showMessage(message) {
    messageText.textContent = message;
    messageOverlay.classList.remove('hidden');
    setTimeout(() => {
        hideMessage();
    }, 60000); // Message lasts for 1 minute
}

function hideMessage() {
    messageOverlay.classList.add('hidden');
}
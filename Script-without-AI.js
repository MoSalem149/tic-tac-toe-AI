let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

// Initialize the click sound
const clickSound = new Audio("Click-Sound/click-button-140881.mp3");

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // Play the click sound
    clickSound.play();

    // Check for a win
    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );

      // Stop the game by removing event listeners from all boxes
      boxes.forEach((box) => box.removeEventListener("click", boxClicked));
      return;
    }

    // Check for a tie
    if (checkTie()) {
      playerText.innerHTML = "It's a tie!";

      // Change all boxes' background color to green
      boxes.forEach((box) => (box.style.backgroundColor = "green"));

      // Stop the game by removing event listeners from all boxes
      boxes.forEach((box) => box.removeEventListener("click", boxClicked));

      return;
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function checkTie() {
  // Check if all spaces are filled and there is no winner
  return spaces.every((space) => space !== null) && playerHasWon() === false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";

    // Reattach event listeners to start a new game
    box.addEventListener("click", boxClicked);
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame();

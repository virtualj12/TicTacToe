const squares = document.querySelectorAll('.square');
const status = document.querySelector('.status');
const scoreX = document.querySelector('.score-x');
const scoreO = document.querySelector('.score-o');
const ties = document.querySelector('.ties');
const resetBtn = document.querySelector('.reset-btn');
const nextBtn = document.querySelector('.next-btn');

let xIsNext = true;
let gameIsOver = false;
let numTurns = 0;
let score = {
  x: 0,
  o: 0,
  ties: 0
};

// check if a player has won
function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (squares[i*3].textContent === player &&
        squares[i*3+1].textContent === player &&
        squares[i*3+2].textContent === player) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (squares[i].textContent === player &&
        squares[i+3].textContent === player &&
        squares[i+6].textContent === player) {
      return true;
    }
  }

  // Check diagonals
  if (squares[0].textContent === player &&
      squares[4].textContent === player &&
      squares[8].textContent === player) {
    return true;
  }

  if (squares[2].textContent === player &&
      squares[4].textContent === player &&
      squares[6].textContent === player) {
    return true;
  }

  return false;
}

// update the game status
function updateStatus() {
  if (gameIsOver) {
    return;
  }

  if (checkWin('✖️')) {
    status.textContent = 'Player ✖️ wins!';
    score.x++;
    scoreX.textContent = `Player ✖️: ${score.x}`;
    gameIsOver = true;
    return;
  }

  if (checkWin('◉')) {
    status.textContent = 'Player ◉ wins!';
    score.o++;
    scoreO.textContent = `Player ◉: ${score.o}`;
    gameIsOver = true;
    return;
  }

  if (numTurns === 9) {
    status.textContent = "It's a tie!";
    score.ties++;
    ties.textContent = `Ties: ${score.ties}`;
    gameIsOver = true;
    return;
  }

  if (xIsNext) {
    status.textContent = "Player ✖️'s turn";
  } else {
    status.textContent = "Player ◉'s turn";
  }
}

// Add event listeners to each square
squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (square.textContent !== '' || gameIsOver) {
      return;
    }

    square.textContent = xIsNext ? '✖️' : '◉';
    numTurns++;
    xIsNext = !xIsNext;
    updateStatus();
  });
});

// Add event listener to reset button
resetBtn.addEventListener('click', () => {
  squares.forEach(square => {
    square.textContent = '';
  });

  xIsNext = true;
  gameIsOver = false;
  numTurns = 0;
  score.x = 0;
  score.o = 0;
  score.ties = 0;
  scoreX.textContent = 'Player ✖️: 0';
  scoreO.textContent = 'Player ◉: 0';
  ties.textContent = 'Ties: 0';
  status.textContent = "Player ✖️'s turn";
});

// Add event listener to next button
nextBtn.addEventListener('click', () => {
    squares.forEach(square => {
      square.textContent = '';
    });
  
    xIsNext = !xIsNext; // Switch the starting player for the next game
    gameIsOver = false;
    numTurns = 0;
    status.textContent = xIsNext ? "Player ✖️'s turn" : "Player ◉'s turn"; // Set the starting player for the next game
  });

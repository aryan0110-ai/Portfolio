// ---------- Game state ----------
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// All possible winning combinations (by cell index)
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// ---------- Elements ----------
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// ---------- Handle a cell click ----------
function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  // Ignore click if cell is filled or game is over
  if (board[index] !== '' || !gameActive) {
    return;
  }

  // Place the current player's mark
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

// ---------- Check for win or draw ----------
function checkResult() {
  let roundWon = false;
  let winningCombo = [];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCombo = pattern;
      break;
    }
  }

  if (roundWon) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWin(winningCombo);
    return;
  }

  // Check for draw (no empty cells left)
  if (!board.includes('')) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// ---------- Highlight winning cells ----------
function highlightWin(combo) {
  combo.forEach(index => {
    cells[index].classList.add('win');
  });
}

// ---------- Reset the game ----------
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win');
  });
}

// ---------- Event listeners ----------
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
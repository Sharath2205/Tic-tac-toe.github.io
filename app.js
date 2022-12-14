const cellEls = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const winningMessage = document.getElementById("winner-message");
const player1El = document.getElementById("player-1");
const player2El = document.getElementById("player-2");
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = true; //  True => x turn & False => circle turn
let player1_score = 0;
let player2_score = 0;

start();

function start() {
  cellEls.forEach((cell) => {
    turn = true;
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  changeHover();
}

function handleClick(e) {
  winningMessage.innerText = "-";
  let currClass = turn ? "x" : "circle";
  markCell(e.target, currClass);

  if (checkWin(currClass)) {
    gameOver(false);
  } else if (isDraw()) {
    gameOver(true);
  } else {
    // swap turns
    turn = !turn;
    changeHover();
  }
}

function gameOver(draw) {
  if (draw) {
    winningMessage.innerText = "Draw";
    resetBoard();
  } else {
    if (turn) {
      winningMessage.innerText = "Player 1 won";
      player1_score++;
      player1El.innerText = player1_score;
      resetBoard();
    } else {
      winningMessage.innerText = "Player 2 won";
      player2_score++;
      player2El.innerText = player2_score;
      resetBoard();
    }
  }
}

function isDraw() {
  return [...cellEls].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

function markCell(cell, currClass) {
  cell.classList.add(currClass);
}

function changeHover() {
  board.classList.remove("x");
  board.classList.remove("circle");
  if (turn) {
    board.classList.add("x");
  } else {
    board.classList.add("circle");
  }
}

function checkWin(currClass) {
  return winCombinations.some((combinations) => {
    return combinations.every((index) => {
      return cellEls[index].classList.contains(currClass);
    });
  });
}

function newgame() {
  window.location.reload();
}

function resetBoard() {
  start();
}

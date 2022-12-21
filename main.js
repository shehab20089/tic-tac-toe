const player = function (playerName, shape, color, isComputer = false) {
  return { playerName, shape, score: 0, color, isComputer };
};
const gameBoard = (function () {
  const currentGameBoard = ["", "", "", "", "", "", "", "", ""];
  const reset = function () {
    this.currentGameBoard = ["", "", "", "", "", "", "", "", ""];
  };
  const updateTheBoard = function (player, index) {
    this.currentGameBoard[index] = player.shape;
  };
  const checkIfWin = function () {
    const arr = this.currentGameBoard;
    for (let i = 0; i < 3; i++) {
      if (arr[i * 3] === arr[i * 3 + 1] && arr[i * 3] === arr[i * 3 + 2]) {
        if (arr[i * 3]) return arr[i * 3];
      } else if (arr[i] === arr[i + 3] && arr[i] === arr[i + 6]) {
        if (arr[i]) return arr[i];
      } else if (i % 2 === 0 && arr[i] === arr[4] && arr[i] === arr[8 - i]) {
        if (arr[i]) return arr[i];
      }
    }
    return false;
  };
  return { currentGameBoard, reset, updateTheBoard, checkIfWin };
})();

const displayController = (function () {
  let currentPage = 1;

  const player1 = player("player1", "X", "#2b3467");
  const player2 = player("player2", "O", "#eb455f");
  let currentPlayer = player1;
  document.querySelector(
    '[data-player="one"]'
  ).style.borderTop = `5px solid ${player1.color}`;

  document.querySelectorAll("[data-index]").forEach((item) => {
    item.addEventListener("click", () => {
      if (!item.innerText) {
        gameBoard.updateTheBoard(
          currentPlayer,
          item.getAttribute("data-index") - 1
        );
        item.innerText = currentPlayer.shape;
        item.style.color = currentPlayer.color;
        const winnerShape = gameBoard.checkIfWin();
        if (winnerShape) {
          declareWinner(currentPlayer);
          return;
        }
        changeTurn();
      }
    });
  });

  const setPlayerData = () => {
    player1.playerName = document.querySelector("#player1Name").value;
    player2.playerName = document.querySelector("#player2Name").value;
  };
  const initializeThePages = () => {
    const startButton = document.querySelector(".action-container > button");
    const page1 = document.querySelector(".page1");
    const page2 = document.querySelector(".page2");
    startButton.onclick = () => {
      page1.style.display = "none";
      page2.style.display = "flex";
      setPlayerData();
      startTheGame();
      currentPage = 2;
    };
  };
  const declareWinner = (winnerPlayer) => {
    const page2 = document.querySelector(".page2");
    const page3 = document.querySelector(".page3");
    page2.style.display = "none";
    page3.style.display = "flex";
    page3.querySelector(
      ".win-message"
    ).innerHTML = `Congratulations ${winnerPlayer.playerName} You won this round `;
    page3.querySelector("button").onclick = () => {
      page2.style.display = "flex";
      page3.style.display = "none";
      startTheGame();
    };
    winnerPlayer.score++;
    gameBoard.reset();
    clearTheScreen();
    party.confetti(page3, {
      count: party.variation.range(100, 200),
    });
  };
  const playerCardTemplate = (player) => {
    return `<div class="player-card">
  <h2>${player.playerName} (${player.shape})</h2>
  <p>Score : ${player.score}</p> 
</div>`;
  };
  const startTheGame = () => {
    document.querySelector('[data-player="one"]').innerHTML =
      playerCardTemplate(player1);
    document.querySelector('[data-player="two"]').innerHTML =
      playerCardTemplate(player2);
  };
  const changeTurn = () => {
    if (currentPlayer === player1) currentPlayer = player2;
    else currentPlayer = player1;
    document.querySelector('[data-player="one"]').style.borderTop = "none";
    document.querySelector('[data-player="two"]').style.borderTop = "none";
    if (currentPlayer === player1)
      document.querySelector(
        '[data-player="one"]'
      ).style.borderTop = `5px solid ${player1.color}`;
    else {
      document.querySelector(
        '[data-player="two"]'
      ).style.borderTop = `5px solid ${player2.color}`;
    }
  };
  const clearTheScreen = () => {
    document.querySelectorAll("[data-index]").forEach((item) => {
      item.innerText = "";
    });
  };
  return { initializeThePages };
})();

displayController.initializeThePages();

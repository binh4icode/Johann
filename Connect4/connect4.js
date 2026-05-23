let playerRed = "R";
let playerGreen = "G";
let currentPlayer = playerRed;

let gameOver = false;
let board;
let turns = 0;

let rows = 6;
let columns = 7;
let currentColumns = [];

window.onload = function() {
    setGame();
}

function setGame() {
    gameOver = false;
    turns = 0;
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5]
    currentPlayer = playerRed;

    if (currentPlayer === "R"){
        document.getElementById("currentTurn").innerText = "Red's turn"
    }
    else {
    document.getElementById("currentTurn").innerText = "Yellow's turn"
    }

    document.getElementById("resetButton").style.display = "none";
    document.getElementById("result").innerText = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

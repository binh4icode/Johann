let board = {
    1: '', 2: '', 3: '',
    4: '', 5: '', 6: '',
    7: '', 8: '', 9: ''
};
let yourTurn = true

let winCombination = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], 
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]
];

let turns = 0;

// --- Helper Functions ---

function checkWinner(player) {
    for (let i = 0; i < 8; i++) {
        let count = 0;
        for (let j = 0; j < 3; j++) {
            if (board[winCombination[i][j]] === player) {
                count++;
            }
        }
        if (count === 3) return true;
    }
    return false;
}

function checkTie() {
    // If 9 turns have passed and no winner was found
    return turns === 9;
}

function disableBtn() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("c" + i).disabled = true;
    }
}

// --- AI Logic ---

function getAiMove() {
    // Find all keys where the board is empty
    let availableMoves = Object.keys(board).filter(key => board[key] === "");
    if (availableMoves.length === 0) return null;

    // Pick a random index from the available moves array
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

function displayAimove() {

    let moveNumber = getAiMove();
    
    if (moveNumber) {
        board[moveNumber] = "O";
        document.getElementById("c" + moveNumber).value = "O";
        document.getElementById("c" + moveNumber).disabled = true;
        turns++;
        document.getElementById("ins2").textContent = "It is X's turn"

        if (checkWinner("O")) {
            document.getElementById("ins").textContent = "The winner is O!";
            disableBtn();
        } else if (checkTie()) {
            document.getElementById("ins").textContent = "It's a tie! Click reset.";
        }
    }
    yourTurn = true

}

// --- Main Game Actions ---

function mark(position) {
  if (!yourTurn) {return}
    yourTurn = false
    // 1. Prevent clicking a spot already taken
    if (board[position] !== "") return;

    // 2. Player X marks the spot
    board[position] = "X";
    document.getElementById("c" + position).value = "X";
    document.getElementById("c" + position).disabled = true;
    turns++;
            document.getElementById("ins2").textContent = "It is O's turn"

    // 3. Check for Win or Tie
    if (checkWinner("X")) {
        document.getElementById("ins").textContent = "The winner was X!";
        disableBtn();
    } else if (checkTie()) {
        document.getElementById("ins").textContent = "It's a tie! Click reset.";
    } else {
        // 4. If game continues, AI moves

        setTimeout(displayAimove, 1000); // Small delay so it feels more natural


    }
}

function reset() {
    // Reset data
    board = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
    turns = 0;
    yourTurn = true

    // Reset UI
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById("c" + i);
        cell.value = "";
        cell.disabled = false;
    }
    document.getElementById("ins2").textContent = "This game will have player X and O compete.";
    document.getElementById("ins").textContent = "";


}


/*import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAJ7nTOkCP7vMVSuLhwEmgRJ-Nkydjw6nc" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Hello World",
  });
  console.log(response.text);
}

main();

 let board = {
     1: '',
     2: '',
     3: '',
     4: '',
     5: '',
     6: '',
     7: '',
     8: '',
     9: '',

 }

 let winCombination = [
     [1,2,3], [4,5,6], [7,8,9], [1,4,7],
     [2,5,8], [3,6,9], [1,5,9], [3,5,7]
 ]

 "X" = 'X'

 function checkWinner(player) {
     for (let i=0;i < 8; i++) {
         let count = 0
             for (let j=0;j < 3;j++) {
                 if(board[winCombination[i][j]] == player) {
                     count++
                 }
                 if (count == 3) {
                     return true
                 }
             }
     }
 }
 let turns = 0
 function checkTie() {
      turns = turns + 1
  if (turns == 9) {
     return true
  } else {
     return false
  }

 }



 function disableBtn() {
     for (let i=1;i<10;i++) {
         document.getElementById("c" + i).disabled = true
     }

 }



// 1. Remove the "X" = 'X' line entirely!

function getAiMove() {
    // Use Math.floor + 1 to get a range of 1-9
    let randomNumber = Math.floor(Math.random() * 9) + 1; 
    while (board[randomNumber] !== "") {
        randomNumber = Math.floor(Math.random() * 9) + 1;
    }
    return randomNumber;
}

function displayAimove() {
    // Only move if there's space left
    if (turns >= 9) return;

    let moveNumber = getAiMove();
    
    // UPDATE BOTH THE UI AND THE DATA
    board[moveNumber] = "O"; 
    document.getElementById("c" + moveNumber).value = "O";
    document.getElementById("c" + moveNumber).disabled = true;

    // Increment turns for the AI move
    turns++;

    if (checkWinner("O")) {
        document.getElementById("ins").textContent = "The winner is O";
        disableBtn();
    } else if (turns === 9) {
        document.getElementById("ins").textContent = "Nobody has won, click reset.";
    }
}

function mark(position) {
    // Prevent marking a spot already taken
    if (board[position] !== "") return;

    document.getElementById("c" + position).value = "X";
    document.getElementById("c" + position).disabled = true;
    board[position] = "X";
    turns++; // Track the turn

    if (checkWinner("X")) {
        document.getElementById("ins").textContent = "The winner is X";
        disableBtn();
    } else if (turns === 9) {
        document.getElementById("ins").textContent = "Nobody has won, click reset.";
    } else {
        // Only let AI move if X didn't just win or tie
        displayAimove();
    }
}

 function reset() {
     board = {
     1: '',
     2: '',
     3: '',
     4: '',
     5: '',
     6: '',
     7: '',
     8: '',
     9: '',
 }
     console.log(board)


     for (let i=1;i<10;i++) {
         document.getElementById("c" + i).value = ""
         document.getElementById("c" + i).disabled = false
         document.getElementById("ins").textContent = "This game will have player X and O compete."
     }
 "X" = 'X'
 turns = 0
 }*/
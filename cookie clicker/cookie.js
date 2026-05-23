const regularCookies = ['images/PotatoPiskel.png', 'images/Happy.png', 'images/Fry.png'];
const goldenCookieImg = 'images/Rainbow.png';

const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');


let score = 0;
let timeLeft = 30;
let gameActive = false;

startBtn.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    startBtn.disabled = true;
    container.innerHTML = '';

    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            gameActive = false;
            startBtn.disabled = false;
            alert("Great Harvest! Score: " + score);
        }
    }, 1000);

    setInterval(createCookie, 800);
}


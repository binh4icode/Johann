//sets these as variables so we can do stuff to it
const cards = document.querySelectorAll('.card')
const restartButton = document.getElementById('restart')

//variables to keep track of which cards are flipped
let firstCard = null;
let secondCard = null;
let lockBoard = false; //stops extra clicks on already flipped cards

//mix cards (randomize order)
function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12) // picks random number 1-11
        card.style.order = randomPos //changes position of card
    });
}

// when card is flipped, flip it back over
function flipCard() {
    if (lockBoard) return; // do nothing if board is locked
    if (this == firstCard) return; // do nothing if you click on the same card

    this.classList.add('flipped'); // flip the card if it passes the checks

    // what if no cards are flipped, set current card to 'this'
    if (!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this; //set card equal to what we clicked

    checkForMatch(); // check for match
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value){
        disableCards(); //make the cards stay flipped 
    }
    else {
        unflipCards(); //flip back the cards
    }
}

//function to make cards stay flipped
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
     resetBoard();   
}
// function to flip cards back over
function unflipCards() {
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flipped'); //remove flipped property
        secondCard.classList.remove('flipped'); //remove flipped property
        resetBoard();
    }, 1000);
}

// reset everything to play again
function resetBoard() {
    firstCard=null;
    secondCard=null;
    lockBoard=false;
}

//when restart button is clicked, start game again
restartButton.addEventListener('click', ()=>{
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    })
    shuffleCards();
})
//loop through the cards and give them images
cards.forEach(card => {
    const value = card.dataset.value;
    const img = document.createElement('img');
    img.src = `images/${value}.png`;
    card.appendChild(img);
    card.addEventListener('click', flipCard)
})
// T H E  F I N A L  L I N E
shuffleCards();
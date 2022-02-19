'use strict';

//Selecting Elements

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0EL = document.querySelector(`#score--0`);
const score1EL = document.querySelector(`#score--1`);

const current0EL = document.getElementById(`current--0`)
const current1EL = document.getElementById(`current--1`)

const diceEL = document.querySelector(`.dice`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting Conditions

let currentScore = 0;
let activePlayer = 0;
let playing = true;
let scores = [0, 0];

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    diceEL.classList.add(`hidden`);
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
    
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;
    
}

init();
   
const switchPlayer = function(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
}

//Rolling dice functionality
btnRoll.addEventListener(`click`, function(){
    if (playing){
        // Generating random roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying dice
    diceEL.classList.remove(`hidden`);
    diceEL.src = `dice-${dice}.png`;

    //Check for rolled 1: if true, switch to next player
    if(dice !== 1){
        //Add dice to current Score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        //Change Player
        switchPlayer();    
    }        
    }    
});

btnHold.addEventListener(`click`, function(){
    if(playing){
            //Add current score to score of active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    
    //Check score is >=  100
    if(scores[activePlayer] >= 100){
        //Finish Game
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        diceEL.classList.add(`hidden`);
    } else {
        //Switch player
        switchPlayer();
    }
    }
});

btnNew.addEventListener(`click`, init)
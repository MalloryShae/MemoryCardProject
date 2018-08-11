/*
 * Create a list that holds all of your cards
 */

const cardsArray = Array.from(document.getElementsByClassName ('card'));

const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// calls the shuffle function on the cards Array, then stores in shuffledCards, then adds each shuffled card's html back to page -
let shuffledCards = shuffle(cardsArray);

shuffledCards.forEach(function(sCard){
  deck.appendChild(sCard);
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/*
 * Moves
 */

let movesDisplay = document.querySelector('.moves');

let moves = 0;

//increments the moves display counter (adds one each time there are two open cards - doesn't matter if that match or not)
let moveCounter = function(){
  moves ++;
  movesDisplay.textContent = moves;
}

/*
 * Stars
 */

const stars = document.getElementsByClassName('fa fa-star');
let starsArray = Array.from(stars);

let starCounter = function(){
  //change the star rating based on number of moves
  if (moves > 12 && moves <= 20){
      starsArray[2].style.visibility = 'hidden';
  }
  else if (moves > 20){
    starsArray[1].style.visibility = 'hidden';
  }
}

/*
 * Timer
 */

let timerOff = true;
let seconds = 0;
let minutes = 0;
let time;
const timeDisplay = document.querySelector('.timer');

let displayTime = function (){

  if (seconds < 10){
   timeDisplay.textContent = minutes+":0"+seconds;
   }
  else if (seconds >= 10 && seconds <60){
    timeDisplay.textContent = minutes+":"+seconds;
  }
  else if (seconds === 60){
    minutes++;
    seconds = 0;
    timeDisplay.textContent = minutes+":0"+seconds;
  }
}

let runTimer = function(){
  time = setInterval(function(){
    seconds++;
    displayTime();
  }, 1000);
}

/*
 * Cards
 */

let openCards = [];
let matchedCards =[];

//keep cards flipped and change color, then empty the open card array
let matched = function (){
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  matchedCards.push(openCards);
  openCards = [];
}

// wait 1 second (1000miliseconds), flip cards back, empty open card array
let unMatched = function(){
  setTimeout (function(){
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
  }, 1000);
}


/*
 * Reset
 */

let resetButton = document.querySelector('.fa-repeat');

let reset = function(){
  //clear moves when reset button is clicked
  moves = 0;
  movesDisplay.textContent = "0";
  //reset stars
  stars[2].style.visibility = 'visible';
  stars[1].style.visibility = 'visible';
  //stop and clear clock when reset is clicked - RIGHT NOW IT DOES NOT RESTART, BUT DOES CLEAR
  clearInterval(time);
  timerOff = true;
  seconds = 0;
  minutes = 0;
  timeDisplay.textContent = "";
  //reset cards
  cardsArray.forEach(function(card){
    card.classList.remove('open', 'show', 'match');
  });
  openCards = [];
  matchedCards = [];

  //shuffle cardsArray
  shuffledCards = shuffle(cardsArray);
  shuffledCards.forEach(function(sCard){
    deck.appendChild(sCard);
  })
}

resetButton.addEventListener('click', reset);

/*
 * Modal
 */

const modal = document.getElementById('win-modal');
const close = document.querySelector('.close');
const popMoves = document.querySelector('.modal-moves');
const popTime = document.querySelector('.modal-time');

/*
 * Game Play
 */

//-----loops over each 'card' in card Array---
cardsArray.forEach(function cardClick (card){

  // listens for click of each card
    card.addEventListener('click', function (){

      //starts timer - checks if timer is off, if it is off, it sets it to on, once timer is on it increase the time each second
      if (timerOff){
        runTimer();
        timerOff = false;
          }

      // Allows two cards to be flipped at a time
      if (openCards.length < 2){
        card.classList.add('open', 'show');
        openCards.push(card);

        //once two cards are open check for match
        if (openCards.length === 2){

          if (openCards[0].innerHTML === openCards[1].innerHTML){
            //if there is a match, run matched (keeps cards flipped)
            matched();
            // if there is not a match, run umMatched (flips card back)
          } else unMatched();

          // run move counter function to increase moves
          moveCounter();

          //run star counter function, decrease stars accordingly
          starCounter();
        }
      }

    // Display pop up when game is won (all cards are matched)
      if (matchedCards.length === 8){
        //stops the clock when you win
        clearInterval(time);

        // pops up the modal when you win
        modal.style.display = 'block';

        //allows the x to close the pop up window
        close.onclick = function(){
          modal.style.display = 'none';
        }

        //displays current moves in modal
        popMoves.textContent = "Moves: "+moves;

        //displays winning time in modal
        popTime.textContent = "Time: "+timeDisplay.textContent;

        //display stars in modal
        const popStars = document.querySelector('.modal-stars');
        const starsForm = document.querySelector('.stars');
        popStars.innerHTML = "Stars: "+ starsForm.innerHTML;

        //reset function in modal
        document.querySelector('.play-again').addEventListener('click',function(){
          reset();
          modal.style.display = 'none';
        });
      }


    });

  });

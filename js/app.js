/*
 * Create a list that holds all of your cards
 */

const cardsArray = Array.from(document.getElementsByClassName ('card'))

const deck = document.querySelector('.deck')

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

// calls the shuffle function on the cards Array they, stores in shuffledCards, then adds each shuffled card's html back to page - WORKS!
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
 * Flip Card + Only allow 2 cards to be flipped - WORKS
 */

// NOTES: AM 8/1 - need to separate out functions, see instructions/hints above, moved card array to the top of this page
// NOTES: AM 8/3 - working on separating out functions below, but not sure this is the solution I'm looking for. Still getting stuck on the logic after the cards are flipped. The for each loop and the nested functions within that make more sense to me. BUT I think the nesting might be what is hanging me up. Even so if you are going to be separating the functions and then calling them within the other functions then that's still the same thing so maybe this is a giant waste of time!
// NOTES: PM 8/4 - got the for each loop I was originally working on to work. Stopped trying to separate out the functions. May need to go back and do that if the hits in the starter code comments are any indication. But for now I have the card flipping and matching working. Next up I think I will try to get the moves counter to work.
// NOTES: PM 8/5 - added move counter and it works, not sure if I was allowed to switch the html to start at 0, but I did.
// Working on stars - set if else function for number of moves. 8-12 moves = 3 stars, 13-20 moves = 2 stars, >20 moves =1star
//Working on timer. Set initial font size to 0, so the timer doesn't dipslay until it starts with the first card is clicked. Not sure how to set it up for just the one click.

//GENERAL NOTE before submitting project - go back and look at lesson 21 - avoid using too many events. May need to restructure this.

let openCards = []

let movesDisplay = document.querySelector('.moves')

let moves = 0

let stars = Array.from(document.getElementsByClassName('fa fa-star'))

//-----this for each loop works, adds event listner for click and only flips two cards, stuck after that so tried for loop you see below---
cardsArray.forEach(function cardClick (card){

  // listens for click of each card
    card.addEventListener('click', function cardFLip (){

      // stops showing any cards after 2 have been flipped
      if (openCards.length < 2){
        card.classList.add('open', 'show', 'disable');
        openCards.push(card);

        //once two cards are open check for match
        if (openCards.length === 2){
          if (openCards[0].innerHTML === openCards[1].innerHTML){

            //if there is a match, keep cards flipped and change color, then empty the open card array
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            openCards = [];
          }

          //if there is not a match, wait 1 second (1000miliseconds), flip cards back, empty open card array
          else setTimeout (function(){
            openCards[0].classList.remove('open', 'show','disable');
            openCards[1].classList.remove('open', 'show','disable');
            openCards = [];
          }, 1000);

          //increments the moves display counter (adds one each time there are two open cards - doesn't matter if that match or not) --- changed html to start at 0 not sure if I was supposed to/allowed to do that
          moves ++;
          movesDisplay.textContent = moves

          //change the star rating based on number of moves
          if (moves > 12 && moves <= 20){
              stars[2].style.visibility = 'hidden';
          }
          else if (moves > 20){
            stars[1].style.visibility = 'hidden';
          }

        }

      }

    })

  });

// --- Altertanative attempts are below this line --- Everything above this line is currently what I'm working on ---


// - Attempt to separate out functions -
    // //works to 'flip' a card when for loop is run, cardFlip has to be defined before running the loop as this is pased into it
    // let cardFlip = function (){
    //   this.classList.add('open','show', 'disable');
    //   openCards.push(this);
    //   console.log(openCards.length);
    // }
    //
    // // works to add event listener to each card with a for loop instead of for each
    //   for (let x = 0; x < cardsArray.length; x++ ){
    //     cardsArray[x].addEventListener('click', cardFlip)
    //   }

// - Can't remember what I was doing here, not sure I need this anymore, but will keep just incase
    // searches for any cards with open class and creates an array
    //   let openCards = document.getElementsByClassName('open')
    //   let openArray = Array.from(openCards)
    //   let openCard1 = openArray[0]
    //   let openCard2 = openArray[1]


// - I think this was my first attempt at separating out the functions, but was still trying to use for each loop instead of regular for loop.
    /*
     * Flip Card + Allow only 2 (abandoned attempt)
     */
         //
         // const allCards = document.getElementsByClassName ('card')
         // const cardsArray = Array.from(allCards)
         //
         // let openCards = document.getElementsByClassName('open')
         // let openArray = Array.from(openCards)
         //
         // let cardFlip = cardsArray.forEach(function (card){
         //   if (openArray.length < 2){
         //      card.classList.add('open', 'show');
         //    }
         //  };
         //
         //  cardsArray.forEach(function cardClick (){
         //    card.addEventListener ('click', cardFlip)
         //  });

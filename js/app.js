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

// adds each shuffled card's html back to page - WORKS!
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

//NOTES: AM 8/1 - need to separate out functions, see instructions/hints above, need to change code below to add event Listener to each card instead of to the whole page (create for loop), moved card array to the top of this page

let openCards = []

cardsArray.forEach(function cardClick (card){

  // listens for click of each card
    card.addEventListener('click', function cardFLip (){
      // stops showing any cards after 2 have been flipped
      if (openCards.length <= 1){
        card.classList.add('open', 'show');
        openCards.push(card);
      }
      //checks for matched cards
      // openCards.forEach(function openCardMatch (open){
      //   console.log(open.innerHTML)
      // })
          // doesnt' work - continues on subsequent clicks, if you add the same if (openCards.length <=1) it doesn't work at all
    })
  });


// searches for any cards with open class and creates an array
  // let openCards = document.getElementsByClassName('open')
  // let openArray = Array.from(openCards)
  // let openCard1 = openArray[0]
  // let openCard2 = openArray[1]


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

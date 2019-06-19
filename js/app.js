var main = document.getElementById('deck');
/*
 * Create a list that holds all of your cards
 */
var node = document.querySelectorAll(".card");
var nodeList = [...node];
var moves = 0;
var stor = [];
var time;
var moveSection = document.getElementById('moves');
var starAdder = 3;
var starSection = [...document.getElementsByClassName("fa-star")];
var timeStatus = 0;
var status;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
window.onload = inceptGame();

function inceptGame() {
  var mixCards = shuffle(nodeList);
  for (var i = 0; i < mixCards.length; i++) {
    main.appendChild(mixCards[i]);
  }
}
var i = 0;
while (i < nodeList.length) {
  nodeList[i].addEventListener("click", displayCard);
  i = i + 1;
}

function displayCard() {
  if (timeStatus == 0) {
    timeStart();
    timeStatus = timeStatus + 1;
  }

  var matchedCards = document.getElementsByClassName('match');
  this.classList.add("card");
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disable");
  stor.push(this);
  if (stor.length == 2) {
    console.log(stor[0].children[0].classList.item(1));
    moves = moves + 1;
    moveSection.innerHTML = moves;
    starRating();
    if (stor[0].children[0].classList.item(1) == stor[1].children[0].classList.item(1)) {
      console.log("success");
      stor[0].classList.add("match", "disable");
      stor[1].classList.add("match", "disable");
      if (matchedCards.length == 16) {
        clearInterval(time);
        Swal.fire({
          title: "congratilations",
          html: 'you have earned <strong style="color:#ff9ff33; text-shadow:3px 3px 3px"#000">' + starAdder + '<i class="fa fa-star"> </i> </strong> <br> and you completed this name with the time of <br>' + sec + ' Seconds ' + min + ' Minutes ' + hour + ' Hours <br>' + "Moves taken to complete the game : " + moves,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Restart',
        }).then(() => {
          document.location.reload();
        });
      }
      stor = [];
    } else {
      console.log("unsuccess");
      stor[0].classList.add("unmatch");
      stor[1].classList.add("unmatch");

      stor.map((discard) => {
        setTimeout(() => {
          discard.classList.remove("unmatch", "open", "show", "disable");
        }, 200);

      })
      // starRating();

      stor = [];
    }

  }

}
var sec = 0;
var min = 0;
var hour = 0;

// var matchcards=document.getElementsByClassName('');
// time functionality
function timeStart() {
  time = setInterval(() => {
    sec = sec + 1;
    if (sec == 59) {
      sec = 0;
      min = min + 1;
    }
    if (min == 60) {
      min = 0;
      hour = hour + 1;
    }
    timer = document.getElementById('time');
    timer.innerHTML = sec + ":: " + min + " ::" + hour;
  }, 1000)

}
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

function starRating() {
  if (moves > 12 && moves <= 18) {
    starAdder = 2;
    starSection[2].style.display = 'none';
  }
  if (moves > 18) {
    starAdder = 1;
    starSection[1].style.display = 'none';
  }

}

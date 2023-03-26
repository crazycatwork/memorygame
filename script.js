const gameContainer = document.getElementById("game");



let score = 0;

let flippedCards = 0;

const scoreDiv = document.createElement("div");
scoreDiv.id = "score";
scoreDiv.style.gridColumn = 3;
scoreDiv.style.gridRow = 3;

const scoreSpan = document.createElement("div");
scoreSpan.innerText = score;

scoreDiv.append(scoreSpan);

gameContainer.append(scoreDiv);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "darkmagenta",
  "midnightblue",
  "darkseagreen",
  "khaki",
  "lavenderblush",
  "mediumvioletred",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "darkmagenta",
  "midnightblue",
  "darkseagreen",
  "khaki",
  "lavenderblush",
  "mediumvioletred"
];

let card1 = '';
let card2 = ''

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let col = 0;
  let row = 1;
  for (let color of colorArray) {
    col++;
    if(col > 5){
      col = 1;
      row++;
    }// create a new div

    if (col === 3 && row === 3){
      col++;
    }
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("covered")
    newDiv.classList.add("card");
    newDiv.style.gridColumn = col;
    newDiv.style.gridRow = row;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);


  }


}

// TODO: Implement this function!
function handleCardClick(event) {
  if (!event.target.classList.contains("covered")) return;
  if (card1 !== '' && card2 !== '') return;
  score++;
  scoreSpan.innerText = score;
  event.target.classList.remove("covered")
  if (card1 !== ''){
    card2 = event.target;
    if (card1.className !== card2.className){
      setTimeout(function(){
        card1.classList.add("covered");
        card2.classList.add("covered");
        card1 = '';
        card2 = '';
      }, 1000)
    } else if (card1.className === card2.className){
      card1 = '';
      card2 = '';
      flippedCards = flippedCards + 2;

    }
  } else {
    card1 = event.target;
  }

  if (flippedCards === 24){
    alert("YOU WIN WITH A SCORE OF " + score + "!");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

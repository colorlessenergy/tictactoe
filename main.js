// the x and o for the game
const X_IMAGE_URL = 'x.png';
const O_IMAGE_URL = 'circle.png';

function assignSpace(space, owner) {
  // create image tag
  const image = document.createElement('img');
  // image src depends what the owner value is which is the either X or O
  // which is give to when its called in either computerChooseO or in the changetoX
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  // after the image src is given the space, which is a parameter, appends a child
  // to the space that is given, which is the current div, which is the img tag
  space.appendChild(image);
  // index is the current space trying to be taken up with is found by the attribute of data-index
  const index = parseInt(space.dataset.index);
  // add a space in the takenBoxes array where the current index of the box is and a
  // X or a O
  takenBoxes[index] = owner;
  // find the index in freeBoxes array to remove the space that was just taken
  const indexToRemove = freeBoxes.indexOf(space);
  // removes the Index that was used from freeboxes array
  freeBoxes.splice(indexToRemove, 1);
  // removes the event listener so it doesn't repeat itself and all the other boxes have one
  space.removeEventListener('click', changeToX);
}

// this is the human choice
// called when the box, the grid boxes, is clicked on
function changeToX(event) {
  // calls function assignspace with the current.eventTarget, which is the div, because
  // where it is assign the event listener is given to the div "boxes"
  assignSpace(event.currentTarget, 'x');

  // checks if the game is over
  if (isGameOver()) {
    // checks if the game is over after the player tried...
    // interesting way to check if the game is finished...
    displayWinner();
  } else {
    // otherwise computer chooses
    computerChooseO();
  }
}

function computerChooseO() {
  // picks a random number within the free boxes
  const index = Math.floor(Math.random() * freeBoxes.length);
  // this is the space the computer will choose, which is suppose to be an empty box
  const freeSpace = freeBoxes[index];

  // calls assignSpace on the empty box, with parameter: owner: 0, space: current freespaces
  // choosen
  assignSpace(freeSpace, 'o');
  // check is the game is over
  if (isGameOver()) {
    // calls displayWinner after every try...
    displayWinner();
  }
}


// checks if the game is over
function isGameOver() {
  // checks by seeing if freeboxes is empty or if getWinner is not null
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  // calls getWinner should be "x" or "o"
  const winner = getWinner();
  // get the div with id of results
  const resultContainer = document.querySelector('#results');
  // creates element of h1
  const header = document.createElement('h1');
  // if else statement and checks which is the winnner
  if (winner === 'x') {
    // if winner is x make header textcontent say you win
    header.textContent = 'You win!';
  } else if (winner === 'o') {
    // if winner is o make header textContent say computer wins
    header.textContent = 'Computer wins';
  } else {
    // if noone wins say tie
    header.textContent = 'Tie';
  }
  // append the h1 to the div with id of results
  resultContainer.appendChild(header);

  // Remove remaining event listeners left on the board if the game doesn't
  // take up the whole board
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

//this check the boxes for if there are 3 in a row
function checkBoxes(one, two, three) {
  // if 1 is equal to 2 and 2 is equal to 3 and 1 is not undefined
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
        //returns the first box which is either a x or o
        return takenBoxes[one];
  }
  // eitherwise return null
  return null;
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() {
  // a for loop looping through the columns
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;
    // Check rows and columns.

    // this logic is for the first checkBoxes called
    // this is for straight across
    // if col = 0 offset = 0 * 3 = 0
    // values will be 0, 1, 2
    // if col = 1 offset = 1 * 3 = 3
    // values will be 3, 4, 5
    // if col = 2 offset = 2 * 3 = 6
    // values will be 6, 7, 8

    // this logic for the second checkBoxes called
    // which is vertical, up and down
    // if col = 0; col + 3
    // values 0, 3, 6
    // if col = 1; col + 3
    // values 1, 4, 7
    // if col = 2; col + 3
    // values 2, 5, 8
    let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
        checkBoxes(col, 3 + col, 6 + col);
    // check if result is true
    if (result) {
      // if true stop the for loop and return result
      return result;
    }
  }

  // Check diagonals
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
}

// a space to put the free boxes so the computer and human can take places
// in the grid
const freeBoxes = [];
// Map of box number -> 'x' or 'o'
// example {object}
// 0: "x"
// 1: "x"
// 2: "x"
// 3: "o"
// 8: "o"
const takenBoxes = {};
// all the boxes in the grid
const boxes = document.querySelectorAll('#grid div');
// loop through array
for (const box of boxes) {
  // add event listenenr to each one
  box.addEventListener('click', changeToX);
  // push the box to the freeboxes array
  freeBoxes.push(box);
}

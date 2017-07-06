// Initialize variables
var modes = document.querySelectorAll(".mode");
var squares = document.querySelectorAll("#squares div");
var rgbCode = document.querySelector("#rgbCode");
var numSquares;
var isHard = true;
var colorsAry = [];
var targetColor;
var feedbackMsg = document.querySelector("#feedbackMsg");
var gameOver = false;
var h1 = document.querySelector("h1")
var hardButton = document.querySelector(".hard")
var easyButton = document.querySelector(".easy")
var reset = document.querySelector("nav button:nth-of-type(1)")
// var selected = document.querySelector(".selected")

// Get started!
init();

// Set up initial page display
function init() {
  setMode();
  // setColors(numSquares);
  // pickColor(numSquares);
}



// Set mode button behaviours
for (var i = 0; i < modes.length; i++) {
  modes[i].addEventListener("click", function(){
    if (this.textContent === "Easy") {
      isHard = false;
    } else {
      isHard = true;
    }
    setMode();
    modes[0].classList.remove('selected');
    modes[1].classList.remove('selected');
    this.classList.add('selected');
  })
}


reset.addEventListener("click", function reset() {
  setMode();
})




// Determine number of squares to display, per mode
function setMode() {
  if (isHard) {
    numSquares = 6;
  } else {
    numSquares = 3;
  }
  revealSquares(numSquares);
  setColors(numSquares);
  pickColor(numSquares);
  feedbackMsg.textContent = "";
  gameOver = false;
}

// Display squares based on difficulty mode
function revealSquares(num) {
  // Iterate the full number of squares, reveal based on mode
  for (var i = 0; i < squares.length; i++) {
    // If mode is easy, don't display last three squares
    if ((isHard === false) && (i >= num)) {
      squares[i].classList.add("vanished");
    } else {
      squares[i].classList.remove("vanished");
    }

  }
}

// Collect random colors and assign to squares
function setColors(num) {
  // Remove existing colors from array
  colorsAry = [];
  // Set up colors in an array
  for (var i = 0; i < num; i++) {

    colorsAry.push(randomizeColor());
  }
  // Assign colors to squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colorsAry[i];
  }
  // Reset colors (remove inline styling) if game has been won
  easyButton.style.backgroundColor = "";
  hardButton.style.backgroundColor = "";
  h1.style.backgroundColor = "";
}

// Create a random RGB color
function randomizeColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


// Pick a random color to target in the game
function pickColor(num) {
  let randCol = Math.floor(Math.random() * num);
  targetColor = colorsAry[randCol];
  rgbCode.textContent = targetColor;
}


// Set squares behaviours
  for (let i = 0; i < numSquares; i++) {

    squares[i].addEventListener("click", function squareClick() {
      if (this.style.backgroundColor !== targetColor && gameOver === false) {
        this.classList.add("vanished");
        feedbackMsg.textContent = "Try again";
      } else {
        feedbackMsg.textContent = "You got it!";
        colorPage(targetColor);
        return gameOver = true;
      }
    })

  }


function colorPage(color) {
  for (let i = 0; i < numSquares; i++) {
    squares[i].style.backgroundColor = color;
  }
  h1.style.backgroundColor = color;
  if (isHard) {
    hardButton.style.backgroundColor = color;
  } else {
    easyButton.style.backgroundColor = color;
  }

  // selected.style.backgroundColor = color;
}


// Listen for square clicks (guesses)
// Display feedback when color is guessed
// Fade out squares when guessed wrong
// Paint the page when color is guessed



// Hook up new colors (reset) button (do this later)



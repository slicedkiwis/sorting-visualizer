// canvas and window sizes
let canvas = document.getElementById("myCanvas");
let win = window;
let windowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth;
let windowHeight = win.innerHeight || docElem.clientHeight || body.clientHeight;
canvas.width = windowWidth * 0.7;
canvas.height = windowHeight * 0.7;

// graphics//painter//context
let context = canvas.getContext("2d");

let animationSpeed = 40;
let animationMergeSpeed = 400; // special speed variable for quicksort 60fps would me 10
let animationState = [];

let barWidth;
let barWidthApart = 0.9;
let barColor = "white";
let secondaryColor = "lime";
let tertiaryColor = "red";
let pivotColor = "blue";
let arrayOfBars = [];

function generateBars() {
  for (let i = 1; i < canvas.width / (barWidth + barWidthApart); i++) {
    arrayOfBars[i] = new bar(
      arrayOfBars[i - 1].x + barWidth + barWidthApart,
      canvas.height,
      barWidth,
      Math.floor(
        Math.floor(Math.random() * canvas.height - 10) + canvas.height * 0.05
      ),
      barColor
    );
  }
}
async function render() {
  context.clearRect(0, 0, canvas.width, canvas.height); //clears screen for redraw
  for (let i = 0; i < arrayOfBars.length; i++) {
    arrayOfBars[i].draw(context);
  }
  setTimeout(function () {
    window.requestAnimationFrame(render);
  }, 1000 / 60);
}
render();

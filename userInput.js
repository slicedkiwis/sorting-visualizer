let options = [
  "quickSort",
  "mergeSort",
  "bubbleSort",
  "selectionSort",
  "insertionSort",
  "heapSort",
  "cocktailSort",
]; // array to choose random function from randomizer slider
//bar generator button
document
  .getElementsByClassName("generationButtons")[0]
  .querySelector("#bars").onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  barWidth = Number(
    document
      .getElementById("sliderContainer")
      .getElementsByClassName("sliderForm")[0]
      .querySelector("#slider").value
  );
  arrayOfBars = [
    new bar(
      canvas.width * 0.0001,
      canvas.height,
      barWidth,
      Math.floor(Math.random() * canvas.height - 10) + canvas.height * 0.4,
      barColor
    ),
  ];
  generateBars();
};
// bubble sort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#bubbleSort").onclick = function name() {
  bubbleSort();
};
//insertion sort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#insertionSort").onclick = function name() {
  insertionSort();
};
// selection sort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#selectionSort").onclick = function name() {
  selectionSort();
};
// cocktail sort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#cocktailSort").onclick = function name() {
  cocktailSort();
};
// heap sort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#heapSort").onclick = function name() {
  heapSort();
};
//quicksort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#quickSort").onclick = function () {
  quickSort(0, arrayOfBars.length - 1);
};
//merge sort
document
  .getElementsByClassName("dropdown")[0]
  .getElementsByClassName("dropdown-content")[0]
  .querySelector("#mergeSort").onclick = function name() {
  mergeSort(0, arrayOfBars.length - 1);
};
// bar width slider
document
  .getElementById("sliderContainer")
  .getElementsByClassName("sliderForm")[0]
  .querySelector("#slider").onchange = function () {
  barWidth = Number(
    document
      .getElementById("sliderContainer")
      .getElementsByClassName("sliderForm")[0]
      .querySelector("#slider").value
  );
  arrayOfBars = [
    new bar(
      canvas.width * 0.0001,
      canvas.height,
      barWidth,
      Math.floor(Math.random() * canvas.height - 10) + canvas.height * 0.4,
      barColor
    ),
  ];
  generateBars();
};
// animation speed slider
document
  .getElementById("sliderContainer")
  .getElementsByClassName("fpsForm")[0]
  .querySelector("#slider").onchange = function () {
  animationSpeed = Number(
    document
      .getElementById("sliderContainer")
      .getElementsByClassName("fpsForm")[0]
      .querySelector("#slider").value
  );
  animationMergeSpeed = 1000 / animationSpeed;
};
// randomize button
document
  .getElementsByClassName("generationButtons")[0]
  .querySelector("#randomize").onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  barWidth = Math.floor(Math.random() * 40) + 1;
  animationSpeed = Math.floor(Math.random() * 60) + 1;
  animationMergeSpeed = 1000 / animationSpeed;
  arrayOfBars = [
    new bar(
      canvas.width * 0.0001,
      canvas.height,
      barWidth,
      Math.floor(Math.random() * canvas.height - 10) + canvas.height * 0.4,
      barColor
    ),
  ];
  generateBars();
  let sortType = document
    .getElementsByClassName("dropdown")[0]
    .getElementsByClassName("dropdown-content")[0]
    .querySelector(`#${options[Math.floor(Math.random() * options.length)]}`)
    .onclick();
};

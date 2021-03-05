var cols, rows;
var grid = [];
var current;
var stack = [];
var w = 40;
var framerate = 10;
var currentMov;
var finished = false;
var preMov;
var mazeSize;
var alertShown = false;

function setup() {
  document.getElementById('mazeSize').value = getSavedValue("mazeSize");
  mazeSize = getSavedValue("mazeSize");
  document.getElementById('mazeFramerate').value = getSavedValue("mazeFramerate");

  var myCanvas = createCanvas(mazeSize * 40, mazeSize * 40);
  myCanvas.parent("canvasContainer");

  cols = floor(width / w);//round to int
  rows = floor(height / w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
  currentMov = grid[0];
}//Setup 

function draw() {
  if (finished == false) {
    background(51);
    for (var i = 0; i < grid.length; i++) { grid[i].show(); }

    current.visited = true;      //step 1
    current.highlight(true);
    markEnd();
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;       //step 2
      stack.push(current);       //step 3
      removeWalls(current, next);//step 4
      current = next;
    }
    else if (stack.length > 0) { current = stack.pop(); }

    if (stack.length == 0) {
      document.getElementById("solveButton").removeAttribute("disabled");
      currentMov = current;
    }
    else {
      document.getElementById("solveButton").setAttribute("disabled", true);
    }
  }//finished

  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) { return; }
    preMov = currentMov;
    switch (event.key) {
      case "ArrowDown":
        if (!preMov.walls[2]) {
          currentMov = grid[index(currentMov.i, currentMov.j) + parseInt(mazeSize)];
          currentMov.highlight(true);
          preMov.highlight(false);
        }
        break;
      case "ArrowUp":
        if (!preMov.walls[0]) {
          currentMov = grid[index(currentMov.i, currentMov.j) - parseInt(mazeSize)];
          currentMov.highlight(true);
          preMov.highlight(false);
        }
        break;
      case "ArrowLeft":
        if (!preMov.walls[3]) {
          currentMov = grid[index(currentMov.i, currentMov.j) - 1];
          currentMov.highlight(true);
          preMov.highlight(false);
        }
        break;
      case "ArrowRight":
        if (!preMov.walls[1]) {
          currentMov = grid[index(currentMov.i, currentMov.j) + 1];
          currentMov.highlight(true);
          preMov.highlight(false);
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  }, true);
  if (index(currentMov.i, currentMov.j) == (parseInt(mazeSize) * parseInt(mazeSize)) - 1 && alertShown == false){
    alert("Labyrinth conquered, Theseus evades the Minotaur");
    alertShown = true;
  }

  framerate = parseInt(document.getElementById("mazeFramerate").value, 10);
  saveValue(document.getElementById('mazeFramerate'));
  if (!framerate) {
    framerate = 1;
  }
  frameRate(framerate);
}//Draw 

function index(i, j) {  //bounds checking 
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) { return -1; }
  else { return i + j * cols;} //index fomula
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function markEnd() {
  var x = (cols * w) - w;
  var y = (rows * w) - w;
  fill(255, 69, 0);
  rect(x+w/4, y+w/4, w/2, w/2);
  noStroke();
}

function download_image() {
  var canvas = document.getElementById("defaultCanvas0");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
}

function saveValue(x) {//function to save user inputs for the refresh
  var id = x.id;
  var val = x.value;
  localStorage.setItem(id, val);
}

function getSavedValue(x) {//function to get saved input value
  if (!localStorage.getItem(x)) { return 10; }
  else {  return localStorage.getItem(x); }
}

function solveVar() {
  finished = true;
}

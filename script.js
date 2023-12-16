const colorWhite = "offwhite";
const colorBlack = "black";
const colorGray  = "gray";

const colorRainbow = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];

window.onload = (event) => {
    console.log('The page has fully loaded');
    updateGrid();
};

let gridSize = 10;

let sizeBtn =  document.querySelector("#sizebtn");
sizeBtn.addEventListener("click", () => {
    let newSize = prompt("Enter grid size (max 100)", "10");
    
    if (!isNaN(newSize) && newSize>0 && newSize<101){
        gridSize = newSize;
        updateGrid();
    }
});

const rainbowToggle = document.querySelector('#rainbowmode');
let rainbowFlag = false;

rainbowToggle.addEventListener('click', (event) => {
  let btn = event.target;
  rainbowFlag = !rainbowFlag;
  btn.classList.toggle(colorGray);

  if (rainbowFlag) {
    darkenFlag = false;
    darkenToggle.classList.remove(colorGray);
  }
});

const darkenToggle = document.querySelector("#darkenmode");
let darkenFlag = false;

darkenToggle.addEventListener('click', (event) => {
    let btn = event.target;
    darkenFlag = !darkenFlag;
    btn.classList.toggle(colorGray);
  
    if (darkenFlag) {
        rainbowFlag = false;
        rainbowToggle.classList.remove(colorGray);
    }
  });

function clickCell(event) {
    let div = event.target;

    if (rainbowFlag){
        div.style.backgroundColor = colorRainbow[Math.floor(Math.random()*100)%7];
        return;
    }
    div.style.backgroundColor = "";
    div.removeAttribute("class");
    div.classList.add(colorBlack);
}

function hoverCell(event) {
    let div = event.target;
    if (div.classList.contains(colorWhite)) {
        div.classList.remove(colorWhite);
        div.classList.add(colorGray);
    }
}

function unhoverCell(event) {
    let div = event.target;
    if (div.classList.contains(colorGray)) {
        div.classList.remove(colorGray);
        div.classList.add(colorWhite);
    }
}

function updateGrid() {
    let canvas = document.querySelector(".canvas");
    clearGrid(canvas);
    let positionInfo = canvas.getBoundingClientRect();
    let size = (positionInfo.height - 8) / gridSize;

    for (let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize; j++){
            let childDiv = createCell(size);
            canvas.appendChild(childDiv);
        }
    }
}

function clearGrid(canvas) {
    canvas.textContent = "";
}

function createCell(size) {
    let childDiv = document.createElement("div");
    childDiv.classList.add(colorWhite);
    childDiv.style.width = size + "px";
    childDiv.style.height = size + "px";

    childDiv.addEventListener("click", clickCell);
    childDiv.addEventListener("mouseenter", hoverCell);
    childDiv.addEventListener("mouseleave", unhoverCell);

    return childDiv;
}


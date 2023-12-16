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

function clickCell(event) {
    let div = event.target;
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
    let size = positionInfo.height / gridSize;
    console.log(size);

    for (let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize; j++){
            let childDiv = createCell(size);
            console.log(childDiv.className);
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


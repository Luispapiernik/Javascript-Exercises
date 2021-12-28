// pencil modes
ERASER = 0
ONE_COLOR = 1
RANDOM = 2

let oldColor = "black";
let currentColor = "black";
let currentMode = ONE_COLOR;

const canvas = document.querySelector(".canvas");

function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getColor(){
    if (currentMode === ERASER){
        return "white";
    } else if (currentMode === ONE_COLOR){
        return currentColor;
    } else if (currentMode === RANDOM){
        return getRandomColor();
    } 
}

function changePencilMode(newMode){
    if (newMode == ERASER){
        oldColor = currentColor;
        currentColor = "white";
    } else if (newMode == ONE_COLOR){
        currentColor = oldColor;
    } else if (newMode == RANDOM) {
        oldColor = currentColor;
        currentColor = getRandomColor();
    }

    currentMode = newMode;
}

function clearCanvas(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.style.backgroundColor = "";
    });
}

function toggleGrid(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.classList.toggle("grid");
    });
}


function createCells(cellsPerSide) {
    canvas.innerHTML = "";
    for(let i = 0; i < cellsPerSide; i++){
        // se debe crear la fila
        let row = document.createElement("div");
        row.classList.add("row");
        for(let j = 0; j < cellsPerSide; j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener("mouseover", e => {
                currentColor = getColor();
                cell.style.setProperty("--current-color", currentColor);

                if (e.buttons === 1){
                    if (currentColor == "white"){
                        cell.style.backgroundColor = "";
                    }else{
                        cell.style.backgroundColor = currentColor;
                    }
                }
            });

            cell.addEventListener("mousedown", e => {
                if (currentColor == "white"){
                    cell.style.backgroundColor = "";
                }else{
                    cell.style.backgroundColor = currentColor;
                }
            })

            row.appendChild(cell);
        }

        canvas.appendChild(row);
    }
}

createCells(4);

const eraser = document.querySelector(".eraser");
eraser.addEventListener("click", () => changePencilMode(ERASER))

const pencil = document.querySelector(".pencil");
pencil.onclick = () => changePencilMode(ONE_COLOR);

const rainbow = document.querySelector(".rainbow");
rainbow.onclick = () => changePencilMode(RANDOM);

const clear = document.querySelector(".clear");
clear.onclick = clearCanvas;

const grid = document.querySelector(".grid");
grid.onclick = toggleGrid;

const size = document.getElementById("size");
size.textContent = " 4x4"

const slider = document.querySelector("#my-range");
slider.oninput = function() {
    createCells(this.value);
    toggleGrid()
    size.textContent = ` ${this.value}x${this.value}`;
};

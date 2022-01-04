let canvas;
let backgroundColor = "white";
let drawColor = "black";
let withGrid = false;
let gridSize = 4;
let game = new GameOfLife(gridSize, gridSize);


function updateGame () {

}


function showMatrix () {
    let widthPerCell = Math.floor(width / gridSize);
    let heightPerCell = Math.floor(height / gridSize);

    let table = game.getTable();
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (table[i][j] === 1){
                fill(drawColor)
                rect(i * widthPerCell, j * heightPerCell, widthPerCell, heightPerCell);
            }
        }
    }
}

function showMouse () {
    let widthPerCell = Math.floor(width / gridSize);
    let heightPerCell = Math.floor(height / gridSize);

    let i = Math.floor(mouseX / widthPerCell);
    let j = Math.floor(mouseY / heightPerCell);

    fill(drawColor)
    rect(i * widthPerCell, j * heightPerCell, widthPerCell, heightPerCell);
}


function resizeLogic () {
    resizeCanvas(
        Math.floor(document.documentElement.clientWidth * 50 / 100),
        Math.floor(document.documentElement.clientHeight * 90 / 100),
    );

    background(backgroundColor);
}


function setup () {
    // The create canvas only admits pixels units, so in order to set the size
    // to a value of (90vh, 90vh) a conversion if needed
    canvas = createCanvas(
        Math.floor(document.documentElement.clientWidth * 50 / 100),
        Math.floor(document.documentElement.clientHeight * 90 / 100),
    );

    canvas.style('display', 'block');
    canvas.parent("right");
}


function draw () {
    // In case of a window size change
    resizeLogic();
    showMatrix();
    showMouse();
}

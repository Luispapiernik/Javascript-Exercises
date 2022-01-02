let canvas;
let backgroundColor = "white";
let drawColor = "black";
let withGrid = false;
let gridSize = 4;

let backgroundColorPicker = document.getElementById("background-color");
backgroundColorPicker.addEventListener(
    "change", (event) => {backgroundColor = event.target.value;}
);

let drawColorPicker = document.getElementById("front-color");
drawColorPicker.addEventListener(
    "change", (event) => {drawColor = event.target.value;}
);

let gridButton = document.getElementById("grid");
gridButton.addEventListener(
    "click", () => {withGrid = !withGrid;}
);

let sliderInput = document.querySelector("#slider input");
let sliderSpan = document.querySelector("#slider span");
sliderInput.addEventListener(
    "change", (event) => {
        sliderSpan.textContent = `${event.target.value} x ${event.target.value}`;
});

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
}

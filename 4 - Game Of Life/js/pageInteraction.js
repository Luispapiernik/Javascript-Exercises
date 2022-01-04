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

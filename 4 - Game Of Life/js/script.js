let canvas;
let backgroundColor = "white";

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

let completeOperation = "";
let stringToParse = "";
let lastOperator = null;
let firstOperand = null;
let secondOperand = null;
let lastResult = null;

const operation = document.querySelector(".operation");
const result = document.querySelector(".result");

function isOperator(string){
    return [" / ", " x ", " - ", " + "].includes(string);
}

function parseString(){
    let number = new Number(stringToParse);
    stringToParse = "";

    return parseFloat(number.toFixed(3));
}

function operate(){
    let result; 
    if (lastOperator === " + "){
        result = firstOperand + secondOperand;
    } else if (lastOperator === " - "){
        result = firstOperand - secondOperand;
    } else if (lastOperator === " x "){
        result = firstOperand * secondOperand;
    } else if (lastOperator === " / " ){
        result = firstOperand / secondOperand;
    }
    return parseFloat(result.toFixed(3));
}

function writeSymbol(elem){
    let string = elem.textContent;

    let mustConcat = true;
    if (isOperator(string)){
        if (firstOperand === null) {
            firstOperand = parseString();
            lastOperator = string;
            stringToParse = "";
        } else if (firstOperand !== null && lastOperator === null) {
            lastOperator = string;
            stringToParse = "";
        } else if (firstOperand !== null && secondOperand === null) {
            secondOperand = parseString();
            lastResult = operate();

            stringToParse = ""
            completeOperation = `${lastResult}`;

            firstOperand = lastResult;
            secondOperand = null;
            lastOperator = string;
        }
    } else if (string === " = ") {
        mustConcat = false;
        if (firstOperand === null) {
            firstOperand = parseString();
            stringToParse = "";
        } else if (firstOperand !== null && secondOperand === null) {
            secondOperand = parseString();
            lastResult = operate();

            stringToParse = ""
            completeOperation = completeOperation.concat(` = ${lastResult}`);

            firstOperand = lastResult;
            secondOperand = null;
            lastOperator = null;
        }
    } else {
        stringToParse = stringToParse.concat(string);
    }

    if (mustConcat){
        completeOperation = completeOperation.concat(string);
    }

    operation.textContent = completeOperation;
    result.textContent = stringToParse;

    if (completeOperation.includes("=")){
        completeOperation = `${lastResult}`;
    }
}

const buttons = document.querySelectorAll(".normal");
buttons.forEach(button => {
    button.addEventListener("click", e => {
        writeSymbol(button);
    })
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", e => {
    completeOperation = "";
    stringToParse = "";
    lastOperator = null;
    firstOperand = null;
    secondOperand = null;
    lastResult = null;

    operation.textContent = completeOperation;
    result.textContent = "0";
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", e => {
    if (stringToParse.length > 0){
        stringToParse = stringToParse.slice(0, -1)
        completeOperation = completeOperation.slice(0, -1)

        operation.textContent = completeOperation;
        result.textContent = stringToParse;
    }
});

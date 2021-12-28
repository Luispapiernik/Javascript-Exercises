function Timer(func, intervalTime) {
    let intervalReference = setInterval(func, intervalTime);

    this.stop = function() {
        if (intervalReference) {
            clearInterval(intervalReference);
            intervalReference = null;
        }
        return this;
    }

    this.start = function() {
        if (!intervalReference) {
            this.stop();
            intervalReference = setInterval(func, intervalTime);
        }
        return this;
    }
}

function addMovement(identifier, movement){
    movementsElement = document.querySelector(`.${identifier} .plays`);

    movementElement = document.createElement("img");
    movementElement.setAttribute("src", `../images/${movement}.svg`);
    movementElement.setAttribute("alt", movement.toUpperCase());
    movementElement.classList.add(movement);

    movementsElement.appendChild(movementElement);
}

function updateLifeAmount(identifier, amount){
    const lifeElement = document.querySelector(`.${identifier} .life-status`);

    const alive = "&#10084;&#65039; ".repeat(amount);
    const dead = "&#128148; ".repeat(5 - amount);
    lifeElement.innerHTML = `${alive}${dead}`;
}

let playerLife = 5;
let computerLife = 5;

updateLifeAmount("player", playerLife);
updateLifeAmount("computer", computerLife);

const rock = document.createElement("img");
rock.setAttribute("src", "../images/rock.svg");
rock.setAttribute("alt", "ROCK");
rock.classList.add("rock");

const paper = document.createElement("img");
paper.setAttribute("src", "../images/paper.svg");
paper.setAttribute("alt", "PAPER");
paper.classList.add("paper");

const scissors = document.createElement("img");
scissors.setAttribute("src", "../images/scissors.svg");
scissors.setAttribute("alt", "SCISSORS");
scissors.classList.add("scissors");

const hand = document.querySelector(".interative .computer")

function changeComputerHand(){
    const weaponElement = hand.querySelector("img");
    const weapon = weaponElement.getAttribute("class");
    hand.removeChild(weaponElement);
    switch (true) {
        case weapon == "rock":
            hand.appendChild(paper)
            break;
        case weapon == "paper":
            hand.appendChild(scissors)
            break;
        case weapon == "scissors":
            hand.appendChild(rock)
            break;
    }
}

const WEAPONS = ["ROCK", "PAPER", "SCISSORS"];

function computerPlay(){
    let option = Math.floor(Math.random() * 3);
    return WEAPONS[option];
}

function getGameResult(playerSelection, computerSelection){
    let upperPlayerSelection = playerSelection.toUpperCase();
    let upperComputerSelection = computerSelection.toUpperCase();

    let userIndex = WEAPONS.indexOf(upperPlayerSelection);
    let computerIndex = WEAPONS.indexOf(upperComputerSelection);

    let to_add = userIndex == 0 && computerIndex == 2 ? 1 : 0;
    to_add += userIndex == 2 && computerIndex == 0 ? 1 : 0;
    userIndex = (userIndex + to_add) % 3;
    computerIndex = (computerIndex + to_add) % 3;

    switch (true){
        case upperPlayerSelection == upperComputerSelection:
            return "Draw!";
        case userIndex > computerIndex:
            computerLife -= 1;
            return "You win!";
        default:
            playerLife -= 1;
            return "You lose!";
    }
}

let timer = new Timer(changeComputerHand, 500);

const hands = document.querySelectorAll(".interative .player img");
hands.forEach(hand => {
    hand.addEventListener('click', (e) => {
        const playerSelection = hand.getAttribute("class");
        const computerSelection = computerPlay().toLowerCase();

        timer.stop()
        addMovement("player", playerSelection);
        addMovement("computer", computerSelection);

        updateLifeAmount("player", playerLife);
        updateLifeAmount("computer", computerLife);

        let result = getGameResult(playerSelection, computerSelection);
        const element = document.querySelector(".interative span");
        element.textContent = result;

        if (computerLife == 0){
            window.location.replace("../views/you_win.html");
        } else if (playerLife == 0) {
            window.location.replace("../views/you_lose.html");
        } else {
            setTimeout(() => {
                timer.start();
                element.textContent = "Choose a weapon below";
            }, 1000)
        }
    });
});

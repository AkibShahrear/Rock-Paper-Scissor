var optionsArray = ["rock", "paper", "scissor"];
var userScore = 0;
var computerScore = 0;
var userSelectedChoice = "";
var computerSelectedChoice = "";
const DEFAULT_IMG_SRC = "./Resource/loading.gif";

async function userClick(element,choice) {
    userSelectedChoice = choice;
    computerSelectedChoice = "";
    setUserSection(userSelectedChoice);
    await loadComputerChoice();
    setScore();
    setWinner();
}

function setUserSection(userChoice) {
    let userSection = document.getElementById('UserSection');
    let userSectionDiv = document.createElement("div");
    userSectionDiv.setAttribute("class", "ButtonStyle");

    let imgSrc;
    switch (userChoice) {
        case "rock":
            imgSrc = "./Resource/rocks.png";
            break;
        case "paper":
            imgSrc = "./Resource/documents.png";
            break;
        case "scissor":
            imgSrc = "./Resource/scissor.png";
            break;
        default:
            imgSrc = DEFAULT_IMG_SRC;
    }

    userSectionDiv.innerHTML = `<img src="${imgSrc}" alt="${userChoice}" id="UserMove"/>`;
    userSection.innerHTML = userSectionDiv.outerHTML;
}

async function loadComputerChoice(delay = 2000) {
    let computerGeneratedDiv = getComputerGeneratedDiv("default");
    setComputerSection(computerGeneratedDiv);

    await new Promise(resolve => {
        setTimeout(() => {
            showComputerChoice();
            resolve();
        }, delay);
    });
}

function showComputerChoice() {
    let computerChoice = getComputerChoice();
    computerSelectedChoice = computerChoice;
    let computerGeneratedDiv = getComputerGeneratedDiv(computerChoice);
    setComputerSection(computerGeneratedDiv);
}

function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
}

function setComputerSection(computerGeneratedDiv) {
    let computerSection = document.getElementById('ComputerSection');
        if (computerSection) {
            computerSection.innerHTML = computerGeneratedDiv.outerHTML;
        } else {
            console.error("Computer section element not found");
        }
        computerSection.innerHTML = computerGeneratedDiv.outerHTML;
}

function getComputerGeneratedDiv(computerChoice) {
    let computerGeneratedDiv = document.createElement("div");
    computerGeneratedDiv.setAttribute("class", "ButtonStyle");

    let imgSrc;
    switch (computerChoice) {
        case "rock":
            imgSrc = "./Resource/rocks.png";
            break;
        case "paper":
            imgSrc = "./Resource/documents.png";
            break;
        case "scissor":
            imgSrc = "./Resource/scissor.png";
            break;
        default:
            imgSrc = "./Resource/loading.gif";
    }

    computerGeneratedDiv.innerHTML = `<img src="${imgSrc}" alt="${computerChoice}" id="ComputerMove"/>`;
    return computerGeneratedDiv;
}

function setScore() {
    if (userSelectedChoice === computerSelectedChoice) {
        alert("Match Draw");
    } else if (
        (userSelectedChoice === "rock" && computerSelectedChoice === "scissor") ||
        (userSelectedChoice === "paper" && computerSelectedChoice === "rock") ||
        (userSelectedChoice === "scissor" && computerSelectedChoice === "paper")
    ) {
        userScore++;
    } else {
        computerScore++;
    }
    setScoreInScreen();
    setWinner();
    userSelectedChoice = "";
    computerSelectedChoice = "";
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    let defaultComputerGeneratedDiv = getComputerGeneratedDiv("default");
    setScoreInScreen();
    setWinner();
    setUserSection("");
    setComputerSection(defaultComputerGeneratedDiv);
}

function setScoreInScreen() {
    let userScoreDiv = document.getElementById('UserScore');
    let computerScoreDiv = document.getElementById('ComputerScore');
    if (userScoreDiv) userScoreDiv.innerHTML = userScore;
    if (computerScoreDiv) computerScoreDiv.innerHTML = computerScore;
}

function setWinner() {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = userScore > computerScore ? "User Win" : userScore < computerScore ? "Computer Win" : "Match Draw";
}
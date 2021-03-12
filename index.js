const item = document.querySelectorAll(".item");
const scoreText = document.querySelector(".score-text");
let scoreActual = 0;
let score = JSON.parse(localStorage.getItem("score")) + scoreActual;

const tagMain = document.querySelector(".main");
const selectedOption = document.querySelector(".selected-option");
const imgOptionUser = document.querySelector(".img-option-user").firstElementChild;
const borderOptionUser = document.querySelector(".img-option-user");

const imageDisabled = document.querySelector(".img-option-disabled");
const resultDiv = document.querySelector(".result");
const textResult = document.querySelector(".result").firstElementChild;
const optionBotBorder = document.querySelector(".img-option-bot");
const imgOptionBot = document.querySelector(".img-option-bot").firstElementChild;

window.addEventListener("load", () => {
  scoreText.textContent = score;
});

const saveScore = (scoreUser) => {
  localStorage.setItem("score", scoreUser);
  scoreText.textContent = localStorage.getItem("score");
}

const result = (status, optionCpu) => {
  imageDisabled.style.display = "none";
  optionBotBorder.style.display = "flex";
  optionBotBorder.id = optionCpu;
  imgOptionBot.setAttribute("src", `images/icon-${optionCpu}.svg`);

  //LOSE
  if (status === 0) {
    textResult.textContent = "YOU LOSE";
    score > 0 ? score-- : score = 0;

    score.textContent = score;
  } else if (status === 1) {  //WIN
    textResult.textContent = "YOU WIN"
    score++;
    score.textContent = score;
  } else if (status === 2) { //DRAW
    score = score;
    textResult.textContent = "DRAW";
  }

  saveScore(score);
  resultDiv.style.display = "block";
}

const verifiedResult = (user, cpu) => {
  if (user == cpu) {
      result(2, cpu);
  } else if (user == "rock") {
   
    if (cpu == "paper") {
        result(0, cpu);
    } else if (cpu == "scissors") {
        result(1, cpu);
    }
  } else if (user == "paper") {
    if (cpu == "scissors") {
        result(0, cpu);
    } else if (cpu == "rock") {
        result(1, cpu)
    }
  } else if (user == "scissors") {
    if (cpu == "rock") {
        result(0, cpu)
    } else if (cpu == "paper") {
        result(1, cpu)
    }
  }
}

const finalPlay = (optionUser, optionCpu) => {
  tagMain.style.display = "none";
  imgOptionUser.setAttribute("src", `images/icon-${optionUser}.svg`);
  borderOptionUser.id = optionUser;
  selectedOption.style.display = "flex";

  verifiedResult(optionUser, optionCpu);
}

for (let i = 0; i < item.length; ++i) {
  item[i].addEventListener("click", (e) => {
    let currentTarget = e.currentTarget;
    let selectedOption = currentTarget.id;

    let optionRandom = Math.floor((Math.random() * 3));
    let option = ["paper", "scissors", "rock"];
    let botOption = option[optionRandom];
    finalPlay(selectedOption, botOption);
  });
}

let buttonPlay = document.querySelector(".btn-play");

buttonPlay.addEventListener("click", () => {
  imageDisabled.style = "block";
  tagMain.style.display = "block";
  resultDiv.style.display = "none";
  selectedOption.style.display = "none";
  optionBotBorder.style.display = "none";
});

//RULES
const buttonRules = document.querySelector(".rules");
const menuRules = document.querySelector(".rules-menu");
const buttonExitRules = document.getElementById("btn-close-menu");

let menuOpen = false;

buttonRules.addEventListener("click", ()=> {
  menuRules.style.visibility = "visible";
  menuRules.style.opacity = "1";
});

buttonExitRules.addEventListener("click", () => {
  setTimeout(()=> {
    menuRules.style.visibility = "hidden";

  }, 1000);
  menuRules.style.opacity = "0";
});

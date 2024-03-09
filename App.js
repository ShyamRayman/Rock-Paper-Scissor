let displayButton = document.querySelector(".display");

let isPlaying = false;
let intervalId;

document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
  } else if (event.key === "r") {
    player("rock");
  } else if (event.key === "p") {
    player("paper");
  } else if (event.key === "s") {
    player("scissors");
  } else if (event.key === "Backspace") {
    displayOn();
  }

  console.log(event);
});

function autoPlay() {
  if (!isPlaying) {
    intervalId = setInterval(() => {
      let computerMove = randomNum();
      player(computerMove);
      isPlaying = true;
      document.querySelector(".play-button").innerHTML = "Playing...";
    }, 1000);
  } else {
    isPlaying = false;
    document.querySelector(".play-button").innerHTML = "AutoPlay";
    clearInterval(intervalId);
  }
}

function displayOn() {
  if (!displayButton.classList.contains("display-on")) {
    displayButton.classList.add("display-on");
  } else {
    displayButton.classList.remove("display-on");
  }
}

function displayYesOff() {
  setTimeout(() => {
    displayButton.classList.remove("display-on");
  }, 500);
}

let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};

handleScore();

function player(playerMove) {
  let computerMove = randomNum();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "lose";
    } else if (computerMove === "scissors") {
      result = "win";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else if (computerMove === "scissors") {
      result = "lose";
    }
  }

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "lose";
    } else if (computerMove === "paper") {
      result = "win";
    } else if (computerMove === "scissors") {
      result = "tie";
    }
  }

  if (result === "win") {
    score.win++;
  } else if (result === "tie") {
    score.tie++;
  } else if (result === "lose") {
    score.lose++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  handleScore();

  document.querySelector(".status").innerHTML = `Result : ${result}`;

  document.querySelector(
    ".result"
  ).innerHTML = `you picked <img src="./images/${playerMove}-emoji.png" alt="" class="move-icon"> <img src="./images/${computerMove}-emoji.png" alt="" class="move-icon"> computer picked`;
}

function handleScore() {
  document.querySelector(
    ".score"
  ).innerHTML = `win:${score.win} lose:${score.lose} tie:${score.tie}`;
}

function randomNum() {
  let randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber > 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber > 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

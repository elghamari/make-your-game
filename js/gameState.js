let score = 0;
let isPaused = false;
const scoreElement = document.querySelector(".score");
const pauseScreen = document.querySelector("#pause-screen");
export const addScore = (points)=> {
    score += points;
    scoreElement.innerText = score;
}

export const togglePause = ()=> {
    isPaused = !isPaused;
    if (isPaused) {
        pauseScreen.classList.add("visible")
    } else {
        pauseScreen.classList.remove("visible")
    }
}

export const getPauseState = ()=> {
   return isPaused;
}

export const resetGameState = ()=> {
    score = 0;
    scoreElement.innerText = score;
}
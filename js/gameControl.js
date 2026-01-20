import { restAliens, createAliens } from "./moveAliens.js";
import { restLaser } from "./laser.js";
import { initPlayerPosition, createPlayer, resetPlayer } from "./movePlayer.js";
import { createBunker } from "./createBunker.js";
import { resetMoveAliens } from "./moveAliens.js"; 

let score = 0;
let isPaused = false;
let isGameEnded = false; 

const scoreElement = document.querySelector(".score");
const pauseScreen = document.querySelector("#pause-screen");
const gameStatus = document.getElementById("game-status");
const statuTitle = document.querySelector('.statu-title')

export const addScore = (points)=> {
    score += points;
    scoreElement.innerText = score;
}

export const togglePause = ()=> {
    if (isGameEnded) return;

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

export const gameState = (statu, clas) => {
    isPaused = true;
    isGameEnded = true; 
    
    statuTitle.innerText = statu
    statuTitle.classList.add(clas)
    gameStatus.classList.add('visible')
}

export const changeState = (state) => {
    isPaused = state
}


let totalGameTime = 0;  
let startTime = null;   

export const getGameTime = (currentTime) => {
    if (startTime === null) {
        startTime = currentTime;
    }
    const delta = currentTime - startTime;
    startTime = currentTime;
    if (!getPauseState()) {
        totalGameTime += delta;
    }

    return totalGameTime;
};

export const handlePause = (e) => {
    if (e && e.type === "keydown" && e.key.toLowerCase() !== "p") return; 
    if (isGameEnded) return;

    togglePause(); 
    
    if (!getPauseState()) {
        startTime = null; 
        document.getElementById("game-board").focus();
    }
};

export const restartGame = () => {
    if (getPauseState()) {
         isPaused = false; 
         pauseScreen.classList.remove("visible");
    }
    isGameEnded = false; 
    
    totalGameTime = 0;
    startTime = null; 
    
    restAliens();       
    restLaser();      
    resetMoveAliens();  
    resetPlayer();      
    resetGameState();   
    
    const bunkerContainer = document.getElementById("bunker-container");
    if (bunkerContainer) bunkerContainer.innerHTML = "";
    const statusClass = statuTitle.classList[1]
    if (statusClass) statuTitle.classList.remove(statusClass)

    createPlayer();
    initPlayerPosition(); 
    createAliens();
    createLives();
    createBunker();
    
    document.getElementById("game-board").focus();
};

export const initGame = () => {
    totalGameTime = 0;
    startTime = null;
    isGameEnded = false; 
    createPlayer();
    createAliens();
    createLives();
    createBunker();
    initPlayerPosition();
}

export function toggleView(onStart) {
    const startScreen = document.getElementById('start-screen');
    const gameBoard = document.getElementById('screen');
    const startButton = document.querySelector('.play-action p');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameBoard.style.display = 'block';
        onStart(); 
    });
}

const lives = document.getElementById('lives')
export const createLives = () => {
    lives.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const live = document.createElement('div')
        live.classList.add('live')
        lives.append(live)
    }

}


const timerDisplay = document.getElementById('timer-display')
export const updateTime = (time) => {
    const totalSeconds = Math.floor(time/1000)
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const Seconds = (totalSeconds % 60).toString().padStart(2, '0')
    timerDisplay.innerText = `${minutes}:${Seconds}`
}

export const checkTimeLimit = (time) => {
    if (time >= 90000) {
        gameState("GAME OVER 'time-up'", "game-over")
    }
}
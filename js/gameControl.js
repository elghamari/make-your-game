import { togglePause, getPauseState, resetGameState } from "./gameState.js";
import { restAliens, createAliens } from "./createAliens.js";
import { restLaser } from "./laser.js";
import { initPlayerPosition, createPlayer, resetPlayer } from "./movePlayer.js";
import { createLives } from "./updateLives.js";
import { createBunker } from "./createBunker.js";
import { resetMoveAliens } from "./moveAliens.js"; 

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

    togglePause(); 
    
    if (!getPauseState()) {
        startTime = null; 
        document.getElementById("game-board").focus();
    }
};

export const restartGame = () => {
    if (getPauseState()) togglePause();
    
    totalGameTime = 0;
    startTime = null; 
    
    restAliens();       
    restLaser();      
    resetMoveAliens();  
    resetPlayer();      
    resetGameState();   
    
    const bunkerContainer = document.getElementById("bunker-container");
    if (bunkerContainer) bunkerContainer.innerHTML = "";

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
    createPlayer();
    createAliens();
    createLives();
    createBunker();
    initPlayerPosition();
}
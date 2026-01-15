import { createAliens, restAliens } from "./createAliens.js";
import { moveAliens, moveAlienExtra, resetMoveAliens } from "./moveAliens.js";
import { movePlayer, createPlayer, initPlayerPosition, keys } from "./movePlayer.js";
import { toggleView } from "./toggleView.js";
import { createBunker } from "./createBunker.js";
import { createLives } from "./updateLives.js";
import { updateTime } from "./updateTime.js";
import { moveLasers, shoot, restLaser, moveAlienLasers, alientShoot } from "./laser.js";
import { togglePause, getPauseState, resetGameState } from "./gameState.js";

let startTime = null;
export const gameLoop = (time) => {
    if (startTime === null) startTime = time;

    if (!getPauseState()) {
        alientShoot(time)
        moveLasers()
        moveAlienLasers()
        moveAliens();
        movePlayer();
        moveAlienExtra(time);
        updateTime(time - startTime);
        if (keys[" "]) {
            shoot(time);
        }
    }
    requestAnimationFrame(gameLoop);
};

document.addEventListener("keydown", e => {
    if (e.key === "p" || e.key === "P") {
        togglePause();
    }
});

document.getElementById("btn-continue").addEventListener("click", () => {
    togglePause();
    document.getElementById("game-board").focus();
});

document.getElementById("btn-restart").addEventListener("click", () => {
    togglePause();
    restAliens();
    restLaser();
    resetGameState();
    resetMoveAliens();
    document.getElementById("bunker-container").innerHTML = "";

    startTime = null;
    initPlayerPosition();
    createAliens();
    createLives();
    createBunker();
    document.getElementById("game-board").focus();
});

const startGame = () => {
    console.log("Game Started!");
    startTime = null;
    createPlayer();
    createAliens();
    createLives();
    createBunker();
    initPlayerPosition();
    requestAnimationFrame(gameLoop);
};

toggleView(startGame);
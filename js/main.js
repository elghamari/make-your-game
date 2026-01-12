import { createAliens } from "./createAliens.js";
import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer, initPlayerPosition } from "./movePlayer.js";
import { toggleView } from "./toggleView.js"; 
import { createBunker } from "./createBunker.js" 
import { createLives } from "./updateLives.js"
import { updateTime } from "./updateTime.js"

let startTime = null
export const gameLoop = (time) => {
    if (startTime === null) startTime = time
    moveAliens();
    movePlayer();
    moveAlienExtra(time)
    updateTime(time)
    requestAnimationFrame(gameLoop);
};

const startGame = (time) => {
    console.log("Game Started!");
    startTime = null
    createAliens();
    createLives();
    initPlayerPosition();
    createBunker();
    requestAnimationFrame(gameLoop); 
};

toggleView(startGame);
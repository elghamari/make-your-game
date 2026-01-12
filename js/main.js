import { createAliens } from "./createAliens.js";
import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer, initPlayerPosition, keys } from "./movePlayer.js";
import { toggleView } from "./toggleView.js"; 
import { createBunker } from "./createBunker.js" 
import { createLives } from "./updateLives.js"
import { updateTime } from "./updateTime.js"
import { moveLasers, shoot } from "./laser.js";

let startTime = null
export const gameLoop = (time) => {
    if (startTime === null) startTime = time
    moveAliens();
    movePlayer();
    moveAlienExtra(time)
    updateTime(time - startTime)
    if (keys[" "]) {
        shoot(time);
    }
    moveLasers();
    requestAnimationFrame(gameLoop);
};

const startGame = () => {
    console.log("Game Started!"); 
    startTime = null
    initPlayerPosition();
    createAliens();
    createLives();
    createBunker();
    requestAnimationFrame(gameLoop); 
};

toggleView(startGame);
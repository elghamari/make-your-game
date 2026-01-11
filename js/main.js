import { createAliens } from "./createAliens.js";
import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer, initPlayerPosition } from "./movePlayer.js";
import { toggleView } from "./toggleView.js"; 
import { createBunker } from "./createBunker.js" 
import { moveLasers, shoot } from "./laser.js";
import { keys } from "./movePlayer.js";


export const gameLoop = (time) => {
    moveAliens();
    movePlayer();
    moveAlienExtra(time)
    if (keys[" "]) {
        shoot(time);
    }
    moveLasers();
    requestAnimationFrame(gameLoop);
};


const startGame = () => {
    console.log("Game Started!"); 
    initPlayerPosition();
    createAliens();
    createBunker()
    requestAnimationFrame(gameLoop); 
};

toggleView(startGame);

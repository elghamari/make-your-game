import { createAliens } from "./createAliens.js";
import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer, initPlayerPosition } from "./movePlayer.js";
import { toggleView } from "./toggleView.js"; 


export const gameLoop = (time) => {
    moveAliens();
    movePlayer();
    moveAlienExtra(time)
    requestAnimationFrame(gameLoop);
};


const startGame = () => {
    console.log("Game Started!"); 
    createAliens(); 
    initPlayerPosition();
    requestAnimationFrame(gameLoop); 
};

toggleView(startGame);

import { createAliens } from "./createAliens.js";
import { moveAliens } from "./moveAliens.js";
import { movePlayer } from "./movePlayer.js";
import { toggleView } from "./toggleView.js"; 


export const gameLoop = () => {
    moveAliens();
    movePlayer();
    requestAnimationFrame(gameLoop);
};


const startGame = () => {
    console.log("Game Started!"); 
    createAliens(); 
    requestAnimationFrame(gameLoop); 
};

toggleView(startGame);
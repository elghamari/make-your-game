import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer, keys } from "./movePlayer.js";
import { toggleView } from "./toggleView.js";
import { updateTime } from "./updateTime.js";
import { moveLasers, shoot, moveAlienLasers, alientShoot } from "./laser.js";
import { getPauseState } from "./gameState.js";

import { handlePause, restartGame, getGameTime, initGame } from "./gameControl.js";
export const gameLoop = (time) => {
    if (!getPauseState()) {
        const gameTime = getGameTime(time); 

        alientShoot(gameTime); 
        moveLasers();
        moveAlienLasers();
        moveAliens();
        movePlayer();
        moveAlienExtra(gameTime);
        updateTime(gameTime);
        
        if (keys[" "]) {
            shoot(gameTime); 
        }
    }
    requestAnimationFrame(gameLoop);
};

document.addEventListener("keydown", handlePause);
document.getElementById("btn-continue").addEventListener("click", handlePause);
document.getElementById("btn-restart").addEventListener("click", restartGame);

const startGame = () => {
    initGame(); 
    requestAnimationFrame(gameLoop);
};

toggleView(startGame);
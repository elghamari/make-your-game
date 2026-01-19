import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer, keys } from "./movePlayer.js";
import { toggleView } from "./toggleView.js";
import { updateTime, checkTimeLimit } from "./updateTime.js";
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
        checkTimeLimit(gameTime)
        if (keys[" "]) shoot(gameTime)
    }
    requestAnimationFrame(gameLoop);
};

document.addEventListener("keydown", handlePause);
document.getElementById("btn-continue").addEventListener("click", handlePause);
document.getElementById("btn-restart").addEventListener("click", restartGame);
document.getElementById("btn-play-again").addEventListener("click", () => {
    const gameStatus = document.getElementById('game-status')
    gameStatus.classList.remove("visible")
    restartGame()
});

const resizeGame = () => {
    const container = document.getElementById('game-container');
    if (!container) return;
    const baseWidth = 900;
    const baseHeight = 800;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scale = Math.min(
        windowWidth / baseWidth, 
        windowHeight / baseHeight
    );

    if (windowWidth < 600) {
        container.style.transform = `scale(${scale})`; 
    } else {
        container.style.transform = `scale(${scale * 0.95})`;
    }
}

window.addEventListener('load', resizeGame);
window.addEventListener('resize', resizeGame);
resizeGame();

const startGame = () => {
    initGame(); 
    requestAnimationFrame(gameLoop);
};

toggleView(startGame);
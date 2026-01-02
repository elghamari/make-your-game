import { createAliens } from "./createAliens.js";
import { moveAliens } from "./moveAliens.js";
import { movePlayer } from "./movePlayer.js";

createAliens()
export const gameLoop = () => {
    moveAliens()
    movePlayer()
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)
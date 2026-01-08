console.log("befor ----------------");

import { createAliens } from "./createAliens.js";
import { moveAliens, moveAlienExtra } from "./moveAliens.js";
import { movePlayer } from "./movePlayer.js";
console.log("after +++++++++++++++++");


createAliens()
export const gameLoop = (time) => {
    moveAliens()
    movePlayer()
    moveAlienExtra(time)
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)
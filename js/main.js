import { createAliens } from "./createAliens.js";
import { moveAliens } from "./moveAliens.js";
import { movePlayer } from "./movePlayer.js";

createAliens()
requestAnimationFrame(moveAliens)
movePlayer()
import { createAliens } from "./createAliens.js";
import { moveAliens } from "./moveAliens.js";

createAliens()

requestAnimationFrame(moveAliens)
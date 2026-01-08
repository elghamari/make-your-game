import { getAlienExtra } from "./createAliens.js";

const board = document.getElementById('game-board')
const aliensGrid = document.getElementById('aliens-grid')
let x = 0, y = 0, direction = 1, speed = 2, dropStep = 20

export const moveAliens = () => {
    const boardWidth = board.offsetWidth
    const boardHeight = board.offsetHeight
    const gridWidth = aliensGrid.offsetWidth
    const gridHeight = aliensGrid.offsetHeight
    x += speed * direction
    if (x + gridWidth >= boardWidth) {
        direction = -1
        y += dropStep
        x = boardWidth - gridWidth
    }
    if (x <= 0) {
        direction = 1
        y += dropStep
        x = 0
    }
    if (y + gridHeight >= boardHeight-30) {
        console.log("Game Over");
        return;
    }
    aliensGrid.style.left = x + "px"
    aliensGrid.style.top = y + "px"
}

let extraX = 0, extraDirection = 1, extraActive = false, extraSpeed = 0, lastExtraTime = 0

export const moveAlienExtra = (time) => {
    const alienExtra = getAlienExtra()
    const boardWidth = board.offsetWidth
    const alienExtraWidth = alienExtra.offsetWidth
    if (!extraActive && time - lastExtraTime >= 4000) {
        lastExtraTime = time
        extraActive = true

        const fromLeft = Math.random() < 0.5
        extraDirection = fromLeft ? 1 : -1

        extraX = fromLeft ? -alienExtraWidth : boardWidth
        alienExtra.style.display = "block"

        extraSpeed = (boardWidth + alienExtraWidth) / (3 * 60)
    }

    if (!extraActive) return

    extraX += extraDirection * extraSpeed
    alienExtra.style.left = extraX + "px"

    if (extraX > boardWidth + alienExtraWidth || extraX < -alienExtraWidth * 2) {
        extraActive = false
        alienExtra.style.display = "none"
    }
}
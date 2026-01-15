import { getAlienExtra, aliens } from "./createAliens.js";
import { gameState } from "./gameState.js"

const board = document.getElementById('game-board')
const aliensGrid = document.getElementById('aliens-grid')
let x = 0, y = 0, direction = 1, speed = 2, dropStep = 5
let counter = 0
export const moveAliens = () => {
    const boardHeight = board.offsetHeight
    const gridHeight = aliensGrid.offsetHeight
    const edges = getRealEdges()
    const boardRect = board.getBoundingClientRect();
    x += speed * direction
    if (edges.right >= boardRect.right) {
        direction = -1
        y += dropStep
        counter++
    }
    if (edges.left <= boardRect.left) {
        direction = 1
        y += dropStep
        counter++
    }
    if (y + gridHeight >= boardHeight - 40) {
        gameState("GAME OVER", "game-over")
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
    if (!extraActive && time - lastExtraTime >= 15000 && counter >= 2) {
        lastExtraTime = time
        extraActive = true

        const fromLeft = Math.random() < 0.5
        extraDirection = fromLeft ? 1 : -1

        extraX = fromLeft ? -alienExtraWidth : boardWidth
        alienExtra.style.display = "block"

        extraSpeed = (boardWidth + alienExtraWidth) / (5 * 60)
    }

    if (!extraActive) return

    extraX += extraDirection * extraSpeed
    alienExtra.style.left = extraX + "px"

    if (extraX > boardWidth + alienExtraWidth || extraX < -alienExtraWidth * 2) {
        extraActive = false
        alienExtra.style.display = "none"
    }
}

export const resetMoveAliens = () => {
    x = 0;
    y = 0;
    direction = 1;
    counter = 0;
    extraActive = false;
    extraX = 0;
    lastExtraTime = 0;
}

const getRealEdges = () => {
    let leftEdge = board.offsetWidth
    let rightEdge = 0
    aliens.forEach(alien => {
        if (alien.element.style.visibility === "hidden") return
        const alienRect = alien.element.getBoundingClientRect();
        if (alienRect.right > rightEdge) rightEdge = alienRect.right;
        if (alienRect.left < leftEdge) leftEdge = alienRect.left;
    });
    return { left: leftEdge, right: rightEdge }
}
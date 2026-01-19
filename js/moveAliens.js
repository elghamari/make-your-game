import { gameState } from "./gameControl.js"

let alienExtra = null
export const aliens = []
export const createAliens = () => {
    const aliensGrid = document.getElementById('aliens-grid');
    for (let i = 1; i <= 60; i++) {
        const alien = document.createElement('div')
        let points = 0
        if (i > 0 && i <= 12) {
            alien.style.backgroundImage = "url('./assets/green.png')"
            points = 30 
        } else if (i > 12 && i <= 36) {
            alien.style.backgroundImage = "url('./assets/yellow.png')"
            points = 20
        } else if (i > 36) {
            alien.style.backgroundImage = "url('./assets/red.png')"
            points = 10
        }
        alien.classList.add('alien')
        aliensGrid.appendChild(alien)
        aliens.push({
            element : alien,
            points: points
        });
    }
    const alienExtraDiv = document.createElement('div')
    alienExtraDiv.style.backgroundImage = "url('./assets/extra.png')"
    alienExtraDiv.classList.add('alienExtra')
    document.getElementById('game-board').appendChild(alienExtraDiv)
    alienExtra = alienExtraDiv
}

export const getAlienExtra = () => alienExtra


export const restAliens = () => {
    const aliensGrid = document.getElementById('aliens-grid');
    
    if (aliensGrid) {
        aliensGrid.innerHTML = "";
        aliensGrid.style.transform = `translate(0px, 0px)`
    }

    aliens.length = 0;
    const extra = document.querySelector('.alienExtra');
    if (extra) extra.remove();
}

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
    aliensGrid.style.transform = `translate(${x}px, ${y}px)`
}

let extraX = 0, extraDirection = 1, extraActive = false, extraSpeed = 0, lastExtraTime = 0

export const moveAlienExtra = (time) => {
    const alienExtra = getAlienExtra()
    if (!alienExtra) return
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
    alienExtra.style.transform = `translateX(${extraX}px)`

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
    speed = 2; 

    extraActive = false;
    extraX = 0;
    lastExtraTime = 0;
    aliensGrid.style.transform = `translate(0px, 0px)`
    const alienExtra = getAlienExtra();
    if (alienExtra) {
        alienExtra.style.display = "none"
        alienExtra.style.transform = `translateX(0px)`
    }
}

const getRealEdges = () => {
    let leftEdge = Infinity
    let rightEdge = -Infinity
    aliens.forEach(alien => {
        if (alien.element.style.visibility === "hidden") return
        const alienRect = alien.element.getBoundingClientRect();
        if (alienRect.right > rightEdge) rightEdge = alienRect.right;
        if (alienRect.left < leftEdge) leftEdge = alienRect.left;
    });
    return { left: leftEdge, right: rightEdge }
}


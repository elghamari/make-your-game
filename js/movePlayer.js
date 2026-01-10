const board = document.getElementById('game-board')
const player = document.getElementById('player')

let x = 0, step = 4

const keys = {
    ArrowRight: false,
    ArrowLeft: false
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight"|| e.key === "ArrowLeft") {
        keys[e.key] = true
    }
}) 
document.addEventListener("keyup", e => {
    if (e.key === "ArrowRight"|| e.key === "ArrowLeft") {
        keys[e.key] = false
    }
}) 

export const initPlayerPosition = () => {
    x = (board.offsetWidth -player.offsetWidth) /2;
    player.style.left = x + "px"
}

export const movePlayer = () => {
    const boardWidth = board.offsetWidth
    const playerWidth = player.offsetWidth
    if (keys.ArrowRight) {
        x += step
    }
    if (keys.ArrowLeft) {
        x -= step
    }
    if (x < 0) x = 0
    const maxX = boardWidth - playerWidth
    if (x > maxX) x = maxX 
    player.style.left = x + "px"
}
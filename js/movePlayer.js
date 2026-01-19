export const board = document.getElementById('game-board')
export const playerSection = document.getElementById('player-section')
export let player = null

let x = 0, step = 4

export const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    " ": false
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight"|| e.key === "ArrowLeft" || e.key === " ") {
        keys[e.key] = true
    }
}) 
document.addEventListener("keyup", e => {
    if (e.key === "ArrowRight"|| e.key === "ArrowLeft" || e.key === " ") {
        keys[e.key] = false
    }
}) 

export const initPlayerPosition = () => {
    x = (board.offsetWidth -player.offsetWidth) /2;
    // player.style.left = x + "px"
    player.style.transform = `translate(${x}px, 0px)`
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
    // player.style.left = x + "px"
    player.style.transform = `translate(${x}px, 0px)`
}

export const createPlayer = () => {
    const newPlayer = document.createElement('div')
    newPlayer.id = "player"
    playerSection.append(newPlayer)
    player = newPlayer
}

export const resetPlayer = () => {
    if (player) {
        player.remove();
        player = null; 
    }

    keys.ArrowRight = false;
    keys.ArrowLeft = false;
    keys[" "] = false;
    x = 0;
    if(player) player.style.transform = `translate(0px, 0px)`
}
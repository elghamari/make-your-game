const board = document.getElementById('game-board')
const aliensGrid = document.getElementById('aliens-grid')
const player = document.getElementById('player')

let x = player.offsetLeft, step = 10
export const movePlayer = () => {
    const boardWidth = board.offsetWidth
    const playerWidth = player.offsetWidth
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") {
            x += step
        }
        if (e.key === "ArrowLeft") {
            x -= step
        }
        if (x < 0) x = 0
        const maxX = boardWidth - playerWidth
        if (x > maxX) x = maxX 
        player.style.left = x + "px"
    })    
}
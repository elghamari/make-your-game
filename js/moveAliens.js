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
    if (y + gridHeight >= boardHeight) {
        console.log("Game Over");
        return;
    }
    aliensGrid.style.left = x + "px"
    aliensGrid.style.top = y + "px"
    requestAnimationFrame(moveAliens)
}
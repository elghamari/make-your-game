const bunkerContainer = document.getElementById('bunker-container')
export const createBunker = () => {
    for (let i = 1; i <= 4; i++) {
        const wall = document.createElement('div')
        wall.classList.add('wall')
        for (let j = 1; j <= 70; j++) {
            const wallPart = document.createElement('div')
            wallPart.classList.add('wall-part')
            if (j === 1 || j === 10 || (j >= 43 && j <= 48) ||
                (j >= 53 && j <= 58) || (j >= 63 && j <= 68)){
                wallPart.style.visibility = "hidden"
            }
            wall.append(wallPart)
        }
        bunkerContainer.append(wall)
    }
}



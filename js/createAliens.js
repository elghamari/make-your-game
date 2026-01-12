let alienExtra = null
export const aliens = []
export const createAliens = () => {
    const aliensGrid = document.getElementById('aliens-grid');
    for (let i = 1; i <= 60; i++) {
        const alien = document.createElement('div')
        if (i > 0 && i <= 12) {
            alien.style.backgroundImage = "url('./assets/green.png')"
        } else if (i > 12 && i <= 36) {
            alien.style.backgroundImage = "url('./assets/yellow.png')"
        } else if (i > 36) {
            alien.style.backgroundImage = "url('./assets/red.png')"
        }
        alien.classList.add('alien')
        aliensGrid.appendChild(alien)
        aliens.push(alien);
    }
    const alienExtraDiv = document.createElement('div')
    alienExtraDiv.style.backgroundImage = "url('./assets/extra.png')"
    alienExtraDiv.classList.add('alienExtra')
    document.getElementById('game-board').appendChild(alienExtraDiv)
    alienExtra = alienExtraDiv
}

export const getAlienExtra = () => alienExtra

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
        aliensGrid.style.top = "0px"; 
        aliensGrid.style.left = "0px"; 
    }

    aliens.length = 0;
    const extra = document.querySelector('.alienExtra');
    if (extra) extra.remove();
}
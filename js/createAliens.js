export const createAliens = () => {
    const aliensGrid = document.getElementById('aliens-grid');
    for (let i = 0; i < 28; i++) {
        const alien = document.createElement('div')
        alien.classList.add('alien')
        aliensGrid.appendChild(alien)
    }
}

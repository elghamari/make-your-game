const lives = document.getElementById('lives')
export const createLives = () => {
    lives.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const live = document.createElement('div')
        live.id = 'live'
        lives.append(live)
    }

}
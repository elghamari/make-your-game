const lives = document.getElementById('lives')
export const createLives = () => {
    lives.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const live = document.createElement('div')
        live.classList.add('live')
        lives.append(live)
    }

}
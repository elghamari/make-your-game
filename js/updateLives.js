const lives = document.getElementById('lives')
export const createLives = () => {
    for (let i = 0; i < 3; i++) {
        const live = document.createElement('div')
        live.id = 'live'
        lives.append(live)
    }

}
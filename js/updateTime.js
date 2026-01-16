import { gameState } from "./gameState.js"

const timerDisplay = document.getElementById('timer-display')
export const updateTime = (time) => {
    const totalSeconds = Math.floor(time/1000)
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const Seconds = (totalSeconds % 60).toString().padStart(2, '0')
    timerDisplay.innerText = `${minutes}:${Seconds}`
}

export const checkTimeLimit = (time) => {
    if (time >= 90000) {
        gameState("GAME OVER 'time-up'", "game-over")
    }
}
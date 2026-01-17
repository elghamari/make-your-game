import { player, board } from "./movePlayer.js";
import { aliens, getAlienExtra } from "./createAliens.js";
import { wallParts } from "./createBunker.js"
import { addScore, gameState, changeState } from "./gameState.js";
const timerDisplay = document.getElementById('timer-display')

const laserSpeed = 10;
const cooldownTime = 600;
let lastShootTime = 0;
const lasers = []
let alientLaser = []

const checkCollision = (rect1, rect2) => {
    return (rect1.left < rect2.right
        && rect1.right > rect2.left
        && rect1.top < rect2.bottom
        && rect1.bottom > rect2.top
    )
}
export const shoot = (time) => {
    if ((time - lastShootTime) > cooldownTime) {
        const laser = document.createElement("div");
        laser.classList.add("laser");
        board.append(laser)
        const playerRect = player.getBoundingClientRect()
        const boardRect = board.getBoundingClientRect()
        let coordX = (playerRect.left - boardRect.left) + (player.offsetWidth / 2) - (laser.offsetWidth / 2)
        let coordY = (playerRect.top - boardRect.top)
        laser.style.left = coordX + "px"
        laser.style.top = coordY + "px"
        lastShootTime = time;
        lasers.push(laser);
    }
}

export const moveLasers = () => {
    for (let i = lasers.length - 1; i >= 0; i--) {
        let laser = lasers[i];
        let newTop = laser.offsetTop - laserSpeed;
        laser.style.top = newTop + "px";
        if (newTop < 0) {
            laser.remove();
            lasers.splice(i, 1);
            continue;
        }
        CheckWallCollision(lasers, laser, i)
        let rectLaser = laser.getBoundingClientRect();
        for (let j = 0; j < aliens.length; j++) {
            let alienData = aliens[j];
            let alienDiv = alienData.element;
            let rectAlien = alienDiv.getBoundingClientRect();

            if (checkCollision(rectLaser, rectAlien)) {
                // alien.remove();
                alienDiv.style.visibility = "hidden";
                laser.remove();
                lasers.splice(i, 1);
                addScore(alienData.points);
                if (aliens.length === 0) {
                    gameState("YOU WIN!", "you-win")
                }
                break;
            }
        }
        let alienExtra = getAlienExtra();
        if (lasers.includes(laser) && alienExtra && alienExtra.style.display === "block") {
            let rectAlienExtra = alienExtra.getBoundingClientRect();
            if (checkCollision(rectLaser, rectAlienExtra)) {
                alienExtra.style.display = "none";
                laser.remove();
                lasers.splice(i, 1);
                let point = Math.floor(Math.random() * 200) + 100;
                addScore(point);
            }
        }
        for (let j = 0; j < alientLaser.length; j++) {
            const alien_laser = alientLaser[j]
            const alienLaserRect = alien_laser.getBoundingClientRect()
            if (checkCollision(rectLaser, alienLaserRect) && lasers.includes(laser) && alientLaser.includes(alien_laser)) {
                laser.remove()
                lasers.splice(i, 1)
                alien_laser.remove()
                alientLaser.splice(j, 1)
                break
            }
        }
    }
}

export const restLaser = () => {
    for (let i = 0; i < lasers.length; i++) {
        lasers[i].remove();
    }
    lasers.length = 0;
    for (let i = 0; i < alientLaser.length; i++) {
        alientLaser[i].remove();
    }
    alientLaser.length = 0;
    lastShootTime = 0;
    lastAlienShootTime = 0;
    nextCooldown = 600;
}

export const getShooter = () => {
    const columns = {}
    aliens.forEach(alien => {
        if (alien["element"].style.visibility === "hidden") return
        const x = alien["element"].offsetLeft
        if (!columns[x]) columns[x] = []
        columns[x].push(alien["element"])
    })
    const shooters = []
    Object.values(columns).forEach(col => {
        col.sort((a, b) => a.offsetTop - b.offsetTop)
        shooters.push(col[0])
    })
    const index = parseInt(Math.random() * shooters.length)
    return shooters[index]
}

let lastAlienShootTime = 0
let nextCooldown = 600
export const alientShoot = (time) => {
    if ((time - lastAlienShootTime) > nextCooldown) {
        const shooter = getShooter()
        if (shooter === undefined || shooter === null) {
            return
        }
        const laser = document.createElement("div")
        laser.classList.add("alien-laser")
        board.append(laser)
        const shooterRect = shooter.getBoundingClientRect()
        const boardRect = board.getBoundingClientRect()
        let coordX = (shooterRect.left - boardRect.left) + (shooter.offsetWidth / 2) - (laser.offsetWidth / 2)
        let coordY = (shooterRect.top - boardRect.top) + shooter.offsetHeight
        laser.style.left = coordX + "px"
        laser.style.top = coordY + "px"
        nextCooldown = Math.round(Math.random() * (600 - 300) + 300)
        lastAlienShootTime = time
        alientLaser.push(laser)
    }
}
export const moveAlienLasers = () => {
    for (let i = alientLaser.length - 1; i >= 0; i--) {
        let laser = alientLaser[i]
        let newTop = laser.offsetTop + laserSpeed
        laser.style.top = newTop + "px";
        let boardHeight = board.offsetHeight
        if (newTop > boardHeight) {
            laser.remove();
            alientLaser.splice(i, 1);
            continue;
        }
        CheckWallCollision(alientLaser, laser, i)
        let rectLaser = laser.getBoundingClientRect();
        if (alientLaser.includes(laser) && player) {
            let rectPlayer = player.getBoundingClientRect();
            if (checkCollision(rectLaser, rectPlayer)) {
                let lives = Array.from(document.querySelectorAll('.live'))
                player.style.display = "none";
                laser.remove();
                alientLaser.splice(i, 1);
                const live = lives.pop()
                live.remove()
                if (lives.length === 0) {
                    gameState("GAME OVER", "game-over")
                    return
                }
                changeState(true)
                timerDisplay.classList.add('time-animation')
                setTimeout(() => {
                    changeState(false)
                    player.style.display = "block";
                    timerDisplay.classList.remove('time-animation')
                }, 1000);
            }
        }

    }
}

const CheckWallCollision = (lasers, laser, i) => {
    let rectLaser = laser.getBoundingClientRect();
    for (let k = 0; k < wallParts.length; k++) {
        let wall = wallParts[k]
        let rectWall = wall.getBoundingClientRect()
        if (checkCollision(rectLaser, rectWall) && wall.style.visibility != "hidden") {
            wall.style.visibility = "hidden"
            wallParts.splice(k, 1);
            lasers.splice(i, 1);
            laser.remove();
            break
        }
    }
}
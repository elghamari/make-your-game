import { player, board } from "./movePlayer.js";
import { aliens, getAlienExtra } from "./createAliens.js";
import { wallParts } from "./createBunker.js"

import { addScore } from "./gameState.js";

const laserSpeed = 10;
const cooldownTime = 1000;
let lastShootTime = 0;
const lasers = []


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
        let coordX = player.offsetLeft + (player.offsetWidth / 2) - (laser.offsetWidth / 2)
        let coordY = player.offsetTop;
        laser.style.left = coordX + "px";
        laser.style.top = coordY + "px"
        lastShootTime = time;
        console.log("it's happend ");
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
        let rectLaser = laser.getBoundingClientRect();
        for (let k = 0; k < wallParts.length; k++) {
            let wall = wallParts[k]
            let rectWall = wall.getBoundingClientRect()
            if (checkCollision(rectLaser, rectWall) && wall.style.visibility != "hidden") {
                wall.style.visibility = "hidden"
                wallParts.splice(k,1);
                lasers.splice(i,1);
                laser.remove();
                break
            }
        }
        for (let j = 0; j < aliens.length; j++) {
            let alienData = aliens[j];
            let alienDiv = alienData.element;
            let rectAlien = alienDiv.getBoundingClientRect();

            if (checkCollision(rectLaser, rectAlien)) {
                console.log("BOM");
                // alien.remove();
                alienDiv.style.visibility = "hidden";
                aliens.splice(j, 1);
                laser.remove();
                lasers.splice(i, 1);
                addScore(alienData.points);
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
                console.log("extra hit");
                let point = Math.floor(Math.random() * 200) + 100;
                addScore(point);
                console.log(point);
            }
        }
    }
}

export const getShooters = () => {
    const columns = {}
    aliens.forEach(alien => {
        if (alien.style.visibility === "hidden") return
        const x = alien.offsetLeft
        if (!columns[x]) columns[x] = []
        columns[x].push(alien)
    })
    const shooters = []
    Object.values(columns).forEach( col => {
        col.sort((a, b) => a.offsetTop - b.offsetTop)
        shooters.push(col[0])
    })
    return shooters
}
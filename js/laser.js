import { player, board } from "./movePlayer.js";
import { aliens } from "./createAliens.js";
import { getAlienExtra } from "./createAliens.js";


const laserSpeed = 10;
const cooldownTime = 1000;
let lastShootTime = 0;
const lasers = []


const checkCollision = (rect1,rect2) => {
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
        let coordX = player.offsetLeft + (player.offsetWidth) / 2 - (laser.offsetWidth) / 2
        let coordY = player.offsetTop - laser.offsetHeight;
        laser.style.left = coordX + "px";
        laser.style.top = coordY + "px"
        lastShootTime = time;
        console.log("it's happend ");
        lasers.push(laser);
    }
}

export const moveLasers = ()=> {
    for (let i = lasers.length-1; i >=0 ; i--) {
        let laser = lasers[i];
        let newTop = laser.offsetTop - laserSpeed;
        laser.style.top = newTop + "px";
        if(newTop < 0) {
            laser.remove();
            lasers.splice(i,1);
            continue;
        }
        let rectLaser = laser.getBoundingClientRect();
        for (let j = 0; j < aliens.length; j++) {
            let alien = aliens[j];
            let rectAlien = alien.getBoundingClientRect();
            if(checkCollision(rectLaser,rectAlien)) {
                console.log("BOM");
                // alien.remove();
                alien.style.visibility = "hidden";
                aliens.splice(j,1);
                laser.remove();
                lasers.splice(i,1);
                break
            }
        }
        let alienExtra = getAlienExtra();
        if(lasers.includes(laser) && alienExtra  && alienExtra.style.display === "block") {
            let rectAlienExtra = alienExtra.getBoundingClientRect();
            if(checkCollision(rectLaser,rectAlienExtra)) {
                alienExtra.style.display = "none";
                laser.remove();
                lasers.splice(i,1);
                console.log("extra hit");
                
            }
        }
    }
}


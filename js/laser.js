import { player, board } from "./movePlayer.js";

const laserSpeed = 10;
const cooldownTime = 1000;
let lastShootTime = 0;
const lasers = []

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
            lasers.splice(i,1)
        }
    }
}
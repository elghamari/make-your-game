let score = 0;

const scoreElement = document.querySelector(".score");

export const addScore = (points)=> {
    score += points;
    scoreElement.innerText = score;
}
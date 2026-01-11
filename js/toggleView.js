export function toggleView(onStart) {
    const startScreen = document.getElementById('start-screen');
    const gameBoard = document.getElementById('screen');
    const startButton = document.querySelector('.play-action p');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameBoard.style.display = 'block';
        onStart(); 
    });
}
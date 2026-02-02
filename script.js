const player = document.getElementById('player');
const gameArea = document.querySelector('.game-area');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

let playerPos = 180;
let score = 0;
let gameInterval;
let blocks = [];
let speed = 2;

// Move player
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft' && playerPos > 0){
        playerPos -= 20;
    }
    if(e.key === 'ArrowRight' && playerPos < 360){
        playerPos += 20;
    }
    player.style.left = playerPos + 'px';
});

// Create falling blocks
function createBlock() {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.top = '0px';
    block.style.left = Math.floor(Math.random() * 10) * 40 + 'px';
    gameArea.appendChild(block);
    blocks.push(block);
}

// Update game loop
function updateGame() {
    score++;
    scoreEl.textContent = "Score: " + score;

    blocks.forEach((block, index) => {
        let blockTop = parseInt(block.style.top);
        blockTop += speed;
        block.style.top = blockTop + 'px';

        // Check collision
        let blockLeft = parseInt(block.style.left);
        if(blockTop + 40 >= 560 && blockTop <= 600 && blockLeft === playerPos){
            clearInterval(gameInterval);
            alert("Game Over! Your score: " + score);
        }

        // Remove block if out of screen
        if(blockTop > 600){
            gameArea.removeChild(block);
            blocks.splice(index, 1);
        }
    });
}

// Start game
function startGame() {
    score = 0;
    blocks.forEach(b => gameArea.removeChild(b));
    blocks = [];
    playerPos = 180;
    player.style.left = playerPos + 'px';
    gameInterval = setInterval(() => {
        if(Math.random() < 0.03) createBlock();
        updateGame();
    }, 20);
}

restartBtn.addEventListener('click', startGame);

// Initial start
startGame();
document.getElementById('leftBtn').addEventListener('click', () => {
    if(playerPos > 0) playerPos -= 20;
    player.style.left = playerPos + 'px';
});

document.getElementById('rightBtn').addEventListener('click', () => {
    if(playerPos < 360) playerPos += 20;
    player.style.left = playerPos + 'px';
});

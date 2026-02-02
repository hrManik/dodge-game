const player = document.getElementById('player');
const gameArea = document.querySelector('.game-area');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let playerPos = 180;
let score = 0;
let gameInterval;
let blocks = [];
let speed = 2;

// --- Player Movement ---
// Keyboard controls
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft' && playerPos > 0) playerPos -= 20;
    if(e.key === 'ArrowRight' && playerPos < 360) playerPos += 20;
    player.style.left = playerPos + 'px';
});

// Mobile button touch controls
leftBtn.addEventListener('touchstart', () => {
    if(playerPos > 0) playerPos -= 20;
    player.style.left = playerPos + 'px';
});
rightBtn.addEventListener('touchstart', () => {
    if(playerPos < 360) playerPos += 20;
    player.style.left = playerPos + 'px';
});

// Swipe controls
let touchStartX = 0;
gameArea.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});
gameArea.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if(touchEndX < touchStartX - 20 && playerPos > 0) playerPos -= 20; // swipe left
    if(touchEndX > touchStartX + 20 && playerPos < 360) playerPos += 20; // swipe right
    player.style.left = playerPos + 'px';
});

// --- Create Falling Blocks ---
function createBlock() {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.top = '0px';
    block.style.left = Math.floor(Math.random() * 10) * 40 + 'px';
    gameArea.appendChild(block);
    blocks.push(block);
}

// --- Update Game ---
function updateGame() {
    score++;
    scoreEl.textContent = "Score: " + score;

    blocks.forEach((block, index) => {
        let blockTop = parseInt(block.style.top);
        blockTop += speed;
        block.style.top = blockTop + 'px';

        // Collision detection
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

// --- Start Game ---
function startGame() {
    score = 0;
    blocks.forEach(b => gameArea.removeChild(b));
    blocks = [];
    playerPos = 180;
    player.style.left = playerPos + 'px';

    clearInterval(gameInterval); // stop previous interval
    gameInterval = setInterval(() => {
        if(Math.random() < 0.03) createBlock();
        updateGame();
    }, 20);
}

restartBtn.addEventListener('click', startGame);

// Start automatically
startGame();

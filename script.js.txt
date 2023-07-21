// script.js (game logic for game.html)

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let score = 0;

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function incrementScore() {
  score++;
}

function handleClick(e) {
  incrementScore();
}

canvas.addEventListener('click', handleClick);

// Additional game logic and drawing code can be added here

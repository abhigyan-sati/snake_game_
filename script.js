document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const gridSize = 20;
    const squares = [];
    let snake = [2, 1, 0];
    let direction = 1;
    let foodIndex = 0;
    let intervalId = 0;

    function createGrid() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const square = document.createElement('div');
            squares.push(square);
            board.appendChild(square);
        }
    }

    createGrid();

    function drawSnake() {
        snake.forEach(index => squares[index].classList.add('snake'));
    }

    function removeSnake() {
        snake.forEach(index => squares[index].classList.remove('snake'));
    }

    function drawFood() {
        do {
            foodIndex = Math.floor(Math.random() * squares.length);
        } while (squares[foodIndex].classList.contains('snake'));

        squares[foodIndex].classList.add('food');
    }

    function moveSnake() {
        const tail = snake.pop();
        squares[tail].classList.remove('snake');
        snake.unshift(snake[0] + direction);
        checkCollision();
        eatFood();
        drawSnake();
    }

    function checkCollision() {
        if (
            (snake[0] % gridSize === 0 && direction === -1) || // Hit left edge
            (snake[0] % gridSize === gridSize - 1 && direction === 1) || // Hit right edge
            (snake[0] < 0 && direction === -gridSize) || // Hit top edge
            (snake[0] >= gridSize * gridSize && direction === gridSize) || // Hit bottom edge
            squares[snake[0]].classList.contains('snake') // Hit itself
        ) {
            clearInterval(intervalId);
            alert('Game Over!');
        }
    }

    function eatFood() {
        if (snake[0] === foodIndex) {
            squares[foodIndex].classList.remove('food');
            snake.push(snake[snake.length - 1]); // Grow by 1 square
            drawFood();
        }
    }

    function changeDirection(event) {
        if (event.keyCode === 37) {
            direction = -1; // Left
        } else if (event.keyCode === 38) {
            direction = -gridSize; // Up
        } else if (event.keyCode === 39) {
            direction = 1; // Right
        } else if (event.keyCode === 40) {
            direction = gridSize; // Down
        }
    }

    function startGame() {
        removeSnake();
        snake = [2, 1, 0];
        direction = 1;
        drawSnake();
        drawFood();
        intervalId = setInterval(moveSnake, 200);
    }

    document.addEventListener('keydown', changeDirection);
    document.getElementById('startButton').addEventListener('click', startGame);
});

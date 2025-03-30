const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    ctx.fillStyle = "lime";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
        if (index === 0) {
            ctx.strokeStyle = "darkgreen";
            ctx.strokeRect(segment.x, segment.y, box, box);
        }
    });
    
    let newHead = { x: snake[0].x, y: snake[0].y };
    if (direction === "LEFT") newHead.x -= box;
    if (direction === "UP") newHead.y -= box;
    if (direction === "RIGHT") newHead.x += box;
    if (direction === "DOWN") newHead.y += box;
    
    if (newHead.x === food.x && newHead.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }
    
    if (
        newHead.x < 0 || newHead.x >= canvas.width ||
        newHead.y < 0 || newHead.y >= canvas.height ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        clearInterval(game);
        alert("Game Over");
        return;
    }
    
    snake.unshift(newHead);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

let game = setInterval(drawGame, 100);

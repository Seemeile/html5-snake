const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const game = new Game();
const level = new Level();
const snake = new Snake();

let inputs: { 
    up: boolean, 
    down: boolean, 
    left: boolean, 
    right: boolean 
} = { 
    up: false, 
    down: false, 
    left: false, 
    right: false 
};

const checkKey = (e) => {
    e = e || window.event;
    
    if (e.keyCode == '38' && !inputs.down) {
        inputs = { up: true, down: false, left: false, right: false };
    }
    else if (e.keyCode == '40' && !inputs.up) {
        inputs = { up: false, down: true, left: false, right: false };
    }
    else if (e.keyCode == '37' && !inputs.right) {
        inputs = { up: false, down: false, left: true, right: false };
    }
    else if (e.keyCode == '39' && !inputs.left) {
        inputs = { up: false, down: false, left: false, right: true };
    }
}

document.onkeydown = checkKey;

const fps: number = 10;

const gameLoop = (_delta: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (game.isGameOver()) {
        ctx.font = "50px Roboto";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", 130, 240);
        return
    }

    level.update();
    snake.update(level, game);
    
    level.render(ctx);
    snake.render(ctx);

    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 1000 / fps);
}

requestAnimationFrame(gameLoop);
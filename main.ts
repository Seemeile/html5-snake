const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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

const fps = 10;

const gameLoop = (_delta: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.update(level);
    
    level.render(ctx);
    snake.render(ctx);

    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 1000 / fps);
}

requestAnimationFrame(gameLoop);
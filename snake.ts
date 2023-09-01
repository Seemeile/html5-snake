class Snake {
    // <=--
    body: number[][] = [[5, 5]];
    
    isCollideSnake(x: number, y: number) {
        if (this.body.length === 1) {
            return false;
        }
        // start at 1 because we don't want to check the head
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i][0] == x && this.body[i][1] == y) {
                return true;
            }
        }
        return false;
    }

    reset() {
        this.body = [[5, 5]];
    }

    update(level: Level, game: Game) {
        // move 1: update tail
        if (this.body.length > 1) {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i][0] = this.body[i - 1][0];
                this.body[i][1] = this.body[i - 1][1];
            }
        }

        // move 2: update head
        if (inputs.up) {
            this.body[0][1] -= 1;
        } else if (inputs.down) {
            this.body[0][1] += 1;
        } else if (inputs.left) {
            this.body[0][0] -= 1;
        } else if (inputs.right) {
            this.body[0][0] += 1;
        }

        // collide?
        if (level.isCollideWall(this.body[0][0], this.body[0][1]) 
            || this.isCollideSnake(this.body[0][0], this.body[0][1])) {
            game.endGame();
        }

        // eat?
        if (level.isCollideFood(this.body[0][0], this.body[0][1])) {
            level.removeFood(this.body[0][0], this.body[0][1]);
            this.body.push([this.body[0][0], this.body[0][1]]);
            game.increaseHighscore(10);
        } else if (level.isCollideSuperFood(this.body[0][0], this.body[0][1])) {
            level.removeFood(this.body[0][0], this.body[0][1]);
            this.body.push([this.body[0][0], this.body[0][1]]);
            this.body.push([this.body[0][0], this.body[0][1]]);
            this.body.push([this.body[0][0], this.body[0][1]]);
            game.increaseHighscore(30);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'silver';
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0] * 10, this.body[i][1] * 10, 10, 10);
        }
    }
}
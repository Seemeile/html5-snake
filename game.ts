class Game {
    highscore: number = 0;
    gameover: boolean = false;

    isGameOver() {
        return this.gameover
    }

    endGame() {
        this.gameover = true;
    }

    setHighscore(score: number) {
        const highscoreNode = document.getElementById("highscore")
        if (highscoreNode) {
            highscoreNode.innerText = score.toString();
        }
    }

    increaseHighscore(score: number) {
        this.setHighscore(this.highscore += score);
    }

    reset() {
        this.setHighscore(0);
        this.gameover = false;
    }
}
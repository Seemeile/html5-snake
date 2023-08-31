class Game {
    highscore: number = 0;
    gameover: boolean = false;

    isGameOver() {
        return this.gameover
    }

    endGame() {
        this.gameover = true;
    }

    increaseHighscore(score: number) {
        this.highscore += score;
        const highscoreNode = document.getElementById("highscore")
        if (highscoreNode) {
            highscoreNode.innerText = this.highscore.toString();
        }
    }
}
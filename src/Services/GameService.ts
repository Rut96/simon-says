import greenSound from "../Assets/Sound/green2.mp3";
import redSound from "../Assets/Sound/red2.mp3";
import yellowSound from "../Assets/Sound/yellow2.mp3";
import wrongSound from "../Assets/Sound/yellow.mp3";
import blueSound from "../Assets/Sound/blue2.mp3";

class GameService {

    private steps: string[] = [];
    private currentScore: number = 0;
    private highScore: number = 0;

    constructor() {
        const savedHighScore = localStorage.getItem('simonHighScore');
        if (savedHighScore) {
            this.highScore = +savedHighScore;
        }
    }

    // ------------------------ Score ------------------------
    
    public increaseScore(): void {
        this.currentScore++;
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            localStorage.setItem('simonHighScore', this.highScore.toString());
        }
    }

    public getCurrentScore(): number {
        return this.currentScore;
    }

    public getHighScore(): number {
        return this.highScore;
    }

    // ------------------------ Steps ------------------------

    public initSteps() {
        this.steps = [];
        this.currentScore = 0;
    }

    public addStep(): void {
        const num = Math.floor(Math.random() * 4) + 1;
        switch (num) {
            case 1: this.steps.push("green"); break;
            case 2: this.steps.push("red"); break;
            case 3: this.steps.push("yellow"); break;
            case 4: this.steps.push("blue"); break;
        }
    }

    public getSteps() {
        return this.steps;
    }

    // ------------------------ Audio ------------------------

    private audio = new Audio();

    public async playSound(step: string) {
        switch (step) {
            case "green": this.audio.src = greenSound; break;
            case "red": this.audio.src = redSound; break;
            case "yellow": this.audio.src = yellowSound; break;
            case "blue": this.audio.src = blueSound; break;
            default: this.audio.src = wrongSound;
        }
        await this.audio.play();
    }

}

export const gameService = new GameService();

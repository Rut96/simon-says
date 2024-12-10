import { useEffect, useState } from "react";
import { gameService } from "../../../Services/GameService";
import { helper } from "../../../Utils/Helper";
import { sweet } from "../../../Utils/Swal";
import "./Game.css";

export function Game(): JSX.Element {

    const [activeButton, setActiveButton] = useState<string>(null);
    const [index, setIndex] = useState<number>(0);
    const [onGoing, setOnGoing] = useState<boolean>(false);

    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>();

    const [level, setLevel] = useState<number>(1);
    const [speed, setSpeed] = useState<number>(500);

    const currentDelay = Math.max(speed - (level * 30), 200); // minimum 200ms

    useEffect(() => {
        setHighScore(gameService.getHighScore());
    }, [])

    async function handleClick(color: string) {
        setActiveButton(color);
        setTimeout(() => setActiveButton(null), 300);
        const steps = gameService.getSteps();

        // failure case
        if (color !== steps[index]) {
            gameService.playSound("wrong");
            await helper.delay(500);
            sweet.error(`Game Over! You reached level ${level}`);
            gameService.initSteps();
            setIndex(0);
            setOnGoing(false);
            setLevel(1);
            return;
        }

        setIndex(index + 1);
        gameService.playSound(color);
        await helper.delay(500);
        gameService.increaseScore();

        if (index === steps.length - 1) {
            setScore(gameService.getCurrentScore());
            setHighScore(gameService.getHighScore());
            setLevel(prev => prev + 1);
            await helper.delay(1000);
            await computerTurn();
            setIndex(0);
        }
    };

    async function start() {
        if (onGoing) return;
        setOnGoing(true);
        setScore(0);
        setLevel(1);
        setSpeed(500);
        gameService.initSteps();
        await computerTurn();
        setIndex(0);
    }

    async function computerTurn() {
        gameService.addStep();
        const steps = gameService.getSteps();
        for (const step of steps) {
            setActiveButton(step);
            gameService.playSound(step);
            await helper.delay(currentDelay);
            setActiveButton(null);
            await helper.delay(currentDelay / 2);
        }
    }


    return (
        <div className="Game">
            <div className="game-info">
                <div className="score">
                    <div className="current-score">Score: {score}</div>
                </div>
            </div>
            <div className="stats-container">
                <div className="high-score-board">
                    <div className="high-score">High Score: {highScore}</div>
                </div>
                <div className="level-display">
                    Level: {level}
                </div>
                <div className="difficulty-indicator">
                    <span className={
                        level <= 5 ? 'difficulty-normal' :
                            level <= 10 ? 'difficulty-fast' :
                                'difficulty-insane'
                    }>
                        {level <= 5 ? 'Normal' : level <= 10 ? 'Fast' : 'Insane'}
                    </span>
                </div>
            </div>
            <div className="game-board">
                <div className="game-circle">
                    <button
                        onClick={() => handleClick('green')}
                        className={`game-button green-button ${activeButton === 'green' ? 'active' : ''}`}
                    />
                    <button
                        onClick={() => handleClick('red')}
                        className={`game-button red-button ${activeButton === 'red' ? 'active' : ''}`}
                    />
                    <button
                        onClick={() => handleClick('yellow')}
                        className={`game-button yellow-button ${activeButton === 'yellow' ? 'active' : ''}`}
                    />
                    <button
                        onClick={() => handleClick('blue')}
                        className={`game-button blue-button ${activeButton === 'blue' ? 'active' : ''}`}
                    />

                    <div className="center-circle">
                        {!onGoing && <span className="center-text" onClick={start}>Start</span>}
                    </div>

                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';
import backgroundImage from '../assets/Solid-Black-Website-Background.jpg';
import { getRandomFood, getNextHead, checkCollision } from '../services/snake/snakeLogic';
import SnakeGrid from '../components/snake/SnakeGrid';
import SnakeScoreboard from '../components/snake/SnakeScoreboard';
import GameNav from '../components/GameNav';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = 'UP';
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(GRID_SIZE, INITIAL_SNAKE));
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHighScore')) || 0);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef(direction);
  const lastMovedDirectionRef = useRef(direction);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent scrolling for game controls
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      const lastDir = lastMovedDirectionRef.current;

      switch (e.key) {
        case 'ArrowUp':
          if (lastDir !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (lastDir !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (lastDir !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (lastDir !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ': // Space to pause/start
          setIsPaused(prev => !prev);
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync ref for game loop
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    lastMovedDirectionRef.current = INITIAL_DIRECTION;
    setFood(getRandomFood(GRID_SIZE, INITIAL_SNAKE));
    setIsGameOver(false);
    setScore(0);
    setIsPaused(true);
    setSpeed(INITIAL_SPEED);
  }, []);

  // Game loop
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveInterval = setInterval(() => {
      setSnake(prevSnake => {
        const moveDirection = directionRef.current;
        const nextHead = getNextHead(prevSnake[0], moveDirection);

        // Collision check
        if (checkCollision(nextHead, GRID_SIZE, prevSnake.slice(0, -1))) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Update last moved direction AFTER passing collision check
        lastMovedDirectionRef.current = moveDirection;

        const newSnake = [nextHead, ...prevSnake];

        // Food check
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore(s => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snakeHighScore', newScore.toString());
            }
            // Increase speed every 50 points
            if (newScore % 50 === 0) {
              setSpeed(prevSpeed => Math.max(prevSpeed - 10, 50));
            }
            return newScore;
          });
          setFood(getRandomFood(GRID_SIZE, newSnake));
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(moveInterval);
  }, [isGameOver, isPaused, food, speed, highScore]);

  return (
    <div className="snake-game-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <GameNav current="/snake-game" />
      <div className="snake-game-container">
        <h1>Snake</h1>

        <SnakeScoreboard score={score} highScore={highScore} />

        <SnakeGrid 
          gridSize={GRID_SIZE} 
          snake={snake} 
          food={food} 
          isGameOver={isGameOver} 
        />

        <div className="game-controls-help">
          <p>Use <b>Arrow Keys</b> to move</p>
          <p>Press <b>Space</b> to {isPaused ? 'Start' : 'Pause'}</p>
        </div>

        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>

        {(isGameOver || (isPaused && score === 0)) && (
          <div className="game-overlay" onClick={() => isGameOver ? resetGame() : setIsPaused(false)}>
            <div className="overlay-content">
              {isGameOver ? (
                <>
                  <span className="game-over-text">GAME OVER</span>
                  <p className="final-score">Final Score: {score}</p>
                  <p className="click-to-reset">Click to Restart</p>
                </>
              ) : (
                <>
                  <span className="start-text">READY?</span>
                  <p className="click-to-start">Click or Press Space to Start</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;

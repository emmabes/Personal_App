import React from 'react';
import './SnakeScoreboard.css';

const SnakeScoreboard = ({ score, highScore }) => {
  return (
    <div className="snake-scoreboard">
      <div className="score-box">
        <span className="label">Current Score</span>
        <span className="value">{score}</span>
      </div>
      <div className="score-box">
        <span className="label">High Score</span>
        <span className="value">{highScore}</span>
      </div>
    </div>
  );
};

export default SnakeScoreboard;

import React from 'react';

const GameOverlay = ({ gameState, winner, playerNames, onReset }) => {
  if (gameState === 'victory') {
    return (
      <div className="victory-overlay" onClick={onReset}>
        <div className="victory-text">
          {playerNames[winner]} Wins!
        </div>
      </div>
    );
  }

  if (gameState === 'cats') {
    return (
      <div className="cats-overlay" onClick={onReset}>
        <div className="cats-text">
          Cat's Game
        </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
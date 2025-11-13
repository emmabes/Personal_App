import React from 'react';

const GameControls = ({ 
  selectedCell, 
  playerColors, 
  currentPlayer, 
  onNext, 
  onReset 
}) => {
  return (
    <div className="buttons-container">
      <button 
        className="next-button" 
        onClick={onNext} 
        disabled={selectedCell === null}
        style={{background: `linear-gradient(145deg, ${playerColors[currentPlayer]}40, ${playerColors[currentPlayer]}60)`}}
      >
        Next
      </button>
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default GameControls;
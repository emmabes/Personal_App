import React from 'react';
import './MemoryControls.css';

const MemoryControls = ({ gridSize, onSizeChange, onReset }) => {
  const sizes = [3, 4, 5, 6];

  return (
    <div className="memory-controls">
      <div className="size-selector">
        <span className="label">Grid Size:</span>
        <div className="size-buttons">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-button ${gridSize === size ? 'active' : ''}`}
              onClick={() => onSizeChange(size)}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </div>
      <button className="reset-game-button" onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
};

export default MemoryControls;

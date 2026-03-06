import React from 'react';
import './NumberPad.css';
import { renderIcon } from '../../services/ttc/iconService.jsx';

const NumberPad = ({ onNumberSelect, onClear, completedNumbers = [], numberIcons = {} }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="number-pad">
      <div className="number-grid">
        {numbers.map((num) => {
          const isCompleted = completedNumbers.includes(num);
          const icon = numberIcons[num];

          return (
            <button 
              key={num} 
              className={`number-button ${isCompleted ? 'completed' : ''}`}
              onClick={() => onNumberSelect(num)}
            >
              {isCompleted && icon ? (
                <div className="completed-icon-overlay">
                  {renderIcon(null, icon)}
                </div>
              ) : num}
            </button>
          );
        })}
      </div>
      <button className="clear-button" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default NumberPad;

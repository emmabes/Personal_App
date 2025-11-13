import React from 'react';

const GameGrid = ({ 
  board, 
  selectedCell, 
  animatingCell, 
  winningLine, 
  gameState, 
  playerColors, 
  currentPlayer, 
  onCellClick, 
  renderIcon 
}) => {
  return (
    <div className={`grid ${gameState === 'cats' ? 'cats-game' : ''}`}>
      {board.map((cell, index) => {
        const isWinningCell = winningLine.includes(index);
        const cellClass = `cell ${
          animatingCell === index ? 'ripple-animation' : ''
        } ${
          selectedCell === index ? 'selected' : ''
        } ${
          isWinningCell ? 'winning-cell' : ''
        } ${
          gameState === 'cats' ? 'cats-cell' : ''
        }`;
        
        return (
          <div 
            key={index} 
            className={cellClass}
            style={selectedCell === index && gameState === 'playing' ? {backgroundColor: `${playerColors[currentPlayer]}30`} : {}}
            onClick={() => onCellClick(index)}
          >
            {cell && (
              <div className={`symbol ${cell.toLowerCase()} ${gameState === 'cats' ? 'cats-symbol' : ''}`}>
                {renderIcon(cell, cell)}
              </div>
            )}
            {animatingCell === index && (
              <div 
                className="ripple" 
                style={{background: `radial-gradient(circle, ${playerColors[currentPlayer]}cc 0%, ${playerColors[currentPlayer]}4d 50%, transparent 100%)`}}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameGrid;
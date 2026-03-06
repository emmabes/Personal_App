import React from 'react';
import './SnakeGrid.css';

const SnakeGrid = ({ gridSize, snake, food, isGameOver }) => {
  const cells = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isSnakeHead = snake[0].x === x && snake[0].y === y;
      const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
      const isFood = food.x === x && food.y === y;
      
      cells.push(
        <div 
          key={`${x}-${y}`} 
          className={`snake-cell ${isSnakeHead ? 'snake-head' : ''} ${isSnakeBody ? 'snake-body' : ''} ${isFood ? 'snake-food' : ''}`}
        />
      );
    }
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    width: '400px',
    height: '400px',
    border: '2px solid silver',
    backgroundColor: 'rgba(0,0,0,0.5)',
    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1)'
  };

  return (
    <div className={`snake-grid-container ${isGameOver ? 'game-over' : ''}`}>
      <div className="snake-grid" style={gridStyle}>
        {cells}
      </div>
    </div>
  );
};

export default SnakeGrid;

import React from 'react';
import MemoryCard from './MemoryCard';
import './MemoryGrid.css';

const MemoryGrid = ({ cards, flippedCards, matchedCards, onCardClick, gridSize }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, auto)`,
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px'
  };

  return (
    <div className="memory-grid" style={gridStyle}>
      {cards.map((card) => {
        const isFlipped = flippedCards.some(fc => fc.id === card.id);
        const isMatched = matchedCards.some(mc => mc.id === card.id);
        
        return (
          <MemoryCard
            key={card.id}
            card={card}
            gridSize={gridSize}
            isFlipped={isFlipped}
            isMatched={isMatched}
            onClick={onCardClick}
          />
        );
      })}
    </div>
  );
};

export default MemoryGrid;

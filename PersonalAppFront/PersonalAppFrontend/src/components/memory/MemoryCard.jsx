import React from 'react';
import './MemoryCard.css';
import { renderIcon } from '../../services/ttc/iconService.jsx';

const MemoryCard = ({ card, onClick, isFlipped, isMatched, gridSize }) => {
  // Calculate size based on grid size
  const cardSize = gridSize >= 5 ? 'small' : gridSize === 4 ? 'medium' : 'large';

  return (
    <div 
      className={`memory-card-container ${cardSize} ${isMatched ? 'matched' : ''}`}
      onClick={() => !isFlipped && !isMatched && onClick(card)}
    >
      <div className={`memory-card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}>
        <div className="memory-card-front">
          {/* Card Back (shows when not flipped) */}
          <div className="card-back-design">?</div>
        </div>
        <div className={`memory-card-back ${card.isGolden ? 'golden' : ''}`}>
          {/* Card Front (shows icon when flipped) */}
          {renderIcon(null, card.icon)}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

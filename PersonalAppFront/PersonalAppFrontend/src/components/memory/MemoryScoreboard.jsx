import React from 'react';
import './MemoryScoreboard.css';
import { renderIcon } from '../../services/ttc/iconService.jsx';

const MemoryScoreboard = ({ moves, matches, time, matchedCards }) => {
  // Extract unique matched icons for the stack
  const matchedIcons = matchedCards
    .filter((card, index, self) => 
      self.findIndex(c => c.pairId === card.pairId) === index
    )
    .map(card => card.icon);

  return (
    <div className="memory-scoreboard">
      <div className="stats-container">
        <div className="stat-box">
          <span className="stat-label">Moves</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Matches</span>
          <span className="stat-value">{matches}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Time</span>
          <span className="stat-value">{time}s</span>
        </div>
      </div>
      
      <div className="matched-stack-container">
        <span className="stack-label">Matched Items:</span>
        <div className="matched-stack">
          {matchedIcons.map((icon, index) => (
            <div 
              key={index} 
              className="stacked-icon" 
              style={{ '--index': index }}
            >
              {renderIcon(null, icon)}
            </div>
          ))}
          {matchedIcons.length === 0 && <div className="empty-stack">None yet</div>}
        </div>
      </div>
    </div>
  );
};

export default MemoryScoreboard;

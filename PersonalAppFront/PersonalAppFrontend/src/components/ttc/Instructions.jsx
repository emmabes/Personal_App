import React from 'react';
import instructionsText from '../../assets/ttc/instructions.txt?raw';

const Instructions = ({ showInstructions, onClose }) => {
  const content = instructionsText;

  if (!showInstructions) return null;

  const renderContent = () => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.endsWith(':') && !line.startsWith('•')) {
        return <p key={index} className="instructions-subheader">{line}</p>;
      } else if (line === 'Click anywhere to close') {
        return <p key={index} className="instructions-footer">{line}</p>;
      } else if (line.trim()) {
        return <p key={index}>{line}</p>;
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="instructions-overlay" onClick={onClose}>
      <div className="instructions-modal" onClick={(e) => e.stopPropagation()}>
        <h2>How to Play</h2>
        <div className="instructions-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Instructions;
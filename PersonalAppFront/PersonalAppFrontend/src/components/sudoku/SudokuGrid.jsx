import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ 
  puzzle, 
  initialPuzzle, 
  selectedCell, 
  onCellClick, 
  showRemaining,
  getPossibleValues,
  incorrectCells = [],
  correctCell = null
}) => {
  return (
    <div className="sudoku-grid">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => {
            const isInitial = initialPuzzle[rowIndex][colIndex] !== 0;
            const isSelected = selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex;
            const isInSameRowOrCol = selectedCell && (selectedCell.row === rowIndex || selectedCell.col === colIndex);
            const isIncorrect = incorrectCells.some(ic => ic.row === rowIndex && ic.col === colIndex);
            const isCorrect = correctCell && correctCell.row === rowIndex && correctCell.col === colIndex;
            
            // Highlight 3x3 box
            const isSameBox = selectedCell && 
              Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) && 
              Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3);

            const possibleValues = showRemaining && cell === 0 ? getPossibleValues(rowIndex, colIndex) : [];

            return (
              <div 
                key={colIndex} 
                className={`sudoku-cell 
                  ${isInitial ? 'initial' : 'user-filled'} 
                  ${isSelected ? 'selected' : ''} 
                  ${!isSelected && (isInSameRowOrCol || isSameBox) ? 'highlight' : ''}
                  ${(colIndex + 1) % 3 === 0 && colIndex < 8 ? 'thick-border-right' : ''}
                  ${(rowIndex + 1) % 3 === 0 && rowIndex < 8 ? 'thick-border-bottom' : ''}
                  ${possibleValues.length > 0 ? 'has-notes' : ''}
                  ${isIncorrect ? 'incorrect' : ''}
                  ${isCorrect ? 'correct' : ''}
                `}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : (
                  possibleValues.length > 0 && (
                    <div className="cell-notes">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <div key={num} className="note-digit">
                          {possibleValues.includes(num) ? num : ''}
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;

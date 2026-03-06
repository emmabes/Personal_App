import React, { useState, useEffect, useCallback } from 'react';
import './SudokuGame.css';
import backgroundImage from '../assets/Solid-Black-Website-Background.jpg';
import { generateSudoku, checkBoard, getPossibleValues } from '../services/sudoku/sudokuLogic';
import SudokuGrid from '../components/sudoku/SudokuGrid';
import NumberPad from '../components/sudoku/NumberPad';
import { iconList } from '../services/ttc/iconService';

const SudokuGame = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [initialPuzzle, setInitialPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameState, setGameState] = useState('playing'); // playing, victory
  const [difficulty, setDifficulty] = useState(40);
  const [showRemaining, setShowRemaining] = useState(false);
  const [autoCheck, setAutoCheck] = useState(false);
  const [incorrectCells, setIncorrectCells] = useState([]); // array of {row, col}
  const [correctCell, setCorrectCell] = useState(null); // {row, col}
  const [numberIcons, setNumberIcons] = useState({}); // mapping of num -> iconName
  const [completedNumbers, setCompletedNumbers] = useState([]);

  const startNewGame = useCallback((diff = difficulty) => {
    const { puzzle: newPuzzle, solution: newSolution } = generateSudoku(diff);
    setPuzzle(newPuzzle);
    setInitialPuzzle(newPuzzle.map(row => [...row]));
    setSolution(newSolution);
    setSelectedCell(null);
    setGameState('playing');
    setCompletedNumbers([]);
    setIncorrectCells([]);
    
    // Assign unique random icons for each number (1-9)
    const shuffledIcons = [...iconList].sort(() => Math.random() - 0.5);
    const mapping = {};
    for (let i = 1; i <= 9; i++) {
      mapping[i] = shuffledIcons[i-1];
    }
    setNumberIcons(mapping);
  }, [difficulty]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Check which numbers are completely and correctly filled
  useEffect(() => {
    if (puzzle.length === 0 || solution.length === 0) return;
    
    const completed = [];
    for (let num = 1; num <= 9; num++) {
      let count = 0;
      let isCorrect = true;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (puzzle[r][c] === num) {
            count++;
            if (solution[r][c] !== num) {
              isCorrect = false;
            }
          }
        }
      }
      if (count === 9 && isCorrect) {
        completed.push(num);
      }
    }
    setCompletedNumbers(completed);
  }, [puzzle, solution]);

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberInput = useCallback((num) => {
    if (!selectedCell || gameState !== 'playing') return;
    const { row, col } = selectedCell;
    
    // Don't allow changing initial numbers
    if (initialPuzzle[row][col] !== 0) return;

    const newPuzzle = puzzle.map((r, ri) => 
      r.map((c, ci) => (ri === row && ci === col ? num : c))
    );
    setPuzzle(newPuzzle);

    // Auto-check logic
    if (autoCheck && num !== 0) {
      if (num !== solution[row][col]) {
        setIncorrectCells(prev => [...prev.filter(cell => cell.row !== row || cell.col !== col), { row, col }]);
      } else {
        setIncorrectCells(prev => prev.filter(cell => cell.row !== row || cell.col !== col));
      }
    } else {
      // Clear error if number is removed or changed without autoCheck
      setIncorrectCells(prev => prev.filter(cell => cell.row !== row || cell.col !== col));
    }

    // Check for win
    const result = checkBoard(newPuzzle, solution);
    if (result === 'victory') {
      setGameState('victory');
    }
  }, [selectedCell, puzzle, initialPuzzle, solution, gameState, autoCheck]);

  const checkCurrentCell = () => {
    if (!selectedCell || gameState !== 'playing') return;
    const { row, col } = selectedCell;
    const currentVal = puzzle[row][col];
    
    if (currentVal === 0) return;

    if (currentVal !== solution[row][col]) {
      setIncorrectCells(prev => [...prev.filter(cell => cell.row !== row || cell.col !== col), { row, col }]);
    } else {
      setIncorrectCells(prev => prev.filter(cell => cell.row !== row || cell.col !== col));
      setCorrectCell({ row, col });
      setTimeout(() => setCorrectCell(null), 1000);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (!selectedCell || gameState !== 'playing') return;

    if (e.key >= '1' && e.key <= '9') {
      handleNumberInput(parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      handleNumberInput(0);
    } else if (e.key.startsWith('Arrow')) {
      e.preventDefault();
      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;
      if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
      if (e.key === 'ArrowDown') newRow = Math.min(8, row + 1);
      if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1);
      if (e.key === 'ArrowRight') newCol = Math.min(8, col + 1);
      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [selectedCell, handleNumberInput, gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="sudoku-game-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="sudoku-game-container">
        <h1>Sudoku</h1>

        <div className="sudoku-controls">
          <div className="controls-row">
            <div className="difficulty-container">
              <select 
                className="difficulty-select" 
                value={difficulty} 
                onChange={(e) => {
                  const d = parseInt(e.target.value);
                  setDifficulty(d);
                  startNewGame(d);
                }}
              >
                <option value={30}>Easy</option>
                <option value={45}>Medium</option>
                <option value={55}>Hard</option>
              </select>
            </div>

            <button className="new-game-button" onClick={() => startNewGame()}>
              New Game
            </button>
          </div>

          <div className="controls-row">
            <label className="remaining-checkbox">
              <input 
                type="checkbox" 
                checked={showRemaining} 
                onChange={(e) => setShowRemaining(e.target.checked)} 
              />
              <span>Remaining</span>
            </label>

            <label className="remaining-checkbox">
              <input 
                type="checkbox" 
                checked={autoCheck} 
                onChange={(e) => setAutoCheck(e.target.checked)} 
              />
              <span>Auto-Check</span>
            </label>

            <button className="check-button" onClick={checkCurrentCell} disabled={!selectedCell}>
              Check Cell
            </button>
          </div>
        </div>

        <SudokuGrid 
          puzzle={puzzle}
          initialPuzzle={initialPuzzle}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          showRemaining={showRemaining}
          getPossibleValues={(r, c) => getPossibleValues(puzzle, r, c)}
          incorrectCells={incorrectCells}
          correctCell={correctCell}
        />

        <NumberPad 
          onNumberSelect={handleNumberInput}
          onClear={() => handleNumberInput(0)}
          completedNumbers={completedNumbers}
          numberIcons={numberIcons}
        />

        {gameState === 'victory' && (
          <div className="victory-overlay" onClick={() => startNewGame()}>
            <div className="celebration-shimmer">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`shimmer-piece piece-${i}`}></div>
              ))}
            </div>
            <div className="victory-content">
              <span className="victory-text">VICTORY!</span>
              <p className="victory-subtext">You solved the puzzle!</p>
              <p className="click-to-reset">Click to play again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuGame;

import { generateSudoku, checkBoard } from '../../../src/services/sudoku/sudokuLogic.js';

describe('Sudoku Game Logic', () => {
  test('generateSudoku returns a valid puzzle and solution', () => {
    const { puzzle, solution } = generateSudoku(40);
    expect(puzzle.length).toBe(9);
    expect(solution.length).toBe(9);
    
    // Check that puzzle has some zeros
    const zeroCount = puzzle.flat().filter(n => n === 0).length;
    expect(zeroCount).toBe(40);
  });

  test('checkBoard detects incomplete board', () => {
    const { puzzle, solution } = generateSudoku(40);
    expect(checkBoard(puzzle, solution)).toBe('incomplete');
  });

  test('checkBoard detects correct solution', () => {
    const { solution } = generateSudoku(40);
    expect(checkBoard(solution, solution)).toBe('victory');
  });

  test('checkBoard detects incorrect values', () => {
    const { solution } = generateSudoku(40);
    const incorrectBoard = solution.map(row => [...row]);
    // Flip one number
    const originalValue = incorrectBoard[0][0];
    incorrectBoard[0][0] = originalValue === 9 ? 1 : originalValue + 1;
    expect(checkBoard(incorrectBoard, solution)).toBe('incorrect');
  });
});

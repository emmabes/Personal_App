/**
 * Checks if it's safe to put a number in a given position.
 */
const isSafe = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
  // Check col
  for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
};

/**
 * Solves the board using backtracking.
 */
const solveSudoku = (board) => {
  let row = -1;
  let col = -1;
  let isEmpty = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        row = i;
        col = j;
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) break;
  }
  if (isEmpty) return true;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
};

/**
 * Generates a full valid Sudoku board.
 */
const generateFullBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  // Randomly fill the diagonal boxes first (they are independent)
  for (let i = 0; i < 9; i += 3) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        board[i + r][i + c] = nums.pop();
      }
    }
  }
  solveSudoku(board);
  return board;
};

/**
 * Removes numbers from a full board to create a puzzle.
 * @param {number} difficulty - Number of cells to remove (e.g., 40-50).
 */
export const generateSudoku = (difficulty = 40) => {
  const solution = generateFullBoard();
  const puzzle = solution.map(row => [...row]);
  let count = difficulty;
  while (count > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      count--;
    }
  }
  return { puzzle, solution };
};

/**
 * Checks if the current board is valid and complete.
 */
export const checkBoard = (board, solution) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return 'incomplete';
      if (board[r][c] !== solution[r][c]) return 'incorrect';
    }
  }
  return 'victory';
};

/**
 * Returns an array of possible values for a given cell based on current board rules.
 */
export const getPossibleValues = (board, row, col) => {
  if (board[row][col] !== 0) return [];
  const possible = [];
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      possible.push(num);
    }
  }
  return possible;
};

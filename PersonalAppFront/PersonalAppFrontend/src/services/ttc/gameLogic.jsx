const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

export const checkWinner = (board) => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: pattern };
    }
  }
  return null;
};

export const checkCatsGame = (board) => {
  // Pattern Blocking Analysis - O(1) time complexity
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const cells = [board[a], board[b], board[c]];
    
    // If pattern has both X and O, it's blocked
    const hasX = cells.includes('X');
    const hasO = cells.includes('O');
    
    // If any pattern is not blocked (could still be won), not a cat's game
    if (!(hasX && hasO)) {
      return false;
    }
  }
  
  // All patterns are blocked - guaranteed cat's game
  return true;
};
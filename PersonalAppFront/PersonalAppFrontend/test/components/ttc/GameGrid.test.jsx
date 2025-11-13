import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameGrid from '../../../src/components/ttc/GameGrid.jsx';

const mockProps = {
  board: Array(9).fill(null),
  selectedCell: null,
  animatingCell: null,
  winningLine: [],
  gameState: 'playing',
  playerColors: { X: '#ff6600', O: '#0066ff' },
  currentPlayer: 'X',
  onCellClick: jest.fn(),
  renderIcon: jest.fn(() => <span>X</span>)
};

describe('GameGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders 9 cells', () => {
    const { container } = render(<GameGrid {...mockProps} />);
    expect(container.querySelectorAll('.cell')).toHaveLength(9);
  });

  test('calls onCellClick when cell is clicked', () => {
    const { container } = render(<GameGrid {...mockProps} />);
    fireEvent.click(container.querySelector('.cell'));
    expect(mockProps.onCellClick).toHaveBeenCalledWith(0);
  });

  test('applies selected class to selected cell', () => {
    const props = { ...mockProps, selectedCell: 4 };
    const { container } = render(<GameGrid {...props} />);
    expect(container.querySelectorAll('.cell')[4]).toHaveClass('selected');
  });

  test('applies winning-cell class to winning cells', () => {
    const props = { ...mockProps, winningLine: [0, 1, 2] };
    const { container } = render(<GameGrid {...props} />);
    expect(container.querySelectorAll('.cell')[0]).toHaveClass('winning-cell');
    expect(container.querySelectorAll('.cell')[3]).not.toHaveClass('winning-cell');
  });

  test('applies cats-game classes when game is cats', () => {
    const props = { ...mockProps, gameState: 'cats' };
    const { container } = render(<GameGrid {...props} />);
    expect(container.querySelector('.grid')).toHaveClass('cats-game');
  });
});
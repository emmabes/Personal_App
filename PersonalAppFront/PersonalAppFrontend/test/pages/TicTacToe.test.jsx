import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TicTacToe from '../../src/pages/TicTacToe.jsx';

// Mock the services
jest.mock('../../src/services/ttc/gameLogic.js', () => ({
  checkWinner: jest.fn(() => null),
  checkCatsGame: jest.fn(() => false)
}));

jest.mock('../../src/services/ttc/iconService.jsx', () => ({
  iconList: ['bear.png', 'goku.png'],
  renderIcon: jest.fn(() => <span>X</span>)
}));

describe('TicTacToe Page', () => {
  test('renders main game elements', () => {
    const { getByText } = render(<TicTacToe />);
    expect(getByText('Tic Tac Toe')).toBeInTheDocument();
    expect(getByText('Instructions')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
  });

  test('opens instructions when clicked', () => {
    const { getByText } = render(<TicTacToe />);
    fireEvent.click(getByText('Instructions'));
    expect(getByText('How to Play')).toBeInTheDocument();
  });

  test('Next button is initially disabled', () => {
    const { getByText } = render(<TicTacToe />);
    expect(getByText('Next')).toBeDisabled();
  });

  test('can select and deselect cells', () => {
    const { container } = render(<TicTacToe />);
    const firstCell = container.querySelectorAll('.cell')[0];
    
    // Select cell
    fireEvent.click(firstCell);
    expect(firstCell).toHaveClass('selected');
    
    // Deselect cell
    fireEvent.click(firstCell);
    expect(firstCell).not.toHaveClass('selected');
  });

  test('Reset button clears game state', () => {
    const { getByText, container } = render(<TicTacToe />);
    
    // Select a cell
    fireEvent.click(container.querySelectorAll('.cell')[0]);
    
    // Reset game
    fireEvent.click(getByText('Reset'));
    
    // Check cell is no longer selected
    expect(container.querySelectorAll('.cell')[0]).not.toHaveClass('selected');
  });

  test('displays player names and win counts', () => {
    const { getAllByText } = render(<TicTacToe />);
    expect(getAllByText('Player X')).toHaveLength(2); // Desktop and mobile
    expect(getAllByText('Player O')).toHaveLength(2);
    expect(getAllByText('Wins: 0')).toHaveLength(4); // Both players, desktop and mobile
  });
});
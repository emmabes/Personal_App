import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameOverlay from '../../../src/components/ttc/GameOverlay.jsx';

const mockProps = {
  gameState: 'playing',
  winner: null,
  playerNames: { X: 'Player X', O: 'Player O' },
  onReset: jest.fn()
};

describe('GameOverlay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when game is playing', () => {
    const { container } = render(<GameOverlay {...mockProps} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders victory overlay when game is won', () => {
    const props = { ...mockProps, gameState: 'victory', winner: 'X' };
    const { getByText } = render(<GameOverlay {...props} />);
    expect(getByText('Player X Wins!')).toBeInTheDocument();
  });

  test('renders cats overlay when game is cats', () => {
    const props = { ...mockProps, gameState: 'cats' };
    const { getByText } = render(<GameOverlay {...props} />);
    expect(getByText("Cat's Game")).toBeInTheDocument();
  });

  test('calls onReset when victory overlay clicked', () => {
    const props = { ...mockProps, gameState: 'victory', winner: 'X' };
    const { container } = render(<GameOverlay {...props} />);
    fireEvent.click(container.querySelector('.victory-overlay'));
    expect(mockProps.onReset).toHaveBeenCalled();
  });

  test('calls onReset when cats overlay clicked', () => {
    const props = { ...mockProps, gameState: 'cats' };
    const { container } = render(<GameOverlay {...props} />);
    fireEvent.click(container.querySelector('.cats-overlay'));
    expect(mockProps.onReset).toHaveBeenCalled();
  });
});
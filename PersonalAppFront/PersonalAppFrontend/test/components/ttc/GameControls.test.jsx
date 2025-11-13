import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameControls from '../../../src/components/ttc/GameControls.jsx';

const mockProps = {
  selectedCell: null,
  playerColors: { X: '#ff6600', O: '#0066ff' },
  currentPlayer: 'X',
  onNext: jest.fn(),
  onReset: jest.fn()
};

describe('GameControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Next and Reset buttons', () => {
    const { getByText } = render(<GameControls {...mockProps} />);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
  });

  test('Next button is disabled when no cell selected', () => {
    const { getByText } = render(<GameControls {...mockProps} />);
    expect(getByText('Next')).toBeDisabled();
  });

  test('Next button is enabled when cell selected', () => {
    const props = { ...mockProps, selectedCell: 4 };
    const { getByText } = render(<GameControls {...props} />);
    expect(getByText('Next')).not.toBeDisabled();
  });

  test('calls onNext when Next button clicked', () => {
    const props = { ...mockProps, selectedCell: 4 };
    const { getByText } = render(<GameControls {...props} />);
    fireEvent.click(getByText('Next'));
    expect(mockProps.onNext).toHaveBeenCalled();
  });

  test('calls onReset when Reset button clicked', () => {
    const { getByText } = render(<GameControls {...mockProps} />);
    fireEvent.click(getByText('Reset'));
    expect(mockProps.onReset).toHaveBeenCalled();
  });

  test('Next button has current player color styling', () => {
    const { getByText } = render(<GameControls {...mockProps} />);
    const nextButton = getByText('Next');
    expect(nextButton).toHaveStyle('background: linear-gradient(145deg, #ff660040, #ff660060)');
  });
});
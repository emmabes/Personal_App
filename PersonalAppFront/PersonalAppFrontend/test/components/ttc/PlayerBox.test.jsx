import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerBox from '../../../src/components/ttc/PlayerBox.jsx';

const mockProps = {
  player: 'X',
  playerName: 'Player X',
  playerIcon: 'X',
  playerColor: '#ff6600',
  wins: 5,
  editingPlayer: null,
  showIconDropdown: null,
  showColorPicker: null,
  iconList: ['bear.png', 'goku.png'],
  onIconClick: jest.fn(),
  onIconSelect: jest.fn(),
  onNameClick: jest.fn(),
  onNameEdit: jest.fn(),
  onColorClick: jest.fn(),
  onColorSelect: jest.fn(),
  renderIcon: jest.fn(() => <span>X</span>)
};

describe('PlayerBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays player name and wins', () => {
    const { getByText } = render(<PlayerBox {...mockProps} />);
    expect(getByText('Player X')).toBeInTheDocument();
    expect(getByText('Wins: 5')).toBeInTheDocument();
  });

  test('calls onIconClick when icon is clicked', () => {
    const { container } = render(<PlayerBox {...mockProps} />);
    fireEvent.click(container.querySelector('.player-symbol'));
    expect(mockProps.onIconClick).toHaveBeenCalledWith('X');
  });

  test('calls onNameClick when name is clicked', () => {
    const { getByText } = render(<PlayerBox {...mockProps} />);
    fireEvent.click(getByText('Player X'));
    expect(mockProps.onNameClick).toHaveBeenCalledWith('X');
  });

  test('shows name input when editing', () => {
    const props = { ...mockProps, editingPlayer: 'X' };
    const { container } = render(<PlayerBox {...props} />);
    expect(container.querySelector('.name-input')).toBeInTheDocument();
  });

  test('shows icon dropdown when open', () => {
    const props = { ...mockProps, showIconDropdown: 'X' };
    const { container } = render(<PlayerBox {...props} />);
    expect(container.querySelector('.icon-dropdown')).toBeInTheDocument();
  });

  test('applies player color as background', () => {
    const { container } = render(<PlayerBox {...mockProps} />);
    const playerBox = container.querySelector('.player-box');
    expect(playerBox).toHaveStyle('background-color: #ff660020');
  });
});
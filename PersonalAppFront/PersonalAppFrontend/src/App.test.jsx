import { render, screen } from '@testing-library/react';
import App from './App';
import { expect } from '@jest/globals';

test('renders app with navigation', () => {
  render(<App />);
  // Check for navigation elements
  const homeLink = screen.getByText('Home');
  const ticTacToeLink = screen.getByText('Tic Tac Toe');
  expect(homeLink).toBeInTheDocument();
  expect(ticTacToeLink).toBeInTheDocument();
});

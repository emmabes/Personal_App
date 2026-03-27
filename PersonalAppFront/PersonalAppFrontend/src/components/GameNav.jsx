import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameNav.css';

const GAMES = [
  { label: 'Tic Tac Toe', path: '/tic-tac-toe' },
  { label: 'Memory',      path: '/memory-game' },
  { label: 'Snake',       path: '/snake-game' },
  { label: 'Sudoku',      path: '/sudoku-game' },
];

function GameNav({ current }) {
  const navigate = useNavigate();
  return (
    <div className="game-nav">
      {GAMES.filter(g => g.path !== current).map(g => (
        <button
          key={g.path}
          className="game-nav__btn"
          onClick={() => navigate(g.path)}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}

export default GameNav;

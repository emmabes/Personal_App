import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSubmenu = (menu) => {
    setCurrentMenu(menu);
  };

  const goBack = () => {
    setCurrentMenu('main');
  };

  const navigate = useNavigate();

  const menuData = {
    main: [
      { label: 'Home', action: () => { navigate('/'); setIsOpen(false); } },
      { label: 'Resume', action: () => { navigate('/resume'); setIsOpen(false); } },
      { label: 'Games', action: () => navigateToSubmenu('games') },
      // { label: 'Scratch', action: () => { navigate('/scratch'); setIsOpen(false); } },
      { label: 'About', action: () => { navigate('/about'); setIsOpen(false); } }
    ],
    games: [
      { label: '← Back', action: goBack, isBack: true },
      { label: 'Tic Tac Toe', action: () => { navigate('/tic-tac-toe'); setIsOpen(false); } },
      { label: 'Memory Game', action: () => { navigate('/memory-game'); setIsOpen(false); } },
      { label: 'Snake', action: () => { navigate('/snake-game'); setIsOpen(false); } },
      { label: 'Sudoku', action: () => { navigate('/sudoku-game'); setIsOpen(false); } }
    ]
  };

  return (
    <nav className="menu-bar">
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        ☰
      </button>
      <div className={`menu-content ${isOpen ? 'open' : ''}`}>
        <div className={`menu-level ${currentMenu === 'main' ? 'active' : 'slide-left'}`}>
          {menuData.main.map((item, index) => (
            <button key={index} className="menu-item" onClick={item.action}>
              {item.label}
            </button>
          ))}
        </div>
        <div className={`menu-level ${currentMenu === 'games' ? 'active' : 'slide-right'}`}>
          {menuData.games.map((item, index) => (
            <button 
              key={index} 
              className={`menu-item ${item.isBack ? 'back-button' : ''}`} 
              onClick={item.action}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {isOpen && <div className="menu-overlay" onClick={toggleMenu} />}
    </nav>
  );
};

export default MenuBar;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setCurrentMenu('main');
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
      { label: 'Games', action: () => navigateToSubmenu('games') },
      { label: 'About', action: () => console.log('About') }
    ],
    games: [
      { label: 'Tic Tac Toe', action: () => { navigate('/tic-tac-toe'); setIsOpen(false); } },
      { label: 'Memory Game', action: () => console.log('Memory Game') },
      { label: 'Snake', action: () => console.log('Snake') }
    ]
  };

  return (
    <nav className="menu-bar">
      <button className="menu-toggle" onClick={currentMenu === 'main' ? toggleMenu : goBack}>
        {currentMenu === 'main' ? '☰' : '←'}
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
            <button key={index} className="menu-item" onClick={item.action}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
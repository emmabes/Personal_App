import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
import './MenuBar.css';

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSubmenu = (menu) => {
    setCurrentMenu(menu);
  };

  const goBack = () => {
    setCurrentMenu('main');
  };

  const handleSignOut = async () => {
    await auth.removeUser();
    // Redirect to Cognito's logout endpoint to clear the SSO session cookie.
    // Without this step, clicking Login again would silently re-authenticate
    // the user without prompting for credentials.
    const logoutUri = encodeURIComponent(window.location.origin + "/");
    window.location.href = `${import.meta.env.VITE_COGNITO_DOMAIN}/logout?client_id=${import.meta.env.VITE_USER_POOL_CLIENT_ID}&logout_uri=${logoutUri}`;
  };

  const menuData = {
    main: [
      { label: 'Home', action: () => { navigate('/'); setIsOpen(false); } },
      { label: 'Resume', action: () => { navigate('/resume'); setIsOpen(false); } },
      { label: 'Games', action: () => navigateToSubmenu('games') },
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
      
      {auth.isAuthenticated && (
        <div className="user-status-indicator">
           Logged in as {auth.user?.profile?.email}
        </div>
      )}

      <div className={`menu-content ${isOpen ? 'open' : ''}`}>
        <div className={`menu-level ${currentMenu === 'main' ? 'active' : 'slide-left'}`}>
          {menuData.main.map((item, index) => (
            <button key={index} className="menu-item" onClick={item.action}>
              {item.label}
            </button>
          ))}
          
          <div className="menu-separator" />
          
          {auth.isAuthenticated ? (
            <button className="menu-item auth-button" onClick={handleSignOut}>
              Logout
            </button>
          ) : (
            <button className="menu-item auth-button" onClick={() => auth.signinRedirect()}>
              Login / Sign Up
            </button>
          )}
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
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import MenuBar from './MenuBar';

// Mock useAuth
jest.mock('react-oidc-context');

const renderMenuBar = () => {
  return render(
    <Router>
      <MenuBar />
    </Router>
  );
};

describe('MenuBar Auth UI', () => {
  it('shows Login button when unauthenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      signinRedirect: jest.fn(),
      removeUser: jest.fn(),
    });

    renderMenuBar();
    
    // Toggle menu
    fireEvent.click(screen.getByLabelText(/toggle menu/i));
    
    expect(screen.getByText(/login \/ sign up/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it('shows Logout button and user status when authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        profile: {
          email: 'test@example.com'
        }
      },
      signinRedirect: jest.fn(),
      removeUser: jest.fn(),
    });

    renderMenuBar();
    
    expect(screen.getByText(/logged in as test@example.com/i)).toBeInTheDocument();

    // Toggle menu
    fireEvent.click(screen.getByLabelText(/toggle menu/i));
    
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/login \/ sign up/i)).not.toBeInTheDocument();
  });
});

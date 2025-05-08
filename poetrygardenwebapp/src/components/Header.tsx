import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Poetrygardenlogo from "../images/Poetrygardenlogo.png";

interface HeaderProps {
  user: { email: string } | null;
  handleLogout: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Poetrygardenlogo} alt="Logo" className="logo" />
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/communitypage">Community</a>
        <a href="/tournament">Tournament</a>
        <a href="/mygarden">My Garden</a>
        <a href="/about">About</a>
        {user && (
          <div className="user-info">
            <Link to="/profile" className="user-email">
              {user.email}
            </Link>
            <button
              className="logout-button"
              onClick={async () => {
                await handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
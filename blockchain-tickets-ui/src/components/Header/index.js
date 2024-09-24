// index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './styles.css';
import logo from '../../assets/logo.png'; // Update the path based on your project structure

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Ensure this function is implemented in your AuthContext
  };

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <img src={logo} alt="BlockchainTickets Logo" />
        </NavLink>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav__link--active' : '')}>
            Home
          </NavLink>
          <NavLink to="/event" className={({ isActive }) => (isActive ? 'nav__link--active' : '')}>
            Events
          </NavLink>

          {!currentUser && (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav__link--active' : '')}>
                Login
              </NavLink>
              <NavLink
                to="/regular-user-register"
                className={({ isActive }) => (isActive ? 'nav__link--active' : '')}
              >
                Register
              </NavLink>
            </>
          )}

          {currentUser && currentUser.role === 'Admin' && (
            <>
              <NavLink
                to="/admin-register"
                className={({ isActive }) => (isActive ? 'nav__link--active' : '')}
              >
                Admin Registration
              </NavLink>
              <NavLink
                to="/event-manager-register"
                className={({ isActive }) => (isActive ? 'nav__link--active' : '')}
              >
                Event Manager Registration
              </NavLink>
            </>
          )}

          {currentUser && (
            <div className="header__profile">
              <img
                src={currentUser.photoURL || 'default-profile.png'}
                alt="Profile"
                className="profile__image"
              />
              <div className="profile__dropdown">
                <span className="profile__name">{currentUser.displayName || 'Profile'}</span>
                <div className="dropdown__menu">
                  <NavLink to="/profile">Profile</NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

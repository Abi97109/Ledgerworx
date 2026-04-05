import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  MANAGER_ACCOUNTS_ROUTE,
  MANAGER_ADMIN_ROUTE,
  MANAGER_CLIENTS_ROUTE,
  MANAGER_DASHBOARD_ROUTE,
  MANAGER_LOGGED_OUT_ROUTE,
  MANAGER_PROFILE_ROUTE,
  MANAGER_REPORTS_ROUTE,
  MANAGER_SALES_ROUTE,
  MANAGER_SETTINGS_ROUTE,
} from '../routes/routePaths.js';
import logo from './logo.png';

function Navbar({ profile, initials, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  const handleProfileNavigation = () => {
    navigate(MANAGER_PROFILE_ROUTE);
  };

  const handleLogout = () => {
    onLogout?.();
    navigate(MANAGER_LOGGED_OUT_ROUTE);
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo">
          <img className="logo-image" src={logo} alt="Ledger Worx logo" />
        </div>

        <nav className="nav-links">
          <NavLink to={MANAGER_DASHBOARD_ROUTE}>Home</NavLink>
          <NavLink to={MANAGER_SALES_ROUTE}>Sales</NavLink>
          <NavLink to={MANAGER_ACCOUNTS_ROUTE}>Accounts</NavLink>
          <NavLink to={MANAGER_CLIENTS_ROUTE}>Clients</NavLink>
          <NavLink to={MANAGER_REPORTS_ROUTE}>Reports</NavLink>
          <NavLink to={MANAGER_ADMIN_ROUTE}>Admin</NavLink>
          <NavLink to={MANAGER_SETTINGS_ROUTE}>Settings</NavLink>
        </nav>
      </div>

      <div className="nav-right profile-menu" ref={menuRef}>
        <button
          type="button"
          className={`profile-link profile-trigger ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
        >
          <div className="user-info">
            <span className="user-role">{profile.fullName}</span>
            <span className="user-name">{profile.role}</span>
          </div>
          <div className="avatar">{initials}</div>
        </button>

        {isMenuOpen ? (
          <div className="profile-dropdown" role="menu" aria-label="Profile menu">
            <button
              type="button"
              className="profile-dropdown-item"
              role="menuitem"
              onClick={handleProfileNavigation}
            >
              Profile Page
            </button>
            <button
              type="button"
              className="profile-dropdown-item profile-dropdown-item-danger"
              role="menuitem"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;

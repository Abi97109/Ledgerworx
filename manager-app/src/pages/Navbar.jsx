import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MANAGER_ACCOUNTS_ROUTE,
  MANAGER_ADMIN_ROUTE,
  MANAGER_CLIENTS_ROUTE,
  MANAGER_DASHBOARD_ROUTE,
  MANAGER_PROFILE_ROUTE,
  MANAGER_REPORTS_ROUTE,
  MANAGER_SALES_ROUTE,
  MANAGER_SETTINGS_ROUTE,
} from '../routes/routePaths.js';
import logo from './logo.png';

function Navbar({ profile, initials }) {
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

      <NavLink to={MANAGER_PROFILE_ROUTE} className="nav-right profile-link">
        <div className="user-info">
          <span className="user-role">{profile.fullName}</span>
          <span className="user-name">{profile.role}</span>
        </div>
        <div className="avatar">{initials}</div>
      </NavLink>
    </header>
  );
}

export default Navbar;

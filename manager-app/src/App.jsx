import React from 'react';
import { BrowserRouter, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard.jsx';
import Sales from './pages/Sales.jsx';
import Accounts from './pages/Accounts.jsx';
import Clients from './pages/Clients.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* 🔷 TOP NAVBAR */}
        <header className="navbar">
          <div className="logo">LEDGER WORX</div>

          <nav className="nav-links">
            <NavLink to="/dashboard">Home</NavLink>
            <NavLink to="/sales">Sales</NavLink>
            <NavLink to="/accounts">Accounts</NavLink>
            <NavLink to="/clients">Clients</NavLink>
            <NavLink to="/reports">Reports</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>

          <div className="user">Manager</div>
        </header>

        {/* 🔷 MAIN CONTENT */}
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
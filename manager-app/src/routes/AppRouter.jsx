import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Navbar from '../pages/Navbar.jsx';
import { getManagerRoutes } from './managerRoutes.jsx';
import {
  MANAGER_ACCOUNTS_ROUTE,
  MANAGER_ADMIN_ROUTE,
  MANAGER_BASE_ROUTE,
  MANAGER_CLIENTS_ROUTE,
  MANAGER_DASHBOARD_ROUTE,
  MANAGER_PROFILE_ROUTE,
  MANAGER_REPORTS_ROUTE,
  MANAGER_SALES_ROUTE,
  MANAGER_SETTINGS_ROUTE,
} from './routePaths.js';

const routerBaseName =
  import.meta.env.VITE_ROUTER_BASENAME || (import.meta.env.DEV ? '/' : '/portal');

function renderRoute(route) {
  return <Route key={route.path} path={route.path} element={route.element} />;
}

function AppRouter({ profile, setProfile, initials }) {
  const managerRoutes = getManagerRoutes(profile, setProfile, initials);

  return (
    <BrowserRouter basename={routerBaseName}>
      <div className="app-shell">
        <Navbar profile={profile} initials={initials} />

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Navigate to={MANAGER_DASHBOARD_ROUTE} replace />} />
            <Route path={MANAGER_BASE_ROUTE} element={<Navigate to={MANAGER_DASHBOARD_ROUTE} replace />} />
            {managerRoutes.map(renderRoute)}

            <Route path="/dashboard" element={<Navigate to={MANAGER_DASHBOARD_ROUTE} replace />} />
            <Route path="/sales" element={<Navigate to={MANAGER_SALES_ROUTE} replace />} />
            <Route path="/accounts" element={<Navigate to={MANAGER_ACCOUNTS_ROUTE} replace />} />
            <Route path="/clients" element={<Navigate to={MANAGER_CLIENTS_ROUTE} replace />} />
            <Route path="/reports" element={<Navigate to={MANAGER_REPORTS_ROUTE} replace />} />
            <Route path="/admin" element={<Navigate to={MANAGER_ADMIN_ROUTE} replace />} />
            <Route path="/settings" element={<Navigate to={MANAGER_SETTINGS_ROUTE} replace />} />
            <Route path="/profile" element={<Navigate to={MANAGER_PROFILE_ROUTE} replace />} />

            <Route path="*" element={<Navigate to={MANAGER_DASHBOARD_ROUTE} replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

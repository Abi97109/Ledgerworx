import React from 'react';

import Accounts from '../pages/Accounts.jsx';
import Admin from '../pages/Admin.jsx';
import Clients from '../pages/Clients.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Profile from '../pages/Profile.jsx';
import Reports from '../pages/Reports.jsx';
import Sales from '../pages/Sales.jsx';
import Settings from '../pages/Settings.jsx';
import {
  MANAGER_ACCOUNTS_ROUTE,
  MANAGER_ADMIN_ROUTE,
  MANAGER_CLIENTS_ROUTE,
  MANAGER_DASHBOARD_ROUTE,
  MANAGER_PROFILE_ROUTE,
  MANAGER_REPORTS_ROUTE,
  MANAGER_SALES_ROUTE,
  MANAGER_SETTINGS_ROUTE,
} from './routePaths.js';

export function getManagerRoutes(profile, setProfile, initials) {
  return [
    { path: MANAGER_DASHBOARD_ROUTE, element: <Dashboard /> },
    { path: MANAGER_SALES_ROUTE, element: <Sales /> },
    { path: MANAGER_ACCOUNTS_ROUTE, element: <Accounts /> },
    { path: MANAGER_CLIENTS_ROUTE, element: <Clients /> },
    { path: MANAGER_REPORTS_ROUTE, element: <Reports /> },
    { path: MANAGER_ADMIN_ROUTE, element: <Admin /> },
    { path: MANAGER_SETTINGS_ROUTE, element: <Settings /> },
    {
      path: MANAGER_PROFILE_ROUTE,
      element: <Profile profile={profile} setProfile={setProfile} initials={initials} />,
    },
  ];
}

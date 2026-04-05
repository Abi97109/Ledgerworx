import React, { useMemo, useState } from 'react';
import './App.css';
import AppRouter from './routes/AppRouter.jsx';

const initialProfile = {
  fullName: 'Manager',
  role: 'Manager',
  email: 'manager@ledgerworx.com',
  office: 'UAE Operations',
  employeeId: 'LW-MA-204',
  status: 'Active',
};

function getInitials(name) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return 'NA';
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? '').join('');
}

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const initials = useMemo(() => getInitials(profile.fullName), [profile.fullName]);

  const handleLogout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    setProfile(initialProfile);
  };

  return (
    <AppRouter
      profile={profile}
      setProfile={setProfile}
      initials={initials}
      onLogout={handleLogout}
    />
  );
}

export default App;

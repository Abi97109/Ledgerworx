import React from 'react';
import { Link } from 'react-router-dom';
import { MANAGER_DASHBOARD_ROUTE } from '../routes/routePaths.js';

function LoggedOut() {
  return (
    <div className="logged-out-page">
      <div className="logged-out-card">
        <span className="logged-out-badge">Session Ended</span>
        <h1>You have been logged out</h1>
        <p>
          Your manager session has been closed successfully. You can return to the dashboard
          whenever you are ready.
        </p>
        <Link to={MANAGER_DASHBOARD_ROUTE} className="logged-out-action">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default LoggedOut;

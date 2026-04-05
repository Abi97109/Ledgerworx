import React from 'react';

function LoggedOut() {
  return (
    <div className="logged-out-page">
      <div className="logged-out-card">
        <span className="logged-out-badge">Session Ended</span>
        <h1>You have been logged out</h1>
        <p>
          Your manager session has been closed successfully. Continue to the login page to
          sign in again.
        </p>
        <a href="https://ledgerworx.me/login/" className="logged-out-action">
          Go to Login Page
        </a>
      </div>
    </div>
  );
}

export default LoggedOut;

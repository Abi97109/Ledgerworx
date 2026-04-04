import { useEffect } from "react";
import { usePortalSession } from "../session/PortalSessionProvider";

export default function SalesSignoutPage() {
  const session = usePortalSession();

  useEffect(() => {
    if (session.data?.authenticated && session.data?.config?.logoutUrl) {
      window.location.replace(session.data.config.logoutUrl);
    }
  }, [session.data]);

  return (
    <div className="sales-signout-shell">
      <div className="sales-signout-card">
        <div className="sales-signout-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 7L4 12L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12H14C17.3137 12 20 14.6863 20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1>You have been signed out</h1>
        <p>Your sales portal session has ended. Sign in again to continue working with live CRM data.</p>
        <a href={session.data?.config?.loginUrl || "https://ledgerworx.me/login/"} className="lw-btn">
          Return to Login
        </a>
      </div>
    </div>
  );
}

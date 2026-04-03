import { Link } from "react-router-dom";
import { SALES_DASHBOARD_ROUTE } from "../modules/sales/utils/routePaths";

export default function SalesSignoutPage() {
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
        <p>This sales portal runs in preview mode right now, so your local session has simply been reset.</p>
        <Link to={SALES_DASHBOARD_ROUTE} className="lw-btn">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import logoutCss from "../styles/logout.css?raw";

export default function AdminLogoutPage() {
  useAdminPageStyles({
    pageKey: "logout",
    pageCssText: logoutCss,
    includeHeader: false,
    includeTheme: false
  });

  return (
    <div className="logout-page">
      <div className="card">
        <h2>You are logged out</h2>
        <p>
          <Link to="/admin/dashboard">Return to dashboard</Link>
        </p>
      </div>
    </div>
  );
}

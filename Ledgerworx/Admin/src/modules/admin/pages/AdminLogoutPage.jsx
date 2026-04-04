import { Link } from "react-router-dom";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import logoutCss from "../styles/logout.css?raw";
import { useEffect } from "react";
import { usePortalSession } from "../../../session/PortalSessionProvider";

export default function AdminLogoutPage() {
  const session = usePortalSession();

  useAdminPageStyles({
    pageKey: "logout",
    pageCssText: logoutCss,
    includeHeader: false,
    includeTheme: false
  });

  useEffect(() => {
    if (session.data?.authenticated && session.data?.config?.logoutUrl) {
      window.location.replace(session.data.config.logoutUrl);
    }
  }, [session.data]);

  return (
    <div className="logout-page">
      <div className="card">
        <h2>You are logged out</h2>
        <p>
          <a href={session.data?.config?.loginUrl || "https://ledgerworx.me/login/"}>Return to login</a>
        </p>
      </div>
    </div>
  );
}

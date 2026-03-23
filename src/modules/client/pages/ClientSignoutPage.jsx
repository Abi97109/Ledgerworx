import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import {
  CLIENT_SIGNOUT_CONTENT,
  formatSignedOutAt,
} from "../data/clientSignoutData";
import { usePageStyles } from "../hooks/usePageStyles";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import clientSignoutCssUrl from "../styles/client-signoutaf.css?url";
import clientBreadcrumbCssUrl from "../styles/client-breadcrumb.css?url";

function ClientSignoutPage() {
  usePageStyles([clientSignoutCssUrl, clientBreadcrumbCssUrl]);

  const signedOutAtLabel = useMemo(() => formatSignedOutAt(new Date()), []);

  return (
    <>
      <div className="top-brand">
        <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)} aria-label="Login Again">
          <img src={buildLegacyUrl(CLIENT_LEGACY_PATHS.logo)} alt="Ledger Workx logo" className="logo-img" />
        </a>
      </div>

      <main className="wrap">
        <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)}>Dashboard</a>
          <span className="crumb-sep">/</span>
          <span className="current">Sign Out</span>
        </nav>

        <section className="logout-card">
          <div className="icon">
            <i className="fas fa-right-from-bracket" />
          </div>
          <h1>{CLIENT_SIGNOUT_CONTENT.title}</h1>
          <p className="sub">{CLIENT_SIGNOUT_CONTENT.subtitle}</p>
          <p className="meta">
            <i className="fas fa-clock" /> {CLIENT_SIGNOUT_CONTENT.signedOutPrefix} {signedOutAtLabel}
          </p>
          <div className="actions">
            <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)} className="btn btn-primary">
              <i className="fas fa-right-to-bracket" /> {CLIENT_SIGNOUT_CONTENT.loginAgainLabel}
            </a>
            <Link to={CLIENT_ROUTE_PATHS.support} className="btn btn-secondary">
              <i className="fas fa-headset" /> {CLIENT_SIGNOUT_CONTENT.contactSupportLabel}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ClientSignoutPage;

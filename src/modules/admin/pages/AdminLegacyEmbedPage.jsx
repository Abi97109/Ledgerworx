import AdminHeader from "../components/AdminHeader";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/header.css";
import "../styles/admin_theme.css";
import "../styles/admin_legacy_embed.css";

export default function AdminLegacyEmbedPage({ title, legacyPath }) {
  const legacyUrl = buildLegacyUrl(legacyPath);

  return (
    <div className="legacy-wrap">
      <AdminHeader adminName="Admin" />
      <main className="legacy-main">
        <div className="legacy-page-head">
          <h1>{title}</h1>
          <a href={legacyUrl} target="_blank" rel="noreferrer">
            Open Standalone
          </a>
        </div>
        <iframe
          title={`${title} page`}
          src={legacyUrl}
          className="legacy-frame"
          loading="lazy"
        />
      </main>
    </div>
  );
}

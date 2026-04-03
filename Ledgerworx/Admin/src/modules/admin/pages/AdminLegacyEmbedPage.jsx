import AdminHeader from "../components/AdminHeader";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminLegacyEmbedCss from "../styles/admin_legacy_embed.css?raw";

export default function AdminLegacyEmbedPage({ title, legacyPath }) {
  useAdminPageStyles({ pageKey: "legacy-embed", pageCssText: adminLegacyEmbedCss });
  const legacyUrl = buildLegacyUrl(legacyPath);

  return (
    <>
      <AdminHeader adminName="Admin" />
      <div className="legacy-wrap">
        <main className="legacy-main">
          <div className="legacy-page-head">
            <h1>{title}</h1>
            <a href={legacyUrl} target="_blank" rel="noreferrer">
              Open In Legacy Page
            </a>
          </div>
          <iframe className="legacy-frame" title={title} src={legacyUrl} />
        </main>
      </div>
    </>
  );
}

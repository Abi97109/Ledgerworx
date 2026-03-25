import { useEffect } from "react";
import { buildLegacyUrl } from "../../../utils/legacyLinks";

export default function AdminLogoutPage() {
  useEffect(() => {
    window.location.replace(buildLegacyUrl("logout.php"));
  }, []);

  return null;
}

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_WORDPRESS_BASE_URL =
  typeof window !== "undefined" && window.location && window.location.origin
    ? window.location.origin
    : "https://ledgerworx.me";

const PortalSessionContext = createContext(null);

function getLoginUrlFallback() {
  return `${DEFAULT_WORDPRESS_BASE_URL}/login/`;
}

async function fetchPortalBootstrap() {
  const response = await fetch(`${DEFAULT_WORDPRESS_BASE_URL}/wp-admin/admin-ajax.php?action=lw_portal_bootstrap`, {
    credentials: "include",
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  const payload = await response.json();
  return {
    authenticated: Boolean(payload?.authenticated),
    role: String(payload?.role || ""),
    profile: payload?.profile || null,
    config: {
      loginUrl: String(payload?.config?.loginUrl || getLoginUrlFallback()),
      logoutUrl: String(payload?.config?.logoutUrl || ""),
      portalBaseUrl: String(payload?.config?.portalBaseUrl || ""),
      restNonce: String(payload?.config?.restNonce || "")
    }
  };
}

export function PortalSessionProvider({ children }) {
  const [state, setState] = useState({
    isLoading: true,
    isError: false,
    error: null,
    data: null
  });

  useEffect(() => {
    let isMounted = true;

    fetchPortalBootstrap()
      .then((data) => {
        if (!isMounted) {
          return;
        }
        if (typeof window !== "undefined") {
          window.__LW_PORTAL_BOOTSTRAP__ = data;
        }
        setState({
          isLoading: false,
          isError: false,
          error: null,
          data
        });
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        setState({
          isLoading: false,
          isError: true,
          error,
          data: null
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <PortalSessionContext.Provider value={value}>{children}</PortalSessionContext.Provider>;
}

export function usePortalSession() {
  const context = useContext(PortalSessionContext);
  if (!context) {
    throw new Error("usePortalSession must be used within PortalSessionProvider.");
  }
  return context;
}

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ACCOUNTANT_ROUTE_PATHS } from "../data/accountantDashData";

function AccountantSignoutPage() {
  useEffect(() => {
    document.title = "LedgerWorx | Signed Out";
    document.body.classList.remove("dark");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #eef6ff 0%, #f7fbff 55%, #e8fff2 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 20px",
            borderRadius: "999px",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #1a5a8f 0%, #16a34a 100%)",
            color: "#ffffff",
            fontSize: "28px",
          }}
        >
          <i className="fas fa-sign-out-alt" />
        </div>
        <h1 style={{ margin: "0 0 12px", color: "#0f172a" }}>You have been signed out</h1>
        <p style={{ margin: "0 0 24px", color: "#475569", lineHeight: 1.6 }}>
          This accountant portal is running in preview mode, so your session has simply been reset locally.
        </p>
        <Link
          to={ACCOUNTANT_ROUTE_PATHS.dashboard}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 20px",
            borderRadius: "14px",
            background: "#1a5a8f",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <i className="fas fa-arrow-left" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AccountantSignoutPage;

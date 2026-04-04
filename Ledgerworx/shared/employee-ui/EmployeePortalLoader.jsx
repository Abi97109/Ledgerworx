import React from "react";
import "./employee-portal-loader.css";

function LoaderGlyph() {
  return (
    <div className="employee-portal-loader__glyph" aria-hidden="true">
      <span className="employee-portal-loader__glyph-mark">LW</span>
      <span className="employee-portal-loader__glyph-ring employee-portal-loader__glyph-ring--outer" />
      <span className="employee-portal-loader__glyph-ring employee-portal-loader__glyph-ring--inner" />
    </div>
  );
}

export default function EmployeePortalLoader({
  title = "Loading workspace",
  message = "Preparing your portal workspace...",
  state = "loading",
  actionLabel = "",
  onAction = null,
  compact = false,
  fullHeight = false,
  className = ""
}) {
  const classes = [
    "employee-portal-loader",
    compact ? "employee-portal-loader--compact" : "",
    fullHeight ? "employee-portal-loader--full-height" : "",
    state === "error" ? "employee-portal-loader--error" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role={state === "error" ? "alert" : "status"} aria-live="polite">
      <div className="employee-portal-loader__panel">
        <LoaderGlyph />
        <div className="employee-portal-loader__content">
          <div className="employee-portal-loader__eyebrow">
            {state === "error" ? "Portal connection issue" : "LedgerWorx employee portal"}
          </div>
          <h2 className="employee-portal-loader__title">{title}</h2>
          <p className="employee-portal-loader__message">{message}</p>

          {state === "loading" ? (
            <div className="employee-portal-loader__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}

          {actionLabel && typeof onAction === "function" ? (
            <button type="button" className="employee-portal-loader__action" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

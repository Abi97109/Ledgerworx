export function extractCurrencyValue(value) {
  const normalized = String(value || "").replace(/[^0-9.-]/g, "");

  if (!normalized || Number.isNaN(Number(normalized))) {
    return 0;
  }

  return Number(normalized);
}

export function calculatePaymentTotal(payments = []) {
  return payments.reduce((total, payment) => total + extractCurrencyValue(payment.amount), 0);
}

export function formatAedNoDecimals(amount) {
  return `AED ${Number(amount || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function getClientHeaderStatusMeta(statusClass) {
  if (statusClass === "active") {
    return {
      background: "var(--success)",
      iconClass: "fas fa-check-circle",
    };
  }

  if (statusClass === "inactive") {
    return {
      background: "var(--danger)",
      iconClass: "fas fa-times-circle",
    };
  }

  return {
    background: "var(--warning)",
    iconClass: "fas fa-exclamation-circle",
  };
}

export function getServiceStatusIconClass(statusClass) {
  if (statusClass === "completed") {
    return "fas fa-check-circle";
  }

  if (statusClass === "pending") {
    return "fas fa-hourglass-half";
  }

  return "fas fa-clock";
}

export function normalizeStatusFilterValue(status) {
  return String(status || "").toLowerCase().trim();
}

export function buildUploadAreaText(selectedFileName, defaultHeading, defaultCaption) {
  if (!selectedFileName) {
    return {
      heading: defaultHeading,
      caption: defaultCaption,
    };
  }

  return {
    heading: selectedFileName,
    caption: "File selected - Ready to upload",
  };
}

export const CLIENT_DUE_NOW_STORAGE_KEY = "ledgerworx_due_now_total";

export function parseAedAmount(text) {
  if (!text) {
    return 0;
  }

  const normalized = String(text).replace(/[^0-9.-]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatAedAmount(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `AED ${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(safeValue)}`;
}

export function calculatePaymentTotals(items) {
  return (items || []).reduce(
    (totals, item) => {
      const amount = parseAedAmount(item?.amount);
      const statusClass = String(item?.statusClass || "");

      if (statusClass.includes("paid")) {
        totals.paid += amount;
        return totals;
      }

      if (statusClass.includes("upcoming")) {
        totals.upcoming += amount;
        return totals;
      }

      if (statusClass.includes("payment-required") || statusClass.includes("not-completed")) {
        totals.dueNow += amount;
      }

      return totals;
    },
    {
      dueNow: 0,
      upcoming: 0,
      paid: 0,
    },
  );
}

export function normalizeTitle(value) {
  return String(value || "").replace(/[?]+/g, "-").trim();
}

export function buildPaymentDetailsFromItem(item, detailsItemNote) {
  return {
    title: normalizeTitle(item?.title) || "Service Payment",
    requestId: item?.requestId || "N/A",
    amount: item?.amount || "N/A",
    status: item?.statusLabel || "Pending",
    note: detailsItemNote,
  };
}

export function buildPaymentDetailsFromSummaryCard(card, detailsSummaryNote) {
  const subText = String(card?.sub || "").replace(/\s+/g, " ").trim();
  const requestId = subText.toLowerCase().startsWith("request id:")
    ? subText.replace(/request id:/i, "").trim()
    : "N/A";

  return {
    title: card?.title || "Service Payment",
    requestId,
    amount: card?.amount || "N/A",
    status: subText || "Pending",
    note: detailsSummaryNote,
  };
}

export function buildPaymentGatewayPayload({ data, source, profileName, clientEmail, clientPhone }) {
  const packageName = data?.title || "Service Payment";
  const packagePrice = data?.amount || "Amount will be confirmed";
  const requestId = data?.requestId || "N/A";
  const status = data?.status || "Pending";
  const sourceLabel = source || "payments-page";

  return {
    package_name: packageName,
    package_price: packagePrice,
    full_name: profileName || "",
    email: clientEmail || "",
    phone: clientPhone || "",
    company_name: "",
    notes: `Initiated from ${sourceLabel}. Request ID: ${requestId}. Status: ${status}.`,
    plan: "payment-due",
  };
}
const VERIFIED_INVOICE_STORAGE_KEY = "verifiedInvoiceStatusMap";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getVerifiedInvoiceMap() {
  if (!isBrowser()) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(VERIFIED_INVOICE_STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

export function saveVerifiedInvoiceMap(map) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(VERIFIED_INVOICE_STORAGE_KEY, JSON.stringify(map || {}));
  } catch (error) {
    // Ignore storage failures.
  }
}

export function safeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizePaymentStatus(status) {
  const value = safeString(status).toLowerCase();

  if (value === "success" || value === "paid") {
    return "success";
  }

  if (value === "failed") {
    return "failed";
  }

  return "pending";
}

export function formatCurrency(amount) {
  return `AED ${Number(amount || 0).toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatPaymentDate(dateString) {
  if (!dateString) {
    return "--";
  }

  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) {
    return "--";
  }

  return parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function normalizePayment(payment, verifiedInvoiceMap = {}) {
  const amount = Number(payment?.amount || 0);
  const invoiceId = safeString(payment?.invoice_id);
  const storedStatus = verifiedInvoiceMap[invoiceId];
  const status = storedStatus === "paid" ? "success" : normalizePaymentStatus(payment?.status);
  const method = safeString(payment?.method) || "Bank Transfer";
  const date = safeString(payment?.date);

  return {
    id: safeString(payment?.id),
    client: safeString(payment?.client),
    invoiceId,
    service: safeString(payment?.service) || "General Service",
    amount,
    amountDisplay: formatCurrency(amount),
    method,
    date,
    status,
    verifiedAt: status === "success" ? date : "",
  };
}

export function normalizePaymentsList(payments = [], verifiedInvoiceMap = {}) {
  if (!Array.isArray(payments)) {
    return [];
  }

  return payments.map((payment) => normalizePayment(payment, verifiedInvoiceMap));
}

export function getPaymentStatusMeta(status) {
  if (status === "success") {
    return {
      className: "success",
      iconClass: "fas fa-check-circle",
      label: "Success",
    };
  }

  if (status === "failed") {
    return {
      className: "failed",
      iconClass: "fas fa-circle-xmark",
      label: "Failed",
    };
  }

  return {
    className: "pending",
    iconClass: "fas fa-clock",
    label: "Pending",
  };
}

export function filterPayments(
  payments = [],
  searchTerm = "",
  dateFilter = "",
  statusFilter = "all",
  methodFilter = "all",
) {
  const normalizedSearch = safeString(searchTerm).toLowerCase();
  const normalizedDate = safeString(dateFilter);
  const normalizedStatus = safeString(statusFilter).toLowerCase();
  const normalizedMethod = safeString(methodFilter).toLowerCase();

  return payments.filter((payment) => {
    const matchSearch =
      !normalizedSearch ||
      payment.id.toLowerCase().includes(normalizedSearch) ||
      payment.client.toLowerCase().includes(normalizedSearch);
    const matchDate = !normalizedDate || payment.date === normalizedDate;
    const matchStatus = normalizedStatus === "all" || payment.status === normalizedStatus;
    const matchMethod = normalizedMethod === "all" || payment.method.toLowerCase() === normalizedMethod;

    return matchSearch && matchDate && matchStatus && matchMethod;
  });
}

export function buildPaymentSummaryCounts(payments = [], referenceDate = new Date()) {
  const totalReceived = payments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = payments.filter((payment) => payment.status === "pending").length;
  const failedPayments = payments.filter((payment) => payment.status === "failed").length;

  const monthlyRevenue = payments
    .filter((payment) => {
      if (payment.status !== "success" || !payment.date) {
        return false;
      }

      const paymentDate = new Date(payment.date);
      return (
        paymentDate.getFullYear() === referenceDate.getFullYear() &&
        paymentDate.getMonth() === referenceDate.getMonth()
      );
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

  return {
    totalReceived: formatCurrency(totalReceived),
    pendingPayments: String(pendingPayments),
    failedPayments: String(failedPayments),
    monthlyRevenue: formatCurrency(monthlyRevenue),
  };
}

export function buildInvoiceQueryRoute(invoiceId, routeBase) {
  return `${routeBase}?invoice=${encodeURIComponent(invoiceId || "")}`;
}

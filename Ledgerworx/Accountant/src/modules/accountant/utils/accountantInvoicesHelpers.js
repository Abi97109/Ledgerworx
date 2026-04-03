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

export function safeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeInvoiceStatus(status) {
  const value = safeString(status).toLowerCase();

  if (value === "paid") {
    return "paid";
  }

  if (value === "overdue") {
    return "overdue";
  }

  return "pending";
}

export function buildAmountDisplay(amount) {
  const numericAmount = Number(amount || 0);
  return `AED ${numericAmount.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function normalizeInvoice(invoice, verifiedInvoiceMap = {}) {
  const invoiceId = safeString(invoice?.id);
  const storedStatus = verifiedInvoiceMap[invoiceId];
  const status = storedStatus === "paid" ? "paid" : normalizeInvoiceStatus(invoice?.status);
  const amount = Number(invoice?.amount || 0);

  return {
    id: invoiceId,
    client: safeString(invoice?.client),
    service: safeString(invoice?.service) || "General Service",
    amount,
    amountDisplay: buildAmountDisplay(amount),
    issueDate: safeString(invoice?.issue_date),
    dueDate: safeString(invoice?.due_date),
    status,
  };
}

export function normalizeInvoiceList(invoices = [], verifiedInvoiceMap = {}) {
  if (!Array.isArray(invoices)) {
    return [];
  }

  return invoices.map((invoice) => normalizeInvoice(invoice, verifiedInvoiceMap));
}

export function formatInvoiceDate(dateString) {
  if (!dateString) {
    return "--";
  }

  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) {
    return "--";
  }

  return parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function getInvoiceStatusMeta(status) {
  if (status === "paid") {
    return {
      className: "paid",
      iconClass: "fas fa-check-circle",
      label: "Paid",
    };
  }

  if (status === "overdue") {
    return {
      className: "overdue",
      iconClass: "fas fa-circle-exclamation",
      label: "Overdue",
    };
  }

  return {
    className: "pending",
    iconClass: "fas fa-clock",
    label: "Pending",
  };
}

export function filterInvoices(invoices = [], searchTerm = "", statusFilter = "all", dueDateFilter = "") {
  const normalizedSearch = safeString(searchTerm).toLowerCase();
  const normalizedStatusFilter = safeString(statusFilter).toLowerCase();
  const normalizedDueDate = safeString(dueDateFilter);

  return invoices.filter((invoice) => {
    const matchSearch =
      !normalizedSearch ||
      invoice.id.toLowerCase().includes(normalizedSearch) ||
      invoice.client.toLowerCase().includes(normalizedSearch);

    const matchStatus = normalizedStatusFilter === "all" || invoice.status === normalizedStatusFilter;
    const matchDate = !normalizedDueDate || invoice.dueDate === normalizedDueDate;

    return matchSearch && matchStatus && matchDate;
  });
}

export function buildSummaryCounts(invoices = []) {
  const total = invoices.length;
  const paid = invoices.filter((invoice) => invoice.status === "paid").length;
  const pending = invoices.filter((invoice) => invoice.status === "pending").length;
  const overdue = invoices.filter((invoice) => invoice.status === "overdue").length;

  return {
    total,
    paid,
    pending,
    overdue,
  };
}

export function buildInvoiceDownloadContent(invoice) {
  if (!invoice) {
    return "";
  }

  return [
    `Invoice ID: ${invoice.id}`,
    `Client: ${invoice.client}`,
    `Service: ${invoice.service}`,
    `Amount: ${invoice.amountDisplay}`,
    `Due Date: ${formatInvoiceDate(invoice.dueDate)}`,
    `Status: ${invoice.status.toUpperCase()}`,
  ].join("\n");
}

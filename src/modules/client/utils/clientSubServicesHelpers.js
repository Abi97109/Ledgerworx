export const REQUEST_STORAGE_KEY = "ledgerworxClientServiceRequests";
export const REQUEST_ID_BASELINE = 24;

export function readStoredRequests() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(REQUEST_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    return [];
  }
}

export function writeStoredRequests(requests) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(requests));
}

export function parseRequestNumber(requestId) {
  const value = String(requestId || "").trim();
  const parts = value.split("-");

  if (parts.length < 3) {
    return null;
  }

  const numberValue = Number.parseInt(parts[2], 10);
  return Number.isFinite(numberValue) ? numberValue : null;
}

export function buildNextRequestId(existingRequests) {
  const maxFromStored = existingRequests.reduce((maxValue, item) => {
    const parsedNumber = parseRequestNumber(item && item.requestId);
    if (parsedNumber === null) {
      return maxValue;
    }

    return parsedNumber > maxValue ? parsedNumber : maxValue;
  }, REQUEST_ID_BASELINE);

  const nextNumber = maxFromStored + 1;
  return `LW-REQ-${String(nextNumber).padStart(3, "0")}`;
}

export function formatDateShort(dateValue) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateValue);
}

export function buildSubmittedProgress() {
  return [
    { label: "Submitted", completed: true },
    { label: "Review", completed: false },
    { label: "Processing", completed: false },
    { label: "Pending", completed: false },
    { label: "Completed", completed: false },
  ];
}

export function buildStoredServiceRequest({
  selectedCategoryTitle,
  selectedService,
  requester,
  notes,
  existingRequests,
  submittedAt,
}) {
  return {
    title: `${selectedCategoryTitle} - ${selectedService.name}`,
    icon: "fas fa-concierge-bell",
    iconColor: "#3498db",
    iconTone: "blue",
    status: "Submitted",
    requestId: buildNextRequestId(existingRequests),
    submittedOn: formatDateShort(submittedAt),
    dueDate: "To be assigned",
    category: selectedCategoryTitle,
    overview: selectedService.description || "Service request submitted from the services page.",
    instructions: [
      "Our team will review your service request details.",
      "Upload any supporting files from My Requests if needed.",
      "Status will be updated once processing starts.",
    ],
    staffName: "LedgerWorx Team",
    staffRole: "Service Coordinator",
    progress: buildSubmittedProgress(),
    actionBtn: "Upload Documents",
    createdAt: submittedAt.toISOString(),
    requester,
    notes,
    amount: selectedService.amount,
    duration: selectedService.years,
    source: "services-page",
  };
}
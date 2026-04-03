import { ACCOUNTANT_CLIENT_MOCK_SYNC_FEEDS } from "../data/accountantClientData";

const CLIENT_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
];

function pickGradient(seed) {
  const key = String(seed || "client");
  let hash = 0;

  for (let index = 0; index < key.length; index += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(index);
    hash |= 0;
  }

  return CLIENT_GRADIENTS[Math.abs(hash) % CLIENT_GRADIENTS.length];
}

export function normalizeStatus(value) {
  const status = (value || "").toString().trim().toLowerCase();

  if (status.includes("document") || status.includes("attachment") || status.includes("kyc")) {
    return "documents-needed";
  }

  if (status.includes("complete") || status.includes("closed") || status.includes("done") || status.includes("verified")) {
    return "completed";
  }

  if (status.includes("progress") || status.includes("active") || status.includes("working") || status.includes("ongoing")) {
    return "in-progress";
  }

  return "pending";
}

export function normalizeClient(client, index = 0) {
  const fallbackName = `Client ${index + 1}`;
  const rawName = client && (client.name || client.client || client.company);
  const name = (rawName || fallbackName).toString().trim() || fallbackName;
  const rawId = client && (client.id || client.client_id || client.contact_id || `${index + 1}`);
  const id = String(rawId);

  const subtitle = (
    (client && (client.subtitle || client.industry || client.company || client.email || client.phone)) ||
    "Accountant Client"
  )
    .toString()
    .trim();

  const service = (
    (client && (client.service || client.task || client.requested_service || client.services)) ||
    "General Service"
  )
    .toString()
    .trim();

  const status = normalizeStatus(client && client.status);
  const documentsCountRaw = client && (client.documentsCount ?? client.documents_count ?? 0);
  const parsedDocuments = Number(documentsCountRaw);
  const documentsCount = Number.isFinite(parsedDocuments) ? Math.max(0, Math.round(parsedDocuments)) : 0;

  return {
    id,
    encodedId: encodeURIComponent(id),
    name,
    subtitle,
    service,
    status,
    documentsCount,
    avatar: ((client && client.avatar) || name.charAt(0) || "C").toString().charAt(0).toUpperCase(),
    color: client && client.color ? String(client.color) : pickGradient(id),
  };
}

export function normalizeClientRows(rows = []) {
  return (Array.isArray(rows) ? rows : []).map((client, index) => normalizeClient(client, index));
}

export function buildClientCounts(clients = []) {
  const normalized = Array.isArray(clients) ? clients : [];

  return {
    all: normalized.length,
    completed: normalized.filter((client) => client.status === "completed").length,
    inProgress: normalized.filter((client) => client.status === "in-progress").length,
    documentsNeeded: normalized.filter((client) => client.status === "documents-needed").length,
  };
}

export function applyClientFilters(clients = [], currentFilter = "all", advancedFilter = "", searchTerm = "") {
  let results = [...(Array.isArray(clients) ? clients : [])];

  if (currentFilter !== "all") {
    results = results.filter((client) => client.status === currentFilter);
  }

  if (advancedFilter) {
    if (["completed", "in-progress", "documents-needed", "pending"].includes(advancedFilter)) {
      results = results.filter((client) => client.status === advancedFilter);
    } else if (["vat-filing", "bookkeeping", "audit-report", "payroll"].includes(advancedFilter)) {
      const serviceName = advancedFilter.replace("-", " ");
      results = results.filter((client) => client.service.toLowerCase().includes(serviceName));
    } else if (advancedFilter === "name-asc") {
      results.sort((left, right) => left.name.localeCompare(right.name));
    } else if (advancedFilter === "name-desc") {
      results.sort((left, right) => right.name.localeCompare(left.name));
    } else if (advancedFilter === "recent") {
      results = [...results].reverse();
    } else if (advancedFilter === "oldest") {
      results = [...results];
    }
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();
  if (normalizedSearch !== "") {
    results = results.filter(
      (client) =>
        client.name.toLowerCase().includes(normalizedSearch) ||
        client.subtitle.toLowerCase().includes(normalizedSearch) ||
        client.service.toLowerCase().includes(normalizedSearch),
    );
  }

  return results;
}

export function buildPagination(totalItems, currentPage, itemsPerPage) {
  const safeTotal = Math.max(0, Number(totalItems) || 0);
  const safePerPage = Math.max(1, Number(itemsPerPage) || 1);
  const totalPages = safeTotal === 0 ? 0 : Math.ceil(safeTotal / safePerPage);

  if (totalPages === 0) {
    return {
      totalPages: 0,
      page: 0,
      buttons: [],
    };
  }

  const page = Math.min(Math.max(1, Number(currentPage) || 1), totalPages);
  const buttons = [];

  if (page > 1) {
    buttons.push({ type: "prev", page: page - 1 });
  }

  if (totalPages <= 5) {
    for (let index = 1; index <= totalPages; index += 1) {
      buttons.push({ type: "page", page: index, active: index === page });
    }
  } else {
    buttons.push({ type: "page", page: 1, active: page === 1 });

    if (page > 3) {
      buttons.push({ type: "dots" });
    }

    for (let index = Math.max(2, page - 1); index <= Math.min(totalPages - 1, page + 1); index += 1) {
      buttons.push({ type: "page", page: index, active: index === page });
    }

    if (page < totalPages - 2) {
      buttons.push({ type: "dots" });
    }

    buttons.push({ type: "page", page: totalPages, active: page === totalPages });
  }

  if (page < totalPages) {
    buttons.push({ type: "next", page: page + 1 });
  }

  return {
    totalPages,
    page,
    buttons,
  };
}

export function getStatusBadgeData(client) {
  const documentsCount = client.documentsCount > 0 ? client.documentsCount : 0;

  const badgeMap = {
    completed: {
      className: "completed",
      iconClass: "fas fa-check-circle",
      label: "Completed",
    },
    "in-progress": {
      className: "in-progress",
      iconClass: "fas fa-clock",
      label: "In Progress",
    },
    "documents-needed": {
      className: "documents-needed",
      iconClass: "fas fa-file-alt",
      label: "Documents Needed",
      documentsCount,
    },
    pending: {
      className: "pending",
      iconClass: "fas fa-hourglass-half",
      label: "Pending",
    },
  };

  return badgeMap[client.status] || badgeMap.pending;
}

export function resolveSyncSourceLabel(source = "") {
  const normalized = String(source).toLowerCase();

  if (normalized === "zoho") {
    return "Preview Feed";
  }

  if (normalized === "none") {
    return "Preview Feed Offline";
  }

  if (normalized === "error") {
    return "Preview Feed Issue";
  }

  return "Preview Feed";
}

export function formatSyncRelativeTime(lastSyncTime) {
  if (!lastSyncTime) {
    return "Last Sync: --";
  }

  const minutes = Math.floor((Date.now() - lastSyncTime.getTime()) / 60000);

  if (minutes <= 0) {
    return "Last Sync: Just now";
  }

  if (minutes === 1) {
    return "Last Sync: 1 min ago";
  }

  return `Last Sync: ${minutes} mins ago`;
}

export function getMockSyncFeed(feedIndex = 0) {
  if (!Array.isArray(ACCOUNTANT_CLIENT_MOCK_SYNC_FEEDS) || ACCOUNTANT_CLIENT_MOCK_SYNC_FEEDS.length === 0) {
    return {
      source: "none",
      rows: [],
    };
  }

  return ACCOUNTANT_CLIENT_MOCK_SYNC_FEEDS[feedIndex % ACCOUNTANT_CLIENT_MOCK_SYNC_FEEDS.length];
}

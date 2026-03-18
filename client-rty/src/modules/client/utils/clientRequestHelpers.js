import {
  CLIENT_REQUEST_ICON_TONE_CLASSES,
  CLIENT_REQUEST_STORAGE_KEY,
} from "../data/clientRequestData";

export function formatDateShort(dateValue) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateValue);
}

export function buildProgressFromStatus(status) {
  const normalizedStatus = String(status || "").trim().toLowerCase();
  const templates = {
    submitted: [true, false, false, false, false],
    "under review": [true, true, false, false, false],
    processing: [true, true, true, false, false],
    "in progress": [true, true, true, false, false],
    pending: [true, true, true, true, false],
    completed: [true, true, true, true, true],
  };

  const completedStates = templates[normalizedStatus] || templates.submitted;
  const labels = ["Submitted", "Review", "Processing", "Pending", "Completed"];

  return labels.map((label, index) => ({
    label,
    completed: completedStates[index],
  }));
}

export function normalizeProgress(progress, status) {
  const fallbackProgress = buildProgressFromStatus(status);
  if (!Array.isArray(progress) || progress.length === 0) {
    return fallbackProgress;
  }

  return fallbackProgress.map((fallbackStep, index) => {
    const incomingStep = progress[index] || {};
    const labelValue =
      typeof incomingStep.label === "string" && incomingStep.label.trim()
        ? incomingStep.label.trim()
        : fallbackStep.label;
    const completedValue =
      typeof incomingStep.completed === "boolean"
        ? incomingStep.completed
        : fallbackStep.completed;

    return {
      label: labelValue,
      completed: completedValue,
    };
  });
}

export function deriveStatusFromProgress(progress) {
  if (!Array.isArray(progress) || progress.length === 0) {
    return "Submitted";
  }

  let lastCompletedIndex = -1;
  progress.forEach((step, index) => {
    if (step && step.completed) {
      lastCompletedIndex = index;
    }
  });

  const statusByIndex = ["Submitted", "Under Review", "In Progress", "Pending", "Completed"];
  if (lastCompletedIndex < 0) {
    return "Submitted";
  }

  return statusByIndex[Math.min(lastCompletedIndex, statusByIndex.length - 1)];
}

export function readStoredRequests() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(CLIENT_REQUEST_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    return [];
  }
}

export function normalizeStoredRequest(item, index) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const createdAt = item.createdAt ? new Date(item.createdAt) : new Date();
  const submittedOn =
    typeof item.submittedOn === "string" && item.submittedOn.trim()
      ? item.submittedOn.trim()
      : formatDateShort(createdAt);

  const incomingProgress = normalizeProgress(item.progress, item.status);
  const resolvedStatus =
    typeof item.status === "string" && item.status.trim()
      ? item.status.trim()
      : deriveStatusFromProgress(incomingProgress);

  const requestId =
    typeof item.requestId === "string" && item.requestId.trim()
      ? item.requestId.trim()
      : `LW-REQ-S${String(index + 1).padStart(3, "0")}`;

  return {
    title:
      typeof item.title === "string" && item.title.trim()
        ? item.title.trim()
        : "Service Request",
    icon:
      typeof item.icon === "string" && item.icon.trim()
        ? item.icon.trim()
        : "fas fa-concierge-bell",
    iconColor:
      typeof item.iconColor === "string" && item.iconColor.trim()
        ? item.iconColor.trim()
        : "#3498db",
    iconTone:
      typeof item.iconTone === "string" && item.iconTone.trim()
        ? item.iconTone.trim()
        : "blue",
    status: resolvedStatus,
    requestId,
    submittedOn,
    dueDate:
      typeof item.dueDate === "string" && item.dueDate.trim()
        ? item.dueDate.trim()
        : "To be assigned",
    category:
      typeof item.category === "string" && item.category.trim()
        ? item.category.trim()
        : "Service Request",
    overview:
      typeof item.overview === "string" && item.overview.trim()
        ? item.overview.trim()
        : "Service request submitted from the services page.",
    instructions:
      Array.isArray(item.instructions) && item.instructions.length > 0
        ? item.instructions
        : [
            "Our team will review your service request details.",
            "Please upload supporting documents if applicable.",
            "Status will update as the request progresses.",
          ],
    staffName:
      typeof item.staffName === "string" && item.staffName.trim()
        ? item.staffName.trim()
        : "LedgerWorx Team",
    staffRole:
      typeof item.staffRole === "string" && item.staffRole.trim()
        ? item.staffRole.trim()
        : "Service Coordinator",
    progress: incomingProgress,
    actionBtn:
      typeof item.actionBtn === "string" && item.actionBtn.trim()
        ? item.actionBtn.trim()
        : "Upload Documents",
  };
}

export function resolveIconToneClass(request, index) {
  const tone = String(request?.iconTone || "").trim().toLowerCase();
  if (CLIENT_REQUEST_ICON_TONE_CLASSES.includes(tone)) {
    return tone;
  }

  return CLIENT_REQUEST_ICON_TONE_CLASSES[index % CLIENT_REQUEST_ICON_TONE_CLASSES.length];
}
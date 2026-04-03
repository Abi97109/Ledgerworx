import {
  ACCOUNTANT_DEFAULT_TASK_DETAIL,
  ACCOUNTANT_TASK_CATALOG,
} from "../data/accountantTaskViewData";

function safeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cloneDocuments(documents = []) {
  if (!Array.isArray(documents)) {
    return [];
  }

  return documents.map((document) => ({
    name: safeString(document?.name) || "Document",
    uploaded_on: safeString(document?.uploaded_on) || "N/A",
    size: safeString(document?.size) || "Unknown",
    path: safeString(document?.path),
  }));
}

function cloneTask(task) {
  return {
    client: safeString(task?.client) || ACCOUNTANT_DEFAULT_TASK_DETAIL.client,
    status: safeString(task?.status) || ACCOUNTANT_DEFAULT_TASK_DETAIL.status,
    deadline: safeString(task?.deadline) || ACCOUNTANT_DEFAULT_TASK_DETAIL.deadline,
    service: safeString(task?.service) || ACCOUNTANT_DEFAULT_TASK_DETAIL.service,
    task_notes: safeString(task?.task_notes) || ACCOUNTANT_DEFAULT_TASK_DETAIL.task_notes,
    client_info: {
      industry: safeString(task?.client_info?.industry) || ACCOUNTANT_DEFAULT_TASK_DETAIL.client_info.industry,
      contact_person:
        safeString(task?.client_info?.contact_person) || ACCOUNTANT_DEFAULT_TASK_DETAIL.client_info.contact_person,
      contact_email:
        safeString(task?.client_info?.contact_email) || ACCOUNTANT_DEFAULT_TASK_DETAIL.client_info.contact_email,
      phone: safeString(task?.client_info?.phone) || ACCOUNTANT_DEFAULT_TASK_DETAIL.client_info.phone,
    },
    documents: cloneDocuments(task?.documents),
  };
}

export function resolveTaskIdLabel(taskIdParam = "") {
  const id = safeString(taskIdParam);
  return id !== "" ? id : "N/A";
}

export function buildTaskReference(taskIdParam = "") {
  const normalizedId = safeString(taskIdParam);

  if (/^[0-9]{1,6}$/.test(normalizedId) && Number(normalizedId) > 0) {
    return `LW-TASK-${normalizedId.padStart(4, "0")}`;
  }

  return `ZOHO-TASK-${normalizedId !== "" ? normalizedId : "N/A"}`;
}

export function normalizeStatusClass(statusText = "") {
  const value = safeString(statusText).toLowerCase();

  if (value.includes("complete")) {
    return "completed";
  }

  if (value.includes("progress")) {
    return "in-progress";
  }

  return "pending";
}

export function getFallbackTaskDetail(taskIdParam = "") {
  const normalizedId = safeString(taskIdParam);
  const catalogEntry = ACCOUNTANT_TASK_CATALOG[normalizedId] || ACCOUNTANT_DEFAULT_TASK_DETAIL;
  const task = cloneTask(catalogEntry);

  return {
    id: resolveTaskIdLabel(normalizedId),
    task_reference: buildTaskReference(normalizedId),
    ...task,
  };
}

export function normalizeTaskDetailPayload(rawTask, taskIdParam = "") {
  const fallback = getFallbackTaskDetail(taskIdParam);

  if (!rawTask || typeof rawTask !== "object") {
    return fallback;
  }

  const taskId = safeString(rawTask.id) || fallback.id;
  const taskReference = safeString(rawTask.task_reference) || buildTaskReference(taskIdParam || taskId);
  const clientInfo = rawTask.client_info && typeof rawTask.client_info === "object" ? rawTask.client_info : {};

  return {
    id: taskId,
    task_reference: taskReference,
    client: safeString(rawTask.client) || fallback.client,
    status: safeString(rawTask.status) || fallback.status,
    deadline: safeString(rawTask.deadline) || fallback.deadline,
    service: safeString(rawTask.service) || fallback.service,
    task_notes: safeString(rawTask.task_notes) || fallback.task_notes,
    client_info: {
      industry: safeString(clientInfo.industry) || fallback.client_info.industry,
      contact_person: safeString(clientInfo.contact_person) || fallback.client_info.contact_person,
      contact_email: safeString(clientInfo.contact_email) || fallback.client_info.contact_email,
      phone: safeString(clientInfo.phone) || fallback.client_info.phone,
    },
    documents: cloneDocuments(rawTask.documents),
  };
}

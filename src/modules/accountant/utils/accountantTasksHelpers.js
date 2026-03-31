export function normalizeTaskStatus(statusValue) {
  const value = String(statusValue || "").toLowerCase();

  if (value.includes("progress")) {
    return "in-progress";
  }

  if (value.includes("complete") || value.includes("closed") || value.includes("done")) {
    return "completed";
  }

  if (value.includes("pending")) {
    return "pending";
  }

  return "pending";
}

export function normalizeTask(rawTask, index) {
  return {
    id: String(rawTask?.id || rawTask?.task_id || index + 1),
    client:
      rawTask?.client || rawTask?.client_name || rawTask?.subtitle || rawTask?.name || `Client ${index + 1}`,
    task: rawTask?.task || rawTask?.task_name || rawTask?.service || "Generate VAT reports",
    status: normalizeTaskStatus(rawTask?.status),
    dueDate: rawTask?.dueDate || rawTask?.due_date || rawTask?.deadline || rawTask?.end_date || "",
  };
}

export function normalizeTasksList(tasks = []) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.map((task, index) => normalizeTask(task, index));
}

export function parseTaskDueDate(dueDate) {
  if (!dueDate) {
    return null;
  }

  const date = new Date(dueDate);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatTaskDueDate(dueDate) {
  const parsed = parseTaskDueDate(dueDate);

  if (!parsed) {
    return dueDate || "Not set";
  }

  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function getTaskDeadlineMeta(dueDate) {
  const parsedDate = parseTaskDueDate(dueDate);
  const label = formatTaskDueDate(dueDate);

  if (!parsedDate) {
    return {
      label,
      colorClass: "deadline-yellow",
    };
  }

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDueDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
  const dayDiff = Math.ceil((startOfDueDate - startOfToday) / (1000 * 60 * 60 * 24));

  if (dayDiff <= 1) {
    return {
      label,
      colorClass: "deadline-red",
    };
  }

  if (dayDiff <= 4) {
    return {
      label,
      colorClass: "deadline-yellow",
    };
  }

  return {
    label,
    colorClass: "deadline-green",
  };
}

export function getTaskStatusMeta(status) {
  if (status === "in-progress") {
    return {
      className: "in-progress",
      iconClass: "fas fa-spinner",
      label: "In Progress",
    };
  }

  if (status === "completed") {
    return {
      className: "completed",
      iconClass: "fas fa-check-circle",
      label: "Completed",
    };
  }

  return {
    className: "pending",
    iconClass: "fas fa-clock",
    label: "Pending",
  };
}

export function buildTaskCounts(tasks = []) {
  return {
    all: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
  };
}

export function filterAndSortTasks(tasks = [], currentFilter = "all", searchTerm = "", sortDirection = "asc") {
  const normalizedSearch = String(searchTerm || "").toLowerCase().trim();

  const filtered = tasks.filter((task) => {
    const matchesStatus = currentFilter === "all" ? true : task.status === currentFilter;
    const matchesSearch =
      !normalizedSearch ||
      task.client.toLowerCase().includes(normalizedSearch) ||
      task.task.toLowerCase().includes(normalizedSearch) ||
      task.status.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  filtered.sort((a, b) => {
    const dateA = parseTaskDueDate(a.dueDate);
    const dateB = parseTaskDueDate(b.dueDate);
    const timeA = dateA ? dateA.getTime() : Number.MAX_SAFE_INTEGER;
    const timeB = dateB ? dateB.getTime() : Number.MAX_SAFE_INTEGER;

    return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
  });

  return filtered;
}

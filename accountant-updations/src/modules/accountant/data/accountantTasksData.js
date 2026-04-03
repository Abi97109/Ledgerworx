import {
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
} from "./accountantDashData";

export {
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
};

export const ACCOUNTANT_TASKS_PAGE_TITLE = "Tasks";
export const ACCOUNTANT_TASKS_SYNC_SOURCE_TEXT = "Preview Data";
export const ACCOUNTANT_TASKS_SYNC_DEFAULT_TEXT = "Using built-in accountant preview data";

export const ACCOUNTANT_TASKS_FILTER_TABS = [
  { key: "all", label: "All", countId: "countAll" },
  { key: "pending", label: "Pending", countId: "countPending" },
  { key: "in-progress", label: "In Progress", countId: "countInProgress" },
];

export const ACCOUNTANT_DEMO_TASKS = [
  { id: 1, client: "XYZ Corp", task: "Generate VAT reports", status: "pending", dueDate: "2026-03-25" },
  { id: 2, client: "TechNova LLC", task: "Generate bookkeeping reports", status: "in-progress", dueDate: "2026-03-24" },
  { id: 3, client: "BluePeak Trading", task: "Generate audit reports", status: "pending", dueDate: "2026-03-28" },
  { id: 4, client: "UrbanRise Holdings", task: "Generate VAT reports", status: "in-progress", dueDate: "2026-03-30" },
  { id: 5, client: "Northline Ventures", task: "Generate bookkeeping reports", status: "pending", dueDate: "2026-04-04" },
  { id: 6, client: "Matrix Allied", task: "Generate audit reports", status: "in-progress", dueDate: "2026-03-26" },
  { id: 7, client: "GreenArc Solutions", task: "Generate VAT reports", status: "pending", dueDate: "2026-04-09" },
];

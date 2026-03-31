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

export const ACCOUNTANT_INVOICES_PAGE_TITLE = "Invoices";
export const ACCOUNTANT_INVOICE_ROWS_PER_PAGE = 8;
export const ACCOUNTANT_INVOICE_SYNC_SOURCE_TEXT = "Zoho CRM Sync";
export const ACCOUNTANT_INVOICE_SYNC_DEFAULT_TEXT = "Last Sync: 15 mins ago";

export const ACCOUNTANT_INVOICE_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
];

export const ACCOUNTANT_INVOICE_SUMMARY_CARDS = [
  { key: "total", label: "Total Invoices" },
  { key: "paid", label: "Paid Invoices" },
  { key: "pending", label: "Pending Invoices" },
  { key: "overdue", label: "Overdue Invoices" },
];

export const ACCOUNTANT_DEMO_INVOICES = [
  {
    id: "INV-1001",
    client: "ABC LLC",
    service: "VAT Filing",
    amount: 500,
    issue_date: "2026-03-01",
    due_date: "2026-03-10",
    status: "pending",
  },
  {
    id: "INV-1002",
    client: "XYZ Ltd",
    service: "Audit",
    amount: 1200,
    issue_date: "2026-02-28",
    due_date: "2026-03-05",
    status: "paid",
  },
  {
    id: "INV-1003",
    client: "BlueWave Co",
    service: "Bookkeeping",
    amount: 900,
    issue_date: "2026-02-20",
    due_date: "2026-03-18",
    status: "overdue",
  },
  {
    id: "INV-1004",
    client: "Nova Retail",
    service: "Tax Advisory",
    amount: 750,
    issue_date: "2026-03-03",
    due_date: "2026-03-28",
    status: "pending",
  },
  {
    id: "INV-1005",
    client: "Orbit Holdings",
    service: "Payroll Setup",
    amount: 1100,
    issue_date: "2026-03-04",
    due_date: "2026-04-02",
    status: "paid",
  },
  {
    id: "INV-1006",
    client: "Alpine Foods",
    service: "Audit",
    amount: 1400,
    issue_date: "2026-02-10",
    due_date: "2026-02-25",
    status: "overdue",
  },
  {
    id: "INV-1007",
    client: "Sunrise Tech",
    service: "VAT Filing",
    amount: 620,
    issue_date: "2026-03-09",
    due_date: "2026-03-30",
    status: "pending",
  },
  {
    id: "INV-1008",
    client: "Delta Works",
    service: "Bookkeeping",
    amount: 810,
    issue_date: "2026-03-10",
    due_date: "2026-03-22",
    status: "paid",
  },
];

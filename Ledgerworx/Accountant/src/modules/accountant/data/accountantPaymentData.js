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

export const ACCOUNTANT_PAYMENT_PAGE_TITLE = "Payments";
export const ACCOUNTANT_PAYMENT_ROWS_PER_PAGE = 8;
export const ACCOUNTANT_PAYMENT_SYNC_SOURCE_TEXT = "Preview Data";
export const ACCOUNTANT_PAYMENT_SYNC_DEFAULT_TEXT = "Using built-in accountant preview data";

export const ACCOUNTANT_PAYMENT_STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

export const ACCOUNTANT_PAYMENT_METHOD_OPTIONS = [
  { value: "all", label: "All Methods" },
  { value: "card", label: "Card" },
  { value: "bank transfer", label: "Bank Transfer" },
  { value: "online wallet", label: "Online Wallet" },
  { value: "cash", label: "Cash" },
];

export const ACCOUNTANT_PAYMENT_SUMMARY_CARDS = [
  { key: "totalReceived", label: "Total Payments Received", id: "summaryTotalReceived" },
  { key: "pendingPayments", label: "Pending Payments", id: "summaryPendingPayments" },
  { key: "failedPayments", label: "Failed Payments", id: "summaryFailedPayments" },
  { key: "monthlyRevenue", label: "Monthly Revenue", id: "summaryMonthlyRevenue" },
];

export const ACCOUNTANT_DEMO_PAYMENTS = [
  {
    id: "PAY-1001",
    client: "ABC LLC",
    invoice_id: "INV-1001",
    service: "VAT Filing",
    amount: 500,
    method: "Card",
    date: "2026-03-09",
    status: "success",
  },
  {
    id: "PAY-1002",
    client: "XYZ Ltd",
    invoice_id: "INV-1002",
    service: "Audit",
    amount: 1200,
    method: "Bank Transfer",
    date: "2026-03-06",
    status: "pending",
  },
  {
    id: "PAY-1003",
    client: "BlueWave Co",
    invoice_id: "INV-1003",
    service: "Bookkeeping",
    amount: 900,
    method: "Online Wallet",
    date: "2026-03-17",
    status: "failed",
  },
  {
    id: "PAY-1004",
    client: "Nova Retail",
    invoice_id: "INV-1004",
    service: "Tax Advisory",
    amount: 750,
    method: "Card",
    date: "2026-03-20",
    status: "pending",
  },
  {
    id: "PAY-1005",
    client: "Orbit Holdings",
    invoice_id: "INV-1005",
    service: "Payroll Setup",
    amount: 1100,
    method: "Bank Transfer",
    date: "2026-03-13",
    status: "success",
  },
  {
    id: "PAY-1006",
    client: "Alpine Foods",
    invoice_id: "INV-1006",
    service: "Audit",
    amount: 1400,
    method: "Cash",
    date: "2026-03-04",
    status: "success",
  },
  {
    id: "PAY-1007",
    client: "Sunrise Tech",
    invoice_id: "INV-1007",
    service: "VAT Filing",
    amount: 620,
    method: "Card",
    date: "2026-03-21",
    status: "pending",
  },
  {
    id: "PAY-1008",
    client: "Delta Works",
    invoice_id: "INV-1008",
    service: "Bookkeeping",
    amount: 810,
    method: "Bank Transfer",
    date: "2026-03-22",
    status: "success",
  },
];

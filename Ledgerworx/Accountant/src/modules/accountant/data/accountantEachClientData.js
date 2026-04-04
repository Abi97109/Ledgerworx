import { ACCOUNTANT_LEGACY_PATHS, ACCOUNTANT_NAV_LINKS, ACCOUNTANT_ROUTE_PATHS, ACCOUNTANT_USER } from "./accountantDashData";

export {
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
};

export const ACCOUNTANT_AVAILABLE_STATUSES = ["Pending", "In Progress", "Completed"];

export const ACCOUNTANT_UPLOAD_DOCUMENT_TYPES = [
  { value: "emirates_id", label: "Emirates ID" },
  { value: "passport", label: "Passport" },
  { value: "trade_license", label: "Trade License" },
  { value: "financial_statement", label: "Financial Statement" },
  { value: "other", label: "Other" },
];

export const ACCOUNTANT_UPLOAD_REPORT_TYPES = [
  { value: "vat", label: "VAT Report" },
  { value: "audit", label: "Audit Report" },
  { value: "bookkeeping", label: "Bookkeeping Report" },
  { value: "client", label: "Client Report" },
  { value: "financial", label: "Financial Statement" },
  { value: "other", label: "Other" },
];

export const ACCOUNTANT_DEFAULT_CLIENT_DETAIL = {
  id: "",
  name: "Client details unavailable",
  contact_person: "",
  email: "",
  phone: "",
  website: "",
  avatar: "C",
  color: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
  status: "Inactive",
  status_class: "inactive",
  is_active: false,
  assigned_services: [],
  documents: [],
  reports: [],
  payments: [],
};

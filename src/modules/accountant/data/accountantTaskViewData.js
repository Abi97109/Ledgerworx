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

export const ACCOUNTANT_TASK_VIEW_PAGE_TITLE = "Task Details";
export const ACCOUNTANT_TASK_VIEW_LOADING_TEXT = "Loading task details...";

export const ACCOUNTANT_TASK_VIEW_SOURCE_TEXT = {
  noTaskId: "No task ID was provided. Showing fallback details.",
  zoho: "Live Zoho data loaded for this task.",
  fallback: "Fallback task data loaded (Zoho not configured or unavailable).",
  loadFailed: "Unable to load live task details. Showing fallback data.",
  connectionFailed: "Unable to connect to Zoho endpoint. Showing fallback data.",
};

export const ACCOUNTANT_TASK_CATALOG = {
  1: {
    client: "XYZ Corp",
    status: "Pending",
    deadline: "Mar 25, 2026",
    service: "Generate VAT reports",
    task_notes:
      "Prepare the VAT computation for Q1 and validate all taxable supplies, exempt supplies, and recoverable input tax before filing.",
    client_info: {
      industry: "Retail Distribution",
      contact_person: "Ava Collins",
      contact_email: "finance@xyzcorp.com",
      phone: "+971 4 555 0191",
    },
    documents: [
      {
        name: "Sales_Ledger_Q1.xlsx",
        uploaded_on: "Mar 12, 2026",
        size: "1.9 MB",
        path: "../uploads/client-documents/Sales_Ledger_Q1.txt",
      },
      {
        name: "Purchase_Ledger_Q1.xlsx",
        uploaded_on: "Mar 12, 2026",
        size: "1.4 MB",
        path: "../uploads/client-documents/Purchase_Ledger_Q1.txt",
      },
      {
        name: "Prior_VAT_Return.pdf",
        uploaded_on: "Mar 10, 2026",
        size: "780 KB",
        path: "../uploads/client-documents/Prior_VAT_Return.txt",
      },
    ],
  },
  2: {
    client: "TechNova LLC",
    status: "In Progress",
    deadline: "Mar 24, 2026",
    service: "Generate bookkeeping reports",
    task_notes:
      "Compile monthly general ledger summaries, reconcile cash accounts, and generate the management P&L and balance sheet package.",
    client_info: {
      industry: "Software Services",
      contact_person: "Liam Parker",
      contact_email: "accounts@technova.ae",
      phone: "+971 4 555 0253",
    },
    documents: [
      {
        name: "Bank_Statement_March.pdf",
        uploaded_on: "Mar 20, 2026",
        size: "1.2 MB",
        path: "../uploads/client-documents/Bank_Statement_March.txt",
      },
      {
        name: "Expense_Bills_Zip.zip",
        uploaded_on: "Mar 20, 2026",
        size: "4.7 MB",
        path: "../uploads/client-documents/Expense_Bills_Index.txt",
      },
    ],
  },
  3: {
    client: "BluePeak Trading",
    status: "Pending",
    deadline: "Mar 28, 2026",
    service: "Generate audit reports",
    task_notes:
      "Assemble draft audit schedules and working papers with trial balance tie-outs and supporting documentation references.",
    client_info: {
      industry: "Import/Export",
      contact_person: "Nina George",
      contact_email: "audit@bluepeaktrading.com",
      phone: "+971 4 555 0304",
    },
    documents: [
      {
        name: "Trial_Balance_2025.xlsx",
        uploaded_on: "Mar 15, 2026",
        size: "920 KB",
        path: "../uploads/client-documents/Trial_Balance_2025.txt",
      },
      {
        name: "Inventory_Count_Sheets.pdf",
        uploaded_on: "Mar 16, 2026",
        size: "2.0 MB",
        path: "../uploads/client-documents/Inventory_Count_Sheets.txt",
      },
    ],
  },
  4: {
    client: "UrbanRise Holdings",
    status: "In Progress",
    deadline: "Mar 30, 2026",
    service: "Generate VAT reports",
    task_notes:
      "Prepare VAT return supporting schedules for project billing and contractor invoices for the current filing period.",
    client_info: {
      industry: "Real Estate",
      contact_person: "Omar Khan",
      contact_email: "tax@urbanrise.ae",
      phone: "+971 4 555 0442",
    },
    documents: [
      {
        name: "Project_Invoice_Register.xlsx",
        uploaded_on: "Mar 18, 2026",
        size: "1.1 MB",
        path: "../uploads/client-documents/Project_Invoice_Register.txt",
      },
      {
        name: "Contractor_Invoices.zip",
        uploaded_on: "Mar 18, 2026",
        size: "6.2 MB",
        path: "../uploads/client-documents/Contractor_Invoices_Index.txt",
      },
    ],
  },
  5: {
    client: "Northline Ventures",
    status: "Pending",
    deadline: "Apr 04, 2026",
    service: "Generate bookkeeping reports",
    task_notes:
      "Prepare month-end bookkeeping packet with receivable aging, payable aging, and account reconciliations.",
    client_info: {
      industry: "Investment Management",
      contact_person: "Sarah Wells",
      contact_email: "accounts@northline.vc",
      phone: "+971 4 555 0518",
    },
    documents: [
      {
        name: "AP_Detail_Report.csv",
        uploaded_on: "Mar 19, 2026",
        size: "430 KB",
        path: "../uploads/client-documents/AP_Detail_Report.txt",
      },
      {
        name: "AR_Detail_Report.csv",
        uploaded_on: "Mar 19, 2026",
        size: "412 KB",
        path: "../uploads/client-documents/AR_Detail_Report.txt",
      },
    ],
  },
};

export const ACCOUNTANT_DEFAULT_TASK_DETAIL = {
  client: "Unknown Client",
  status: "Pending",
  deadline: "Not Set",
  service: "Generate VAT reports",
  task_notes: "No additional task notes are available for this task yet.",
  client_info: {
    industry: "Not Available",
    contact_person: "Not Available",
    contact_email: "not-available@example.com",
    phone: "Not Available",
  },
  documents: [],
};

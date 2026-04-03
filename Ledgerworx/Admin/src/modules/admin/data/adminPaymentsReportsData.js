export const paymentsTopActions = ["Export as CSV", "Export as PDF", "Download Invoice"];

export const paymentsKpis = [
  {
    key: "revenue",
    cardClass: "payp-kpi-revenue",
    iconClass: "fa-solid fa-bolt",
    label: "Total Revenue",
    value: "AED 82,500",
    meta: "Invoice"
  },
  {
    key: "pending",
    cardClass: "payp-kpi-pending",
    iconClass: "fa-solid fa-hourglass-half",
    label: "Pending Payments",
    value: "AED 8,700",
    meta: "Invoice"
  },
  {
    key: "paid",
    cardClass: "payp-kpi-paid",
    iconClass: "fa-solid fa-check",
    label: "Paid Invoices",
    value: "AED 65,800",
    meta: "Paid Invoices"
  },
  {
    key: "overdue",
    cardClass: "payp-kpi-overdue",
    iconClass: "fa-solid fa-exclamation",
    label: "Overdue Payments",
    value: "AED 8,000",
    meta: "Overdue"
  }
];

export const paymentTypeOptions = ["All", "Invoice", "Credit Note"];

export const paymentStatusOptions = ["All", "Created", "Paid", "Overdue"];

export const paymentCustomerOptions = [
  "Customer",
  "Qubicle Technologies LLC",
  "FutureTech Solutions",
  "Global Electronics"
];

export const paymentPageSizeOptions = ["10 Items/page", "20 Items/page", "50 Items/page"];

export const paymentRows = [
  {
    id: "INV-00255",
    customer: "Qubicle Technologies LLC",
    type: "Invoice",
    date: "18/10/2025",
    status: "Created",
    invoiceId: "INV-00255",
    dueDate: "18/10/2025",
    entryDate: "18/10/2025",
    itemLabel: "Appliance Repair",
    itemAmount: "AED 2,000",
    discount: "AED 2,000",
    tax: "00",
    adjustment: "AED 2,000",
    total: "AED 2,000",
    assignedTo: "Arun Paul"
  },
  {
    id: "INV-00263",
    customer: "FutureTech Solutions",
    type: "Invoice",
    date: "19/06/2025",
    status: "Paid",
    invoiceId: "INV-00263",
    dueDate: "19/06/2025",
    entryDate: "19/06/2025",
    itemLabel: "Annual Maintenance",
    itemAmount: "AED 7,800",
    discount: "AED 0",
    tax: "0",
    adjustment: "AED 0",
    total: "AED 7,800",
    assignedTo: "Priyanka Das"
  },
  {
    id: "INV-00198",
    customer: "Global Electronics",
    type: "Invoice",
    date: "18/06/2025",
    status: "Paid",
    invoiceId: "INV-00198",
    dueDate: "18/06/2025",
    entryDate: "18/06/2025",
    itemLabel: "Device Replacement",
    itemAmount: "AED 5,900",
    discount: "AED 0",
    tax: "0",
    adjustment: "AED 0",
    total: "AED 5,900",
    assignedTo: "Sameer Khan"
  }
];

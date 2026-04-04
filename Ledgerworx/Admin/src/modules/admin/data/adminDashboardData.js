export const dashboardSidebarLinks = [
  {
    key: "dashboard",
    path: "/dashboard",
    icon: "🏠",
    label: "Dashboard",
    className: "active"
  },
  {
    key: "sales",
    path: "/sales",
    icon: "💼",
    label: "Sales Department"
  },
  {
    key: "accounts",
    path: "/accounts",
    icon: "📊",
    label: "Accounts Department"
  },
  {
    key: "services",
    path: "/services",
    icon: "🧾",
    label: "Services & Packages"
  },
  {
    key: "users",
    path: "/users",
    icon: "👥",
    label: "Users & Roles"
  },
  {
    key: "payments",
    path: "/payments",
    icon: "💳",
    label: "Payments & Reports"
  },
  {
    key: "settings",
    path: "/settings",
    icon: "⚙️",
    label: "Settings"
  },
  {
    key: "logout",
    path: "/logout",
    icon: "🚪",
    label: "Logout"
  }
];

export const dashboardKpis = [
  {
    head: "Sales Department",
    label: "Active Leads:",
    value: "25",
    className: "kpi-blue"
  },
  {
    head: "Accounts Department",
    label: "Pending Payments:",
    value: "AED 1,20,000",
    className: "kpi-green"
  },
  {
    head: "Operations",
    label: "Approval List:",
    value: "7",
    className: "kpi-orange"
  },
  {
    head: "Company Management",
    label: "Active Companies:",
    value: "45",
    className: "kpi-purple"
  }
];

export const leadManagementRows = [
  {
    lead: "ABC Corp",
    assigned: "Rahul",
    status: "Follow Up",
    statusClass: "blue",
    action: "Action",
    actionClass: ""
  },
  {
    lead: "XYZ Ltd",
    assigned: "Priya",
    status: "New Lead",
    statusClass: "yellow",
    action: "Action",
    actionClass: ""
  },
  {
    lead: "Tech Solutions",
    assigned: "Amit",
    status: "In Progress",
    statusClass: "green",
    action: "Action",
    actionClass: ""
  }
];

export const companyManagementRows = [
  {
    company: "Gulf Star LLC",
    zone: "Free Zone",
    status: "Active",
    statusClass: "green",
    action: "Manage",
    actionClass: "manage"
  },
  {
    company: "Desert Holdings",
    zone: "Mainland",
    status: "Expiring",
    statusClass: "orange",
    action: "Assign",
    actionClass: "assign"
  },
  {
    company: "Oceanic Corp",
    zone: "Mainland",
    status: "Expired",
    statusClass: "red",
    action: "Reactivate",
    actionClass: "reactivate"
  }
];

export const accountsOverview = {
  pendingInvoices: "15",
  totalRevenue: "AED 3,45,000"
};

export const recentPayments = [
  {
    invoice: "#1024",
    client: "Global Enterprises",
    amount: "AED 15,000",
    status: "Paid",
    statusClass: "green"
  },
  {
    invoice: "#1025",
    client: "Metro Corp",
    amount: "AED 8,500",
    status: "Pending",
    statusClass: "yellow"
  },
  {
    invoice: "#1026",
    client: "XYZ Solutions",
    amount: "AED 8,500",
    status: "Overdue",
    statusClass: "red"
  }
];

export const companyFeed = [
  {
    prefix: "Finance:",
    message: "Invoice #123 updated",
    time: "25m ago"
  },
  {
    prefix: "Sales:",
    message: "New lead added",
    time: "10m ago"
  },
  {
    prefix: "Zoho CRM:",
    message: "Sync completed",
    time: "25m ago"
  }
];

export const liveActivityFeed = [
  {
    message: "Security: Failed login attempt",
    time: "45m ago"
  },
  {
    message: "System: Backup completed",
    time: "1h ago"
  }
];

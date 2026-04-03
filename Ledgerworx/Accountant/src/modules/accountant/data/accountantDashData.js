export const ACCOUNTANT_THEME_STORAGE_KEY = "theme";

export const ACCOUNTANT_ROUTE_PATHS = {
  dashboard: "/accountant/dashboard",
  clients: "/accountant/clients",
  tasks: "/accountant/tasks",
  taskView: "/accountant/task-view",
  profile: "/accountant/profile",
  settings: "/accountant/settings",
  payments: "/accountant/payments",
  eachClient: "/accountant/client-details",
  help: "/accountant/help",
  invoices: "/accountant/invoices",
  signout: "/accountant/signout",
};

export const ACCOUNTANT_LEGACY_PATHS = {
  logo: "ledgerworx-accountant-logo.png",
  dashboard: ACCOUNTANT_ROUTE_PATHS.dashboard,
  clients: ACCOUNTANT_ROUTE_PATHS.clients,
  tasks: ACCOUNTANT_ROUTE_PATHS.tasks,
  payments: ACCOUNTANT_ROUTE_PATHS.payments,
  invoices: ACCOUNTANT_ROUTE_PATHS.invoices,
  profile: ACCOUNTANT_ROUTE_PATHS.profile,
  settings: ACCOUNTANT_ROUTE_PATHS.settings,
  help: ACCOUNTANT_ROUTE_PATHS.help,
  logout: ACCOUNTANT_ROUTE_PATHS.signout,
  taskView: ACCOUNTANT_ROUTE_PATHS.taskView,
  taskCompletePortal: "",
  eachClient: ACCOUNTANT_ROUTE_PATHS.eachClient,
  zohoApi: "",
};

export const ACCOUNTANT_USER = {
  name: "Santiago Morales",
  role: "Senior Accountant",
  email: "santiago@ledgerworx.com",
  image: "user-profile.jpg",
};

export const ACCOUNTANT_NAV_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    iconClass: "fa-solid fa-chart-column",
    legacyPath: ACCOUNTANT_LEGACY_PATHS.dashboard,
    routePath: ACCOUNTANT_ROUTE_PATHS.dashboard,
    isMigrated: true,
  },
  {
    key: "clients",
    label: "Clients",
    iconClass: "fa-solid fa-users",
    legacyPath: ACCOUNTANT_LEGACY_PATHS.clients,
    routePath: ACCOUNTANT_ROUTE_PATHS.clients,
    isMigrated: true,
  },
  {
    key: "tasks",
    label: "Tasks",
    iconClass: "fa-solid fa-list-check",
    legacyPath: ACCOUNTANT_LEGACY_PATHS.tasks,
    routePath: ACCOUNTANT_ROUTE_PATHS.tasks,
    isMigrated: true,
  },
  {
    key: "payments",
    label: "Payments",
    iconClass: "fa-solid fa-credit-card",
    legacyPath: ACCOUNTANT_LEGACY_PATHS.payments,
    routePath: ACCOUNTANT_ROUTE_PATHS.payments,
    isMigrated: true,
  },
  {
    key: "invoices",
    label: "Invoices",
    iconClass: "fa-solid fa-file-invoice",
    legacyPath: ACCOUNTANT_LEGACY_PATHS.invoices,
    routePath: ACCOUNTANT_ROUTE_PATHS.invoices,
    isMigrated: true,
  },
];

export const ACCOUNTANT_STATS = [
  {
    key: "totalClients",
    title: "Total Clients",
    value: "368",
    footer: "42 Active this month",
    iconClass: "fas fa-users",
    trendClass: "up",
    trendIconClass: "fas fa-arrow-up",
    trendValue: "18.2%",
  },
  {
    key: "paymentsReceived",
    title: "Payments Received",
    value: "AED 950,000",
    footer: "+23% from last month",
    iconClass: "fas fa-money-bill-wave",
    trendClass: "up",
    trendIconClass: "fas fa-arrow-up",
    trendValue: "12.5%",
  },
  {
    key: "pendingPayments",
    title: "Pending Payments",
    value: "AED 180,500",
    footer: "+9.8% from last week",
    iconClass: "fas fa-clock",
    trendClass: "down",
    trendIconClass: "fas fa-arrow-down",
    trendValue: "5.8%",
  },
  {
    key: "pendingInvoices",
    title: "Pending Invoices",
    value: "AED 92,300",
    footer: "12 invoices pending",
    iconClass: "fas fa-file-invoice",
    trendClass: "up",
    trendIconClass: "fas fa-arrow-up",
    trendValue: "15.6%",
  },
];

export const ACCOUNTANT_PENDING_TASKS = [
  {
    id: 1,
    title: "Validate VAT Report",
    client: "TechCorp Ltd",
    badgeClass: "success",
    badgeLabel: "Completed",
  },
  {
    id: 2,
    title: "Bookkeeping Review",
    client: "ABC Trading",
    badgeClass: "warning",
    badgeLabel: "In Progress",
  },
  {
    id: 3,
    title: "Audit Preparation",
    client: "Global Solutions",
    badgeClass: "danger",
    badgeLabel: "Tomorrow",
  },
  {
    id: 4,
    title: "Financial Statement Review",
    client: "XYZ Technologies",
    badgeClass: "info",
    badgeLabel: "Next Week",
  },
];

export const ACCOUNTANT_ACTIVITY_ROWS = [
  {
    id: 1,
    avatarText: "X",
    avatarStyle: { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    client: "XYZ Technologies",
    service: "VAT Filing",
    statusDotClass: "green",
    statusLabel: "Paid",
  },
  {
    id: 2,
    avatarText: "R",
    avatarStyle: { background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    client: "Rashid Ali",
    service: "Bookkeeping",
    statusDotClass: "orange",
    statusLabel: "In Progress",
  },
  {
    id: 3,
    avatarText: "A",
    avatarStyle: { background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    client: "ABC Trading",
    service: "VAT Filing",
    statusDotClass: "green",
    statusLabel: "Completed",
  },
  {
    id: 4,
    avatarText: "G",
    avatarStyle: { background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    client: "Global Solutions",
    service: "Audit Report",
    statusDotClass: "blue",
    statusLabel: "Scheduled",
  },
];

export const ACCOUNTANT_CHART = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  income: [40, 55, 45, 70, 65, 80],
  expense: [30, 35, 40, 45, 50, 55],
};

export const ACCOUNTANT_LIVE_UPDATES = [
  {
    totalClients: "370",
    paymentsReceived: "AED 965,200",
    pendingPayments: "AED 176,400",
    pendingInvoices: "AED 89,700",
    chartData: {
      income: [43, 57, 48, 73, 69, 82],
      expense: [31, 36, 41, 46, 52, 57],
    },
  },
  {
    totalClients: "372",
    paymentsReceived: "AED 972,450",
    pendingPayments: "AED 171,900",
    pendingInvoices: "AED 86,500",
    chartData: {
      income: [44, 58, 49, 75, 72, 85],
      expense: [32, 36, 42, 47, 54, 58],
    },
  },
  {
    totalClients: "375",
    paymentsReceived: "AED 981,800",
    pendingPayments: "AED 168,200",
    pendingInvoices: "AED 84,100",
    chartData: {
      income: [45, 59, 50, 77, 74, 88],
      expense: [33, 37, 43, 48, 55, 60],
    },
  },
];

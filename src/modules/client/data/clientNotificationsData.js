export const CLIENT_ROUTE_PATHS = {
  requests: "/client/requests",
  payments: "/client/payments",
  receiptPdf: "/client/receipt-pdf",
  profileSettings: "/client/profile-settings",
  notifications: "/client/notifications",
  support: "/client/support",
  subServices: "/client/sub-services",
  signout: "/client/signout",
};

export const CLIENT_LEGACY_PATHS = {
  dashboard: "client/client-php/client-dashboard.php",
  requests: "client/client-php/client-request.php",
  payments: "client/client-php/client-payments.php",
  receiptPdf: "client/client-php/client-receiptpdf.php",
  paymentGateway: "client/client-php/client-payment-gateway.php",
  documents: "client/client-php/client-documents.php",
  moreServices: "client/client-php/client-moreServices.php",
  notifications: "client/client-php/clinet-notification.php",
  subServices: "client/client-php/client-subServices.php",
  notificationDetail: "client/client-php/client-notificationex.php",
  profileSettings: "client/client-php/client-profile-settings.php",
  support: "client/client-php/client-support.php",
  signout: "client/client-php/client-signoutaf.php",
  logo: "client/client-assets/logo.png",
};

export const CLIENT_PROFILE = {
  userName: "John Doe",
  profileName: "John Doe",
  profileImage: "https://i.pravatar.cc/40",
  portalLabel: "Client Portal",
};

export const CLIENT_NOTIFICATION_SORT_OPTIONS = [
  { value: "latest", label: "Sort: Latest" },
  { value: "oldest", label: "Sort: Oldest" },
  { value: "title", label: "Sort: Title (A-Z)" },
];

export const CLIENT_NAV_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    legacyPath: CLIENT_LEGACY_PATHS.dashboard,
    iconClass: "fa-solid fa-chart-column",
    isMigrated: false,
  },
  {
    key: "requests",
    label: "My Requests",
    legacyPath: CLIENT_LEGACY_PATHS.requests,
    iconClass: "fa-solid fa-list-check",
    routePath: CLIENT_ROUTE_PATHS.requests,
    isMigrated: true,
  },
  {
    key: "payments",
    label: "Payments",
    legacyPath: CLIENT_LEGACY_PATHS.payments,
    iconClass: "fa-solid fa-credit-card",
    routePath: CLIENT_ROUTE_PATHS.payments,
    isMigrated: true,
  },
  {
    key: "documents",
    label: "Documents",
    legacyPath: CLIENT_LEGACY_PATHS.documents,
    iconClass: "fa-solid fa-folder-open",
    isMigrated: false,
  },
  {
    key: "notifications",
    label: "Notifications",
    legacyPath: CLIENT_LEGACY_PATHS.notifications,
    iconClass: "fa-solid fa-bell",
    routePath: CLIENT_ROUTE_PATHS.notifications,
    isMigrated: true,
  },
];

export const CLIENT_NOTIFICATIONS = [
  {
    id: "payment-received",
    title: "Payment Received",
    dateTime: "2026-02-12T10:35:00",
    timeLabel: "10:35 AM",
    message: "Your payment for Request ID LW-REQ-024 has been successfully received.",
    tag: "Payments",
    defaultSeen: false,
  },
  {
    id: "document-approved",
    title: "Document Approved",
    dateTime: "2026-02-12T08:40:00",
    timeLabel: "08:40 AM",
    message: "Trade License Copy has been reviewed and marked as approved.",
    tag: "Documents",
    defaultSeen: false,
  },
  {
    id: "request-status-updated",
    title: "Request Status Updated",
    dateTime: "2026-02-11T17:15:00",
    timeLabel: "Yesterday",
    message: "Your request LW-REQ-031 moved to the In Progress stage.",
    tag: "Requests",
    defaultSeen: true,
  },
  {
    id: "pending-documents-reminder",
    title: "Reminder: Upload Pending Documents",
    dateTime: "2026-02-11T09:00:00",
    timeLabel: "Yesterday",
    message: "Please upload Bank Statement and Business Plan to continue verification.",
    tag: "Reminder",
    defaultSeen: false,
  },
  {
    id: "contract-draft-ready",
    title: "Contract Draft Ready",
    dateTime: "2026-02-10T15:25:00",
    timeLabel: "10 Feb",
    message: "A new contract draft is ready for your review in the documents section.",
    tag: "Legal",
    defaultSeen: true,
  },
  {
    id: "support-message",
    title: "Support Message",
    dateTime: "2026-02-09T12:05:00",
    timeLabel: "09 Feb",
    message: "Our support team has replied to your question about VAT filing timelines.",
    tag: "Support",
    defaultSeen: true,
  },
];

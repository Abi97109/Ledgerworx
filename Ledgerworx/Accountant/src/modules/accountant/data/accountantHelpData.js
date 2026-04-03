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

export const ACCOUNTANT_HELP_PAGE_CONTENT = {
  title: "Help & Support",
  subtitle: "Welcome back, here's your accounting overview.",
  sectionTitle: "Get in Touch",
};

export const ACCOUNTANT_HELP_CONTACT_CARDS = [
  {
    key: "chat",
    iconContainerClass: "fas fa-comment-dots",
    iconStyle: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    heading: "Chat with Us",
    description: "Start a live chat with our support team for quick assistance.",
    buttonIconClass: "fas fa-comments",
    buttonLabel: "Start Live Chat",
  },
  {
    key: "email",
    iconContainerClass: "fas fa-envelope",
    iconStyle: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    heading: "Email Us",
    contactText: "support@ledgerworx.com",
    description: "Send us an email and we'll get back to you within 24 hours.",
    buttonIconClass: "fas fa-paper-plane",
    buttonLabel: "Send an Email",
  },
  {
    key: "call",
    iconContainerClass: "fas fa-phone-alt",
    iconStyle: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    heading: "Call Us",
    contactText: "+1 (800) 123-4567",
    description: "Give us a call for immediate assistance with urgent issues.",
    buttonIconClass: "fas fa-phone",
    buttonLabel: "Call Us",
  },
];

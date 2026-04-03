export const SALES_ROOT_ROUTE = "/";
export const SALES_DASHBOARD_ROUTE = "/dashboard";
export const SALES_LEADS_ROUTE = "/leads";
export const SALES_LEAD_DETAIL_ROUTE = "/leads/:leadId";
export const SALES_CONTACTS_ROUTE = "/contacts";
export const SALES_CONTACT_DETAIL_ROUTE = "/contacts/:contactId";
export const SALES_TASKS_ROUTE = "/tasks";
export const SALES_REPORTS_ROUTE = "/reports";
export const SALES_NOTIFICATIONS_ROUTE = "/notifications";
export const SALES_PROFILE_ROUTE = "/profile";
export const SALES_SETTINGS_ROUTE = "/settings";
export const SALES_SIGNOUT_ROUTE = "/signout";

export function buildSalesLeadDetailRoute(leadId) {
  return `/leads/${leadId}`;
}

export function buildSalesContactDetailRoute(contactId) {
  return `/contacts/${contactId}`;
}

import ContactDetailPage from "../../../pages/ContactDetailPage";
import ContactsPage from "../../../pages/ContactsPage";
import DashboardPage from "../../../pages/DashboardPage";
import LeadDetailPage from "../../../pages/LeadDetailPage";
import LeadsPage from "../../../pages/LeadsPage";
import NotificationsPage from "../../../pages/NotificationsPage";
import ReportsPage from "../../../pages/ReportsPage";
import SalesProfilePage from "../../../pages/SalesProfilePage";
import SalesSettingsPage from "../../../pages/SalesSettingsPage";
import SalesSignoutPage from "../../../pages/SalesSignoutPage";
import TasksPage from "../../../pages/TasksPage";
import {
  SALES_CONTACT_DETAIL_ROUTE,
  SALES_CONTACTS_ROUTE,
  SALES_DASHBOARD_ROUTE,
  SALES_LEAD_DETAIL_ROUTE,
  SALES_LEADS_ROUTE,
  SALES_NOTIFICATIONS_ROUTE,
  SALES_PROFILE_ROUTE,
  SALES_REPORTS_ROUTE,
  SALES_SETTINGS_ROUTE,
  SALES_SIGNOUT_ROUTE,
  SALES_TASKS_ROUTE
} from "../utils/routePaths";

export const salesRoutes = [
  {
    path: SALES_DASHBOARD_ROUTE,
    element: <DashboardPage />
  },
  {
    path: SALES_LEADS_ROUTE,
    element: <LeadsPage />
  },
  {
    path: SALES_LEAD_DETAIL_ROUTE,
    element: <LeadDetailPage />
  },
  {
    path: SALES_CONTACTS_ROUTE,
    element: <ContactsPage />
  },
  {
    path: SALES_CONTACT_DETAIL_ROUTE,
    element: <ContactDetailPage />
  },
  {
    path: SALES_TASKS_ROUTE,
    element: <TasksPage />
  },
  {
    path: SALES_REPORTS_ROUTE,
    element: <ReportsPage />
  },
  {
    path: SALES_NOTIFICATIONS_ROUTE,
    element: <NotificationsPage />
  },
  {
    path: SALES_PROFILE_ROUTE,
    element: <SalesProfilePage />
  },
  {
    path: SALES_SETTINGS_ROUTE,
    element: <SalesSettingsPage />
  },
  {
    path: SALES_SIGNOUT_ROUTE,
    element: <SalesSignoutPage />
  }
];

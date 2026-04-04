import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminAccountsPage from "./modules/admin/pages/AdminAccountsPage";
import AdminCompanyManagementPage from "./modules/admin/pages/AdminCompanyManagementPage";
import AdminDashboardPage from "./modules/admin/pages/AdminDashboardPage";
import AdminLogoutPage from "./modules/admin/pages/AdminLogoutPage";
import AdminOperationsPage from "./modules/admin/pages/AdminOperationsPage";
import AdminPaymentsReportsPage from "./modules/admin/pages/AdminPaymentsReportsPage";
import AdminProfilePage from "./modules/admin/pages/AdminProfilePage";
import AdminSalesPage from "./modules/admin/pages/AdminSalesPage";
import AdminServicesPackagesPage from "./modules/admin/pages/AdminServicesPackagesPage";
import AdminSettingsPage from "./modules/admin/pages/AdminSettingsPage";
import AdminUsersRolesPage from "./modules/admin/pages/AdminUsersRolesPage";
import AdminZohoPage from "./modules/admin/pages/AdminZohoPage";
import { PortalSessionProvider, usePortalSession } from "./session/PortalSessionProvider";
import EmployeePortalLoader from "../../shared/employee-ui/EmployeePortalLoader";

function AdminAuthGate({ children }) {
  const location = useLocation();
  const session = usePortalSession();
  const isAllowedUnauthenticatedRoute = location.pathname === "/logout";

  if (session.isLoading) {
    return (
      <EmployeePortalLoader
        fullHeight
        title="Checking employee session"
        message="Validating your Admin portal access and preparing the control workspace."
      />
    );
  }

  if (session.isError) {
    return (
      <EmployeePortalLoader
        fullHeight
        state="error"
        title="Unable to verify your session"
        message="We couldn't confirm your Admin portal session right now. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (!session.data?.authenticated) {
    if (isAllowedUnauthenticatedRoute) {
      return children;
    }

    window.location.assign(session.data?.config?.loginUrl || "https://ledgerworx.me/login/");
    return null;
  }

  if (!["administrator"].includes(session.data.role)) {
    window.location.assign(session.data?.config?.portalBaseUrl || "https://ledgerworx.me/portal/client/");
    return null;
  }

  return children;
}

export default function App() {
  return (
    <PortalSessionProvider>
      <AdminAuthGate>
        <Routes>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="sales" element={<AdminSalesPage />} />
          <Route path="accounts" element={<AdminAccountsPage />} />
          <Route path="operations" element={<AdminOperationsPage />} />
          <Route path="company" element={<AdminCompanyManagementPage />} />
          <Route path="services" element={<AdminServicesPackagesPage />} />
          <Route path="users" element={<AdminUsersRolesPage />} />
          <Route path="payments" element={<AdminPaymentsReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="zoho" element={<AdminZohoPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="logout" element={<AdminLogoutPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AdminAuthGate>
    </PortalSessionProvider>
  );
}

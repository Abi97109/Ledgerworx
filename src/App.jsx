import { Navigate, Route, Routes } from "react-router-dom";
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

export default function App() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/sales" element={<AdminSalesPage />} />
      <Route path="/admin/accounts" element={<AdminAccountsPage />} />
      <Route path="/admin/operations" element={<AdminOperationsPage />} />
      <Route path="/admin/company" element={<AdminCompanyManagementPage />} />
      <Route path="/admin/services" element={<AdminServicesPackagesPage />} />
      <Route path="/admin/users" element={<AdminUsersRolesPage />} />
      <Route path="/admin/payments" element={<AdminPaymentsReportsPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />
      <Route path="/admin/zoho" element={<AdminZohoPage />} />
      <Route path="/admin/profile" element={<AdminProfilePage />} />
      <Route path="/admin/logout" element={<AdminLogoutPage />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboardPage from "./modules/admin/pages/AdminDashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

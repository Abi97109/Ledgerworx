import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import {
  salespersonStatusOptions,
  salesInvoices,
  salespeopleData,
  salesReportsData,
  salesStatsData
} from "../data/adminSalesData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminSalesCss from "../styles/admin_sales.css?raw";

const SALES_INVOICES_PER_PAGE = 10;

const initialSalespersonForm = {
  fullName: "",
  employeeId: "",
  phone: "",
  email: "",
  department: "Sales",
  salesTarget: "",
  assignedRegion: "",
  status: "Active",
  username: "",
  password: ""
};

function getStatusClass(status) {
  return `status-${String(status).toLowerCase()}`;
}

function buildInitialSalespeople() {
  return salespeopleData.map((salesperson, index) => ({
    id: `salesperson-${index + 1}`,
    ...salesperson
  }));
}

export default function AdminSalesPage() {
  useAdminPageStyles({ pageKey: "sales", pageCssText: adminSalesCss });
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [companyFilter, setCompanyFilter] = useState("All Companies");
  const [currentInvoicePage, setCurrentInvoicePage] = useState(1);
  const [salespeople, setSalespeople] = useState(buildInitialSalespeople);
  const [isAddSalespersonModalOpen, setIsAddSalespersonModalOpen] = useState(false);
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  const [salespersonFormValues, setSalespersonFormValues] = useState(initialSalespersonForm);
  const salespersonNameInputRef = useRef(null);

  useEffect(() => {
    if (isAddSalespersonModalOpen) {
      salespersonNameInputRef.current?.focus();
    }
  }, [isAddSalespersonModalOpen]);

  useEffect(() => {
    const isModalOpen = isAddSalespersonModalOpen || selectedSalesperson !== null;
    document.body.classList.toggle("modal-open", isModalOpen);

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isAddSalespersonModalOpen, selectedSalesperson]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key !== "Escape") {
        return;
      }

      if (isAddSalespersonModalOpen) {
        closeAddSalespersonModal();
      }

      if (selectedSalesperson) {
        closeSalespersonProfileModal();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAddSalespersonModalOpen, selectedSalesperson]);

  const statusOptions = ["Paid", "Pending", "Overdue"];
  const companyOptions = [...new Set(salesInvoices.map((invoice) => invoice.company))].sort((a, b) =>
    a.localeCompare(b)
  );

  const filteredInvoices = salesInvoices.filter((invoice) => {
    const statusMatches = statusFilter === "All Statuses" || invoice.status === statusFilter;
    const companyMatches = companyFilter === "All Companies" || invoice.company === companyFilter;
    return statusMatches && companyMatches;
  });

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / SALES_INVOICES_PER_PAGE));
  const safeCurrentPage = Math.max(1, Math.min(currentInvoicePage, totalPages));
  const start = (safeCurrentPage - 1) * SALES_INVOICES_PER_PAGE;
  const pageInvoices = filteredInvoices.slice(start, start + SALES_INVOICES_PER_PAGE);

  function closeAddSalespersonModal() {
    setIsAddSalespersonModalOpen(false);
    setSalespersonFormValues(initialSalespersonForm);
  }

  function closeSalespersonProfileModal() {
    setSelectedSalesperson(null);
  }

  function handleInvoiceFilterChange(filterName, value) {
    if (filterName === "status") {
      setStatusFilter(value);
    } else {
      setCompanyFilter(value);
    }
    setCurrentInvoicePage(1);
  }

  function handleSalespersonFormChange(field, value) {
    setSalespersonFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  function previousPage() {
    setCurrentInvoicePage((page) => Math.max(1, page - 1));
  }

  function nextPage() {
    setCurrentInvoicePage((page) => Math.min(totalPages, page + 1));
  }

  function goToPage(pageNumber) {
    setCurrentInvoicePage(pageNumber);
  }

  function handleAddSalespersonSubmit(event) {
    event.preventDefault();

    const name = salespersonFormValues.fullName.trim();
    const employeeId = salespersonFormValues.employeeId.trim();
    const phone = salespersonFormValues.phone.trim();
    const email = salespersonFormValues.email.trim();
    const department = salespersonFormValues.department.trim() || "Sales";
    const target = Number(salespersonFormValues.salesTarget || 0);
    const region = salespersonFormValues.assignedRegion.trim();
    const username = salespersonFormValues.username.trim();
    const status = salespersonFormValues.status.trim() || "Active";
    const sold = 0;

    if (!name || !email) {
      return;
    }

    const achievedPercent = target > 0 ? Math.round((sold / target) * 100) : 0;

    setSalespeople((currentSalespeople) => [
      ...currentSalespeople,
      {
        id: `salesperson-${currentSalespeople.length + 1}`,
        name,
        email,
        target: String(target),
        sold: String(sold),
        achieved: String(achievedPercent),
        action: "View",
        employeeId: employeeId || "N/A",
        phone: phone || "N/A",
        department,
        region: region || "N/A",
        username: username || "N/A",
        status
      }
    ]);

    closeAddSalespersonModal();
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page">
        <div className="breadcrumb">
          <Link to="/admin/dashboard">Dashboard</Link>
          <span>&rsaquo;</span>
          <span>Sales Department</span>
        </div>

        <div className="page-header">
          <h2>Sales Department</h2>
          <button
            className="btn-primary"
            id="openAddSalespersonBtn"
            type="button"
            onClick={() => {
              setIsAddSalespersonModalOpen(true);
            }}
          >
            + Add User
          </button>
        </div>

        <div className="stats-grid">
          {salesStatsData.map((stat) => (
            <div key={stat.key} className={`stat-card ${stat.className}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="layout-row">
          <div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Company Packages</div>
                <div className="filter-group">
                  <select
                    className="filter-select"
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(event) => {
                      handleInvoiceFilterChange("status", event.target.value);
                    }}
                  >
                    <option value="All Statuses">All Statuses</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <select
                    className="filter-select"
                    id="companyFilter"
                    value={companyFilter}
                    onChange={(event) => {
                      handleInvoiceFilterChange("company", event.target.value);
                    }}
                  >
                    <option value="All Companies">All Companies</option>
                    {companyOptions.map((company) => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Company</th>
                    <th>Package</th>
                    <th>Amount (AED)</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="invoiceTableBody">
                  {pageInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "#7f8c8d" }}>
                        No invoices found for selected filters.
                      </td>
                    </tr>
                  ) : (
                    pageInvoices.map((invoice) => (
                      <tr key={invoice.no}>
                        <td>{invoice.no}</td>
                        <td>{invoice.company}</td>
                        <td>{invoice.package}</td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.dueDate}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div style={{ marginTop: "20px", textAlign: "center", color: "#666", fontSize: "13px" }}>
                <span id="entryInfo">
                  Showing {filteredInvoices.length > 0 ? start + 1 : 0} to{" "}
                  {Math.min(start + SALES_INVOICES_PER_PAGE, filteredInvoices.length)} of{" "}
                  {filteredInvoices.length} entries
                </span>
              </div>
              <div
                style={{ marginTop: "15px", textAlign: "center", display: "flex", justifyContent: "center", gap: "5px" }}
                id="paginationControls"
                data-total-pages={totalPages}
              >
                <button className="action-btn" id="prevBtn" type="button" onClick={previousPage}>
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`action-btn page-btn${pageNumber === safeCurrentPage ? " active" : ""}`}
                    style={pageNumber === safeCurrentPage ? { background: "#4169e1", color: "white" } : {}}
                    type="button"
                    onClick={() => {
                      goToPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button className="action-btn" id="nextBtn" type="button" onClick={nextPage}>
                  Next
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Salesperson Details</div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Weekly Target</th>
                    <th>Packages Sold</th>
                    <th>Achieved</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="salespersonTableBody">
                  {salespeople.map((salesperson) => (
                    <tr
                      key={salesperson.id}
                      className="salesperson-entry"
                      onClick={() => {
                        setSelectedSalesperson(salesperson);
                      }}
                    >
                      <td>
                        <div className="salesperson-photo"></div>
                      </td>
                      <td>
                        <span className="salesperson-name">{salesperson.name}</span>
                      </td>
                      <td>
                        <span className="salesperson-email">{salesperson.email}</span>
                      </td>
                      <td>{salesperson.target}</td>
                      <td>{salesperson.sold}</td>
                      <td>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${Math.max(0, Math.min(Number(salesperson.achieved), 100))}%` }}
                          ></div>
                        </div>{" "}
                        {salesperson.achieved}
                        {Number(salesperson.achieved) === 0 ? "%" : ""}
                      </td>
                      <td>
                        <button className="action-btn" type="button">
                          {salesperson.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Sales Reports</div>
              </div>
              <div className="sales-report-list">
                {salesReportsData.map((report) => (
                  <div key={report.title} className="sales-report-item">
                    <div className="sales-report-top">
                      <h4>{report.title}</h4>
                      <span>{report.period}</span>
                    </div>
                    <div className="sales-report-revenue">{report.revenue}</div>
                    <div className="sales-report-meta">{report.deals}</div>
                    <div className="sales-report-progress">{report.target}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay${isAddSalespersonModalOpen ? " open" : ""}`}
        id="addSalespersonModal"
        aria-hidden={!isAddSalespersonModalOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeAddSalespersonModal();
          }
        }}
      >
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="addSalespersonTitle">
          <div className="modal-header">
            <h3 id="addSalespersonTitle">Create Salesperson</h3>
            <button
              type="button"
              className="modal-close"
              id="closeAddSalespersonModal"
              aria-label="Close"
              onClick={closeAddSalespersonModal}
            >
              x
            </button>
          </div>
          <form id="addSalespersonForm" className="salesperson-form" onSubmit={handleAddSalespersonSubmit}>
            <div className="form-row">
              <label htmlFor="salespersonFullName">Full Name</label>
              <input
                ref={salespersonNameInputRef}
                id="salespersonFullName"
                name="full_name"
                type="text"
                required
                value={salespersonFormValues.fullName}
                onChange={(event) => {
                  handleSalespersonFormChange("fullName", event.target.value);
                }}
              />
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="salespersonEmployeeId">Employee ID</label>
                <input
                  id="salespersonEmployeeId"
                  name="employee_id"
                  type="text"
                  required
                  value={salespersonFormValues.employeeId}
                  onChange={(event) => {
                    handleSalespersonFormChange("employeeId", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="salespersonPhone">Phone Number</label>
                <input
                  id="salespersonPhone"
                  name="phone"
                  type="tel"
                  required
                  value={salespersonFormValues.phone}
                  onChange={(event) => {
                    handleSalespersonFormChange("phone", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="salespersonEmail">Email</label>
              <input
                id="salespersonEmail"
                name="email"
                type="email"
                required
                value={salespersonFormValues.email}
                onChange={(event) => {
                  handleSalespersonFormChange("email", event.target.value);
                }}
              />
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="salespersonDepartment">Department</label>
                <input
                  id="salespersonDepartment"
                  name="department"
                  type="text"
                  value={salespersonFormValues.department}
                  readOnly
                />
              </div>
              <div className="form-row">
                <label htmlFor="salespersonSalesTarget">Sales Target</label>
                <input
                  id="salespersonSalesTarget"
                  name="sales_target"
                  type="number"
                  min="0"
                  required
                  value={salespersonFormValues.salesTarget}
                  onChange={(event) => {
                    handleSalespersonFormChange("salesTarget", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="salespersonRegion">Assigned Region</label>
                <input
                  id="salespersonRegion"
                  name="assigned_region"
                  type="text"
                  required
                  value={salespersonFormValues.assignedRegion}
                  onChange={(event) => {
                    handleSalespersonFormChange("assignedRegion", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="salespersonStatus">Status</label>
                <select
                  id="salespersonStatus"
                  name="status"
                  className="filter-select"
                  required
                  value={salespersonFormValues.status}
                  onChange={(event) => {
                    handleSalespersonFormChange("status", event.target.value);
                  }}
                >
                  {salespersonStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="salespersonUsername">Username</label>
                <input
                  id="salespersonUsername"
                  name="username"
                  type="text"
                  required
                  value={salespersonFormValues.username}
                  onChange={(event) => {
                    handleSalespersonFormChange("username", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="salespersonPassword">Password</label>
                <input
                  id="salespersonPassword"
                  name="password"
                  type="password"
                  required
                  value={salespersonFormValues.password}
                  onChange={(event) => {
                    handleSalespersonFormChange("password", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="action-btn"
                id="cancelAddSalespersonBtn"
                onClick={closeAddSalespersonModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Salesperson
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`modal-overlay${selectedSalesperson ? " open" : ""}`}
        id="salespersonProfileModal"
        aria-hidden={!selectedSalesperson}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeSalespersonProfileModal();
          }
        }}
      >
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="salespersonProfileTitle">
          <div className="modal-header">
            <h3 id="salespersonProfileTitle">Salesperson Profile</h3>
            <button
              type="button"
              className="modal-close"
              id="closeSalespersonProfileModal"
              aria-label="Close"
              onClick={closeSalespersonProfileModal}
            >
              x
            </button>
          </div>
          <div className="profile-grid">
            <div className="profile-item"><span>Full Name</span><strong id="profileFullName">{selectedSalesperson?.name ?? "-"}</strong></div>
            <div className="profile-item"><span>Employee ID</span><strong id="profileEmployeeId">{selectedSalesperson?.employeeId ?? "-"}</strong></div>
            <div className="profile-item"><span>Phone Number</span><strong id="profilePhone">{selectedSalesperson?.phone ?? "-"}</strong></div>
            <div className="profile-item"><span>Email</span><strong id="profileEmail">{selectedSalesperson?.email ?? "-"}</strong></div>
            <div className="profile-item"><span>Department</span><strong id="profileDepartment">{selectedSalesperson?.department ?? "Sales"}</strong></div>
            <div className="profile-item"><span>Sales Target</span><strong id="profileSalesTarget">{selectedSalesperson?.target ?? "-"}</strong></div>
            <div className="profile-item"><span>Packages Sold</span><strong id="profileSold">{selectedSalesperson?.sold ?? "-"}</strong></div>
            <div className="profile-item"><span>Achieved</span><strong id="profileAchieved">{selectedSalesperson ? `${selectedSalesperson.achieved}%` : "-"}</strong></div>
            <div className="profile-item"><span>Assigned Region</span><strong id="profileRegion">{selectedSalesperson?.region ?? "-"}</strong></div>
            <div className="profile-item"><span>Username</span><strong id="profileUsername">{selectedSalesperson?.username ?? "-"}</strong></div>
            <div className="profile-item"><span>Status</span><strong id="profileStatus">{selectedSalesperson?.status ?? "-"}</strong></div>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="action-btn"
              id="closeProfileBtn"
              onClick={closeSalespersonProfileModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

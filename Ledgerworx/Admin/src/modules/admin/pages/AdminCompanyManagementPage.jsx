import { useEffect, useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  companyManagementFormDefaults,
  companyManagementRows,
  companyManagementSummaryTiles
} from "../data/adminCompanyManagementData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminCompanyManagementCss from "../styles/admin_companymanagement.css?raw";

function getStatusClass(status) {
  const normalizedStatus = String(status || "").toLowerCase();

  if (normalizedStatus.includes("active")) {
    return "active";
  }

  if (normalizedStatus.includes("pending")) {
    return "pending";
  }

  return "banned";
}

function buildEditFormValues(company) {
  if (!company) {
    return companyManagementFormDefaults;
  }

  return {
    companyName: company.companyName,
    tradeLicenseNo: company.businessId,
    vatTrn: company.vatTrn,
    licenseExpiryDate: company.licenseExpiryDate,
    companyEmail: company.companyEmail,
    phoneNumber: company.phoneNumber,
    address: company.address,
    poBox: company.poBox,
    adminName: company.ownerName,
    adminEmail: company.adminEmail,
    username: company.username,
    password: company.password
  };
}

export default function AdminCompanyManagementPage() {
  useAdminPageStyles({
    pageKey: "company-management",
    pageCssText: adminCompanyManagementCss
  });
  const [companies, setCompanies] = useState(companyManagementRows);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewedCompanyId, setViewedCompanyId] = useState(null);
  const [editedCompanyId, setEditedCompanyId] = useState(null);
  const [addFormValues, setAddFormValues] = useState(companyManagementFormDefaults);
  const [editFormValues, setEditFormValues] = useState(companyManagementFormDefaults);
  const addCompanyNameRef = useRef(null);

  const viewedCompany = companies.find((company) => company.id === viewedCompanyId) ?? null;
  const editedCompany = companies.find((company) => company.id === editedCompanyId) ?? null;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsAddModalOpen(false);
        setViewedCompanyId(null);
        setEditedCompanyId(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isAddModalOpen) {
      addCompanyNameRef.current?.focus();
    }
  }, [isAddModalOpen]);

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  function closeViewModal() {
    setViewedCompanyId(null);
  }

  function closeEditModal() {
    setEditedCompanyId(null);
  }

  function handleAddFormChange(field, value) {
    setAddFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  function handleEditFormChange(field, value) {
    setEditFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  function handleAddSubmit(event) {
    event.preventDefault();
    closeAddModal();
    setAddFormValues(companyManagementFormDefaults);
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    if (!editedCompany) {
      closeEditModal();
      return;
    }

    setCompanies((currentCompanies) =>
      currentCompanies.map((company) => {
        if (company.id !== editedCompany.id) {
          return company;
        }

        return {
          ...company,
          companyName: editFormValues.companyName.trim(),
          businessId: editFormValues.tradeLicenseNo.trim(),
          vatTrn: editFormValues.vatTrn.trim(),
          licenseExpiryDate: editFormValues.licenseExpiryDate.trim(),
          companyEmail: editFormValues.companyEmail.trim(),
          phoneNumber: editFormValues.phoneNumber.trim(),
          address: editFormValues.address.trim(),
          poBox: editFormValues.poBox.trim(),
          ownerName: editFormValues.adminName.trim(),
          adminEmail: editFormValues.adminEmail.trim(),
          username: editFormValues.username.trim(),
          password: editFormValues.password.trim()
        };
      })
    );

    closeEditModal();
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page company-page">
        <div className="breadcrumb">Dashboard &rsaquo; Company Management</div>

        <div className="page-header">
          <h2>
            <i className="fa fa-building"></i>Company Management
          </h2>
          <button
            className="btn primary"
            id="openAddCompanyModalBtn"
            type="button"
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            <i className="fa fa-plus"></i>Add New Company
          </button>
        </div>

        <div className="tiles">
          {companyManagementSummaryTiles.map((tile) => (
            <div key={tile.label} className="tile">
              <i className={tile.iconClass}></i>
              <h3>{tile.value}</h3>
              <p>{tile.label}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Business ID</th>
                <th>Industry</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="company">
                    <i className="fa fa-building"></i>
                    {company.companyName}
                  </td>
                  <td>{company.businessId}</td>
                  <td>{company.industry}</td>
                  <td className="owner">
                    <img src={company.ownerAvatar} alt="" />
                    {company.ownerName}
                  </td>
                  <td>
                    <span className={`status ${getStatusClass(company.status)}`}>{company.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="action view view-company-btn"
                      onClick={() => {
                        setViewedCompanyId(company.id);
                      }}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="action edit edit-company-btn"
                      onClick={() => {
                        setEditedCompanyId(company.id);
                        setEditFormValues(buildEditFormValues(company));
                      }}
                    >
                      Edit
                    </button>
                    <button type="button" className={`action ${company.actionClass}`}>
                      {company.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`modal-overlay${viewedCompany ? " open" : ""}`}
        id="viewCompanyModal"
        aria-hidden={!viewedCompany}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeViewModal();
          }
        }}
      >
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="viewCompanyTitle">
          <div className="modal-header">
            <h3 id="viewCompanyTitle">Company Details</h3>
            <button
              type="button"
              className="modal-close"
              id="closeViewCompanyModalBtn"
              aria-label="Close"
              onClick={closeViewModal}
            >
              x
            </button>
          </div>
          <div className="company-details-grid">
            <div className="company-details-item">
              <span>Company Name</span>
              <strong id="viewCompanyName">{viewedCompany?.companyName ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Trade License Number</span>
              <strong id="viewTradeLicenseNumber">{viewedCompany?.businessId ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>VAT TRN</span>
              <strong id="viewVatTrn">{viewedCompany?.vatTrn ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>License Expiry Date</span>
              <strong id="viewLicenseExpiryDate">{viewedCompany?.licenseExpiryDate ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Company Email</span>
              <strong id="viewCompanyEmail">{viewedCompany?.companyEmail ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Phone Number</span>
              <strong id="viewPhoneNumber">{viewedCompany?.phoneNumber ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Address</span>
              <strong id="viewAddress">{viewedCompany?.address ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>PO Box</span>
              <strong id="viewPoBox">{viewedCompany?.poBox ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Admin Name</span>
              <strong id="viewAdminName">{viewedCompany?.ownerName ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Admin Email</span>
              <strong id="viewAdminEmail">{viewedCompany?.adminEmail ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Username</span>
              <strong id="viewUsername">{viewedCompany?.username ?? "-"}</strong>
            </div>
            <div className="company-details-item">
              <span>Password</span>
              <strong id="viewPassword">{viewedCompany?.password ?? "-"}</strong>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" id="closeViewCompanyBtn" onClick={closeViewModal}>
              Close
            </button>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay${editedCompany ? " open" : ""}`}
        id="editCompanyModal"
        aria-hidden={!editedCompany}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeEditModal();
          }
        }}
      >
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="editCompanyTitle">
          <div className="modal-header">
            <h3 id="editCompanyTitle">Edit Company Details</h3>
            <button
              type="button"
              className="modal-close"
              id="closeEditCompanyModalBtn"
              aria-label="Close"
              onClick={closeEditModal}
            >
              x
            </button>
          </div>
          <form id="editCompanyForm" className="company-form" onSubmit={handleEditSubmit}>
            <input
              type="hidden"
              id="editRowIndex"
              value={editedCompany ? companies.findIndex((company) => company.id === editedCompany.id) + 1 : ""}
              readOnly
            />
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editCompanyName">Company Name</label>
                <input
                  id="editCompanyName"
                  type="text"
                  required
                  value={editFormValues.companyName}
                  onChange={(event) => {
                    handleEditFormChange("companyName", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editTradeLicenseNo">Trade License Number</label>
                <input
                  id="editTradeLicenseNo"
                  type="text"
                  required
                  value={editFormValues.tradeLicenseNo}
                  onChange={(event) => {
                    handleEditFormChange("tradeLicenseNo", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editVatTrn">VAT TRN</label>
                <input
                  id="editVatTrn"
                  type="text"
                  required
                  value={editFormValues.vatTrn}
                  onChange={(event) => {
                    handleEditFormChange("vatTrn", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editLicenseExpiryDate">License Expiry Date</label>
                <input
                  id="editLicenseExpiryDate"
                  type="date"
                  required
                  value={editFormValues.licenseExpiryDate}
                  onChange={(event) => {
                    handleEditFormChange("licenseExpiryDate", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editCompanyEmail">Company Email</label>
                <input
                  id="editCompanyEmail"
                  type="email"
                  required
                  value={editFormValues.companyEmail}
                  onChange={(event) => {
                    handleEditFormChange("companyEmail", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editPhoneNumber">Phone Number</label>
                <input
                  id="editPhoneNumber"
                  type="tel"
                  required
                  value={editFormValues.phoneNumber}
                  onChange={(event) => {
                    handleEditFormChange("phoneNumber", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editAddress">Address</label>
                <input
                  id="editAddress"
                  type="text"
                  required
                  value={editFormValues.address}
                  onChange={(event) => {
                    handleEditFormChange("address", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editPoBox">PO Box</label>
                <input
                  id="editPoBox"
                  type="text"
                  required
                  value={editFormValues.poBox}
                  onChange={(event) => {
                    handleEditFormChange("poBox", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editAdminName">Admin Name</label>
                <input
                  id="editAdminName"
                  type="text"
                  required
                  value={editFormValues.adminName}
                  onChange={(event) => {
                    handleEditFormChange("adminName", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editAdminEmail">Admin Email</label>
                <input
                  id="editAdminEmail"
                  type="email"
                  required
                  value={editFormValues.adminEmail}
                  onChange={(event) => {
                    handleEditFormChange("adminEmail", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editUsername">Username</label>
                <input
                  id="editUsername"
                  type="text"
                  required
                  value={editFormValues.username}
                  onChange={(event) => {
                    handleEditFormChange("username", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editPassword">Password</label>
                <input
                  id="editPassword"
                  type="text"
                  required
                  value={editFormValues.password}
                  onChange={(event) => {
                    handleEditFormChange("password", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn" id="cancelEditCompanyBtn" onClick={closeEditModal}>
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`modal-overlay${isAddModalOpen ? " open" : ""}`}
        id="addCompanyModal"
        aria-hidden={!isAddModalOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeAddModal();
          }
        }}
      >
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="addCompanyTitle">
          <div className="modal-header">
            <h3 id="addCompanyTitle">Add New Company</h3>
            <button
              type="button"
              className="modal-close"
              id="closeAddCompanyModalBtn"
              aria-label="Close"
              onClick={closeAddModal}
            >
              x
            </button>
          </div>

          <form id="addCompanyForm" className="company-form" onSubmit={handleAddSubmit}>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  name="company_name"
                  type="text"
                  required
                  ref={addCompanyNameRef}
                  value={addFormValues.companyName}
                  onChange={(event) => {
                    handleAddFormChange("companyName", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="tradeLicenseNo">Trade License Number</label>
                <input
                  id="tradeLicenseNo"
                  name="trade_license_number"
                  type="text"
                  required
                  value={addFormValues.tradeLicenseNo}
                  onChange={(event) => {
                    handleAddFormChange("tradeLicenseNo", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="vatTrn">VAT TRN</label>
                <input
                  id="vatTrn"
                  name="vat_trn"
                  type="text"
                  required
                  value={addFormValues.vatTrn}
                  onChange={(event) => {
                    handleAddFormChange("vatTrn", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="licenseExpiryDate">License Expiry Date</label>
                <input
                  id="licenseExpiryDate"
                  name="license_expiry_date"
                  type="date"
                  required
                  value={addFormValues.licenseExpiryDate}
                  onChange={(event) => {
                    handleAddFormChange("licenseExpiryDate", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="companyEmail">Company Email</label>
                <input
                  id="companyEmail"
                  name="company_email"
                  type="email"
                  required
                  value={addFormValues.companyEmail}
                  onChange={(event) => {
                    handleAddFormChange("companyEmail", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phone_number"
                  type="tel"
                  required
                  value={addFormValues.phoneNumber}
                  onChange={(event) => {
                    handleAddFormChange("phoneNumber", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="companyAddress">Address</label>
                <input
                  id="companyAddress"
                  name="address"
                  type="text"
                  required
                  value={addFormValues.address}
                  onChange={(event) => {
                    handleAddFormChange("address", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="poBox">PO Box</label>
                <input
                  id="poBox"
                  name="po_box"
                  type="text"
                  required
                  value={addFormValues.poBox}
                  onChange={(event) => {
                    handleAddFormChange("poBox", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="adminName">Admin Name</label>
                <input
                  id="adminName"
                  name="admin_name"
                  type="text"
                  required
                  value={addFormValues.adminName}
                  onChange={(event) => {
                    handleAddFormChange("adminName", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="adminEmail">Admin Email</label>
                <input
                  id="adminEmail"
                  name="admin_email"
                  type="email"
                  required
                  value={addFormValues.adminEmail}
                  onChange={(event) => {
                    handleAddFormChange("adminEmail", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="companyUsername">Username</label>
                <input
                  id="companyUsername"
                  name="username"
                  type="text"
                  required
                  value={addFormValues.username}
                  onChange={(event) => {
                    handleAddFormChange("username", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="companyPassword">Password</label>
                <input
                  id="companyPassword"
                  name="password"
                  type="password"
                  required
                  value={addFormValues.password}
                  onChange={(event) => {
                    handleAddFormChange("password", event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn" id="cancelAddCompanyBtn" onClick={closeAddModal}>
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Create Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

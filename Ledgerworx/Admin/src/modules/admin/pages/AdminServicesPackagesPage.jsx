import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  adminPackageServiceOptions,
  adminPackageStatusOptions,
  adminPackageViewOptions,
  adminServiceAvailableDayOptions,
  adminServiceAvailableTimeOptions,
  adminServiceCategoryOptions,
  adminServiceCurrencyOptions,
  adminServiceDurationOptions,
  adminServiceFormDefaults,
  adminServiceLocationOptions,
  adminServicePriorityOptions,
  adminServiceVisibleToOptions,
  adminServicesPackagesRows,
  adminServicesPackagesServices
} from "../data/adminServicesPackagesData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminServicesPackagesCss from "../styles/admin_serviceandpackage.css?raw";

const initialEditPackageFormValues = {
  name: "",
  service: adminPackageServiceOptions[0],
  price: "",
  status: adminPackageStatusOptions[0]
};

function getStatusClass(status) {
  const normalizedStatus = String(status || "").toLowerCase();

  if (normalizedStatus === "enabled") {
    return "status-enabled";
  }

  if (normalizedStatus === "disabled") {
    return "status-disabled";
  }

  return "status-draft";
}

function buildEditPackageFormValues(packageItem) {
  if (!packageItem) {
    return initialEditPackageFormValues;
  }

  return {
    name: packageItem.name,
    service: packageItem.service,
    price: packageItem.price,
    status: packageItem.status
  };
}

export default function AdminServicesPackagesPage() {
  useAdminPageStyles({
    pageKey: "services-packages",
    pageCssText: adminServicesPackagesCss
  });
  const [services, setServices] = useState(adminServicesPackagesServices);
  const [packages, setPackages] = useState(adminServicesPackagesRows);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [editedPackageId, setEditedPackageId] = useState(null);
  const [editPackageFormValues, setEditPackageFormValues] = useState(initialEditPackageFormValues);
  const [addServiceFormValues, setAddServiceFormValues] = useState(adminServiceFormDefaults);
  const [serviceDocuments, setServiceDocuments] = useState([]);

  const editedPackage = packages.find((packageItem) => packageItem.id === editedPackageId) ?? null;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setEditedPackageId(null);
        setIsAddServiceModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeEditPackageModal() {
    setEditedPackageId(null);
  }

  function closeAddServiceModal() {
    setIsAddServiceModalOpen(false);
  }

  function handleEditPackageFormChange(field, value) {
    setEditPackageFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  function handleAddServiceFormChange(field, value) {
    setAddServiceFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  function openEditPackageModal(packageItem) {
    setEditedPackageId(packageItem.id);
    setEditPackageFormValues(buildEditPackageFormValues(packageItem));
  }

  function handleDisablePackage(packageItem) {
    const confirmDisable = window.confirm(`Do you want to disable ${packageItem.name}?`);

    if (!confirmDisable) {
      return;
    }

    setPackages((currentPackages) =>
      currentPackages.map((currentPackage) => {
        if (currentPackage.id !== packageItem.id) {
          return currentPackage;
        }

        return {
          ...currentPackage,
          status: "Disabled"
        };
      })
    );
  }

  function addDocumentItem() {
    const value = addServiceFormValues.requiredDocument.trim();

    if (!value) {
      return;
    }

    setServiceDocuments((currentDocuments) => [...currentDocuments, value]);
    handleAddServiceFormChange("requiredDocument", "");
  }

  function removeDocumentItem(documentIndex) {
    setServiceDocuments((currentDocuments) =>
      currentDocuments.filter((_, index) => index !== documentIndex)
    );
  }

  function handleEditPackageSubmit(event) {
    event.preventDefault();

    if (!editedPackage) {
      closeEditPackageModal();
      return;
    }

    setPackages((currentPackages) =>
      currentPackages.map((packageItem) => {
        if (packageItem.id !== editedPackage.id) {
          return packageItem;
        }

        return {
          ...packageItem,
          name: editPackageFormValues.name.trim(),
          service: editPackageFormValues.service.trim(),
          price: editPackageFormValues.price.trim(),
          status: editPackageFormValues.status.trim()
        };
      })
    );

    closeEditPackageModal();
  }

  function handleAddServiceSubmit(event) {
    event.preventDefault();

    const name = addServiceFormValues.name.trim() || "New Service";
    const packageCount = serviceDocuments.length > 0 ? serviceDocuments.length : 1;
    const packageText = `${packageCount} ${packageCount === 1 ? "Package Created" : "Packages Created"}`;

    setServices((currentServices) => [
      ...currentServices,
      {
        id: `service-${currentServices.length + 1}`,
        count: packageCount,
        title: name,
        meta: packageText
      }
    ]);

    setAddServiceFormValues(adminServiceFormDefaults);
    setServiceDocuments([]);
    closeAddServiceModal();
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page services-page">
        <div className="breadcrumb">Dashboard &rsaquo; Services &amp; Packages</div>

        <div className="page-header">
          <h2>Services &amp; Packages</h2>
          <button
            className="btn primary"
            id="openAddServiceModalBtn"
            type="button"
            onClick={() => {
              setIsAddServiceModalOpen(true);
            }}
          >
            + Add New Service
          </button>
        </div>

        <h3 style={{ marginBottom: "10px" }}>Services</h3>

        <div className="services tiles">
          {services.map((service) => (
            <div key={service.id} className="service tile">
              <div className="num">{service.count}</div>
              <div className="tile-title">{service.title}</div>
              <div className="tile-meta">{service.meta}</div>
            </div>
          ))}
        </div>

        <div className="page-header">
          <h3>Packages</h3>
          <button className="btn primary" type="button">
            + Add New Package
          </button>
        </div>

        <div className="card">
          <div className="filters">
            <input placeholder="Search" />
            <select defaultValue={adminPackageViewOptions[0]}>
              {adminPackageViewOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select defaultValue={adminPackageServiceOptions[0]}>
              {adminPackageServiceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select defaultValue={adminPackageStatusOptions[0]}>
              {adminPackageStatusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <table id="packagesTable">
            <thead>
              <tr>
                <th>Package</th>
                <th>Service</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((packageItem) => (
                <tr key={packageItem.id} className="package-row">
                  <td>
                    {packageItem.name}
                    {packageItem.isPopular ? (
                      <>
                        {" "}
                        <span className="tag popular">Most Popular</span>
                      </>
                    ) : null}
                  </td>
                  <td>{packageItem.service}</td>
                  <td>{packageItem.price}</td>
                  <td>
                    <span className={`status ${getStatusClass(packageItem.status)}`}>
                      {packageItem.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="action edit edit-package-btn"
                      onClick={() => {
                        openEditPackageModal(packageItem);
                      }}
                    >
                      Edit
                    </button>{" "}
                    <button
                      type="button"
                      className="action disable disable-package-btn"
                      onClick={() => {
                        handleDisablePackage(packageItem);
                      }}
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`modal-overlay${isAddServiceModalOpen ? " open" : ""}`}
        id="addServiceModal"
        aria-hidden={!isAddServiceModalOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeAddServiceModal();
          }
        }}
      >
        <div
          className="modal-card add-service-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="addServiceTitle"
        >
          <div className="add-service-header">
            <h3 id="addServiceTitle">
              <i className="fa-solid fa-circle-plus"></i> Add Service
            </h3>
            <button
              type="button"
              className="modal-close"
              id="closeAddServiceModalBtn"
              aria-label="Close"
              onClick={closeAddServiceModal}
            >
              x
            </button>
          </div>

          <form id="addServiceForm" className="add-service-form" onSubmit={handleAddServiceSubmit}>
            <div className="add-service-grid">
              <div className="add-service-col">
                <section className="service-form-section">
                  <h4>
                    <i className="fa-solid fa-circle-info"></i> Basic Details
                  </h4>
                  <div className="service-field">
                    <label htmlFor="addServiceName">Service Name</label>
                    <input
                      id="addServiceName"
                      type="text"
                      required
                      value={addServiceFormValues.name}
                      onChange={(event) => {
                        handleAddServiceFormChange("name", event.target.value);
                      }}
                    />
                  </div>
                  <div className="service-field">
                    <label htmlFor="addServiceDescription">Description</label>
                    <textarea
                      id="addServiceDescription"
                      rows="3"
                      value={addServiceFormValues.description}
                      onChange={(event) => {
                        handleAddServiceFormChange("description", event.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="service-field">
                    <label htmlFor="addServiceCategory">Category</label>
                    <select
                      id="addServiceCategory"
                      value={addServiceFormValues.category}
                      onChange={(event) => {
                        handleAddServiceFormChange("category", event.target.value);
                      }}
                    >
                      {adminServiceCategoryOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </section>

                <section className="service-form-section">
                  <h4>
                    <i className="fa-solid fa-users"></i> Assigned Team
                  </h4>
                  <div className="service-field">
                    <label htmlFor="addServiceMembers">Assign Members</label>
                    <input
                      id="addServiceMembers"
                      type="text"
                      placeholder="Rahul, Priya, Amit"
                      value={addServiceFormValues.members}
                      onChange={(event) => {
                        handleAddServiceFormChange("members", event.target.value);
                      }}
                    />
                  </div>
                  <p className="section-note">Assign members responsible for this service.</p>
                </section>

                <section className="service-form-section">
                  <h4>
                    <i className="fa-solid fa-calendar-days"></i> Availability Settings
                  </h4>
                  <div className="service-field">
                    <label htmlFor="addServiceDays">Available Days</label>
                    <select
                      id="addServiceDays"
                      value={addServiceFormValues.availableDays}
                      onChange={(event) => {
                        handleAddServiceFormChange("availableDays", event.target.value);
                      }}
                    >
                      {adminServiceAvailableDayOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="service-field">
                    <label htmlFor="addServiceTime">Available Time</label>
                    <select
                      id="addServiceTime"
                      value={addServiceFormValues.availableTime}
                      onChange={(event) => {
                        handleAddServiceFormChange("availableTime", event.target.value);
                      }}
                    >
                      {adminServiceAvailableTimeOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="service-field">
                    <label htmlFor="addServiceCurrency">Currency</label>
                    <select
                      id="addServiceCurrency"
                      value={addServiceFormValues.currency}
                      onChange={(event) => {
                        handleAddServiceFormChange("currency", event.target.value);
                      }}
                    >
                      {adminServiceCurrencyOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <p className="section-note">Define pricing and billing for the service.</p>
                </section>
              </div>

              <div className="add-service-col">
                <section className="service-form-section">
                  <h4>
                    <i className="fa-regular fa-clipboard"></i> Requirements
                  </h4>
                  <div className="service-field stacked">
                    <label htmlFor="addServiceRequiredDoc">Required Documents</label>
                    <input
                      id="addServiceRequiredDoc"
                      type="text"
                      placeholder="Proof of Purchase, Image Upload"
                      value={addServiceFormValues.requiredDocument}
                      onChange={(event) => {
                        handleAddServiceFormChange("requiredDocument", event.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-link"
                    id="addServiceAddDocumentBtn"
                    onClick={addDocumentItem}
                  >
                    + Add Document
                  </button>
                  <ul id="addServiceDocsList" className="doc-list">
                    {serviceDocuments.map((documentName, index) => (
                      <li key={`${documentName}-${index}`}>
                        <span>{documentName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            removeDocumentItem(index);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="section-note">Specify any documents needed for this service.</p>
                </section>

                <section className="service-form-section">
                  <h4>
                    <i className="fa-regular fa-clock"></i> Duration &amp; Location
                  </h4>
                  <div className="service-field">
                    <label htmlFor="addServiceDuration">Estimated Duration (Hrs)</label>
                    <select
                      id="addServiceDuration"
                      value={addServiceFormValues.duration}
                      onChange={(event) => {
                        handleAddServiceFormChange("duration", event.target.value);
                      }}
                    >
                      {adminServiceDurationOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="service-field">
                    <label htmlFor="addServicePriority">Priority</label>
                    <select
                      id="addServicePriority"
                      value={addServiceFormValues.priority}
                      onChange={(event) => {
                        handleAddServiceFormChange("priority", event.target.value);
                      }}
                    >
                      {adminServicePriorityOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="service-field">
                    <label htmlFor="addServiceLocation">Location</label>
                    <select
                      id="addServiceLocation"
                      value={addServiceFormValues.location}
                      onChange={(event) => {
                        handleAddServiceFormChange("location", event.target.value);
                      }}
                    >
                      {adminServiceLocationOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <p className="section-note">Specify the duration and location for the service.</p>
                </section>

                <section className="service-form-section">
                  <h4>
                    <i className="fa-regular fa-eye"></i> Visibility Settings
                  </h4>
                  <div className="service-field">
                    <label htmlFor="addServiceVisibleTo">Visible To</label>
                    <select
                      id="addServiceVisibleTo"
                      value={addServiceFormValues.visibleTo}
                      onChange={(event) => {
                        handleAddServiceFormChange("visibleTo", event.target.value);
                      }}
                    >
                      {adminServiceVisibleToOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <p className="section-note">Control who can view and request this service.</p>
                </section>
              </div>
            </div>

            <div className="add-service-actions">
              <button
                type="button"
                className="btn gray"
                id="cancelAddServiceBtn"
                onClick={closeAddServiceModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`modal-overlay${editedPackage ? " open" : ""}`}
        id="editPackageModal"
        aria-hidden={!editedPackage}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeEditPackageModal();
          }
        }}
      >
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="editPackageTitle">
          <div className="modal-header">
            <h3 id="editPackageTitle">Edit Package Details</h3>
            <button
              type="button"
              className="modal-close"
              id="closeEditPackageModalBtn"
              aria-label="Close"
              onClick={closeEditPackageModal}
            >
              x
            </button>
          </div>
          <form id="editPackageForm" className="package-form" onSubmit={handleEditPackageSubmit}>
            <input
              type="hidden"
              id="editPackageRowIndex"
              value={editedPackage ? packages.findIndex((packageItem) => packageItem.id === editedPackage.id) : ""}
              readOnly
            />
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editPackageName">Package Name</label>
                <input
                  id="editPackageName"
                  type="text"
                  required
                  value={editPackageFormValues.name}
                  onChange={(event) => {
                    handleEditPackageFormChange("name", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editPackageService">Service</label>
                <select
                  id="editPackageService"
                  required
                  value={editPackageFormValues.service}
                  onChange={(event) => {
                    handleEditPackageFormChange("service", event.target.value);
                  }}
                >
                  {adminPackageServiceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="editPackagePrice">Price</label>
                <input
                  id="editPackagePrice"
                  type="text"
                  required
                  value={editPackageFormValues.price}
                  onChange={(event) => {
                    handleEditPackageFormChange("price", event.target.value);
                  }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="editPackageStatus">Status</label>
                <select
                  id="editPackageStatus"
                  required
                  value={editPackageFormValues.status}
                  onChange={(event) => {
                    handleEditPackageFormChange("status", event.target.value);
                  }}
                >
                  {adminPackageStatusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn gray"
                id="cancelEditPackageBtn"
                onClick={closeEditPackageModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

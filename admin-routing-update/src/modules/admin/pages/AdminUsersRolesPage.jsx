import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  adminUsersRolesAddDepartmentOptions,
  adminUsersRolesAddFormDefaults,
  adminUsersRolesEditDepartmentOptions,
  adminUsersRolesRoleOptions,
  adminUsersRolesStatusOptions,
  adminUsersRolesUsers
} from "../data/adminUsersRolesData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminUsersRolesCss from "../styles/admin_usersandroles.css?raw";

const compactInputStyle = {
  width: "120px"
};

const emailInputStyle = {
  width: "150px"
};

function buildInitialUsers() {
  return adminUsersRolesUsers.map((user) => ({
    ...user
  }));
}

function roleClassFor(role) {
  return role === "Admin" ? "admin-role" : role.toLowerCase().replace(/\s+/g, "");
}

function createEditValues(user) {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    department: user.department,
    designation: user.designation,
    status: user.status,
    role: user.role
  };
}

export default function AdminUsersRolesPage() {
  useAdminPageStyles({ pageKey: "users-roles", pageCssText: adminUsersRolesCss });
  const [users, setUsers] = useState(buildInitialUsers);
  const [editingRows, setEditingRows] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState(adminUsersRolesAddFormDefaults);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsAddModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function updateAddForm(field, value) {
    setAddForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }));
  }

  function updateEditForm(userId, field, value) {
    setEditingRows((currentRows) => ({
      ...currentRows,
      [userId]: {
        ...currentRows[userId],
        [field]: value
      }
    }));
  }

  function resetAddForm() {
    setAddForm(adminUsersRolesAddFormDefaults);
  }

  function openAddModal() {
    resetAddForm();
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  function cancelNewUser() {
    resetAddForm();
    closeAddModal();
  }

  function enterEditMode(user) {
    setEditingRows((currentRows) => {
      if (currentRows[user.id]) {
        return currentRows;
      }

      return {
        ...currentRows,
        [user.id]: createEditValues(user)
      };
    });
  }

  function saveEdit(userId) {
    const editValues = editingRows[userId];

    if (!editValues) {
      return;
    }

    if (!/@ledgerworx\.me$/i.test(editValues.email.trim())) {
      window.alert("Email must end with @ledgerworx.me.");
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          fullName: editValues.fullName.trim(),
          email: editValues.email.trim(),
          phone: editValues.phone.trim(),
          department: editValues.department,
          designation: editValues.designation.trim(),
          status: editValues.status,
          role: editValues.role,
          roleClass: roleClassFor(editValues.role)
        };
      })
    );

    setEditingRows((currentRows) => {
      const nextRows = { ...currentRows };
      delete nextRows[userId];
      return nextRows;
    });
  }

  function cancelEdit() {
    setUsers(buildInitialUsers());
    setEditingRows({});
    setIsAddModalOpen(false);
    resetAddForm();
  }

  function setUserActivation(userId, nextState) {
    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        if (nextState === "inactive") {
          return {
            ...user,
            status: "Inactive",
            lastOnline: "Deactivated"
          };
        }

        return {
          ...user,
          status: "Active",
          lastOnline: "Online now"
        };
      })
    );
  }

  function deactivateUser(userId) {
    if (!window.confirm("Deactivate this user?")) {
      return;
    }

    setUserActivation(userId, "inactive");
  }

  function activateUser(userId) {
    if (!window.confirm("Activate this user?")) {
      return;
    }

    setUserActivation(userId, "active");
  }

  function saveNewUser() {
    const requiredFields = [
      { key: "fullName", label: "Full Name", type: "input" },
      { key: "employeeId", label: "Employee ID", type: "input" },
      { key: "email", label: "Email", type: "input" },
      { key: "phone", label: "Phone Number", type: "input" },
      { key: "department", label: "Department", type: "select" },
      { key: "designation", label: "Designation", type: "input" },
      { key: "role", label: "Role", type: "select" },
      { key: "status", label: "Status", type: "select" },
      { key: "username", label: "Username", type: "input" },
      { key: "password", label: "Password", type: "input" },
      { key: "joiningDate", label: "Joining Date", type: "input" }
    ];

    for (const field of requiredFields) {
      const value = String(addForm[field.key] ?? "").trim();

      if (!value) {
        const verb = field.type === "select" ? "select" : "fill";
        window.alert(`Please ${verb} ${field.label}.`);
        return;
      }
    }

    if (!/@ledgerworx\.me$/i.test(addForm.email.trim())) {
      window.alert("Email must end with @ledgerworx.me.");
      return;
    }

    setUsers((currentUsers) => [
      ...currentUsers,
      {
        id: currentUsers.length + 1,
        fullName: addForm.fullName.trim(),
        email: addForm.email.trim(),
        phone: addForm.phone.trim(),
        department: addForm.department,
        designation: addForm.designation.trim(),
        status: addForm.status,
        role: addForm.role,
        roleClass: roleClassFor(addForm.role),
        lastOnline: addForm.joiningDate,
        employeeId: addForm.employeeId.trim(),
        username: addForm.username.trim(),
        password: addForm.password.trim(),
        joiningDate: addForm.joiningDate
      }
    ]);

    resetAddForm();
    closeAddModal();
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page">
        <div className="page-header">
          <h2>Users &amp; Roles</h2>
          <button className="btn primary" id="addUserBtn" type="button" onClick={openAddModal}>
            + Add User
          </button>
        </div>

        <div
          className={`modal-overlay${isAddModalOpen ? " open" : ""}`}
          id="addUserModal"
          aria-hidden={!isAddModalOpen}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeAddModal();
            }
          }}
        >
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="addUserModalTitle">
            <div className="modal-header">
              <h3 id="addUserModalTitle">Add User</h3>
              <button
                type="button"
                className="modal-close"
                id="closeAddUserModalBtn"
                aria-label="Close"
                onClick={closeAddModal}
              >
                ×
              </button>
            </div>
            <div className="add-user-form">
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="newFullName">Full Name</label>
                  <input
                    id="newFullName"
                    placeholder="Full Name"
                    required
                    value={addForm.fullName}
                    onChange={(event) => updateAddForm("fullName", event.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newEmployeeId">Employee ID</label>
                  <input
                    id="newEmployeeId"
                    placeholder="Employee ID"
                    required
                    value={addForm.employeeId}
                    onChange={(event) => updateAddForm("employeeId", event.target.value)}
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="newEmail">Email</label>
                  <input
                    id="newEmail"
                    type="email"
                    placeholder="Email"
                    pattern="^[^\\s@]+@ledgerworx\\.me$"
                    title="Email must end with @ledgerworx.me"
                    required
                    value={addForm.email}
                    onChange={(event) => updateAddForm("email", event.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newPhone">Phone Number</label>
                  <input
                    id="newPhone"
                    placeholder="Phone Number"
                    required
                    value={addForm.phone}
                    onChange={(event) => updateAddForm("phone", event.target.value)}
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="newDepartment">Department</label>
                  <select
                    id="newDepartment"
                    required
                    value={addForm.department}
                    onChange={(event) => updateAddForm("department", event.target.value)}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {adminUsersRolesAddDepartmentOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="newDesignation">Designation</label>
                  <input
                    id="newDesignation"
                    placeholder="Designation"
                    value={addForm.designation}
                    onChange={(event) => updateAddForm("designation", event.target.value)}
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="newRole">Role</label>
                  <select
                    id="newRole"
                    required
                    value={addForm.role}
                    onChange={(event) => updateAddForm("role", event.target.value)}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {adminUsersRolesRoleOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="newStatus">Status</label>
                  <select
                    id="newStatus"
                    required
                    value={addForm.status}
                    onChange={(event) => updateAddForm("status", event.target.value)}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {adminUsersRolesStatusOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="newUsername">Username</label>
                  <input
                    id="newUsername"
                    placeholder="Username"
                    required
                    value={addForm.username}
                    onChange={(event) => updateAddForm("username", event.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newPassword">Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Password"
                    required
                    value={addForm.password}
                    onChange={(event) => updateAddForm("password", event.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="newJoiningDate">Joining Date</label>
                <input
                  id="newJoiningDate"
                  type="date"
                  required
                  value={addForm.joiningDate}
                  onChange={(event) => updateAddForm("joiningDate", event.target.value)}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn" id="cancelNewUser" onClick={cancelNewUser}>
                  Cancel
                </button>
                <button type="button" className="btn primary" id="saveNewUser" onClick={saveNewUser}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Role</th>
                <th>Last Online</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isEditing = Boolean(editingRows[user.id]);
                const editValues = editingRows[user.id];
                const actionState = user.status === "Inactive" ? "activate" : "deactivate";
                const editDepartmentOptions =
                  isEditing && !adminUsersRolesEditDepartmentOptions.includes(editValues.department)
                    ? [editValues.department, ...adminUsersRolesEditDepartmentOptions]
                    : adminUsersRolesEditDepartmentOptions;

                return (
                  <tr key={user.id} data-index={user.id}>
                    <td className="fullname-cell">
                      <span className="fullname-text">
                        {isEditing ? (
                          <input
                            className="edit-input name-input"
                            style={compactInputStyle}
                            value={editValues.fullName}
                            onChange={(event) => updateEditForm(user.id, "fullName", event.target.value)}
                          />
                        ) : (
                          user.fullName
                        )}
                      </span>
                    </td>
                    <td className="email-cell">
                      <span className="email-text">
                        {isEditing ? (
                          <input
                            className="edit-input email-input"
                            type="email"
                            pattern="^[^\\s@]+@ledgerworx\\.me$"
                            title="Email must end with @ledgerworx.me"
                            style={emailInputStyle}
                            value={editValues.email}
                            onChange={(event) => updateEditForm(user.id, "email", event.target.value)}
                          />
                        ) : (
                          user.email
                        )}
                      </span>
                    </td>
                    <td className="phone-cell">
                      <span className="phone-text">
                        {isEditing ? (
                          <input
                            className="edit-input phone-input"
                            style={compactInputStyle}
                            value={editValues.phone}
                            onChange={(event) => updateEditForm(user.id, "phone", event.target.value)}
                          />
                        ) : (
                          user.phone
                        )}
                      </span>
                    </td>
                    <td className="department-cell">
                      <span className="department-text">
                        {isEditing ? (
                          <select
                            className="dept-select"
                            value={editValues.department}
                            onChange={(event) => updateEditForm(user.id, "department", event.target.value)}
                          >
                            {editDepartmentOptions.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          user.department
                        )}
                      </span>
                    </td>
                    <td className="designation-cell">
                      <span className="designation-text">
                        {isEditing ? (
                          <input
                            className="edit-input desig-input"
                            style={compactInputStyle}
                            value={editValues.designation}
                            onChange={(event) => updateEditForm(user.id, "designation", event.target.value)}
                          />
                        ) : (
                          user.designation
                        )}
                      </span>
                    </td>
                    <td className="status-cell">
                      <span className="status-text">
                        {isEditing ? (
                          <select
                            className="status-select"
                            value={editValues.status}
                            onChange={(event) => updateEditForm(user.id, "status", event.target.value)}
                          >
                            {adminUsersRolesStatusOptions.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          user.status
                        )}
                      </span>
                    </td>
                    <td>
                      <span className={`role ${isEditing ? roleClassFor(editValues.role) : user.roleClass} role-text`}>
                        {isEditing ? (
                          <select
                            className="role-select"
                            value={editValues.role}
                            onChange={(event) => updateEditForm(user.id, "role", event.target.value)}
                          >
                            {adminUsersRolesRoleOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          user.role
                        )}
                      </span>
                    </td>
                    <td className={`${user.lastOnline === "Online now" ? "online " : ""}lastonline-text`}>
                      {user.lastOnline}
                    </td>
                    <td>
                      {isEditing ? (
                        <button className="btn btn-edit" data-action="save" type="button" onClick={() => saveEdit(user.id)}>
                          Save
                        </button>
                      ) : (
                        <button className="btn btn-edit" data-action="edit" type="button" onClick={() => enterEditMode(user)}>
                          Edit
                        </button>
                      )}
                      <button
                        className={`btn ${actionState === "activate" ? "activate" : "btn-delete"}`}
                        data-action={actionState}
                        type="button"
                        style={{ marginLeft: "8px" }}
                        onClick={() => {
                          if (actionState === "activate") {
                            activateUser(user.id);
                            return;
                          }

                          deactivateUser(user.id);
                        }}
                      >
                        {actionState === "activate" ? "Activate" : "Deactivate"}
                      </button>
                      <button
                        className="btn"
                        data-action="cancel"
                        type="button"
                        style={{ display: isEditing ? "inline-block" : "none", marginLeft: "8px" }}
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

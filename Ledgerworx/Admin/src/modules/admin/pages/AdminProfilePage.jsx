import { useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { adminProfileInitialData } from "../data/adminProfileData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminProfileCss from "../styles/admin_profile.css?raw";

function buildFormValues(profile) {
  return {
    fullName: profile.fullName,
    username: profile.username,
    email: profile.email,
    phone: profile.phone,
    employeeId: profile.employeeId,
    department: profile.department,
    designation: profile.designation,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
}

function validateProfileForm(values) {
  const nextErrors = [];

  if (values.fullName.trim() === "") {
    nextErrors.push("Full Name is required.");
  }

  if (values.username.trim() === "") {
    nextErrors.push("Username is required.");
  }

  if (values.email.trim() === "") {
    nextErrors.push("Official Email is required.");
  } else if (!/^[^@\s]+@ledgerworx\.me$/i.test(values.email.trim())) {
    nextErrors.push("Official Email must end with @ledgerworx.me.");
  }

  if (values.phone.trim() === "") {
    nextErrors.push("Phone Number is required.");
  } else {
    const phoneDigits = values.phone.replace(/\D+/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      nextErrors.push("Phone Number must contain 10 to 15 digits.");
    }
  }

  if (values.designation.trim() === "") {
    nextErrors.push("Designation is required.");
  }

  const currentPassword = values.currentPassword.trim();
  const newPassword = values.newPassword.trim();
  const confirmPassword = values.confirmPassword.trim();
  const wantsPasswordChange =
    currentPassword !== "" || newPassword !== "" || confirmPassword !== "";

  if (wantsPasswordChange) {
    if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
      nextErrors.push("To change password, fill Current, New, and Confirm password fields.");
    } else if (newPassword.length < 8) {
      nextErrors.push("New Password must be at least 8 characters.");
    } else if (newPassword !== confirmPassword) {
      nextErrors.push("New Password and Confirm Password do not match.");
    }
  }

  return nextErrors;
}

export default function AdminProfilePage() {
  useAdminPageStyles({ pageKey: "profile", pageCssText: adminProfileCss });
  const [savedProfile, setSavedProfile] = useState(adminProfileInitialData);
  const [formValues, setFormValues] = useState(buildFormValues(adminProfileInitialData));
  const [photoPreview, setPhotoPreview] = useState(adminProfileInitialData.profilePhoto);
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState("");
  const photoInputRef = useRef(null);

  function handleFieldChange(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
    setFormSuccess("");
  }

  function handlePhotoChange(event) {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;

    setFormSuccess("");

    if (!file) {
      setPhotoPreview(savedProfile.profilePhoto);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateProfileForm(formValues);

    if (nextErrors.length > 0) {
      setFormErrors(nextErrors);
      setFormSuccess("");
      return;
    }

    const nextSavedProfile = {
      fullName: formValues.fullName.trim(),
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      employeeId: savedProfile.employeeId,
      department: savedProfile.department,
      designation: formValues.designation.trim(),
      profilePhoto: photoPreview
    };

    setSavedProfile(nextSavedProfile);
    setFormValues(buildFormValues(nextSavedProfile));
    setFormErrors([]);
    setFormSuccess("Profile updated successfully.");

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  }

  function handleCancel() {
    setFormValues(buildFormValues(savedProfile));
    setPhotoPreview(savedProfile.profilePhoto);
    setFormErrors([]);
    setFormSuccess("");

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  }

  return (
    <>
      <AdminHeader adminName={savedProfile.username || "Admin"} />

      <div className="profile-page">
        <div className="breadcrumb">Dashboard &gt; Profile</div>

        <section className="profile-card" aria-labelledby="profileTitle">
          <div className="profile-header">
            <h2 id="profileTitle">Edit Profile</h2>
            <p>Update your admin details and account credentials.</p>
          </div>

          {formSuccess !== "" ? (
            <div className="alert success" role="status">
              {formSuccess}
            </div>
          ) : null}

          {formErrors.length > 0 ? (
            <div className="alert error" role="alert">
              <strong>Please fix the following:</strong>
              <ul>
                {formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form
            id="adminProfileForm"
            className="profile-form"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="profile-layout">
              <aside className="photo-column">
                <div
                  className={`photo-preview${photoPreview !== "" ? " has-photo" : ""}`}
                  id="profilePhotoPreview"
                >
                  {photoPreview !== "" ? (
                    <img src={photoPreview} alt="Profile Photo" id="profilePhotoImage" />
                  ) : (
                    <i className="fa-solid fa-user" aria-hidden="true"></i>
                  )}
                </div>

                <label htmlFor="profilePhoto" className="upload-btn">
                  Choose Profile Photo
                </label>
                <input
                  ref={photoInputRef}
                  type="file"
                  id="profilePhoto"
                  name="profile_photo"
                  accept=".jpg,.jpeg,.png,.webp,.gif,image/*"
                  onChange={handlePhotoChange}
                />
                <small className="hint">Optional. JPG, PNG, WEBP, or GIF (max 2MB).</small>
              </aside>

              <div className="fields-column">
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="full_name"
                      value={formValues.fullName}
                      onChange={(event) => {
                        handleFieldChange("fullName", event.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formValues.username}
                      onChange={(event) => {
                        handleFieldChange("username", event.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="officialEmail">Official Email (ledgerworx.me)</label>
                    <input
                      type="email"
                      id="officialEmail"
                      name="email"
                      value={formValues.email}
                      onChange={(event) => {
                        handleFieldChange("email", event.target.value);
                      }}
                      pattern="^[^@\s]+@ledgerworx\.me$"
                      title="Email must end with @ledgerworx.me"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phone"
                      value={formValues.phone}
                      onChange={(event) => {
                        handleFieldChange("phone", event.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="employeeId">Employee ID</label>
                    <input
                      type="text"
                      id="employeeId"
                      name="employee_id"
                      value={formValues.employeeId}
                      readOnly
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formValues.department}
                      readOnly
                    />
                  </div>

                  <div className="field field-full">
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formValues.designation}
                      onChange={(event) => {
                        handleFieldChange("designation", event.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="password-block">
                  <h3>Change Password</h3>
                  <p>Fill all three fields only when you want to update the password.</p>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="current_password"
                        autoComplete="current-password"
                        value={formValues.currentPassword}
                        onChange={(event) => {
                          handleFieldChange("currentPassword", event.target.value);
                        }}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="new_password"
                        minLength="8"
                        autoComplete="new-password"
                        value={formValues.newPassword}
                        onChange={(event) => {
                          handleFieldChange("newPassword", event.target.value);
                        }}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirm_password"
                        minLength="8"
                        autoComplete="new-password"
                        value={formValues.confirmPassword}
                        onChange={(event) => {
                          handleFieldChange("confirmPassword", event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    id="cancelProfileBtn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const addModal = document.getElementById('addCompanyModal');
  const openAddBtn = document.getElementById('openAddCompanyModalBtn');
  const closeAddBtn = document.getElementById('closeAddCompanyModalBtn');
  const cancelAddBtn = document.getElementById('cancelAddCompanyBtn');
  const addForm = document.getElementById('addCompanyForm');

  const viewModal = document.getElementById('viewCompanyModal');
  const closeViewBtn = document.getElementById('closeViewCompanyBtn');
  const closeViewX = document.getElementById('closeViewCompanyModalBtn');

  const editModal = document.getElementById('editCompanyModal');
  const closeEditBtn = document.getElementById('cancelEditCompanyBtn');
  const closeEditX = document.getElementById('closeEditCompanyModalBtn');
  const editForm = document.getElementById('editCompanyForm');

  const defaults = {
    "Bright Tech Solutions": {
      vatTrn: "TRN-100245689100003",
      licenseExpiryDate: "2027-12-31",
      companyEmail: "contact@brighttech.com",
      phoneNumber: "+971 50 123 4567",
      address: "Business Bay, Dubai, UAE",
      poBox: "PO Box 44521",
      adminEmail: "anil.kumar@brighttech.com",
      username: "brighttech_admin",
      password: "********"
    },
    "Emirates Logistics": {
      vatTrn: "TRN-100398451200003",
      licenseExpiryDate: "2026-09-15",
      companyEmail: "info@emirateslogistics.ae",
      phoneNumber: "+971 55 987 6543",
      address: "Al Quoz, Dubai, UAE",
      poBox: "PO Box 11209",
      adminEmail: "sarah.ali@emirateslogistics.ae",
      username: "emirateslog_admin",
      password: "********"
    },
    "Nova Healthcare": {
      vatTrn: "TRN-100777234500003",
      licenseExpiryDate: "2025-11-30",
      companyEmail: "hello@novahealthcare.com",
      phoneNumber: "+971 58 222 1100",
      address: "Abu Dhabi, UAE",
      poBox: "PO Box 88761",
      adminEmail: "meera.joshi@novahealthcare.com",
      username: "novahealth_admin",
      password: "********"
    }
  };

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function setField(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "N/A";
  }

  function rowStatusClass(status) {
    const s = String(status || "").toLowerCase();
    if (s.includes("active")) return "active";
    if (s.includes("pending")) return "pending";
    return "banned";
  }

  function getRowData(row) {
    const cells = row.querySelectorAll("td");
    const companyName = (row.querySelector("td.company")?.textContent || "").trim();
    const tradeLicenseNumber = (cells[1]?.textContent || "").trim();
    const adminName = (row.querySelector("td.owner")?.textContent || "").trim();
    const status = (row.querySelector(".status")?.textContent || "").trim();
    const d = defaults[companyName] || {};
    return {
      companyName,
      tradeLicenseNumber,
      vatTrn: row.dataset.vatTrn || d.vatTrn || "N/A",
      licenseExpiryDate: row.dataset.licenseExpiryDate || d.licenseExpiryDate || "N/A",
      companyEmail: row.dataset.companyEmail || d.companyEmail || "N/A",
      phoneNumber: row.dataset.phoneNumber || d.phoneNumber || "N/A",
      address: row.dataset.address || d.address || "N/A",
      poBox: row.dataset.poBox || d.poBox || "N/A",
      adminName,
      adminEmail: row.dataset.adminEmail || d.adminEmail || "N/A",
      username: row.dataset.username || d.username || "N/A",
      password: row.dataset.password || d.password || "N/A",
      status
    };
  }

  function storeRowData(row, data) {
    row.dataset.vatTrn = data.vatTrn;
    row.dataset.licenseExpiryDate = data.licenseExpiryDate;
    row.dataset.companyEmail = data.companyEmail;
    row.dataset.phoneNumber = data.phoneNumber;
    row.dataset.address = data.address;
    row.dataset.poBox = data.poBox;
    row.dataset.adminEmail = data.adminEmail;
    row.dataset.username = data.username;
    row.dataset.password = data.password;

    const cells = row.querySelectorAll("td");
    if (cells[0]) {
      cells[0].classList.add("company");
      cells[0].innerHTML = '<i class="fa fa-building"></i>' + data.companyName;
    }
    if (cells[1]) cells[1].textContent = data.tradeLicenseNumber;
    if (cells[3]) {
      const img = row.querySelector("td.owner img");
      cells[3].classList.add("owner");
      cells[3].innerHTML = img ? img.outerHTML + " " + data.adminName : data.adminName;
    }
    const badge = row.querySelector(".status");
    if (badge) {
      badge.classList.remove("active", "pending", "banned");
      badge.classList.add(rowStatusClass(data.status));
      badge.textContent = data.status;
    }
  }

  function openViewFromRow(row) {
    const data = getRowData(row);
    setField("viewCompanyName", data.companyName);
    setField("viewTradeLicenseNumber", data.tradeLicenseNumber);
    setField("viewVatTrn", data.vatTrn);
    setField("viewLicenseExpiryDate", data.licenseExpiryDate);
    setField("viewCompanyEmail", data.companyEmail);
    setField("viewPhoneNumber", data.phoneNumber);
    setField("viewAddress", data.address);
    setField("viewPoBox", data.poBox);
    setField("viewAdminName", data.adminName);
    setField("viewAdminEmail", data.adminEmail);
    setField("viewUsername", data.username);
    setField("viewPassword", data.password);
    openModal(viewModal);
  }

  function openEditFromRow(row) {
    const data = getRowData(row);
    const rows = Array.from(document.querySelectorAll("table tr"));
    const rowIndex = rows.indexOf(row);
    const idxEl = document.getElementById("editRowIndex");
    if (idxEl) idxEl.value = String(rowIndex);

    document.getElementById("editCompanyName").value = data.companyName;
    document.getElementById("editTradeLicenseNo").value = data.tradeLicenseNumber;
    document.getElementById("editVatTrn").value = data.vatTrn === "N/A" ? "" : data.vatTrn;
    document.getElementById("editLicenseExpiryDate").value = data.licenseExpiryDate === "N/A" ? "" : data.licenseExpiryDate;
    document.getElementById("editCompanyEmail").value = data.companyEmail === "N/A" ? "" : data.companyEmail;
    document.getElementById("editPhoneNumber").value = data.phoneNumber === "N/A" ? "" : data.phoneNumber;
    document.getElementById("editAddress").value = data.address === "N/A" ? "" : data.address;
    document.getElementById("editPoBox").value = data.poBox === "N/A" ? "" : data.poBox;
    document.getElementById("editAdminName").value = data.adminName;
    document.getElementById("editAdminEmail").value = data.adminEmail === "N/A" ? "" : data.adminEmail;
    document.getElementById("editUsername").value = data.username === "N/A" ? "" : data.username;
    document.getElementById("editPassword").value = data.password === "N/A" ? "" : data.password;
    openModal(editModal);
  }

  document.addEventListener("click", function (event) {
    const viewBtn = event.target.closest(".view-company-btn");
    if (viewBtn) {
      const row = viewBtn.closest("tr");
      if (row) openViewFromRow(row);
      return;
    }

    const editBtn = event.target.closest(".edit-company-btn");
    if (editBtn) {
      const row = editBtn.closest("tr");
      if (row) openEditFromRow(row);
    }
  });

  if (openAddBtn) {
    openAddBtn.addEventListener("click", function () {
      openModal(addModal);
      const first = document.getElementById("companyName");
      if (first) first.focus();
    });
  }
  if (closeAddBtn) closeAddBtn.addEventListener("click", function () { closeModal(addModal); });
  if (cancelAddBtn) cancelAddBtn.addEventListener("click", function () { closeModal(addModal); });
  if (closeViewBtn) closeViewBtn.addEventListener("click", function () { closeModal(viewModal); });
  if (closeViewX) closeViewX.addEventListener("click", function () { closeModal(viewModal); });
  if (closeEditBtn) closeEditBtn.addEventListener("click", function () { closeModal(editModal); });
  if (closeEditX) closeEditX.addEventListener("click", function () { closeModal(editModal); });

  if (addModal) addModal.addEventListener("click", function (event) { if (event.target === addModal) closeModal(addModal); });
  if (viewModal) viewModal.addEventListener("click", function (event) { if (event.target === viewModal) closeModal(viewModal); });
  if (editModal) editModal.addEventListener("click", function (event) { if (event.target === editModal) closeModal(editModal); });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(addModal);
      closeModal(viewModal);
      closeModal(editModal);
    }
  });

  if (addForm) {
    addForm.addEventListener("submit", function (event) {
      event.preventDefault();
      closeModal(addModal);
      addForm.reset();
    });
  }

  if (editForm) {
    editForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const idx = Number(document.getElementById("editRowIndex").value);
      const rows = Array.from(document.querySelectorAll("table tr"));
      const row = rows[idx];
      if (!row) {
        closeModal(editModal);
        return;
      }
      const updated = {
        companyName: document.getElementById("editCompanyName").value.trim(),
        tradeLicenseNumber: document.getElementById("editTradeLicenseNo").value.trim(),
        vatTrn: document.getElementById("editVatTrn").value.trim(),
        licenseExpiryDate: document.getElementById("editLicenseExpiryDate").value.trim(),
        companyEmail: document.getElementById("editCompanyEmail").value.trim(),
        phoneNumber: document.getElementById("editPhoneNumber").value.trim(),
        address: document.getElementById("editAddress").value.trim(),
        poBox: document.getElementById("editPoBox").value.trim(),
        adminName: document.getElementById("editAdminName").value.trim(),
        adminEmail: document.getElementById("editAdminEmail").value.trim(),
        username: document.getElementById("editUsername").value.trim(),
        password: document.getElementById("editPassword").value.trim(),
        status: (row.querySelector(".status")?.textContent || "Active").trim()
      };
      storeRowData(row, updated);
      closeModal(editModal);
    });
  }
});

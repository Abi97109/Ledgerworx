document.addEventListener("DOMContentLoaded", function () {
  const editModal = document.getElementById("editPackageModal");
  const editForm = document.getElementById("editPackageForm");
  const closeEditBtn = document.getElementById("closeEditPackageModalBtn");
  const cancelEditBtn = document.getElementById("cancelEditPackageBtn");
  const addServiceModal = document.getElementById("addServiceModal");
  const addServiceForm = document.getElementById("addServiceForm");
  const openAddServiceBtn = document.getElementById("openAddServiceModalBtn");
  const closeAddServiceBtn = document.getElementById("closeAddServiceModalBtn");
  const cancelAddServiceBtn = document.getElementById("cancelAddServiceBtn");
  const addDocBtn = document.getElementById("addServiceAddDocumentBtn");
  const addDocInput = document.getElementById("addServiceRequiredDoc");
  const docsList = document.getElementById("addServiceDocsList");
  const servicesContainer = document.querySelector(".services");

  function openModal() {
    if (!editModal) return;
    editModal.classList.add("open");
    editModal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!editModal) return;
    editModal.classList.remove("open");
    editModal.setAttribute("aria-hidden", "true");
  }

  function openAddServiceModal() {
    if (!addServiceModal) return;
    addServiceModal.classList.add("open");
    addServiceModal.setAttribute("aria-hidden", "false");
  }

  function closeAddServiceModal() {
    if (!addServiceModal) return;
    addServiceModal.classList.remove("open");
    addServiceModal.setAttribute("aria-hidden", "true");
  }

  function addDocumentItem(rawValue) {
    if (!docsList) return;
    const value = String(rawValue || "").trim();
    if (!value) return;
    const li = document.createElement("li");
    const text = document.createElement("span");
    const removeBtn = document.createElement("button");

    text.textContent = value;
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      li.remove();
    });

    li.appendChild(text);
    li.appendChild(removeBtn);
    docsList.appendChild(li);
  }

  function cleanPackageName(packageCell) {
    const nameNode = Array.from(packageCell.childNodes).find((n) => n.nodeType === Node.TEXT_NODE);
    return (nameNode ? nameNode.textContent : packageCell.textContent || "").trim();
  }

  function statusClass(status) {
    const s = String(status || "").toLowerCase();
    if (s === "enabled") return "status-enabled";
    if (s === "disabled") return "status-disabled";
    return "status-draft";
  }

  document.addEventListener("click", function (event) {
    const editBtn = event.target.closest(".edit-package-btn");
    if (editBtn) {
      const row = editBtn.closest(".package-row");
      if (!row) return;
      const cells = row.querySelectorAll("td");
      const packageName = cleanPackageName(cells[0]);
      const service = (cells[1]?.textContent || "").trim();
      const price = (cells[2]?.textContent || "").trim();
      const status = (row.querySelector(".status")?.textContent || "Enabled").trim();

      const rows = Array.from(document.querySelectorAll("#packagesTable .package-row"));
      const rowIndex = rows.indexOf(row);
      document.getElementById("editPackageRowIndex").value = String(rowIndex);
      document.getElementById("editPackageName").value = packageName;
      document.getElementById("editPackageService").value = service;
      document.getElementById("editPackagePrice").value = price;
      document.getElementById("editPackageStatus").value = status;
      openModal();
      return;
    }

    const disableBtn = event.target.closest(".disable-package-btn");
    if (disableBtn) {
      const row = disableBtn.closest(".package-row");
      if (!row) return;
      const packageName = cleanPackageName(row.querySelectorAll("td")[0]);
      const confirmDisable = window.confirm("Do you want to disable " + packageName + "?");
      if (!confirmDisable) return;
      const badge = row.querySelector(".status");
      if (badge) {
        badge.textContent = "Disabled";
        badge.classList.remove("status-enabled", "status-draft");
        badge.classList.add("status-disabled");
      }
    }
  });

  if (closeEditBtn) closeEditBtn.addEventListener("click", closeModal);
  if (cancelEditBtn) cancelEditBtn.addEventListener("click", closeModal);
  if (openAddServiceBtn) openAddServiceBtn.addEventListener("click", openAddServiceModal);
  if (closeAddServiceBtn) closeAddServiceBtn.addEventListener("click", closeAddServiceModal);
  if (cancelAddServiceBtn) cancelAddServiceBtn.addEventListener("click", closeAddServiceModal);
  if (addDocBtn) {
    addDocBtn.addEventListener("click", function () {
      addDocumentItem(addDocInput ? addDocInput.value : "");
      if (addDocInput) addDocInput.value = "";
    });
  }

  if (editModal) {
    editModal.addEventListener("click", function (event) {
      if (event.target === editModal) closeModal();
    });
  }
  if (addServiceModal) {
    addServiceModal.addEventListener("click", function (event) {
      if (event.target === addServiceModal) closeAddServiceModal();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      closeAddServiceModal();
    }
  });

  if (editForm) {
    editForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const rowIndex = Number(document.getElementById("editPackageRowIndex").value);
      const rows = document.querySelectorAll("#packagesTable .package-row");
      const row = rows[rowIndex];
      if (!row) {
        closeModal();
        return;
      }

      const packageName = document.getElementById("editPackageName").value.trim();
      const service = document.getElementById("editPackageService").value.trim();
      const price = document.getElementById("editPackagePrice").value.trim();
      const status = document.getElementById("editPackageStatus").value.trim();

      const cells = row.querySelectorAll("td");
      if (cells[0]) {
        const tagHtml = cells[0].querySelector(".tag") ? ' <span class="tag popular">Most Popular</span>' : "";
        cells[0].innerHTML = packageName + tagHtml;
      }
      if (cells[1]) cells[1].textContent = service;
      if (cells[2]) cells[2].textContent = price;

      const badge = row.querySelector(".status");
      if (badge) {
        badge.textContent = status;
        badge.classList.remove("status-enabled", "status-disabled", "status-draft");
        badge.classList.add(statusClass(status));
      }

      closeModal();
    });
  }

  if (addServiceForm) {
    addServiceForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!servicesContainer) {
        closeAddServiceModal();
        return;
      }

      const name = document.getElementById("addServiceName")?.value.trim() || "New Service";
      const docsCount = docsList ? docsList.querySelectorAll("li").length : 0;
      const packageCount = docsCount > 0 ? docsCount : 1;
      const packageText = packageCount + " " + (packageCount === 1 ? "Package Created" : "Packages Created");

      const serviceCard = document.createElement("div");
      serviceCard.className = "service tile";

      const title = document.createElement("div");
      title.className = "num";
      title.textContent = String(packageCount);

      const desc = document.createElement("div");
      desc.className = "tile-title";
      desc.textContent = name;

      const meta = document.createElement("div");
      meta.className = "tile-meta";
      meta.textContent = packageText;

      serviceCard.appendChild(title);
      serviceCard.appendChild(desc);
      serviceCard.appendChild(meta);
      servicesContainer.appendChild(serviceCard);

      addServiceForm.reset();
      if (docsList) docsList.innerHTML = "";
      closeAddServiceModal();
    });
  }
});

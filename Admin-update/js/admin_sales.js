function applyInvoiceFilters() {
  const status = document.getElementById('statusFilter')?.value || 'All Statuses';
  const company = document.getElementById('companyFilter')?.value || 'All Companies';
  const url = new URL(window.location);
  url.searchParams.set('status', status);
  url.searchParams.set('company', company);
  url.searchParams.set('invoice_page', '1');
  window.location.href = url.toString();
}

function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('invoice_page')) || 1;
}

function previousPage() {
  const currentPage = getCurrentPage();
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function nextPage() {
  const currentPage = getCurrentPage();
  const totalPages = parseInt(document.getElementById('paginationControls')?.dataset.totalPages || '1', 10);
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
}

function goToPage(pageNum) {
  const url = new URL(window.location);
  url.searchParams.set('invoice_page', pageNum);
  window.location.href = url.toString();
}

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = getCurrentPage();
  const pageButtons = document.querySelectorAll('#paginationControls .action-btn');
  pageButtons.forEach((btn) => {
    const pageNum = parseInt(btn.textContent);
    if (!isNaN(pageNum) && pageNum === currentPage) {
      btn.style.background = '#4169e1';
      btn.style.color = 'white';
    } else if (!isNaN(pageNum)) {
      btn.style.background = 'white';
      btn.style.color = '#4169e1';
    }
  });

  const openBtn = document.getElementById('openAddSalespersonBtn');
  const closeBtn = document.getElementById('closeAddSalespersonModal');
  const cancelBtn = document.getElementById('cancelAddSalespersonBtn');
  const modal = document.getElementById('addSalespersonModal');
  const form = document.getElementById('addSalespersonForm');
  const tableBody = document.getElementById('salespersonTableBody');
  const profileModal = document.getElementById('salespersonProfileModal');
  const closeProfileModalBtn = document.getElementById('closeSalespersonProfileModal');
  const closeProfileBtn = document.getElementById('closeProfileBtn');

  if (!openBtn || !modal || !form || !tableBody) {
    return;
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const nameInput = document.getElementById('salespersonFullName');
    if (nameInput) {
      nameInput.focus();
    }
  }

  function setProfileText(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value || 'N/A';
    }
  }

  function openProfileModalFromRow(row) {
    if (!profileModal || !row) {
      return;
    }
    const data = row.dataset;
    setProfileText('profileFullName', data.fullName || '');
    setProfileText('profileEmployeeId', data.employeeId || '');
    setProfileText('profilePhone', data.phone || '');
    setProfileText('profileEmail', data.email || '');
    setProfileText('profileDepartment', data.department || 'Sales');
    setProfileText('profileSalesTarget', data.salesTarget || '0');
    setProfileText('profileSold', data.sold || '0');
    setProfileText('profileAchieved', `${data.achieved || '0'}%`);
    setProfileText('profileRegion', data.region || '');
    setProfileText('profileUsername', data.username || '');
    setProfileText('profileStatus', data.status || '');

    profileModal.classList.add('open');
    profileModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeProfileModal() {
    if (!profileModal) {
      return;
    }
    profileModal.classList.remove('open');
    profileModal.setAttribute('aria-hidden', 'true');
    if (!modal.classList.contains('open')) {
      document.body.classList.remove('modal-open');
    }
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  if (profileModal) {
    profileModal.addEventListener('click', function (event) {
      if (event.target === profileModal) {
        closeProfileModal();
      }
    });
  }

  if (closeProfileModalBtn) {
    closeProfileModalBtn.addEventListener('click', closeProfileModal);
  }
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', closeProfileModal);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (modal.classList.contains('open')) {
        closeModal();
      }
      if (profileModal && profileModal.classList.contains('open')) {
        closeProfileModal();
      }
    }
  });

  tableBody.addEventListener('click', function (event) {
    const row = event.target.closest('tr.salesperson-entry');
    if (!row) {
      return;
    }
    openProfileModalFromRow(row);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get('full_name') || '').trim();
    const employeeId = String(formData.get('employee_id') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const department = String(formData.get('department') || 'Sales').trim();
    const target = Number(formData.get('sales_target') || 0);
    const region = String(formData.get('assigned_region') || '').trim();
    const username = String(formData.get('username') || '').trim();
    const status = String(formData.get('status') || 'Active').trim();
    const sold = 0;

    if (!name || !email) {
      return;
    }

    const achievedPercent = target > 0 ? Math.round((sold / target) * 100) : 0;
    const barPercent = Math.max(0, Math.min(achievedPercent, 100));

    const row = document.createElement('tr');
    row.className = 'salesperson-entry';
    row.dataset.fullName = name;
    row.dataset.employeeId = employeeId || 'N/A';
    row.dataset.phone = phone || 'N/A';
    row.dataset.email = email;
    row.dataset.department = department || 'Sales';
    row.dataset.salesTarget = String(target);
    row.dataset.sold = String(sold);
    row.dataset.achieved = String(achievedPercent);
    row.dataset.region = region || 'N/A';
    row.dataset.username = username || 'N/A';
    row.dataset.status = status || 'Active';
    row.innerHTML = `
      <td><div class="salesperson-photo"></div></td>
      <td><span class="salesperson-name"></span></td>
      <td><span class="salesperson-email"></span></td>
      <td></td>
      <td></td>
      <td>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${barPercent}%"></div>
        </div>
      </td>
      <td><button class="action-btn">View</button></td>
    `;

    row.querySelector('.salesperson-name').textContent = name;
    row.querySelector('.salesperson-email').textContent = email;
    row.children[3].textContent = String(target);
    row.children[4].textContent = String(sold);
    row.children[5].append(` ${achievedPercent}%`);

    tableBody.appendChild(row);
    form.reset();
    closeModal();
  });
});

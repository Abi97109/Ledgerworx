document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('invoiceSearchInput');
  const statusFilter = document.getElementById('invoiceStatusFilter');
  const companyFilter = document.getElementById('invoiceCompanyFilter');
  const packageFilter = document.getElementById('invoicePackageFilter');
  const rows = document.querySelectorAll('#invoiceTableBody .invoice-row');
  const emptyState = document.getElementById('invoiceEmptyState');

  function applyFilters() {
    if (!searchInput || !statusFilter || !companyFilter || !packageFilter || rows.length === 0) {
      return;
    }
    const search = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedCompany = companyFilter.value;
    const selectedPackage = packageFilter.value;
    let visibleCount = 0;

    rows.forEach((row) => {
      const inv = (row.dataset.inv || '').toLowerCase();
      const company = (row.dataset.company || '').toLowerCase();
      const pkg = (row.dataset.package || '').toLowerCase();
      const amount = (row.dataset.amount || '').toLowerCase();
      const status = row.dataset.status || '';

      const matchesSearch = !search ||
        inv.includes(search) ||
        company.includes(search) ||
        pkg.includes(search) ||
        amount.includes(search) ||
        status.toLowerCase().includes(search);

      const matchesStatus = selectedStatus === 'All Statuses' || status === selectedStatus;
      const matchesCompany = selectedCompany === 'All Companies' || (row.dataset.company || '') === selectedCompany;
      const matchesPackage = selectedPackage === 'All Packages' || (row.dataset.package || '') === selectedPackage;

      const show = matchesSearch && matchesStatus && matchesCompany && matchesPackage;
      row.style.display = show ? '' : 'none';
      if (show) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  if (searchInput && statusFilter && companyFilter && packageFilter && rows.length > 0) {
    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    companyFilter.addEventListener('change', applyFilters);
    packageFilter.addEventListener('change', applyFilters);
  }

  const invoiceModal = document.getElementById('invoiceDetailsModal');
  const closeInvoiceModalX = document.getElementById('closeInvoiceDetailsModal');
  const closeInvoiceModalBtn = document.getElementById('closeInvoiceDetailsBtn');

  function setDetail(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value || 'N/A';
    }
  }

  function openInvoiceModal(row) {
    if (!invoiceModal || !row) {
      return;
    }
    setDetail('detailInvNo', row.dataset.inv);
    setDetail('detailCompany', row.dataset.company);
    setDetail('detailPackage', row.dataset.package);
    setDetail('detailAmount', row.dataset.amount);
    setDetail('detailDueDate', row.dataset.dueDate);
    setDetail('detailStatus', row.dataset.status);

    invoiceModal.classList.add('open');
    invoiceModal.setAttribute('aria-hidden', 'false');
  }

  function closeInvoiceModal() {
    if (!invoiceModal) {
      return;
    }
    invoiceModal.classList.remove('open');
    invoiceModal.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('.view-invoice-btn, #detailedInvoiceTable .pay-btn');
    if (!button) {
      return;
    }
    const row = button.closest('.view-invoice-row, tr');
    if (!row) {
      return;
    }
    if (!row.dataset.inv) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 6) {
        row.dataset.inv = (cells[0].textContent || '').trim();
        row.dataset.company = (cells[1].textContent || '').trim();
        row.dataset.package = (cells[2].textContent || '').trim();
        row.dataset.amount = (cells[3].textContent || '').trim();
        row.dataset.dueDate = (cells[4].textContent || '').trim();
        row.dataset.status = (cells[5].textContent || '').trim();
      }
    }
    openInvoiceModal(row);
  });

  if (closeInvoiceModalX) {
    closeInvoiceModalX.addEventListener('click', closeInvoiceModal);
  }
  if (closeInvoiceModalBtn) {
    closeInvoiceModalBtn.addEventListener('click', closeInvoiceModal);
  }
  if (invoiceModal) {
    invoiceModal.addEventListener('click', function (event) {
      if (event.target === invoiceModal) {
        closeInvoiceModal();
      }
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeInvoiceModal();
    }
  });
});

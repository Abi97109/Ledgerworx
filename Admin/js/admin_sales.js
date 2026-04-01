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
  pageButtons.forEach((btn, index) => {
    const pageNum = parseInt(btn.textContent);
    if (!isNaN(pageNum) && pageNum === currentPage) {
      btn.style.background = '#4169e1';
      btn.style.color = 'white';
    } else if (!isNaN(pageNum)) {
      btn.style.background = 'white';
      btn.style.color = '#4169e1';
    }
  });
});

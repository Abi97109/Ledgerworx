document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('adminBtn');
  const dd = document.getElementById('adminDropdown');
  const toggle = document.getElementById('darkToggle');
  const edit = document.getElementById('editProfile');
  const logout = document.getElementById('logoutLink');

  if (!btn || !dd) return;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    dd.classList.toggle('show');
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.admin')) dd.classList.remove('show');
  });

  if (edit) {
    edit.addEventListener('click', function () {
      window.location.href = 'admin_profile.php';
    });
  }

  if (logout) {
    logout.addEventListener('click', function () {
      window.location.href = 'logout.php';
    });
  }

  function injectDarkStyles(enable) {
    const id = 'ledger-dark-styles';
    const existing = document.getElementById(id);
    if (!enable) {
      if (existing) existing.remove();
      return;
    }
    if (existing) return;

    const s = document.createElement('style');
    s.id = id;
    s.type = 'text/css';
    s.appendChild(
      document.createTextNode(
        [
          'body.dark{background:#0f1720;color:#e6eef6 !important;}',
          'body.dark .page, body.dark .card, body.dark .tile, body.dark .kpi, body.dark table, body.dark .breadcrumb{background:#0f1720 !important;color:#dfe9f2 !important;border-color:rgba(255,255,255,.08) !important;}',
          'body.dark .card, body.dark .tile{box-shadow:none !important;}',
          'body.dark table th, body.dark table td{background:transparent !important;color:#dfe9f2 !important;border-color:rgba(255,255,255,.08) !important;}',
          'body.dark tr:hover{background:rgba(255,255,255,.03) !important;}',
          'body.dark .btn{background:#1f6fe0 !important;color:#fff !important;}',
          'body.dark input, body.dark .search input, body.dark select, body.dark textarea{background:#0b1220 !important;color:#e6eef6 !important;border:1px solid rgba(255,255,255,.12) !important;}',
          'body.dark .topbar, body.dark .navbar{background:linear-gradient(90deg,#0e3b39,#1f6f63) !important;}',
          'body.dark .dropdown{background:#121620 !important;color:#e6eef6 !important;}',
          'body.dark .dropdown .dropdown-item{border-bottom:1px solid rgba(255,255,255,.08) !important;}',
          'body.dark .dropdown .dropdown-item:hover{background:rgba(255,255,255,.06) !important;}',
          'body.dark .nav-links a, body.dark .topbar .nav-items a{color:rgba(255,255,255,.95) !important;}',
          'body.dark .breadcrumb{color:#9fb3b0 !important;}',
        ].join('')
      )
    );
    document.head.appendChild(s);
  }

  function applyDark(enabled) {
    document.documentElement.classList.toggle('dark', enabled);
    document.body.classList.toggle('dark', enabled);
    injectDarkStyles(enabled);
    if (toggle) toggle.checked = enabled;
  }

  let isDark = false;
  try {
    isDark = localStorage.getItem('ledger_dark') === '1';
  } catch (e) {}
  applyDark(isDark);

  if (toggle) {
    toggle.addEventListener('change', function () {
      const enabled = this.checked;
      applyDark(enabled);
      try {
        localStorage.setItem('ledger_dark', enabled ? '1' : '0');
      } catch (e) {}
    });
  }
});

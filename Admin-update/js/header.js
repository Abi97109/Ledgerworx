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

  function applyDark(enabled) {
    document.documentElement.classList.toggle('dark-mode', enabled);
    document.body.classList.toggle('dark-mode', enabled);
    document.documentElement.classList.toggle('dark', enabled);
    document.body.classList.toggle('dark', enabled);
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

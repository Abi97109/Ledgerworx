(function () {
  const userProfile = document.getElementById('userProfile');
  const profileDropdown = document.getElementById('profileDropdown');

  if (userProfile && profileDropdown) {
    userProfile.addEventListener('click', (e) => {
      e.stopPropagation();
      userProfile.classList.toggle('active');
      profileDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {
        userProfile.classList.remove('active');
        profileDropdown.classList.remove('active');
      }
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  const toggleSwitch = document.getElementById('toggleSwitch');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    if (toggleSwitch) {
      toggleSwitch.classList.toggle('active', isDark);
    }
    if (themeIcon) {
      themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (themeText) {
      themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
      return;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
      return;
    }
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  window.openEditProfileModal = function () {
    openModal('editProfileModal');
  };

  window.openChangePasswordModal = function () {
    openModal('changePasswordModal');
  };

  window.closeModal = closeModal;

  window.saveProfile = function (event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const phone = form.querySelector('input[name="phone"]');
    const location = form.querySelector('input[name="location"]');

    const displayName = document.getElementById('profileDisplayName');
    const displayEmail = document.getElementById('profileDisplayEmail');
    const displayPhone = document.getElementById('profileDisplayPhone');
    const displayLocation = document.getElementById('profileDisplayLocation');

    if (displayName && name) displayName.textContent = name.value.trim();
    if (displayEmail && email) displayEmail.textContent = email.value.trim();
    if (displayPhone && phone) displayPhone.textContent = phone.value.trim();
    if (displayLocation && location) displayLocation.textContent = location.value.trim();

    alert('Profile details updated successfully.');
    closeModal('editProfileModal');
  };

  window.changePassword = function (event) {
    event.preventDefault();

    const form = event.target;
    const newPassword = form.querySelector('input[name="new_password"]');
    const confirmPassword = form.querySelector('input[name="confirm_password"]');

    if (!newPassword || !confirmPassword || newPassword.value !== confirmPassword.value) {
      alert('New password and confirmation password must match.');
      return;
    }

    alert('Password updated successfully.');
    form.reset();
    closeModal('changePasswordModal');
  };

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('adminProfileForm');
  const cancelBtn = document.getElementById('cancelProfileBtn');
  const photoInput = document.getElementById('profilePhoto');
  const photoPreview = document.getElementById('profilePhotoPreview');
  const emailInput = document.getElementById('officialEmail');
  const currentPassword = document.getElementById('currentPassword');
  const newPassword = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword');

  if (!form) {
    return;
  }

  const initialPhoto = form.getAttribute('data-initial-photo') || '';
  let previewObjectUrl = '';

  function clearPreviewObjectUrl() {
    if (previewObjectUrl !== '') {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = '';
    }
  }

  function renderDefaultAvatar() {
    if (!photoPreview) {
      return;
    }
    photoPreview.classList.remove('has-photo');
    photoPreview.innerHTML = '<i class="fa-solid fa-user" aria-hidden="true"></i>';
  }

  function renderImage(url) {
    if (!photoPreview) {
      return;
    }
    photoPreview.classList.add('has-photo');
    photoPreview.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Profile Photo';
    img.id = 'profilePhotoImage';
    photoPreview.appendChild(img);
  }

  function setPhotoPreview(url) {
    if (url && url.trim() !== '') {
      renderImage(url);
      return;
    }
    renderDefaultAvatar();
  }

  if (photoInput) {
    photoInput.addEventListener('change', function () {
      clearPreviewObjectUrl();
      const file = this.files && this.files[0] ? this.files[0] : null;
      if (!file) {
        setPhotoPreview(initialPhoto);
        return;
      }
      previewObjectUrl = URL.createObjectURL(file);
      setPhotoPreview(previewObjectUrl);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', function () {
      this.setCustomValidity('');
    });
  }

  form.addEventListener('submit', function (event) {
    if (emailInput && !/@ledgerworx\.me$/i.test(emailInput.value.trim())) {
      event.preventDefault();
      emailInput.setCustomValidity('Email must end with @ledgerworx.me.');
      emailInput.reportValidity();
      return;
    }

    const current = currentPassword ? currentPassword.value.trim() : '';
    const next = newPassword ? newPassword.value.trim() : '';
    const confirm = confirmPassword ? confirmPassword.value.trim() : '';
    const wantsPasswordChange = current !== '' || next !== '' || confirm !== '';

    if (wantsPasswordChange) {
      if (current === '' || next === '' || confirm === '') {
        event.preventDefault();
        alert('To change password, fill Current, New, and Confirm password fields.');
        return;
      }
      if (next.length < 8) {
        event.preventDefault();
        alert('New Password must be at least 8 characters.');
        return;
      }
      if (next !== confirm) {
        event.preventDefault();
        alert('New Password and Confirm Password do not match.');
      }
    }
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      form.reset();
      clearPreviewObjectUrl();
      setPhotoPreview(initialPhoto);
      if (emailInput) {
        emailInput.setCustomValidity('');
      }
    });
  }

  window.addEventListener('beforeunload', clearPreviewObjectUrl);
});

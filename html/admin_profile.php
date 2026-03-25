<?php include __DIR__ . '/../php/header.php'; ?>
<div class="profile-page">
  <div class="breadcrumb">Dashboard > Profile</div>

  <section class="profile-card" aria-labelledby="profileTitle">
    <div class="profile-header">
      <h2 id="profileTitle">Edit Profile</h2>
      <p>Update your admin details and account credentials.</p>
    </div>

    <?php if ($formSuccess !== ''): ?>
      <div class="alert success" role="status"><?php echo htmlspecialchars($formSuccess); ?></div>
    <?php endif; ?>

    <?php if (!empty($formErrors)): ?>
      <div class="alert error" role="alert">
        <strong>Please fix the following:</strong>
        <ul>
          <?php foreach ($formErrors as $error): ?>
            <li><?php echo htmlspecialchars($error); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <form id="adminProfileForm" class="profile-form" method="post" enctype="multipart/form-data" data-initial-photo="<?php echo htmlspecialchars((string)$profileData['profile_photo']); ?>">
      <div class="profile-layout">
        <aside class="photo-column">
          <div class="photo-preview <?php echo $profileData['profile_photo'] !== '' ? 'has-photo' : ''; ?>" id="profilePhotoPreview">
            <?php if ($profileData['profile_photo'] !== ''): ?>
              <img src="<?php echo htmlspecialchars((string)$profileData['profile_photo']); ?>" alt="Profile Photo" id="profilePhotoImage">
            <?php else: ?>
              <i class="fa-solid fa-user" aria-hidden="true"></i>
            <?php endif; ?>
          </div>

          <label for="profilePhoto" class="upload-btn">Choose Profile Photo</label>
          <input type="file" id="profilePhoto" name="profile_photo" accept=".jpg,.jpeg,.png,.webp,.gif,image/*">
          <small class="hint">Optional. JPG, PNG, WEBP, or GIF (max 2MB).</small>
        </aside>

        <div class="fields-column">
          <div class="form-grid">
            <div class="field">
              <label for="fullName">Full Name</label>
              <input type="text" id="fullName" name="full_name" value="<?php echo htmlspecialchars((string)$profileData['full_name']); ?>" required>
            </div>

            <div class="field">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" value="<?php echo htmlspecialchars((string)$profileData['username']); ?>" required>
            </div>

            <div class="field">
              <label for="officialEmail">Official Email (ledgerworx.me)</label>
              <input type="email" id="officialEmail" name="email" value="<?php echo htmlspecialchars((string)$profileData['email']); ?>" pattern="^[^@\s]+@ledgerworx\.me$" title="Email must end with @ledgerworx.me" required>
            </div>

            <div class="field">
              <label for="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phone" value="<?php echo htmlspecialchars((string)$profileData['phone']); ?>" required>
            </div>

            <div class="field">
              <label for="employeeId">Employee ID</label>
              <input type="text" id="employeeId" name="employee_id" value="<?php echo htmlspecialchars((string)$profileData['employee_id']); ?>" readonly>
            </div>

            <div class="field">
              <label for="department">Department</label>
              <input type="text" id="department" name="department" value="<?php echo htmlspecialchars((string)$profileData['department']); ?>" readonly>
            </div>

            <div class="field field-full">
              <label for="designation">Designation</label>
              <input type="text" id="designation" name="designation" value="<?php echo htmlspecialchars((string)$profileData['designation']); ?>" required>
            </div>
          </div>

          <div class="password-block">
            <h3>Change Password</h3>
            <p>Fill all three fields only when you want to update the password.</p>
            <div class="form-grid">
              <div class="field">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" name="current_password" autocomplete="current-password">
              </div>

              <div class="field">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" name="new_password" minlength="8" autocomplete="new-password">
              </div>

              <div class="field">
                <label for="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" name="confirm_password" minlength="8" autocomplete="new-password">
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn primary">Save</button>
            <button type="button" class="btn secondary" id="cancelProfileBtn">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </section>
</div>

<script src="../js/admin_profile.js?v=<?php echo filemtime(__DIR__ . '/../js/admin_profile.js'); ?>" defer></script>

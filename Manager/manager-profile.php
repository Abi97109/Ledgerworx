<?php
session_start();

$firstName = (string)($_SESSION['firstname'] ?? $_SESSION['first_name'] ?? 'Manager');
$lastName = (string)($_SESSION['lastname'] ?? $_SESSION['last_name'] ?? 'User');
$displayName = trim($firstName . ' ' . $lastName);
if ($displayName === '') {
    $displayName = (string)($_SESSION['username'] ?? 'Manager User');
}

$initials = strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1));
if ($initials === '') {
    $initials = strtoupper(substr($displayName, 0, 2));
}

$email = (string)($_SESSION['email'] ?? 'manager@ledgerworx.com');
$phone = (string)($_SESSION['phone'] ?? '+971 50 000 0000');
$city = (string)($_SESSION['city'] ?? 'Dubai');
$country = (string)($_SESSION['country'] ?? 'UAE');
$location = trim($city . ', ' . $country);
$avatarUrl = 'https://ui-avatars.com/api/?name=' . urlencode($displayName) . '&background=1f8f8b&color=fff&size=120';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LedgerWorx | Manager Profile</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="all-styles.css?v=20260307">
    <link rel="stylesheet" href="../Accountant/css/accountant-settings.css">
</head>
<body class="staff-profile-page">

<?php include __DIR__ . '/manager-navbar.php'; ?>

<div class="main">
    <div class="breadcrumb">
        <a href="manager-home.php"><i class="fas fa-home"></i> Home</a>
        <i class="fas fa-chevron-right"></i>
        <span>My Profile</span>
    </div>

    <div class="page-header">
        <h1>My Profile</h1>
        <button class="btn-primary" onclick="openEditProfileModal()"><i class="fas fa-user-edit"></i> Edit Profile</button>
    </div>

    <div class="profile-card">
        <img src="<?php echo htmlspecialchars($avatarUrl); ?>" alt="Profile" class="profile-avatar-large">
        <div class="profile-info-main">
            <h3><?php echo htmlspecialchars($displayName); ?></h3>
            <span class="role-badge">Manager</span>
            <div class="profile-meta">
                <div class="meta-item"><i class="fas fa-envelope"></i><span><?php echo htmlspecialchars($email); ?></span></div>
                <div class="meta-item"><i class="fas fa-phone"></i><span><?php echo htmlspecialchars($phone); ?></span></div>
                <div class="meta-item"><i class="fas fa-map-marker-alt"></i><span><?php echo htmlspecialchars($location); ?></span></div>
            </div>
        </div>
    </div>

    <div class="info-grid">
        <div class="info-card">
            <h4><i class="fas fa-briefcase"></i> Work Information</h4>
            <div class="info-row"><span class="info-label">Role</span><span class="info-value">Manager</span></div>
            <div class="info-row"><span class="info-label">Department</span><span class="info-value">Operations</span></div>
            <div class="info-row"><span class="info-label">Manager ID</span><span class="info-value">MG-<?php echo htmlspecialchars($initials); ?>-001</span></div>
            <div class="info-row"><span class="info-label">Status</span><span class="info-value" style="color: var(--success);">Active</span></div>
        </div>

        <div class="info-card">
            <h4><i class="fas fa-cog"></i> Preferences</h4>
            <div class="setting-item">
                <div class="setting-info"><h4>Dark Theme</h4><p>Toggle dark mode from the profile dropdown.</p></div>
                <div class="setting-action"><div class="toggle-switch active"></div></div>
            </div>
            <div class="setting-item">
                <div class="setting-info"><h4>Email Alerts</h4><p>Receive account and task alerts by email.</p></div>
                <div class="setting-action"><div class="toggle-switch active"></div></div>
            </div>
        </div>
    </div>

    <div class="settings-content" style="margin-top: 20px; min-height: auto;">
        <div class="section active">
            <div class="section-header">
                <h2><i class="fas fa-shield-alt"></i> Security & Account</h2>
                <a href="manager-settings.php" class="btn-secondary">Open Full Settings</a>
            </div>
            <div class="setting-item">
                <div class="setting-info"><h4>Password Management</h4><p>Update your password and security rules.</p></div>
                <div class="setting-action"><button class="btn-primary" onclick="openChangePasswordModal()">Change Password</button></div>
            </div>
            <div class="setting-item">
                <div class="setting-info"><h4>Session Management</h4><p>Review active devices and logout controls.</p></div>
                <div class="setting-action"><button class="btn-secondary">View Sessions</button></div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="editProfileModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2><i class="fas fa-user-edit"></i> Edit Profile</h2>
            <button class="close-modal" onclick="closeModal('editProfileModal')">&times;</button>
        </div>
        <form class="modal-body" onsubmit="saveProfile(event)">
            <div class="form-group"><label>Full Name</label><input type="text" value="<?php echo htmlspecialchars($displayName); ?>" required></div>
            <div class="form-group"><label>Email</label><input type="email" value="<?php echo htmlspecialchars($email); ?>" required></div>
            <div class="form-group"><label>Phone</label><input type="text" value="<?php echo htmlspecialchars($phone); ?>"></div>
            <div class="form-group"><label>Location</label><input type="text" value="<?php echo htmlspecialchars($location); ?>"></div>
            <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeModal('editProfileModal')">Cancel</button>
                <button type="submit" class="btn-primary">Save Changes</button>
            </div>
        </form>
    </div>
</div>

<div class="modal" id="changePasswordModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2><i class="fas fa-lock"></i> Change Password</h2>
            <button class="close-modal" onclick="closeModal('changePasswordModal')">&times;</button>
        </div>
        <form class="modal-body" onsubmit="changePassword(event)">
            <div class="form-group"><label>Current Password</label><input type="password" required></div>
            <div class="form-group"><label>New Password</label><input type="password" required></div>
            <div class="form-group"><label>Confirm Password</label><input type="password" required></div>
            <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeModal('changePasswordModal')">Cancel</button>
                <button type="submit" class="btn-primary">Update Password</button>
            </div>
        </form>
    </div>
</div>

<script src="all-scripts.js?v=20260307"></script>
<script>
function openEditProfileModal() {
    document.getElementById('editProfileModal').classList.add('active');
}

function openChangePasswordModal() {
    document.getElementById('changePasswordModal').classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

function saveProfile(event) {
    event.preventDefault();
    alert('Profile details updated successfully.');
    closeModal('editProfileModal');
}

function changePassword(event) {
    event.preventDefault();
    alert('Password updated successfully.');
    closeModal('changePasswordModal');
}
</script>
</body>
</html>



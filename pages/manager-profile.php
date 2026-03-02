<?php
// 1. Start session
session_start();

/**
 * 2. Robust Session Initialization 
 */
$_SESSION['username']  = $_SESSION['username']  ?? "zhenya_r";
$_SESSION['firstname'] = $_SESSION['firstname'] ?? "Zhenya";
$_SESSION['lastname']  = $_SESSION['lastname']  ?? "Ryszhuk";
$_SESSION['email']     = $_SESSION['email']     ?? "zhenyaryszhuk@gmail.com";
$_SESSION['phone']     = $_SESSION['phone']     ?? "587-556-998-02";
$_SESSION['city']      = $_SESSION['city']      ?? "Sanghui";
$_SESSION['state']     = $_SESSION['state']     ?? "Hallen";
$_SESSION['zip']       = $_SESSION['zip']       ?? "7789";
$_SESSION['country']   = $_SESSION['country']   ?? "China";
$_SESSION['profile_pic'] = $_SESSION['profile_pic'] ?? ""; 

// Generate dynamic initials safely
$initials = strtoupper(substr($_SESSION['firstname'], 0, 1) . substr($_SESSION['lastname'], 0, 1));

// 3. Handle Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION['username']  = $_POST['username']  ?? $_SESSION['username'];
    $_SESSION['firstname'] = $_POST['firstname'] ?? $_SESSION['firstname'];
    $_SESSION['lastname']  = $_POST['lastname']  ?? $_SESSION['lastname'];
    $_SESSION['email']     = $_POST['email']     ?? $_SESSION['email'];
    $_SESSION['phone']     = $_POST['phone']     ?? $_SESSION['phone'];
    $_SESSION['city']      = $_POST['city']      ?? $_SESSION['city'];
    $_SESSION['state']     = $_POST['state']     ?? $_SESSION['state'];
    $_SESSION['zip']       = $_POST['zip']       ?? $_SESSION['zip'];
    $_SESSION['country']   = $_POST['country']   ?? $_SESSION['country'];
    
    if (isset($_POST['avatar_data']) && !empty($_POST['avatar_data'])) {
        $_SESSION['profile_pic'] = $_POST['avatar_data'];
    }

    $show_message = true; 
    $initials = strtoupper(substr($_SESSION['firstname'], 0, 1) . substr($_SESSION['lastname'], 0, 1));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile | LedgerWorx</title>
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-profile">

    <nav class="navbar">
    <div class="nav-left">
        <div class="company">
            <a href="manager-home.php">
                <img src="logo.png" alt="LedgerWorx">
            </a>
        </div>
        <div class="nav-links-container">
            <a href="manager-home.php" class="nav-item">Home</a>
            <a href="manager-sales.php" class="nav-item">Sales</a>
            <a href="manager-accounts.php" class="nav-item">Accounts</a>
            <a href="manager-clients.php" class="nav-item">Clients</a>
            <a href="manager-reports.php" class="nav-item">Reports</a>
            <a href="manager-admin.php" class="nav-item">Admin</a>
            <a href="manager-settings.php" class="nav-item">Settings</a>
        </div>
    </div>
    <div class="nav-right">
        <a href="manager-profile.php" class="profile-nav-link">
            <div class="profile-info">
                <span class="profile-name"><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <span class="profile-role">Manager</span>
            </div>
            <div class="nav-avatar"><?php echo $initials; ?></div>
        </a>
    </div>
</nav>

    <div class="profile-card">
        <?php if(isset($show_message)): ?>
            <div class="alert">✓ Profile changes saved successfully!</div>
        <?php endif; ?>

        <h2 style="color: var(--text-main); margin-bottom: 30px; font-weight: 800;">Edit User Profile</h2>

        <div class="avatar-section">
            <div class="avatar-wrapper">
                <div class="avatar-circle">
                    <?php if (!empty($_SESSION['profile_pic'])): ?>
                        <img id="avatar-img" src="<?php echo $_SESSION['profile_pic']; ?>">
                    <?php else: ?>
                        <span id="avatar-initials"><?php echo $initials; ?></span>
                        <img id="avatar-img" src="" style="display:none;">
                    <?php endif; ?>
                </div>
                <label for="profile-upload" class="edit-badge">✎</label>
            </div>
            <input type="file" id="profile-upload" accept="image/*">
        </div>

        <form action="" method="POST" class="profile-form">
            <input type="hidden" name="avatar_data" id="avatar_data" value="<?php echo htmlspecialchars($_SESSION['profile_pic']); ?>">
            
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" value="<?php echo htmlspecialchars($_SESSION['username']); ?>">
            </div>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" name="firstname" value="<?php echo htmlspecialchars($_SESSION['firstname']); ?>">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" name="lastname" value="<?php echo htmlspecialchars($_SESSION['lastname']); ?>">
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value="<?php echo htmlspecialchars($_SESSION['email']); ?>">
            </div>
            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value="<?php echo htmlspecialchars($_SESSION['phone']); ?>">
            </div>
            <div class="form-group">
                <label>City</label>
                <input type="text" name="city" value="<?php echo htmlspecialchars($_SESSION['city']); ?>">
            </div>
            <div class="form-group">
                <label>State</label>
                <input type="text" name="state" value="<?php echo htmlspecialchars($_SESSION['state']); ?>">
            </div>
            <div class="form-group">
                <label>Zip Code</label>
                <input type="text" name="zip" value="<?php echo htmlspecialchars($_SESSION['zip']); ?>">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Country</label>
                <input type="text" name="country" value="<?php echo htmlspecialchars($_SESSION['country']); ?>">
            </div>

            <div class="btn-row">
                <a href="manager-home.php" class="btn btn-back">Discard Changes</a>
                <button type="submit" class="btn btn-save">Save Profile Changes</button>
            </div>
        </form>
    </div>

    
    <script src="all-scripts.js"></script>
</body>
</html>


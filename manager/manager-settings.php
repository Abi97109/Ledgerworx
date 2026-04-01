<?php
session_start();

/**
 * SESSION & IDENTITY SYNCHRONIZATION 
 * Preserving the full original logic for name handling and initials.
 */
$fName = (string)($_SESSION['firstname'] ?? $_SESSION['first_name'] ?? "");
$lName = (string)($_SESSION['lastname']  ?? $_SESSION['last_name']  ?? "");

// PERSISTENCE CHECK: Does the server remember 2FA being active?
$is2FAActive = isset($_SESSION['2fa_enabled']) && $_SESSION['2fa_enabled'] == true;
$verifiedOnce = isset($_SESSION['is_2fa_verified']) && $_SESSION['is_2fa_verified'] == true;

if (!empty($_SESSION['username'])) {
    $displayName = (string)$_SESSION['username'];
} elseif (!empty($fName) || !empty($lName)) {
    $displayName = trim($fName . " " . $lName);
} else {
    $displayName = "User-name";
}

// Full initials logic from original code
$initials = "UN";
if (!empty($fName) && !empty($lName)) {
    $initials = strtoupper(substr($fName, 0, 1) . substr($lName, 0, 1));
} elseif (!empty($displayName) && $displayName !== "User-name") {
    $initials = strtoupper(substr($displayName, 0, 2));
}
//include('header.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings | LedgerWorx</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="all-styles.css">
        <style>

        /* --- GLOBAL STYLES --- */
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; 
        }

        body { 
            background-color: var(--bg-light); 
            color: var(--text-navy); 
            line-height: 1.6; 
            overflow-x: hidden; 
        }

        /* --- HORIZONTAL NAVBAR --- */
        .navbar {
            background-color: var(--primary-teal);
            height: 75px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .logo-section img { 
            height: 60px; 
            transition: var(--transition); 
        }

        .logo-section img:hover { 
            transform: scale(1.05); 
        }
        
        .nav-links { 
            display: flex; 
            gap: 8px; 
        }

        .nav-item {
            color: rgba(255, 255, 255, 0.85);
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 16px;
            border-radius: 8px;
            transition: var(--transition);
        }

        .nav-item:hover {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .nav-item.active {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .user-profile-top { 
            display: flex; 
            align-items: center; 
            gap: 12px; 
        }

        .user-name { 
            font-weight: 700; 
            font-size: 14px; 
            color: white; 
        }

        .avatar-circle {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(255,255,255,0.25); 
            border: 2px solid rgba(255,255,255,0.5);
            display: flex;
            align-items: center;
            justify-content: center; 
            font-weight: 800;
            font-size: 14px;
            color: white;
        }

        /* --- CONTAINER & LAYOUT --- */
        .container { 
            max-width: 1200px; 
            margin: 40px auto; 
            padding: 0 20px; 
        }

        .page-header { 
            margin-bottom: 35px; 
        }

        .page-title { 
            font-size: 32px; 
            font-weight: 800; 
            color: var(--text-navy); 
            letter-spacing: -0.5px; 
        }

        .page-subtitle { 
            color: var(--text-grey); 
            font-size: 16px; 
            margin-top: 5px; 
        }

        .settings-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); 
            gap: 30px; 
            margin-top: 20px;
        }

        /* --- CARDS --- */
        .settings-card {
            background: white;
            padding: 30px;
            border-radius: 22px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border-color);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .settings-card:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 15px 35px rgba(0,0,0,0.06); 
        }

        .card-header { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            margin-bottom: 25px; 
        }

        .card-header h3 { 
            font-size: 20px; 
            font-weight: 700; 
        }
        
        .icon-box {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: #f1f5f9;
            color: var(--primary-teal);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .setting-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 0;
            border-bottom: 1px solid #f8fafc;
        }

        .setting-row:last-child { 
            border-bottom: none; 
        }
        
        .clickable-row { 
            cursor: pointer; 
            border-radius: 12px; 
            transition: all 0.2s ease; 
        }

        .clickable-row:hover { 
            background-color: #f8fafc; 
            padding-left: 10px; 
            padding-right: 10px; 
            margin-left: -10px; 
            margin-right: -10px; 
        }

        .setting-info span { 
            font-weight: 600; 
            font-size: 15px; 
            color: var(--text-navy); 
            display: block; 
        }

        .setting-info p { 
            font-size: 13px; 
            color: var(--text-grey); 
            margin-top: 2px; 
        }

        /* --- TOGGLE SWITCH --- */
        .switch { 
            position: relative; 
            display: inline-block; 
            width: 46px; 
            height: 24px; 
        }

        .switch input { 
            opacity: 0; 
            width: 0; 
            height: 0; 
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #e2e8f0;
            transition: .4s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider { 
            background-color: var(--primary-teal); 
        }

        input:checked + .slider:before { 
            transform: translateX(22px); 
        }

        /* --- MODALS --- */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(27, 37, 89, 0.5);
            backdrop-filter: blur(6px);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .modal-content { 
            background: white;
            width: 100%;
            max-width: 480px;
            padding: 40px; 
            border-radius: 28px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.2);
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp { 
            from { opacity: 0; transform: translateY(20px); } 
            to { opacity: 1; transform: translateY(0); } 
        }

        .modal-content h3 {
            margin-bottom: 10px;
            font-weight: 800;
            color: var(--text-navy);
        }

        .input-group { 
            margin-bottom: 20px; 
        }

        .input-group label { 
            display: block; 
            font-size: 12px; 
            font-weight: 700; 
            color: var(--text-grey); 
            text-transform: uppercase; 
            margin-bottom: 8px; 
        }

        .input-group input { 
            width: 100%; 
            padding: 14px; 
            border-radius: 12px; 
            border: 1px solid #e2e8f0; 
            outline: none; 
            font-size: 15px; 
        }

        .input-group input:focus { 
            border-color: var(--primary-teal); 
        }
        
        .verify-banner { 
            background: #f0f7f6; 
            padding: 18px; 
            border-radius: 15px; 
            margin-bottom: 25px; 
            border-left: 5px solid var(--primary-teal); 
        }
        
        .modal-btns { 
            display: flex; 
            gap: 12px; 
            margin-top: 10px; 
        }

        .btn { 
            flex: 1; 
            padding: 14px; 
            border-radius: 14px; 
            border: none; 
            font-weight: 700; 
            cursor: pointer; 
            transition: 0.3s; 
        }

        .btn-save { 
            background: var(--primary-teal); 
            color: white; 
        }

        .btn-cancel { 
            background: #f1f5f9; 
            color: var(--text-navy); 
        }

    </style>
</head>
<body class="page-settings">

    <div class="modal-overlay" id="setup2FAModal">
        <div class="modal-content">
            <h3>Account Protection</h3>
            <p style="color: var(--text-grey); margin-bottom: 25px;">Please enter the 6-digit code sent to your email to verify and enable 2-Step Authentication.</p>
            <div class="input-group">
                <label>Verification Code</label>
                <input type="text" maxlength="6" id="authCode" placeholder="000000" style="text-align: center; font-size: 24px; letter-spacing: 6px;">
            </div>
            <div class="modal-btns">
                <button class="btn btn-cancel" onclick="closeSetupModal()">Cancel</button>
                <button class="btn btn-save" onclick="authorize2FA()">Verify Code</button>
            </div>
        </div>
    </div>

    <div class="modal-overlay" id="passwordModal">
        <div class="modal-content">
            <h3>Update Password</h3>
            <form action="update-password-logic.php" method="POST">
                <div id="pass2FASect" style="display: none;" class="verify-banner">
                    <div class="input-group" style="margin-bottom: 0;">
                        <label><i class="fa-solid fa-shield-check"></i> Security Code Required</label>
                        <input type="text" name="update_verify_code" placeholder="Enter 6-digit code">
                    </div>
                </div>
                <div class="input-group">
                    <label>Current Password</label>
                    <input type="password" name="old_pass" required>
                </div>
                <div class="input-group">
                    <label>New Password</label>
                    <input type="password" name="new_pass" required>
                </div>
                <div class="modal-btns">
                    <button type="button" class="btn btn-cancel" onclick="closePassModal()">Cancel</button>
                    <button type="submit" class="btn btn-save">Save Changes</button>
                </div>
            </form>
        </div>
    </div>

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
            <a href="manager-settings.php" class="nav-item active">Settings</a>
        </div>
    </div>
    <div class="nav-right">
        <a href="manager-profile.php" class="profile-nav-link">
            <div class="profile-info">
                <span class="profile-name"><?php echo htmlspecialchars($displayName); ?></span>
                <span class="profile-role">Manager</span>
            </div>
            <div class="nav-avatar"><?php echo $initials; ?></div>
        </a>
    </div>
</nav>

    <div class="container">
        <div class="page-header">
            <h1 class="page-title">Settings</h1>
            <p class="page-subtitle">Configure your security preferences and account defaults.</p>
        </div>

        <div class="settings-grid">
            
            <div class="settings-card">
                <div class="card-header">
                    <div class="icon-box"><i class="fa-solid fa-lock"></i></div>
                    <h3>Security</h3>
                </div>
                <div class="setting-row clickable-row" onclick="openPassModal()">
                    <div class="setting-info">
                        <span>Update Password</span>
                        <p>Last changed 30 days ago</p>
                    </div>
                    <i class="fa-solid fa-chevron-right" style="color: var(--text-grey);"></i>
                </div>
                <div class="setting-row">
                    <div class="setting-info">
                        <span>2-Step Verification</span>
                        <p>Secure your login attempts</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="twoStepToggle" onchange="handleToggle(this)" <?php echo $is2FAActive ? 'checked' : ''; ?>>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="settings-card">
                <div class="card-header">
                    <div class="icon-box"><i class="fa-solid fa-bell"></i></div>
                    <h3>Notifications</h3>
                </div>
                <div class="setting-row">
                    <div class="setting-info">
                        <span>Email Summaries</span>
                        <p>Daily performance reports</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting-row">
                    <div class="setting-info">
                        <span>Alerts</span>
                        <p>System security warnings</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="settings-card">
                <div class="card-header">
                    <div class="icon-box"><i class="fa-solid fa-database"></i></div>
                    <h3>Data Management</h3>
                </div>
                <div class="setting-row clickable-row">
                    <div class="setting-info">
                        <span>Export Activity</span>
                        <p>Download logs as CSV</p>
                    </div>
                    <i class="fa-solid fa-download" style="color: var(--text-grey);"></i>
                </div>
                <div class="setting-row clickable-row">
                    <div class="setting-info">
                        <span>Clear Cache</span>
                        <p>Optimize application speed</p>
                    </div>
                    <i class="fa-solid fa-trash-can" style="color: var(--text-grey);"></i>
                </div>
            </div>

        </div>
    </div>

    
    <script src="all-scripts.js"></script>
</body>
</html>


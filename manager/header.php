<link rel="stylesheet" href="all-styles.css">
<?php
// Shared Logic: This runs on every page that includes this file
$fName = $_SESSION['firstname'] ?? "User";
$lName = $_SESSION['lastname'] ?? "";
$username = $_SESSION['username'] ?? "Manager";
$initials = strtoupper(substr($fName, 0, 1) . substr($lName, 0, 1));
if(empty($initials)) { $initials = strtoupper(substr($username, 0, 2)); }
?>

<nav class="top-nav">
    <div class="logo">
        <img class="logo-img" src="logo.png" alt="LedgerWorx">
    </div>
    
    <div class="nav-right">
        <a href="manager-profile.php" class="profile-link">
            <div class="profile-text">
                <div class="profile-name"><?php echo htmlspecialchars($username); ?></div>
                <div class="profile-role">Account Manager</div>
            </div>
            <div class="avatar">
                <?php echo $initials; ?>
            </div>
        </a>

        <a href="logout.php" class="logout-btn">
            Logout
        </a>
    </div>
</nav>
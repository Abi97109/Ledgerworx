<?php
session_start();

// This logic simulates a database check. 
// When the user clicks "Login", it populates the session with their info.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION['username']  = $_POST['user_input'];
    $_SESSION['firstname'] = $_POST['first_input'];
    $_SESSION['lastname']  = $_POST['last_input'];
    $_SESSION['email']     = $_POST['user_input'] . "@ledgerworx.com";
    
    // Redirect to the Home Dashboard after login
    header("Location: manager-home.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login | LedgerWorx</title>
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-login">
    <div class="login-card">
        <h2>Welcome Back</h2>
        <form method="POST">
            <input type="text" name="user_input" placeholder="Username" required>
            <input type="text" name="first_input" placeholder="First Name" required>
            <input type="text" name="last_input" placeholder="Last Name" required>
            <button type="submit">Log In</button>
        </form>
    </div>
    <script src="all-scripts.js"></script>
</body>
</html>

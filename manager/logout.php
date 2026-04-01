<?php
session_start();
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-logout">
    <div class="box">
        <h1>Logged Out</h1>
        <p>You have been logged out. Please log back in to continue.</p>
        <a href="login.php" class="btn">Log Back In</a>
    </div>
    <script src="all-scripts.js"></script>
</body>
</html>

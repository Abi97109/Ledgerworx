<?php
session_start();
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="all-styles.css?v=20260307">
</head>
<body class="page-logout">
    <div class="box">
        <h1>Logged Out</h1>
        <p>You have been logged out. Please log back in to continue.</p>
        <a href="login.php" class="btn">Log Back In</a>
    </div>
    <script src="all-scripts.js?v=20260307"></script>
</body>
</html>



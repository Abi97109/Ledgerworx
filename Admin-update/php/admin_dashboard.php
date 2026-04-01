<?php
// Start session (for future login system)
session_start();

// Example admin name (later you can use $_SESSION['username'])
$adminName = "Admin";
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">

  <link rel="stylesheet" href="../css/admin_dashboard.css">
  <link rel="stylesheet" href="../css/admin_theme.css?v=<?php echo filemtime(__DIR__ . '/../css/admin_theme.css'); ?>">
</head>

<body>
<?php include __DIR__ . '/../html/admin_dashboard.php'; ?>
</body>
</html>



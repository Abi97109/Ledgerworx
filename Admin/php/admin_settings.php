<?php
session_start();

// Replace later with: $_SESSION['username']
$adminName = "Admin";
$currentRole = $_SESSION['role'] ?? 'Admin';
$isAdmin = strtolower((string)$currentRole) === 'admin';
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx – Settings</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <link rel="stylesheet" href="../css/admin_settings.css">
  <meta name="is-admin-user" content="<?php echo $isAdmin ? '1' : '0'; ?>">
</head>

<body>
<?php include __DIR__ . '/../html/admin_settings.php'; ?>
</body>
</html>



<?php
session_start();
$adminName = isset($_SESSION['username']) ? $_SESSION['username'] : 'Admin';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>LedgerWorx - Edit Profile</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">
  <link rel="stylesheet" href="../css/admin_profile.css">
  <link rel="stylesheet" href="../css/admin_theme.css?v=<?php echo filemtime(__DIR__ . '/../css/admin_theme.css'); ?>">
</head>
<body>
<?php include __DIR__ . '/../html/admin_profile.php'; ?>
</body>
</html>



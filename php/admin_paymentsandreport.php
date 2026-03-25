<?php
session_start();

// Later replace with: $_SESSION['username']
$adminName = "Admin";
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx – Payments & Reports</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <link rel="stylesheet" href="../css/admin_paymentsandreport.css?v=<?php echo filemtime(__DIR__ . '/../css/admin_paymentsandreport.css'); ?>">
  <link rel="stylesheet" href="../css/admin_theme.css?v=<?php echo filemtime(__DIR__ . '/../css/admin_theme.css'); ?>">
</head>

<body>
<?php include __DIR__ . '/../html/admin_paymentsandreport.php'; ?>
</body>
</html>



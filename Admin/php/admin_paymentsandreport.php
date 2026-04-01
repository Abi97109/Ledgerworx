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

  <link rel="stylesheet" href="../css/admin_paymentsandreport.css">
</head>

<body>
<?php include __DIR__ . '/../html/admin_paymentsandreport.php'; ?>
</body>
</html>



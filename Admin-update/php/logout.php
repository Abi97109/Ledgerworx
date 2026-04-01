<?php
// Simple logout placeholder: destroy session and show message
session_start();
session_unset();
session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Logged out</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/logout.css">
</head>
<body>
<?php include __DIR__ . '/../html/logout.php'; ?>
</body>
</html>



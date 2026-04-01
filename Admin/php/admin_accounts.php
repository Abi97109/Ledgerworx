<?php
session_start();
$adminName = "Admin";

// Data taken from the supplied screenshot
$kpis = [
  ['count'=>45,'title'=>'Total Revenue (AED)','amount'=>'AED 1,250,000','meta'=>'4 Packages created'],
  ['count'=>'90,000','title'=>'Pending Payments','amount'=>'AED 90,000','meta'=>'320 Payments'],
  ['count'=>320,'title'=>'Total Invoices','amount'=>'320','meta'=>'881 Invoices'],
  ['count'=>'45,000','title'=>'Overdue Invoices','amount'=>'AED 45,000','meta'=>'13 Packages created']
];

$invoices = [
  ['inv'=>'INV-1024','company'=>'Bright Tech','package'=>'Standard','amount'=>'AED 20,000','status'=>'Paid'],
  ['inv'=>'INV-1025','company'=>'Emirates Logistics','package'=>'Premium','amount'=>'AED 30,000','status'=>'Pending'],
  ['inv'=>'INV-1026','company'=>'Nova Healthcare','package'=>'Basic','amount'=>'AED 10,000','status'=>'Overdue'],
  ['inv'=>'INV-1025','company'=>'Simran Kohli','package'=>'Basic','amount'=>'AED 10,000','status'=>'Pending']
];

$payments = [
  ['id'=>'PAY-7781','inv'=>'INV-1024','method'=>'Bank Transfer','amount'=>'AED 20,000','state'=>'Verified'],
  ['id'=>'PAY-7782','inv'=>'INV-1024','method'=>'Online','amount'=>'AED 0','state'=>'Unverified']
];

$salespeople = [
  ['name'=>'Rahul Sharma','target'=>20,'achieved'=>18,'salary'=>'AED 5,000'],
  ['name'=>'Neha Patel','target'=>15,'achieved'=>15,'salary'=>'AED 5,000']
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx – Accounts Department</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">
  <link rel="stylesheet" href="../css/admin_accounts.css">
</head>
<body>
<?php include __DIR__ . '/../html/admin_accounts.php'; ?>
</body>
</html>



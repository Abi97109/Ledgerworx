<?php
session_start();
$adminName = "Admin";

// Sample data for demonstration
$statsData = [
    'totalSales' => 'AED 1,250,000',
    'outstanding' => 'AED 450,000',
    'total' => '75',
    'targets' => '50+'
];

$invoices = [
    ['no' => 'INV-1024', 'company' => 'Bright Tech', 'package' => 'Standard', 'amount' => 'AED 20,000', 'dueDate' => '10-May', 'status' => 'Paid'],
    ['no' => 'INV-1025', 'company' => 'Neha Patel', 'package' => 'Premium', 'amount' => 'AED 30,000', 'dueDate' => '15-May', 'status' => 'Pending'],
    ['no' => 'INV-1026', 'company' => 'Amit Verma', 'package' => 'Basic', 'amount' => 'AED 10,000', 'dueDate' => '05-May', 'status' => 'Overdue'],
    ['no' => 'INV-1027', 'company' => 'Simran Kohli', 'package' => 'Client', 'amount' => 'AED 50,000', 'dueDate' => '05-May', 'status' => 'Pending'],
    ['no' => 'INV-1028', 'company' => 'Desert Holdings', 'package' => 'Premium', 'amount' => 'AED 25,000', 'dueDate' => '12-May', 'status' => 'Paid'],
    ['no' => 'INV-1029', 'company' => 'Gulf Star LLC', 'package' => 'Standard', 'amount' => 'AED 15,000', 'dueDate' => '08-May', 'status' => 'Paid'],
    ['no' => 'INV-1030', 'company' => 'Tech Solutions', 'package' => 'Basic', 'amount' => 'AED 12,000', 'dueDate' => '20-May', 'status' => 'Pending'],
    ['no' => 'INV-1031', 'company' => 'Global Enterprises', 'package' => 'Client', 'amount' => 'AED 45,000', 'dueDate' => '18-May', 'status' => 'Overdue'],
    ['no' => 'INV-1032', 'company' => 'Metro Corp', 'package' => 'Premium', 'amount' => 'AED 35,000', 'dueDate' => '16-May', 'status' => 'Pending'],
    ['no' => 'INV-1033', 'company' => 'XYZ Solutions', 'package' => 'Standard', 'amount' => 'AED 22,000', 'dueDate' => '14-May', 'status' => 'Paid'],
    ['no' => 'INV-1034', 'company' => 'TechFlow Inc', 'package' => 'Basic', 'amount' => 'AED 11,000', 'dueDate' => '09-May', 'status' => 'Pending'],
    ['no' => 'INV-1035', 'company' => 'Digital Minds', 'package' => 'Client', 'amount' => 'AED 48,000', 'dueDate' => '22-May', 'status' => 'Pending'],
    ['no' => 'INV-1036', 'company' => 'Innovation Labs', 'package' => 'Premium', 'amount' => 'AED 32,000', 'dueDate' => '11-May', 'status' => 'Paid'],
    ['no' => 'INV-1037', 'company' => 'Smart Industries', 'package' => 'Standard', 'amount' => 'AED 18,000', 'dueDate' => '19-May', 'status' => 'Overdue'],
    ['no' => 'INV-1038', 'company' => 'Future Systems', 'package' => 'Basic', 'amount' => 'AED 13,000', 'dueDate' => '07-May', 'status' => 'Paid'],
    ['no' => 'INV-1039', 'company' => 'Quantum Tech', 'package' => 'Client', 'amount' => 'AED 52,000', 'dueDate' => '25-May', 'status' => 'Pending'],
    ['no' => 'INV-1040', 'company' => 'Nexus Corp', 'package' => 'Premium', 'amount' => 'AED 28,000', 'dueDate' => '13-May', 'status' => 'Paid'],
    ['no' => 'INV-1041', 'company' => 'Cloud Dynamics', 'package' => 'Standard', 'amount' => 'AED 21,000', 'dueDate' => '17-May', 'status' => 'Pending'],
    ['no' => 'INV-1042', 'company' => 'Vertex Solutions', 'package' => 'Basic', 'amount' => 'AED 14,000', 'dueDate' => '06-May', 'status' => 'Overdue'],
    ['no' => 'INV-1043', 'company' => 'Alpha Enterprises', 'package' => 'Client', 'amount' => 'AED 55,000', 'dueDate' => '24-May', 'status' => 'Pending'],
    ['no' => 'INV-1044', 'company' => 'Beta Industries', 'package' => 'Premium', 'amount' => 'AED 31,000', 'dueDate' => '21-May', 'status' => 'Paid']
];

$salespersons = [
    ['name' => 'Rahul Sharma', 'email' => 'rahul@sales.com', 'target' => '20', 'sold' => '9', 'achieved' => '21', 'action' => 'View'],
    ['name' => 'Neha Patel', 'email' => 'neha@sales.com', 'target' => '15', 'sold' => '7', 'achieved' => '15', 'action' => 'Remind'],
    ['name' => 'Amit Verma', 'email' => 'amit@sales.com', 'target' => '10', 'sold' => '5', 'achieved' => '12', 'action' => 'View'],
    ['name' => 'Simran Kohli', 'email' => 'simran@sales.com', 'target' => '5', 'sold' => '3', 'achieved' => '60', 'action' => 'View']
];

$payrollData = [
    ['name' => 'Rahul', 'target' => '9/21', 'achieved' => 'AED 5,000', 'salary' => 'AED 11,500'],
    ['name' => 'Neha', 'target' => '7/15', 'achieved' => 'AED 5,000', 'salary' => 'AED 10,000'],
    ['name' => 'Amit', 'target' => '5/12', 'achieved' => 'AED 5,000', 'salary' => 'AED 7,000'],
    ['name' => 'Simran', 'target' => '3/6', 'achieved' => 'AED 5,000', 'salary' => 'AED 5,000']
];

$statusOptions = ['Paid', 'Pending', 'Overdue'];
$companyOptions = array_values(array_unique(array_map(function($invoice) {
    return $invoice['company'];
}, $invoices)));
sort($companyOptions);

$statusFilter = isset($_GET['status']) ? trim((string)$_GET['status']) : 'All Statuses';
$companyFilter = isset($_GET['company']) ? trim((string)$_GET['company']) : 'All Companies';

$filteredInvoices = array_values(array_filter($invoices, function($invoice) use ($statusFilter, $companyFilter) {
    $statusMatch = ($statusFilter === 'All Statuses') || (strcasecmp($invoice['status'], $statusFilter) === 0);
    $companyMatch = ($companyFilter === 'All Companies') || (strcasecmp($invoice['company'], $companyFilter) === 0);
    return $statusMatch && $companyMatch;
}));
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx – Sales</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">
  <link rel="stylesheet" href="../css/admin_sales.css">
</head>
<body>
<?php include __DIR__ . '/../html/admin_sales.php'; ?>
</body>
</html>



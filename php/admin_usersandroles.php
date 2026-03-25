<?php
session_start();

// Replace later with database or session
$adminName = "Admin";

// sample users containing the fields shown on the add form
$users = [
    [
        'full_name'   => 'System Administrator',
        'email'       => 'admin@ledgerworx.me',
        'phone'       => '9988776655',
        'department'  => 'Admin',
        'designation' => 'Administrator',
        'status'      => 'Active',
        'role'        => 'Admin',
        'role_class'  => 'admin-role',
        'last_online' => 'Online now'
    ],
    [
        'full_name'   => 'Rahul Sharma',
        'email'       => 'rahul@ledgerworx.me',
        'phone'       => '9123456780',
        'department'  => 'Sales',
        'designation' => 'Sales Executive',
        'status'      => 'Active',
        'role'        => 'Salesperson',
        'role_class'  => 'sales',
        'last_online' => '5 min ago'
    ],
    [
        'full_name'   => 'Priya Agarwal',
        'email'       => 'priya@ledgerworx.me',
        'phone'       => '9234567890',
        'department'  => 'Accounts',
        'designation' => 'Accountant',
        'status'      => 'Active',
        'role'        => 'Accountant',
        'role_class'  => 'accountant',
        'last_online' => '1 hour ago'
    ],
    [
        'full_name'   => 'Rohit Verma',
        'email'       => 'rohit.mgr@ledgerworx.me',
        'phone'       => '9345678901',
        'department'  => 'Management',
        'designation' => 'Manager',
        'status'      => 'Active',
        'role'        => 'Manager',
        'role_class'  => 'manager',
        'last_online' => 'Yesterday'
    ],
    [
        'full_name'   => 'Anand Kapoor',
        'email'       => 'anand.client@ledgerworx.me',
        'phone'       => '9456789012',
        'department'  => 'Client',
        'designation' => 'Client',
        'status'      => 'Active',
        'role'        => 'Client',
        'role_class'  => 'client',
        'last_online' => '2 days ago'
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx – Users & Roles</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/header.css">

  <link rel="stylesheet" href="../css/admin_usersandroles.css?v=<?php echo filemtime(__DIR__ . '/../css/admin_usersandroles.css'); ?>">
  <link rel="stylesheet" href="../css/admin_theme.css?v=<?php echo filemtime(__DIR__ . '/../css/admin_theme.css'); ?>">
</head>

<body>
<?php include __DIR__ . '/../html/admin_usersandroles.php'; ?>
</body>
</html>



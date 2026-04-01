<?php
session_start();

$defaults = [
    'full_name' => 'System Administrator',
    'username' => isset($_SESSION['username']) && $_SESSION['username'] !== '' ? $_SESSION['username'] : 'Admin',
    'email' => 'admin@ledgerworx.me',
    'phone' => '9988776655',
    'employee_id' => 'LW-ADM-001',
    'department' => 'Admin',
    'designation' => 'Administrator',
    'profile_photo' => ''
];

if (!isset($_SESSION['admin_profile']) || !is_array($_SESSION['admin_profile'])) {
    $_SESSION['admin_profile'] = $defaults;
} else {
    $_SESSION['admin_profile'] = array_merge($defaults, $_SESSION['admin_profile']);
}

$profileData = $_SESSION['admin_profile'];
$formErrors = [];
$formSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = trim((string)($_POST['full_name'] ?? ''));
    $username = trim((string)($_POST['username'] ?? ''));
    $email = trim((string)($_POST['email'] ?? ''));
    $phone = trim((string)($_POST['phone'] ?? ''));
    $designation = trim((string)($_POST['designation'] ?? ''));

    $currentPassword = (string)($_POST['current_password'] ?? '');
    $newPassword = (string)($_POST['new_password'] ?? '');
    $confirmPassword = (string)($_POST['confirm_password'] ?? '');

    if ($fullName === '') {
        $formErrors[] = 'Full Name is required.';
    }

    if ($username === '') {
        $formErrors[] = 'Username is required.';
    }

    if ($email === '') {
        $formErrors[] = 'Official Email is required.';
    } elseif (!preg_match('/^[^@\s]+@ledgerworx\.me$/i', $email)) {
        $formErrors[] = 'Official Email must end with @ledgerworx.me.';
    }

    if ($phone === '') {
        $formErrors[] = 'Phone Number is required.';
    } else {
        $phoneDigits = preg_replace('/\D+/', '', $phone);
        if ($phoneDigits === null || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15) {
            $formErrors[] = 'Phone Number must contain 10 to 15 digits.';
        }
    }

    if ($designation === '') {
        $formErrors[] = 'Designation is required.';
    }

    $isPasswordChangeRequested = $currentPassword !== '' || $newPassword !== '' || $confirmPassword !== '';
    if ($isPasswordChangeRequested) {
        if ($currentPassword === '' || $newPassword === '' || $confirmPassword === '') {
            $formErrors[] = 'To change password, fill Current, New, and Confirm password fields.';
        } elseif (strlen($newPassword) < 8) {
            $formErrors[] = 'New Password must be at least 8 characters.';
        } elseif ($newPassword !== $confirmPassword) {
            $formErrors[] = 'New Password and Confirm Password do not match.';
        }
    }

    $profilePhotoPath = $profileData['profile_photo'];
    if (isset($_FILES['profile_photo']) && (int)($_FILES['profile_photo']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $uploadError = (int)$_FILES['profile_photo']['error'];
        if ($uploadError !== UPLOAD_ERR_OK) {
            $formErrors[] = 'Profile Photo upload failed. Please try again.';
        } else {
            $tmpPath = (string)$_FILES['profile_photo']['tmp_name'];
            $size = (int)$_FILES['profile_photo']['size'];
            $originalName = (string)$_FILES['profile_photo']['name'];

            if (!is_uploaded_file($tmpPath)) {
                $formErrors[] = 'Invalid Profile Photo upload.';
            }

            $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
            $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

            if (!in_array($extension, $allowedExtensions, true)) {
                $formErrors[] = 'Profile Photo must be JPG, JPEG, PNG, WEBP, or GIF.';
            }

            if ($size > 2 * 1024 * 1024) {
                $formErrors[] = 'Profile Photo must be 2MB or smaller.';
            }

            $allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            $mimeType = '';
            if (function_exists('finfo_open')) {
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
                $mimeType = $finfo ? (string)finfo_file($finfo, $tmpPath) : '';
                if ($finfo) {
                    finfo_close($finfo);
                }
            }
            if ($mimeType !== '' && !in_array($mimeType, $allowedMime, true)) {
                $formErrors[] = 'Profile Photo file type is not supported.';
            }

            if (empty($formErrors)) {
                $uploadDir = __DIR__ . '/../assets/uploads/profile';
                $uploadDirWeb = '../assets/uploads/profile';

                if (!is_dir($uploadDir) && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
                    $formErrors[] = 'Unable to create upload directory for Profile Photo.';
                } else {
                    $newFileName = 'admin_' . str_replace('.', '', uniqid('', true)) . '.' . $extension;
                    $targetPath = $uploadDir . '/' . $newFileName;
                    if (!move_uploaded_file($tmpPath, $targetPath)) {
                        $formErrors[] = 'Unable to save Profile Photo.';
                    } else {
                        $profilePhotoPath = $uploadDirWeb . '/' . $newFileName;
                    }
                }
            }
        }
    }

    if (empty($formErrors)) {
        $_SESSION['admin_profile'] = [
            'full_name' => $fullName,
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
            'employee_id' => $profileData['employee_id'],
            'department' => $profileData['department'],
            'designation' => $designation,
            'profile_photo' => $profilePhotoPath
        ];

        if ($isPasswordChangeRequested) {
            $_SESSION['admin_password'] = $newPassword;
        }

        $_SESSION['username'] = $username;
        $profileData = $_SESSION['admin_profile'];
        $formSuccess = 'Profile updated successfully.';
    } else {
        $profileData['full_name'] = $fullName;
        $profileData['username'] = $username;
        $profileData['email'] = $email;
        $profileData['phone'] = $phone;
        $profileData['designation'] = $designation;
    }
}

$adminName = $profileData['username'] !== '' ? $profileData['username'] : 'Admin';
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



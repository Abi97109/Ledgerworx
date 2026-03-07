<?php
$pageTitle = "Task Details";
$userData = [
    'name' => 'Santiago Morales',
    'role' => 'Senior Accountant',
    'image' => 'user-profile.jpg',
    'email' => 'santiago@ledgerworx.com'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | <?php echo $pageTitle; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="../css/accountant-tasks-details.css">
</head>
<body>
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand"><img src="../assets/logowhite.png" class="logo-zoom" alt="Logo"></div>
    <div class="nav-links">
      <a href="accountant-dash.php"><i class="fa-solid fa-chart-column"></i> Dashboard</a>
      <a href="accountant-client.php"><i class="fa-solid fa-users"></i> Clients</a>
      <a href="accountant-tasks.php"><i class="fa-solid fa-list-check"></i> Tasks</a>
      <a href="accountant-payment.php"><i class="fa-solid fa-credit-card"></i> Payments</a>
      <a href="accountant-payroll.php"><i class="fa-solid fa-money-bill-wave"></i> Payroll</a>
      <a href="accountant-invoices.php"><i class="fa-solid fa-file-invoice"></i> Invoices</a>
</div>
  </div>
  <div class="nav-right">
    <div class="user-profile" id="userProfile">
      <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
      <div class="user-info">
        <div class="user-name"><?php echo $userData['name']; ?></div>
        <div class="user-role"><?php echo $userData['role']; ?></div>
      </div>
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </div>
  </div>
</div>
<!-- PROFILE DROPDOWN -->
<div class="profile-dropdown" id="profileDropdown">
  <div class="dropdown-header">
    <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
    <h4><?php echo $userData['name']; ?></h4>
    <p><?php echo $userData['role']; ?></p>
    <p style="font-size: 12px; opacity: 0.8;"><?php echo $userData['email']; ?></p>
  </div>
  <div class="dropdown-body">
    <a href="accountant-profile.php" class="dropdown-item">
      <i class="fas fa-user"></i>
      <span>My Profile</span>
    </a>
    <a href="accountant-settings.php" class="dropdown-item">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </a>
    <div class="dropdown-divider"></div>
    <div class="theme-toggle" id="themeToggle">
      <div class="theme-toggle-label">
        <i class="fas fa-moon" id="themeIcon"></i>
        <span id="themeText">Dark Mode</span>
      </div>
      <div class="toggle-switch" id="toggleSwitch"></div>
    </div>
    <div class="dropdown-divider"></div>
    <a href="accountant-help.php" class="dropdown-item">
      <i class="fas fa-question-circle"></i>
      <span>Help & Support</span>
    </a>
    <div class="dropdown-divider"></div>
    <a href="logout.php" class="dropdown-item" style="color: var(--danger);">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </a>
  </div>
</div>

<div class="main">
  <a href="tasks.php" class="back-button">
    <i class="fas fa-arrow-left"></i>
    Back to Tasks
  </a>
  
  <div class="task-header-card">
    <div class="task-header-top">
      <div class="task-title-section">
        <div class="task-icon-large blue" id="taskIcon">
          <i class="fas fa-file-invoice"></i>
        </div>
        <h1 class="task-title" id="taskTitle">Validate VAT Report</h1>
        <p class="task-subtitle" id="taskSubtitle">TechCorp Ltd</p>
      </div>
      <div class="action-buttons">
        <button class="btn-primary" onclick="updateStatus()">
          <i class="fas fa-check"></i>
          Mark Complete
        </button>
        <button class="btn-secondary" onclick="editTask()">
          <i class="fas fa-edit"></i>
          Edit Task
        </button>
      </div>
    </div>
    
    <div class="status-priority-row">
      <span class="status-badge completed" id="statusBadge">
        <i class="fas fa-check-circle"></i>
        <span id="statusText">Completed</span>
      </span>
      <span class="priority-badge high" id="priorityBadge">
        <i class="fas fa-exclamation-circle"></i>
        <span id="priorityText">High Priority</span>
      </span>
    </div>
    
    <div class="progress-section">
      <div class="progress-label">
        <span>Task Progress</span>
        <span id="progressPercent">100%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill" style="width: 100%;"></div>
      </div>
    </div>
  </div>

  <div class="two-column-grid">
    <div>
      <div class="detail-section" style="margin-bottom: 24px;">
        <h2 class="section-title">
          <i class="fas fa-info-circle"></i>
          Task Details
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Task ID</div>
            <div class="info-value" id="taskId">TASK-001</div>
          </div>
          <div class="info-item">
            <div class="info-label">Client</div>
            <div class="info-value" id="clientName">TechCorp Ltd</div>
          </div>
          <div class="info-item">
            <div class="info-label">Due Date</div>
            <div class="info-value" id="dueDate">May 2, 2024</div>
          </div>
          <div class="info-item">
            <div class="info-label">Assigned To</div>
            <div class="info-value" id="assignedTo">Santiago Morales</div>
          </div>
          <div class="info-item">
            <div class="info-label">Created Date</div>
            <div class="info-value" id="createdDate">April 15, 2024</div>
          </div>
          <div class="info-item">
            <div class="info-label">Completed Date</div>
            <div class="info-value" id="completedDate">May 1, 2024</div>
          </div>
        </div>
      </div>

      <div class="detail-section" style="margin-bottom: 24px;">
        <h2 class="section-title">
          <i class="fas fa-align-left"></i>
          Description
        </h2>
        <p class="description-text" id="taskDescription">
          Review and validate the monthly VAT report for TechCorp Ltd. Ensure all transactions are properly categorized, tax calculations are accurate, and documentation is complete. Submit the validated report to the client for approval before filing with the tax authority.
        </p>
      </div>

      <div class="detail-section">
        <h2 class="section-title">
          <i class="fas fa-paperclip"></i>
          Attachments
        </h2>
        <div class="attachments-list" id="attachmentsList">
          <div class="attachment-item">
            <div class="attachment-icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div class="attachment-info">
              <div class="attachment-name">VAT_Report_April_2024.pdf</div>
              <div class="attachment-meta">2.4 MB • Uploaded on April 28, 2024</div>
            </div>
            <button class="attachment-download" onclick="downloadFile('VAT_Report_April_2024.pdf')">
              <i class="fas fa-download"></i>
            </button>
          </div>
          <div class="attachment-item">
            <div class="attachment-icon">
              <i class="fas fa-file-excel"></i>
            </div>
            <div class="attachment-info">
              <div class="attachment-name">Transaction_Details.xlsx</div>
              <div class="attachment-meta">1.8 MB • Uploaded on April 28, 2024</div>
            </div>
            <button class="attachment-download" onclick="downloadFile('Transaction_Details.xlsx')">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="detail-section" style="margin-bottom: 24px;">
        <h2 class="section-title">
          <i class="fas fa-history"></i>
          Activity Timeline
        </h2>
        <div class="activity-timeline" id="activityTimeline">
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-check"></i>
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <div class="activity-title">Task Completed</div>
                <div class="activity-time">2 days ago</div>
              </div>
              <div class="activity-description">Santiago Morales marked this task as completed</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-upload"></i>
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <div class="activity-title">Files Uploaded</div>
                <div class="activity-time">5 days ago</div>
              </div>
              <div class="activity-description">Added 2 attachments to the task</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-comment"></i>
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <div class="activity-title">Comment Added</div>
                <div class="activity-time">1 week ago</div>
              </div>
              <div class="activity-description">Client requested review by end of month</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <div class="activity-title">Task Assigned</div>
                <div class="activity-time">2 weeks ago</div>
              </div>
              <div class="activity-description">Task assigned to Santiago Morales</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-plus"></i>
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <div class="activity-title">Task Created</div>
                <div class="activity-time">3 weeks ago</div>
              </div>
              <div class="activity-description">Task created for TechCorp Ltd VAT validation</div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-section comments-section">
        <h2 class="section-title">
          <i class="fas fa-comments"></i>
          Comments
        </h2>
        <div class="comment-input-group">
          <textarea class="comment-input" placeholder="Add a comment..." id="commentInput"></textarea>
        </div>
        <div style="margin-top: 12px;">
          <button class="btn-primary" onclick="addComment()">
            <i class="fas fa-paper-plane"></i>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="../js/accountant-tasks-details.js"></script>
</body>
</html>



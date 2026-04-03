<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Tasks</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
</head>

<body class="sales-page sales-page--tasks" data-sales-page="tasks">

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left u-inline-1" data-action="go-dashboard">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" class="u-inline-2">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php" class="active">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>
  <div class="nav-right">
    <a href="profile.php" class="u-inline-3">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<div class="container">

  <!-- PAGE HEADER -->
  <div class="lw-page-header">
    <h1>Tasks</h1>
  </div>

  <!-- FILTERS -->
  <div class="filters-section">
    <div class="filter-tabs">
      <span class="active" data-action="filter-tasks" data-filter="all">All Tasks</span>
      <span data-action="filter-tasks" data-filter="overdue"><i class="fas fa-exclamation-circle"></i> Overdue</span>
      <span data-action="filter-tasks" data-filter="today"><i class="fas fa-calendar-day"></i> Today</span>
      <span data-action="filter-tasks" data-filter="upcoming"><i class="fas fa-calendar"></i> Upcoming</span>
    </div>

    <div class="filter-controls">
      <input type="text" id="searchInput" placeholder="Search tasks..." data-action="search-tasks">
      <select id="priorityFilter" data-action="filter-by-priority">
        <option value="">All Priorities</option>
        <option value="urgent">Urgent</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button class="lw-btn" data-action="open-task-modal">+ Add Task</button>
    </div>
  </div>

  <!-- TABLE -->
  <div class="table-card">
    <table class="tasks-table">
      <thead>
        <tr>
          <th><input type="checkbox"></th>
          <th>Task</th>
          <th>Related Lead</th>
          <th>Due Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tasksTable">

      </tbody>
    </table>

    <div class="table-footer">
      <span id="taskCount">0 tasks</span>
      <span>‹ ›</span>
    </div>
  </div>

  <!-- ADD TASK MODAL -->
  <div id="addTaskModal" class="modal">
    <div class="lw-modal-content">
      <div class="modal-header">
        <h2>Add New Task</h2>
        <button class="close-btn" data-action="close-task-modal">&times;</button>
      </div>
      <form id="addTaskForm">
        <div class="form-group">
          <label for="taskTitle">Task Title <span class="u-inline-59">*</span></label>
          <input type="text" id="taskTitle" required placeholder="Enter task title">
        </div>
        <div class="form-group">
          <label for="taskLead">Lead Name <span class="u-inline-59">*</span></label>
          <input type="text" id="taskLead" required placeholder="Select or enter lead name">
        </div>
        <div class="form-group">
          <label for="taskDueDate">Due Date <span class="u-inline-59">*</span></label>
          <input type="date" id="taskDueDate" required>
        </div>
        <div class="form-group">
          <label for="taskPriority">Priority <span class="u-inline-59">*</span></label>
          <select id="taskPriority" required>
            <option value="">Select priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div class="form-group">
          <label for="taskDescription">Description</label>
          <textarea id="taskDescription" placeholder="Enter task description (optional)"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-cancel" data-action="close-task-modal">Cancel</button>
          <button type="submit" class="btn-submit">Add Task</button>
        </div>
      </form>
    </div>
  </div>

</div>

<script src="script.js" defer></script>

</body>
</html>


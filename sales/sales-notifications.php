<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Notifications</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<style>
/* ===== GLOBAL ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8f1f8 100%);
  color: #1f2937;
  min-height: 100vh;
}

/* ===== NAVBAR ===== */
.navbar {
  background: #002c2c;
  color: white;
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 44, 44, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-left img {
  height: 70px;
  transition: transform 0.3s ease;
}

.nav-center {
  display: flex;
  gap: 30px;
}

.nav-center a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-center a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #4da3ff;
  transition: width 0.3s ease;
}

.nav-center a:hover::after,
.nav-center a.active::after {
  width: 100%;
}

.nav-center a:hover,
.nav-center a.active {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  font-weight: 500;
}

.nav-right a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-right .profile-icon {
  font-size: 20px;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.notification-icon:hover {
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

/* ===== PROFILE BUTTON ===== */
.profile-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4da3ff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(77, 163, 255, 0.3);
  text-decoration: none;
}

.profile-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(77, 163, 255, 0.5);
}

/* ===== LAYOUT ===== */
.container {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 32px;
  color: #002c2c;
  margin-bottom: 12px;
  font-weight: 700;
}

/* ===== TABS ===== */
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 25px;
  border-bottom: 2px solid #e5e7eb;
}

.tabs span {
  cursor: pointer;
  color: #64748b;
  padding: 12px 20px;
  border-bottom: 3px solid transparent;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-bottom: -2px;
}

.tabs span:hover {
  color: #0b3e66;
}

.tabs span.active {
  color: #0b3e66;
  border-bottom-color: #0b3e66;
}

/* ===== NOTIFICATION ITEM ===== */
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.notification-item {
  background: white;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease-out;
  cursor: pointer;
  position: relative;
}

.notification-item:hover {
  background: linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%);
  transform: translateX(4px);
}

.notification-item.unread {
  background: linear-gradient(90deg, #f0f4f8 0%, #e8f1f8 100%);
  border-left-color: #0b3e66;
}

.notification-item:first-child {
  border-radius: 14px 14px 0 0;
}

.notification-item:last-child {
  border-radius: 0 0 14px 14px;
  border-bottom: none;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.notification-title {
  font-weight: 600;
  color: #0b3e66;
  font-size: 14px;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #a0aec0;
}

.notification-message {
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 12px;
}

.notification-icon {
  font-size: 20px;
  margin-right: 12px;
}

.notification-content {
  display: flex;
  gap: 12px;
}

.notification-body {
  flex: 1;
}

.notification-action {
  font-size: 20px;
  cursor: pointer;
  color: #cbd5e0;
  transition: all 0.3s ease;
  padding: 4px 8px;
}

.notification-action:hover {
  color: #ef4444;
  transform: scale(1.1);
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  margin-top: 8px;
}

.status-badge.lead { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
.status-badge.task { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.status-badge.system { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); }
.status-badge.invoice { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); }

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  color: #0b3e66;
  font-weight: 600;
  margin-bottom: 8px;
}

.empty-text {
  color: #64748b;
  font-size: 14px;
}

/* ===== ANIMATIONS ===== */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-item:nth-child(2) {
  animation-delay: 0.05s;
}

.notification-item:nth-child(3) {
  animation-delay: 0.1s;
}

.notification-item:nth-child(4) {
  animation-delay: 0.15s;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
    padding: 12px 20px;
  }

  .nav-center {
    gap: 15px;
    font-size: 12px;
  }

  .container {
    padding: 20px;
  }

  .notification-item {
    padding: 16px;
  }

  .notification-header {
    flex-direction: column;
  }
}
</style>
</head>

<body>

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left" style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="window.location.href='sales-dashboard.php'">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" style="height: 60px; width: auto;">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php" class="active">Notifications</a>
  </div>
  <div class="nav-right">
    <a href="profile.php" style="color: rgba(255, 255, 255, 0.85); text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255, 255, 255, 0.85)'">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<!-- PAGE CONTENT -->
<div class="container">

  <!-- PAGE HEADER -->
  <div class="page-header">
    <h1>Notifications</h1>
  </div>

  <!-- TABS -->
  <div class="tabs">
    <span class="active" onclick="filterNotifications('all', this)">All</span>
    <span onclick="filterNotifications('unread', this)">Unread</span>
    <span onclick="filterNotifications('leads', this)">Leads</span>
    <span onclick="filterNotifications('tasks', this)">Tasks</span>
    <span onclick="filterNotifications('invoices', this)">Invoices</span>
  </div>

  <!-- NOTIFICATIONS LIST -->
  <div class="notification-list" id="notificationsList">
  </div>

</div>
<script>
let allNotifications = [
  { id: 1, title: "📞 New Lead: Ahmed Khan", message: "A hot lead 'Ahmed Khan' has been added to your pipeline. This is a high-priority prospect interested in our business setup services.", time: "2 minutes ago", type: "leads", unread: true },
  { id: 2, title: "✓ Task Completed: Follow-up with XYZ Tech", message: "Sarah Malik has marked the follow-up task with XYZ Technologies as completed. The client is ready for the next phase.", time: "15 minutes ago", type: "tasks", unread: true },
  { id: 3, title: "💰 Invoice Generated: Rashid Ali", message: "An invoice for AED 25,000 has been generated for Rashid Ali. The client will receive payment notification shortly.", time: "1 hour ago", type: "invoices", unread: true },
  { id: 4, title: "🔄 Lead Status Updated: Global Solutions", message: "The lead 'Global Solutions' has been moved from Cold to Warm status. Consider scheduling a follow-up call.", time: "3 hours ago", type: "leads", unread: false },
  { id: 5, title: "📋 New Task Assigned: Send Proposal", message: "You have a new task assigned by John Carter. Send the service proposal to Nadia Trading by tomorrow.", time: "5 hours ago", type: "tasks", unread: false },
  { id: 6, title: "Monthly Target Reached", message: "Congratulations! Your team has reached 92% of the monthly sales target. Keep up the momentum to surpass your goals.", time: "Yesterday at 2:30 PM", type: "system", unread: false }
];

function renderNotifications(notifications) {
  const container = document.getElementById('notificationsList');
  container.innerHTML = '';

  if (notifications.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-icon"><i class="fas fa-bell"></i></div>
      <div class="empty-title">No Notifications</div>
      <div class="empty-text">You're all caught up! Check back later for updates.</div>
    </div>`;
    return;
  }

  const grouped = {
    leads: notifications.filter(n => n.type === 'leads'),
    tasks: notifications.filter(n => n.type === 'tasks'),
    invoices: notifications.filter(n => n.type === 'invoices'),
    system: notifications.filter(n => n.type === 'system')
  };

  let html = '';

  // Lead notifications
  if (grouped.leads.length > 0) {
    html += `<div style="padding: 12px 16px; background: #eff6ff; border-left: 4px solid #3b82f6; font-weight: 600; color: #1e40af; margin-bottom: 8px;">👥 LEAD NOTIFICATIONS (${grouped.leads.length})</div>`;
    grouped.leads.forEach(notif => {
      html += generateNotificationItem(notif);
    });
  }

  // Task notifications
  if (grouped.tasks.length > 0) {
    html += `<div style="padding: 12px 16px; background: #fffbeb; border-left: 4px solid #f59e0b; font-weight: 600; color: #92400e; margin: 16px 0 8px 0;">✓ TASK NOTIFICATIONS (${grouped.tasks.length})</div>`;
    grouped.tasks.forEach(notif => {
      html += generateNotificationItem(notif);
    });
  }

  // Invoice notifications
  if (grouped.invoices.length > 0) {
    html += `<div style="padding: 12px 16px; background: #f0fdf4; border-left: 4px solid #16a34a; font-weight: 600; color: #166534; margin: 16px 0 8px 0;">💰 INVOICE NOTIFICATIONS (${grouped.invoices.length})</div>`;
    grouped.invoices.forEach(notif => {
      html += generateNotificationItem(notif);
    });
  }

  // System notifications
  if (grouped.system.length > 0) {
    html += `<div style="padding: 12px 16px; background: #eef2ff; border-left: 4px solid #6366f1; font-weight: 600; color: #312e81; margin: 16px 0 8px 0;"><i class="fas fa-cog"></i> SYSTEM NOTIFICATIONS (${grouped.system.length})</div>`;
    grouped.system.forEach(notif => {
      html += generateNotificationItem(notif);
    });
  }

  container.innerHTML = html;
  attachDeleteHandlers();
}

function generateNotificationItem(notif) {
  const typeColors = {
    leads: 'lead',
    tasks: 'task',
    invoices: 'invoice',
    system: 'system'
  };

  return `
    <div class="notification-item ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
      <div class="notification-content">
        <div class="notification-body">
          <div class="notification-header">
            <div>
              <div class="notification-title">${notif.title}</div>
              <div class="notification-time">${notif.time}</div>
            </div>
          </div>
          <div class="notification-message">${notif.message}</div>
          <span class="status-badge ${typeColors[notif.type]}">${notif.type.toUpperCase()}</span>
        </div>
        <div class="notification-action" onclick="deleteNotification(event)">✕</div>
      </div>
    </div>
  `;
}

function filterNotifications(type, el) {
  document.querySelectorAll(".tabs span").forEach(s => s.classList.remove("active"));
  el.classList.add("active");

  let filtered = allNotifications;

  if (type === 'unread') {
    filtered = allNotifications.filter(n => n.unread);
  } else if (type !== 'all') {
    filtered = allNotifications.filter(n => n.type === type);
  }

  renderNotifications(filtered);
}

function deleteNotification(event) {
  event.stopPropagation();
  const item = event.target.closest('.notification-item');
  const id = parseInt(item.getAttribute('data-id'));
  
  item.style.animation = 'slideUp 0.3s ease-out reverse';
  setTimeout(() => {
    allNotifications = allNotifications.filter(n => n.id !== id);
    item.remove();
    updateBadge();
  }, 300);
}

function updateBadge() {
  const unreadCount = allNotifications.filter(n => n.unread).length;
  document.querySelector('.notification-badge').textContent = unreadCount || '0';
}

function attachDeleteHandlers() {
  document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function(e) {
      if (!e.target.closest('.notification-action')) {
        const id = parseInt(this.getAttribute('data-id'));
        const notif = allNotifications.find(n => n.id === id);
        if (notif) {
          notif.unread = false;
          this.classList.remove('unread');
          updateBadge();
        }
      }
    });
  });
}

// Initialize
renderNotifications(allNotifications);

</script>

</body>
</html>

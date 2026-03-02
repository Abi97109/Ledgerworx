
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');
userProfile.addEventListener('click', (e) => {e.stopPropagation();userProfile.classList.toggle('active');profileDropdown.classList.toggle('active');});
document.addEventListener('click', (e) => {if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {userProfile.classList.remove('active');profileDropdown.classList.remove('active');}});
const themeToggle = document.getElementById('themeToggle');
const toggleSwitch = document.getElementById('toggleSwitch');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {document.body.classList.add('dark-mode');toggleSwitch.classList.add('active');themeIcon.className = 'fas fa-sun';themeText.textContent = 'Light Mode';}
themeToggle.addEventListener('click', (e) => {e.stopPropagation();document.body.classList.toggle('dark-mode');toggleSwitch.classList.toggle('active');if (document.body.classList.contains('dark-mode')) {themeIcon.className = 'fas fa-sun';themeText.textContent = 'Light Mode';localStorage.setItem('theme', 'dark');} else {themeIcon.className = 'fas fa-moon';themeText.textContent = 'Dark Mode';localStorage.setItem('theme', 'light');}});

async function fetchTaskData(taskId) {
  try {
    const response = await fetch(`zoho-api.php?action=task&id=${taskId}`);
    const data = await response.json();
    if (data.success) {
      updateTaskDisplay(data.data);
    } else {
      console.error('Failed to fetch task:', data.message);
    }
  } catch (error) {
    console.error('Error fetching task:', error);
  }
}

function updateTaskDisplay(task) {
  document.getElementById('taskTitle').textContent = task.name || 'Task Name';
  document.getElementById('taskSubtitle').textContent = task.subtitle || task.client;
  document.getElementById('taskId').textContent = task.id || 'TASK-001';
  document.getElementById('clientName').textContent = task.client || 'Client Name';
  document.getElementById('dueDate').textContent = task.dueDate || 'Due Date';
  document.getElementById('assignedTo').textContent = task.assignedTo || 'Santiago Morales';
  document.getElementById('createdDate').textContent = task.createdDate || 'Created Date';
  document.getElementById('completedDate').textContent = task.completedDate || 'N/A';
  document.getElementById('taskDescription').textContent = task.description || 'No description available';
  
  const taskIcon = document.getElementById('taskIcon');
  taskIcon.className = `task-icon-large ${task.iconColor || 'blue'}`;
  taskIcon.innerHTML = `<i class="fas ${task.icon || 'fa-file-invoice'}"></i>`;
  
  updateStatusBadge(task.status || 'completed');
  updatePriorityBadge(task.priority || 'high');
  updateProgress(task.progress || 100);
}

function updateStatusBadge(status) {
  const statusBadge = document.getElementById('statusBadge');
  const statusText = document.getElementById('statusText');
  statusBadge.className = `status-badge ${status}`;
  const statusMap = {
    'completed': {icon: 'fa-check-circle', text: 'Completed'},
    'in-progress': {icon: 'fa-spinner', text: 'In Progress'},
    'due-soon': {icon: 'fa-clock', text: 'Due Soon'},
    'overdue': {icon: 'fa-exclamation-triangle', text: 'Overdue'}
  };
  const statusInfo = statusMap[status] || statusMap['completed'];
  statusBadge.innerHTML = `<i class="fas ${statusInfo.icon}"></i><span id="statusText">${statusInfo.text}</span>`;
}

function updatePriorityBadge(priority) {
  const priorityBadge = document.getElementById('priorityBadge');
  priorityBadge.className = `priority-badge ${priority}`;
  const priorityMap = {
    'high': {icon: 'fa-exclamation-circle', text: 'High Priority'},
    'medium': {icon: 'fa-minus-circle', text: 'Medium Priority'},
    'low': {icon: 'fa-info-circle', text: 'Low Priority'}
  };
  const priorityInfo = priorityMap[priority] || priorityMap['high'];
  priorityBadge.innerHTML = `<i class="fas ${priorityInfo.icon}"></i><span id="priorityText">${priorityInfo.text}</span>`;
}

function updateProgress(progress) {
  document.getElementById('progressPercent').textContent = `${progress}%`;
  document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateStatus() {
  const currentStatus = document.getElementById('statusBadge').classList[1];
  if (currentStatus === 'completed') {
    alert('Task is already completed!');
  } else {
    updateStatusBadge('completed');
    updateProgress(100);
    alert('Task marked as completed!');
  }
}

function editTask() {
  const taskId = new URLSearchParams(window.location.search).get('id');
  window.location.href = `edit-task.php?id=${taskId}`;
}

function addComment() {
  const comment = document.getElementById('commentInput').value;
  if (comment.trim()) {
    alert('Comment added: ' + comment);
    document.getElementById('commentInput').value = '';
  } else {
    alert('Please enter a comment');
  }
}

function downloadFile(filename) {
  alert('Downloading: ' + filename);
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get('id');
  if (taskId) {
    fetchTaskData(taskId);
  }
});

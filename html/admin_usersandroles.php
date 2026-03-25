<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">

<div class="page-header">
  <h2>Users & Roles</h2>
  <button class="btn primary" id="addUserBtn">+ Add User</button>
</div>

<div class="modal-overlay" id="addUserModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="addUserModalTitle">
    <div class="modal-header">
      <h3 id="addUserModalTitle">Add User</h3>
      <button type="button" class="modal-close" id="closeAddUserModalBtn" aria-label="Close">&times;</button>
    </div>
    <div class="add-user-form">
      <div class="form-grid">
        <div class="form-row">
          <label for="newFullName">Full Name</label>
          <input id="newFullName" placeholder="Full Name" required>
        </div>
        <div class="form-row">
          <label for="newEmployeeId">Employee ID</label>
          <input id="newEmployeeId" placeholder="Employee ID" required>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="newEmail">Email</label>
          <input id="newEmail" type="email" placeholder="Email" pattern="^[^\s@]+@ledgerworx\.me$" title="Email must end with @ledgerworx.me" required>
        </div>
        <div class="form-row">
          <label for="newPhone">Phone Number</label>
          <input id="newPhone" placeholder="Phone Number" required>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="newDepartment">Department</label>
          <select id="newDepartment" required>
            <option value="" selected disabled>Select Department</option>
            <option>Client</option>
            <option>Sales</option>
            <option>Accounts</option>
            <option>Operations</option>
            <option>Manager</option>
          </select>
        </div>
        <div class="form-row">
          <label for="newDesignation">Designation</label>
          <input id="newDesignation" placeholder="Designation">
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="newRole">Role</label>
          <select id="newRole" required>
            <option value="" selected disabled>Select Role</option>
            <option>Client</option>
            <option>Salesperson</option>
            <option>Accountant</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
        </div>
        <div class="form-row">
          <label for="newStatus">Status</label>
          <select id="newStatus" required>
            <option value="" selected disabled>Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="newUsername">Username</label>
          <input id="newUsername" placeholder="Username" required>
        </div>
        <div class="form-row">
          <label for="newPassword">Password</label>
          <input id="newPassword" type="password" placeholder="Password" required>
        </div>
      </div>
      <div class="form-row">
        <label for="newJoiningDate">Joining Date</label>
        <input id="newJoiningDate" type="date" required>
      </div>
      <div class="form-actions">
        <button type="button" class="btn" id="cancelNewUser">Cancel</button>
        <button type="button" class="btn primary" id="saveNewUser">Save</button>
      </div>
    </div>
  </div>
</div>

<div class="card">

<table>
<tr>
  <th>Full Name</th>
  <th>Email</th>
  <th>Phone</th>
  <th>Department</th>
  <th>Designation</th>
  <th>Status</th>
  <th>Role</th>
  <th>Last Online</th>
  <th>Actions</th>
</tr>

<?php foreach($users as $index => $user): ?>
<tr data-index="<?php echo $index; ?>">
  <td class="fullname-cell"><span class="fullname-text"><?php echo htmlspecialchars($user['full_name']); ?></span></td>
  <td class="email-cell"><span class="email-text"><?php echo htmlspecialchars($user['email']); ?></span></td>
  <td class="phone-cell"><span class="phone-text"><?php echo htmlspecialchars($user['phone']); ?></span></td>
  <td class="department-cell"><span class="department-text"><?php echo htmlspecialchars($user['department']); ?></span></td>
  <td class="designation-cell"><span class="designation-text"><?php echo htmlspecialchars($user['designation']); ?></span></td>
  <td class="status-cell"><span class="status-text"><?php echo htmlspecialchars($user['status']); ?></span></td>
  <td><span class="role <?php echo $user['role_class']; ?> role-text">
      <?php echo htmlspecialchars($user['role']); ?>
  </span></td>
  <td class="<?php echo $user['last_online']=='Online now'?'online':''; ?> lastonline-text">
      <?php echo htmlspecialchars($user['last_online']); ?>
  </td>
  <td>
    <button class="btn btn-edit" data-action="edit">Edit</button>
    <button class="btn btn-delete" data-action="deactivate" style="margin-left:8px">Deactivate</button>
    <button class="btn" data-action="cancel" style="display:none;margin-left:8px">Cancel</button>
  </td>
</tr>
<?php endforeach; ?>

</table>

</div>
</div>

  <script src="../js/admin_usersandroles.js?v=<?php echo filemtime(__DIR__ . '/../js/admin_usersandroles.js'); ?>" defer></script>


<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">

<div class="page-header">
  <h2>Users & Roles</h2>
  <button class="btn primary" id="addUserBtn">+ Add User</button>
</div>

<!-- Add User form (hidden) -->
<div id="addUserForm" style="display:none;margin-bottom:12px">
  <div style="background:var(--card);padding:12px;border-radius:10px;box-shadow:0 6px 12px rgba(0,0,0,.06);max-width:480px">
    <div style="display:flex;flex-direction:column;gap:10px">
      <div>
        <label>* Full Name</label><br>
        <input id="newFullName" placeholder="Full Name" style="padding:8px;border-radius:6px;border:1px solid #ddd;width:100%">
      </div>
      <div>
        <label>* Email</label><br>
        <input id="newEmail" placeholder="Email" style="padding:8px;border-radius:6px;border:1px solid #ddd;width:100%">
      </div>
      <div>
        <label>* Phone no.</label><br>
        <input id="newPhone" placeholder="Phone no." style="padding:8px;border-radius:6px;border:1px solid #ddd;width:100%">
      </div>
      <div>
        <label>* Department</label><br>
        <select id="newDepartment" style="padding:8px;border-radius:6px;border:1px solid #ddd;width:100%">
          <option>Client</option>
          <option>Sales</option>
          <option>Accounts</option>
          <option>Manager</option>
        </select>
      </div>
      <div>
        <label>* Designation</label><br>
        <input id="newDesignation" placeholder="Designation" style="padding:8px;border-radius:6px;border:1px solid #ddd;width:100%">
      </div>
      <div>
        <label>* Status</label><br>
        <select id="newStatus" style="padding:8px;border-radius:6px;border:1px solid #ddd;width:100%">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;">
        <button class="btn" id="saveNewUser" style="background:#27ae60;color:#fff">Save</button>
        <button class="btn" id="cancelNewUser">Cancel</button>
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
    <button class="btn btn-delete" data-action="delete" style="margin-left:8px">Delete</button>
    <button class="btn" data-action="cancel" style="display:none;margin-left:8px">Cancel</button>
  </td>
</tr>
<?php endforeach; ?>

</table>

</div>
</div>

  <script src="../js/admin_usersandroles.js" defer></script>


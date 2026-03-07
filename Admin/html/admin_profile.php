<?php include __DIR__ . '/../php/header.php'; ?>
<div class="page admin-profile-page">
  <div class="breadcrumb">Dashboard &rsaquo; Profile</div>

  <div class="profile-hero card">
    <div class="hero-left">
      <div class="hero-avatar"><?php echo strtoupper(substr((string)$adminName, 0, 2)); ?></div>
      <div>
        <h2>Administrator Profile</h2>
        <p class="hero-subtitle">Global system owner account for LedgerWorx operations.</p>
      </div>
    </div>
    <div class="hero-right">
      <span class="pill">Role: Super Admin</span>
      <span class="pill">MFA: Enabled</span>
      <span class="pill">Session Risk: Low</span>
    </div>
  </div>

  <div class="profile-grid">
    <section class="card">
      <h3>Account Scope</h3>
      <div class="meta-list">
        <div class="meta-row"><span>Primary Email</span><strong>admin@ledgerworx.com</strong></div>
        <div class="meta-row"><span>Department</span><strong>Platform Administration</strong></div>
        <div class="meta-row"><span>Created On</span><strong>January 12, 2024</strong></div>
        <div class="meta-row"><span>Last Password Rotation</span><strong>February 16, 2026</strong></div>
        <div class="meta-row"><span>Active API Keys</span><strong>3</strong></div>
      </div>
    </section>

    <section class="card">
      <h3>Recent Login Activity (Email IDs)</h3>
      <table class="activity-table">
        <thead>
          <tr>
            <th>Email ID</th>
            <th>Role</th>
            <th>IP</th>
            <th>Device</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>admin@ledgerworx.com</td>
            <td>Super Admin</td>
            <td>49.43.112.18</td>
            <td>Chrome / Windows</td>
            <td>Mar 6, 2026 09:18</td>
            <td><span class="status-pill ok">Success</span></td>
          </tr>
          <tr>
            <td>finance.admin@ledgerworx.com</td>
            <td>Finance Admin</td>
            <td>49.43.117.22</td>
            <td>Safari / macOS</td>
            <td>Mar 6, 2026 08:42</td>
            <td><span class="status-pill ok">Success</span></td>
          </tr>
          <tr>
            <td>ops.admin@ledgerworx.com</td>
            <td>Ops Admin</td>
            <td>49.43.119.85</td>
            <td>Edge / Windows</td>
            <td>Mar 5, 2026 22:06</td>
            <td><span class="status-pill warn">MFA Retry</span></td>
          </tr>
          <tr>
            <td>support@ledgerworx.com</td>
            <td>Support Admin</td>
            <td>49.43.115.44</td>
            <td>Firefox / Linux</td>
            <td>Mar 5, 2026 17:14</td>
            <td><span class="status-pill fail">Blocked</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</div>

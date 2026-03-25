<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">

<div class="page-header">
  <h2><i class="fa fa-gears"></i>Operations</h2>
</div>

<!-- TILES -->
<div class="tiles">
  <div class="tile" onclick="showApproval()">
    <i class="fa fa-clipboard-check"></i>
    <h3>Approval List</h3>
    <p>Pending approvals for companies, services & payments</p>
  </div>

  <div class="tile" onclick="showRequest()">
    <i class="fa fa-file-circle-plus"></i>
    <h3>Request Form</h3>
    <p>Incoming requests from clients and staff</p>
  </div>
</div>

<!-- APPROVAL LIST -->
<div class="card" id="approvalCard">
  <h3>Approval List</h3><br>
  <table>
    <tr>
      <th>Type</th>
      <th>Reference</th>
      <th>Requested By</th>
      <th>Actions</th>
    </tr>
    <tr>
      <td>Company Registration</td>
      <td>BR-1024</td>
      <td>Client – ABC Corp</td>
      <td>
        <button class="btn approve">Approve</button>
        <button class="btn email" onclick="sendEmail()">Send Email</button>
        <button class="btn assign" onclick="openAssign()">Assign</button>
      </td>
    </tr>
  </table>
</div>

<!-- REQUEST FORM -->
<div class="card" id="requestCard">
  <h3>Request Form</h3><br>
  <table>
    <tr>
      <th>Request Type</th>
      <th>Reference</th>
      <th>From</th>
      <th>Actions</th>
    </tr>
    <tr>
      <td>Document Upload</td>
      <td>REQ-2031</td>
      <td>Client – XYZ Ltd</td>
      <td>
        <button class="btn view">View</button>
        <button class="btn email" onclick="sendEmail()">Send Email</button>
        <button class="btn assign" onclick="openAssign()">Assign</button>
      </td>
    </tr>
  </table>
</div>

</div>

<!-- ASSIGN MODAL -->
<div class="modal" id="assignModal">
  <div class="modal-content">
    <h3>Assign Salesperson</h3>
    <select>
      <option>Select Salesperson</option>
      <option>Rahul</option>
      <option>Priya</option>
      <option>Amit</option>
    </select>
    <button class="btn approve" onclick="assign()">Assign</button>
  </div>
</div>

<div class="popup" id="popup"></div>

  <script src="../js/admin_operations.js" defer></script>


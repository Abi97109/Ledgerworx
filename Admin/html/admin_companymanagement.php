<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">

<div class="breadcrumb">Dashboard › Company Management</div>

<div class="page-header">
  <h2><i class="fa fa-building"></i>Company Management</h2>
  <button class="btn primary"><i class="fa fa-plus"></i>Add New Company</button>
</div>

<!-- SUMMARY -->
<div class="tiles">
  <div class="tile">
    <i class="fa fa-city icon"></i>
    <h3>75</h3>
    <p>Total Companies</p>
  </div>

  <div class="tile">
    <i class="fa fa-check-circle icon"></i>
    <h3>60</h3>
    <p>Active Companies</p>
  </div>

  <div class="tile">
    <i class="fa fa-clock icon"></i>
    <h3>10</h3>
    <p>Pending Companies</p>
  </div>

  <div class="tile">
    <i class="fa fa-ban icon"></i>
    <h3>5</h3>
    <p>Expired Companies</p>
  </div>
</div>

<!-- COMPANY LIST -->
<div class="card">

<table>
<tr>
  <th>Company Name</th>
  <th>Business ID</th>
  <th>Industry</th>
  <th>Owner</th>
  <th>Status</th>
  <th>Actions</th>
</tr>

<tr>
<td class="company"><i class="fa fa-building"></i>Bright Tech Solutions</td>
<td>CGD20208</td>
<td>Technology</td>
<td class="owner"><img src="https://i.pravatar.cc/40?img=1"> Anil Kumar</td>
<td><span class="status active">Active</span></td>
<td>
<button class="action view">View</button>
<button class="action edit">Edit</button>
<button class="action suspend">Suspend</button>
</td>
</tr>

<tr>
<td class="company"><i class="fa fa-building"></i>Emirates Logistics</td>
<td>FLG10236</td>
<td>Logistics</td>
<td class="owner"><img src="https://i.pravatar.cc/40?img=2"> Sarah Ali</td>
<td><span class="status pending">Pending</span></td>
<td>
<button class="action view">View</button>
<button class="action edit">Edit</button>
<button class="action approve">Approve</button>
</td>
</tr>

<tr>
<td class="company"><i class="fa fa-building"></i>Nova Healthcare</td>
<td>MH467920</td>
<td>Healthcare</td>
<td class="owner"><img src="https://i.pravatar.cc/40?img=3"> Meera Joshi</td>
<td><span class="status banned">Expired</span></td>
<td>
<button class="action view">View</button>
<button class="action edit">Edit</button>
<button class="action reactivate">Reactivate</button>
</td>
</tr>

</table>

</div>
</div>


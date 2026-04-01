function toggleMenu(){
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick=function(e){
  if(!e.target.closest(".admin")){
    document.getElementById("dropdownMenu").classList.remove("show");
  }
};

// Users table: Edit / Save / Cancel / Delete handlers
document.addEventListener('DOMContentLoaded', function(){
  const table = document.querySelector('table');
  if(!table) return;

  table.addEventListener('click', function(e){
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const action = btn.getAttribute('data-action');
    const row = btn.closest('tr');
    if(!row) return;

    if(action === 'edit') return enterEditMode(row, btn);
    if(action === 'delete') return deleteRow(row);
    if(action === 'cancel') return cancelEdit(row);
  });

  function enterEditMode(row, editBtn){
    if(row.dataset.editing === '1') return;
    row.dataset.editing = '1';
    const nameSpan = row.querySelector('.fullname-text');
    const emailSpan = row.querySelector('.email-text');
    const phoneSpan = row.querySelector('.phone-text');
    const deptSpan = row.querySelector('.department-text');
    const desigSpan = row.querySelector('.designation-text');
    const statusSpan = row.querySelector('.status-text');
    const roleSpan = row.querySelector('.role-text');

    const nameVal = nameSpan.textContent.trim();
    const emailVal = emailSpan.textContent.trim();
    const phoneVal = phoneSpan.textContent.trim();
    const deptVal = deptSpan.textContent.trim();
    const desigVal = desigSpan.textContent.trim();
    const statusVal = statusSpan.textContent.trim();
    const roleVal = roleSpan.textContent.trim();

    nameSpan.innerHTML = `<input class="edit-input name-input" value="${escapeHtml(nameVal)}" style="padding:6px;border-radius:6px;border:1px solid #ddd;width:120px">`;
    emailSpan.innerHTML = `<input class="edit-input email-input" value="${escapeHtml(emailVal)}" style="padding:6px;border-radius:6px;border:1px solid #ddd;width:150px">`;
    phoneSpan.innerHTML = `<input class="edit-input phone-input" value="${escapeHtml(phoneVal)}" style="padding:6px;border-radius:6px;border:1px solid #ddd;width:120px">`;
    deptSpan.innerHTML = `<select class="dept-select" style="padding:6px;border-radius:6px;border:1px solid #ddd"><option${deptVal==='Client'?' selected':''}>Client</option><option${deptVal==='Sales'?' selected':''}>Sales</option><option${deptVal==='Accounts'?' selected':''}>Accounts</option><option${deptVal==='Manager'?' selected':''}>Manager</option></select>`;
    desigSpan.innerHTML = `<input class="edit-input desig-input" value="${escapeHtml(desigVal)}" style="padding:6px;border-radius:6px;border:1px solid #ddd;width:120px">`;
    statusSpan.innerHTML = `<select class="status-select" style="padding:6px;border-radius:6px;border:1px solid #ddd"><option${statusVal==='Active'?' selected':''}>Active</option><option${statusVal==='Inactive'?' selected':''}>Inactive</option></select>`;

    // role select
    const roles = ['Client','Salesperson','Accountant','Manager','Admin'];
    let sel = '<select class="role-select" style="padding:6px;border-radius:6px;border:1px solid #ddd">';
    roles.forEach(r=>{ sel += `<option value="${r}" ${r===roleVal?'selected':''}>${r}</option>`; });
    sel += '</select>';
    roleSpan.innerHTML = sel;

    // swap buttons: Edit -> Save, show Cancel
    editBtn.textContent = 'Save';
    editBtn.setAttribute('data-action','save');
    const cancelBtn = row.querySelector('button[data-action="cancel"]');
    cancelBtn.style.display = 'inline-block';

    // handle Save via delegation
    editBtn.addEventListener('click', function saveHandler(ev){
      if(editBtn.getAttribute('data-action') !== 'save') return;
      ev.stopPropagation();
      saveEdit(row, editBtn);
      editBtn.removeEventListener('click', saveHandler);
    });
  }

  function saveEdit(row, editBtn){
    const nameVal = row.querySelector('.name-input').value.trim();
    const emailVal = row.querySelector('.email-input').value.trim();
    const phoneVal = row.querySelector('.phone-input').value.trim();
    const deptVal = row.querySelector('.dept-select').value;
    const desigVal = row.querySelector('.desig-input').value.trim();
    const statusVal = row.querySelector('.status-select').value;
    const roleVal = row.querySelector('.role-select').value;

    // update DOM
    row.querySelector('.fullname-text').textContent = nameVal;
    row.querySelector('.email-text').textContent = emailVal;
    row.querySelector('.phone-text').textContent = phoneVal;
    row.querySelector('.department-text').textContent = deptVal;
    row.querySelector('.designation-text').textContent = desigVal;
    row.querySelector('.status-text').textContent = statusVal;
    const roleSpan = row.querySelector('.role-text');
    // reset classes and text
    roleSpan.className = 'role role-text ' + roleVal.toLowerCase().replace(/\s+/g,'');
    roleSpan.textContent = roleVal;

    // exit edit mode
    row.dataset.editing = '0';
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('data-action','edit');
    const cancelBtn = row.querySelector('button[data-action="cancel"]');
    cancelBtn.style.display = 'none';

    // TODO: send update to server via AJAX if desired
  }

  function cancelEdit(row){
    // revert cells by reloading from original text stored where? Simple way: reload page to discard changes
    // For now, we will reset the row by reloading the page to keep logic simple
    location.reload();
  }

  function deleteRow(row){
    if(!confirm('Delete this user? This action cannot be undone.')) return;
    row.remove();
    // TODO: send delete request to server via fetch/AJAX
  }

  // Add User handling
  const addBtn = document.getElementById('addUserBtn');
  const addForm = document.getElementById('addUserForm');
  const saveNew = document.getElementById('saveNewUser');
  const cancelNew = document.getElementById('cancelNewUser');

  function roleClassFor(r){ return r==='Admin' ? 'admin-role' : r.toLowerCase().replace(/\s+/g,''); }

  if(addBtn && addForm){
    addBtn.addEventListener('click', function(){
      const isHidden = addForm.style.display === 'none';
      if(isHidden){
        // reset fields
        document.getElementById('newFullName').value = '';
        document.getElementById('newEmail').value = '';
        document.getElementById('newPhone').value = '';
        document.getElementById('newDepartment').value = 'Client';
        document.getElementById('newDesignation').value = '';
        document.getElementById('newStatus').value = 'Active';
      }
      addForm.style.display = isHidden ? 'block' : 'none';
    });
  }

  if(cancelNew){
    cancelNew.addEventListener('click', function(){
      document.getElementById('newFullName').value = '';
      document.getElementById('newEmail').value = '';
      document.getElementById('newPhone').value = '';
      document.getElementById('newDepartment').value = 'Client';
      document.getElementById('newDesignation').value = '';
      document.getElementById('newStatus').value = 'Active';
      addForm.style.display = 'none';
    });
  }

  if(saveNew){
    saveNew.addEventListener('click', function(){
      const fullName = document.getElementById('newFullName').value.trim();
      const email = document.getElementById('newEmail').value.trim();
      const phone = document.getElementById('newPhone').value.trim();
      const dept = document.getElementById('newDepartment').value;
      const desig = document.getElementById('newDesignation').value.trim();
      const status = document.getElementById('newStatus').value;
      const role = 'Client'; // default role for new entries
      if(!fullName || !email){ alert('Please provide full name and email'); return; }

      const current = table.querySelectorAll('tr[data-index]').length;
      const idx = current;

      const roleCls = roleClassFor(role);
      const newRow = document.createElement('tr');
      newRow.setAttribute('data-index', idx);
      newRow.innerHTML = `
        <td><span class="fullname-text">${escapeHtml(fullName)}</span></td>
        <td class="email-cell"><span class="email-text">${escapeHtml(email)}</span></td>
        <td class="phone-cell"><span class="phone-text">${escapeHtml(phone)}</span></td>
        <td class="department-cell"><span class="department-text">${escapeHtml(dept)}</span></td>
        <td class="designation-cell"><span class="designation-text">${escapeHtml(desig)}</span></td>
        <td class="status-cell"><span class="status-text">${escapeHtml(status)}</span></td>
        <td><span class="role ${roleCls} role-text">${escapeHtml(role)}</span></td>
        <td class="lastonline-text">Recently</td>
        <td>
          <button class="btn btn-edit" data-action="edit">Edit</button>
          <button class="btn btn-delete" data-action="delete" style="margin-left:8px">Delete</button>
          <button class="btn" data-action="cancel" style="display:none;margin-left:8px">Cancel</button>
        </td>
      `;

      table.appendChild(newRow);
      // clear and hide form
      document.getElementById('newFullName').value = '';
      document.getElementById('newEmail').value = '';
      document.getElementById('newPhone').value = '';
      document.getElementById('newDepartment').value = 'Client';
      document.getElementById('newDesignation').value = '';
      document.getElementById('newStatus').value = 'Active';
      addForm.style.display = 'none';
    });
  }

  function escapeHtml(str){
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
});

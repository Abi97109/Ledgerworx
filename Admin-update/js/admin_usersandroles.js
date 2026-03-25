function toggleMenu(){
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick=function(e){
  if(!e.target.closest(".admin")){
    document.getElementById("dropdownMenu").classList.remove("show");
  }
};

// Users table: Edit / Save / Cancel / Deactivate handlers
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
    if(action === 'deactivate') return deactivateUser(row, btn);
    if(action === 'activate') return activateUser(row, btn);
    if(action === 'cancel') return cancelEdit(row);
  });

  table.querySelectorAll('tr[data-index]').forEach(function(row){
    const actionBtn = row.querySelector('button[data-action="deactivate"], button[data-action="activate"]');
    const statusText = row.querySelector('.status-text')?.textContent.trim() || '';
    setActionButtonState(actionBtn, statusText === 'Inactive' ? 'activate' : 'deactivate');
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
    emailSpan.innerHTML = `<input class="edit-input email-input" type="email" pattern="^[^\\s@]+@ledgerworx\\.me$" title="Email must end with @ledgerworx.me" value="${escapeHtml(emailVal)}" style="padding:6px;border-radius:6px;border:1px solid #ddd;width:150px">`;
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

    if(!/@ledgerworx\.me$/i.test(emailVal)){
      alert('Email must end with @ledgerworx.me.');
      row.querySelector('.email-input').focus();
      return;
    }

    // update DOM
    row.querySelector('.fullname-text').textContent = nameVal;
    row.querySelector('.email-text').textContent = emailVal;
    row.querySelector('.phone-text').textContent = phoneVal;
    row.querySelector('.department-text').textContent = deptVal;
    row.querySelector('.designation-text').textContent = desigVal;
    row.querySelector('.status-text').textContent = statusVal;
    const actionBtn = row.querySelector('button[data-action="deactivate"], button[data-action="activate"]');
    setActionButtonState(actionBtn, statusVal === 'Inactive' ? 'activate' : 'deactivate');
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

  function setActionButtonState(btn, nextAction){
    if(!btn) return;

    if(nextAction === 'activate'){
      btn.textContent = 'Activate';
      btn.setAttribute('data-action', 'activate');
      btn.classList.remove('btn-delete');
      btn.classList.add('activate');
      return;
    }

    btn.textContent = 'Deactivate';
    btn.setAttribute('data-action', 'deactivate');
    btn.classList.remove('activate');
    btn.classList.add('btn-delete');
  }

  function deactivateUser(row, btn){
    if(!confirm('Deactivate this user?')) return;

    const statusCell = row.querySelector('.status-text');
    if(statusCell){
      statusCell.textContent = 'Inactive';
    }

    const lastOnlineCell = row.querySelector('.lastonline-text');
    if(lastOnlineCell){
      lastOnlineCell.classList.remove('online');
      lastOnlineCell.textContent = 'Deactivated';
    }

    setActionButtonState(btn, 'activate');
    // TODO: send deactivate request to server via fetch/AJAX
  }

  function activateUser(row, btn){
    if(!confirm('Activate this user?')) return;

    const statusCell = row.querySelector('.status-text');
    if(statusCell){
      statusCell.textContent = 'Active';
    }

    const lastOnlineCell = row.querySelector('.lastonline-text');
    if(lastOnlineCell){
      lastOnlineCell.classList.add('online');
      lastOnlineCell.textContent = 'Online now';
    }

    setActionButtonState(btn, 'deactivate');

    // TODO: send activate request to server via fetch/AJAX
  }

  // Add User handling
  const addBtn = document.getElementById('addUserBtn');
  const addModal = document.getElementById('addUserModal');
  const closeAddModalBtn = document.getElementById('closeAddUserModalBtn');
  const saveNew = document.getElementById('saveNewUser');
  const cancelNew = document.getElementById('cancelNewUser');

  function roleClassFor(r){ return r==='Admin' ? 'admin-role' : r.toLowerCase().replace(/\s+/g,''); }

  function openAddModal(){
    if(!addModal) return;
    addModal.classList.add('open');
    addModal.setAttribute('aria-hidden','false');
  }

  function closeAddModal(){
    if(!addModal) return;
    addModal.classList.remove('open');
    addModal.setAttribute('aria-hidden','true');
  }

  function resetAddForm(){
    document.getElementById('newFullName').value = '';
    document.getElementById('newEmployeeId').value = '';
    document.getElementById('newEmail').value = '';
    document.getElementById('newPhone').value = '';
    document.getElementById('newDepartment').value = '';
    document.getElementById('newDesignation').value = '';
    document.getElementById('newRole').value = '';
    document.getElementById('newStatus').value = '';
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('newJoiningDate').value = '';
  }

  if(addBtn && addModal){
    addBtn.addEventListener('click', function(){
      resetAddForm();
      openAddModal();
    });
  }

  if(closeAddModalBtn){
    closeAddModalBtn.addEventListener('click', function(){
      closeAddModal();
    });
  }

  if(addModal){
    addModal.addEventListener('click', function(event){
      if(event.target === addModal) closeAddModal();
    });
  }

  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape') closeAddModal();
  });

  if(cancelNew){
    cancelNew.addEventListener('click', function(){
      resetAddForm();
      closeAddModal();
    });
  }

  if(saveNew){
    saveNew.addEventListener('click', function(){
      const fullNameEl = document.getElementById('newFullName');
      const employeeIdEl = document.getElementById('newEmployeeId');
      const emailEl = document.getElementById('newEmail');
      const phoneEl = document.getElementById('newPhone');
      const deptEl = document.getElementById('newDepartment');
      const desigEl = document.getElementById('newDesignation');
      const roleEl = document.getElementById('newRole');
      const statusEl = document.getElementById('newStatus');
      const usernameEl = document.getElementById('newUsername');
      const passwordEl = document.getElementById('newPassword');
      const joiningDateEl = document.getElementById('newJoiningDate');

      const requiredFields = [
        { element: fullNameEl, label: 'Full Name', type: 'input' },
        { element: employeeIdEl, label: 'Employee ID', type: 'input' },
        { element: emailEl, label: 'Email', type: 'input' },
        { element: phoneEl, label: 'Phone Number', type: 'input' },
        { element: deptEl, label: 'Department', type: 'select' },
        { element: desigEl, label: 'Designation', type: 'input' },
        { element: roleEl, label: 'Role', type: 'select' },
        { element: statusEl, label: 'Status', type: 'select' },
        { element: usernameEl, label: 'Username', type: 'input' },
        { element: passwordEl, label: 'Password', type: 'input' },
        { element: joiningDateEl, label: 'Joining Date', type: 'input' }
      ];

      for(const field of requiredFields){
        const value = field.element.value.trim();
        if(!value){
          const verb = field.type === 'select' ? 'select' : 'fill';
          alert(`Please ${verb} ${field.label}.`);
          field.element.focus();
          return;
        }
      }

      const fullName = fullNameEl.value.trim();
      const employeeId = employeeIdEl.value.trim();
      const email = emailEl.value.trim();
      const phone = phoneEl.value.trim();
      const dept = deptEl.value;
      const desig = desigEl.value.trim();
      const role = roleEl.value;
      const status = statusEl.value;
      const username = usernameEl.value.trim();
      const password = passwordEl.value.trim();
      const joiningDate = joiningDateEl.value;

      if(!/@ledgerworx\.me$/i.test(email)){
        alert('Email must end with @ledgerworx.me.');
        emailEl.focus();
        return;
      }

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
        <td class="lastonline-text">${escapeHtml(joiningDate)}</td>
        <td>
          <button class="btn btn-edit" data-action="edit">Edit</button>
          <button class="btn btn-delete" data-action="deactivate" style="margin-left:8px">Deactivate</button>
          <button class="btn" data-action="cancel" style="display:none;margin-left:8px">Cancel</button>
        </td>
      `;

      table.appendChild(newRow);
      const newActionBtn = newRow.querySelector('button[data-action="deactivate"], button[data-action="activate"]');
      setActionButtonState(newActionBtn, status === 'Inactive' ? 'activate' : 'deactivate');
      newRow.dataset.employeeId = employeeId;
      newRow.dataset.username = username;
      newRow.dataset.password = password;
      newRow.dataset.joiningDate = joiningDate;

      resetAddForm();
      closeAddModal();
    });
  }

  function escapeHtml(str){
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
});

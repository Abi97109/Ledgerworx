document.addEventListener('DOMContentLoaded', function() {
    const REQUEST_STORAGE_KEY = 'ledgerworxClientServiceRequests';
    const REQUEST_ID_BASELINE = 24;

    function readStoredRequests() {
        try {
            const rawValue = localStorage.getItem(REQUEST_STORAGE_KEY);
            if (!rawValue) return [];
            const parsedValue = JSON.parse(rawValue);
            return Array.isArray(parsedValue) ? parsedValue : [];
        } catch (error) {
            return [];
        }
    }

    function writeStoredRequests(requests) {
        localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(requests));
    }

    function parseRequestNumber(requestId) {
        const value = String(requestId || '').trim();
        const parts = value.split('-');
        if (parts.length < 3) return null;
        const numberValue = parseInt(parts[2], 10);
        return Number.isFinite(numberValue) ? numberValue : null;
    }

    function buildNextRequestId(existingRequests) {
        const maxFromStored = existingRequests.reduce((maxValue, item) => {
            const parsedNumber = parseRequestNumber(item && item.requestId);
            if (parsedNumber === null) return maxValue;
            return parsedNumber > maxValue ? parsedNumber : maxValue;
        }, REQUEST_ID_BASELINE);
        const nextNumber = maxFromStored + 1;
        return `LW-REQ-${String(nextNumber).padStart(3, '0')}`;
    }

    function formatDateShort(dateValue) {
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(dateValue);
    }

    function buildSubmittedProgress() {
        return [{
                label: 'Submitted',
                completed: true
            },
            {
                label: 'Review',
                completed: false
            },
            {
                label: 'Processing',
                completed: false
            },
            {
                label: 'Pending',
                completed: false
            },
            {
                label: 'Completed',
                completed: false
            }
        ];
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle && navToggle.addEventListener('click', () => {
        const visible = navLinks.style.display === 'flex';
        navLinks.style.display = visible ? 'none' : 'flex';
    });

    const profileToggle = document.getElementById('profileToggle');
    const profileNameBtn = document.getElementById('profileNameBtn');
    const profileArrow = document.getElementById('profileArrow');
    const profileDropdown = document.getElementById('profileDropdown');
    const profile = document.querySelector('.profile');
    let profileOpen = false;

    function showProfileDropdown() {
        if (!profileDropdown) return;
        profileDropdown.classList.add('active');
        if (profileArrow) profileArrow.classList.add('rotate');
        profileOpen = true;
    }

    function hideProfileDropdown() {
        if (!profileDropdown) return;
        profileDropdown.classList.remove('active');
        if (profileArrow) profileArrow.classList.remove('rotate');
        profileOpen = false;
    }

    function toggleProfileDropdown(e) {
        e && e.stopPropagation();
        if (profileOpen) hideProfileDropdown();
        else showProfileDropdown();
    }

    if (profileToggle) profileToggle.addEventListener('click', toggleProfileDropdown);
    if (profileNameBtn) profileNameBtn.addEventListener('click', toggleProfileDropdown);
    if (profileArrow) profileArrow.addEventListener('click', toggleProfileDropdown);

    document.addEventListener('click', function(e) {
        if (!profile) return;
        if (!profile.contains(e.target)) hideProfileDropdown();
    });

    const signoutBtn = document.getElementById('signoutBtn');
    signoutBtn && signoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof hideProfileDropdown === 'function') hideProfileDropdown();
        window.location.href = 'client-signoutaf.php';
    });

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalClose = document.getElementById('signoutClose');
    const modalCancel = document.getElementById('modalCancel');
    let modalCallback = null;

    function openModal(title, body, onConfirm) {
        modalTitle.textContent = title;
        modalBody.textContent = body;
        modal.setAttribute('aria-hidden', 'false');
        modalCallback = onConfirm || null;
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        modalCallback = null;
    }

    modalConfirm && modalConfirm.addEventListener('click', () => {
        if (modalCallback) modalCallback();
        closeModal();
    });
    modalClose && modalClose.addEventListener('click', closeModal);
    modalCancel && modalCancel.addEventListener('click', closeModal);
    modal && modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeModal();
    });

    const subserviceModal = document.getElementById('subserviceModal');
    const subserviceTitle = document.getElementById('subserviceTitle');
    const subserviceDescription = document.getElementById('subserviceDescription');
    const subserviceAmount = document.getElementById('subserviceAmount');
    const subserviceYears = document.getElementById('subserviceYears');
    const subserviceProceed = document.getElementById('subserviceProceed');
    const subserviceClose = document.getElementById('subserviceClose');
    const subserviceCancel = document.getElementById('subserviceCancel');
    const subserviceFormModal = document.getElementById('subserviceFormModal');
    const subserviceFormTitle = document.getElementById('subserviceFormTitle');
    const subserviceFormClose = document.getElementById('subserviceFormClose');
    const subserviceFormCancel = document.getElementById('subserviceFormCancel');
    const subserviceRequestForm = document.getElementById('subserviceRequestForm');
    const pageTitleElement = document.querySelector('.page-title');
    const selectedCategoryTitle = pageTitleElement ? pageTitleElement.textContent.trim() : 'Service Request';

    let selectedServiceName = '';
    let selectedServiceDescription = '';
    let selectedServiceAmount = '';
    let selectedServiceDuration = '';

    document.querySelectorAll('.subservice-trigger').forEach((btn) => {
        btn.addEventListener('click', function() {
            selectedServiceName = this.dataset.name || '';
            selectedServiceDescription = this.dataset.description || '';
            selectedServiceAmount = this.dataset.amount || 'N/A';
            selectedServiceDuration = this.dataset.years || 'N/A';

            subserviceTitle.textContent = selectedServiceName;
            subserviceDescription.textContent = selectedServiceDescription;
            subserviceAmount.textContent = selectedServiceAmount;
            subserviceYears.textContent = selectedServiceDuration;
            subserviceModal.setAttribute('aria-hidden', 'false');
        });
    });

    function closeSubserviceModal() {
        subserviceModal.setAttribute('aria-hidden', 'true');
    }

    subserviceClose && subserviceClose.addEventListener('click', closeSubserviceModal);
    subserviceCancel && subserviceCancel.addEventListener('click', closeSubserviceModal);
    subserviceModal && subserviceModal.addEventListener('click', function(e) {
        if (e.target === subserviceModal) closeSubserviceModal();
    });

    function openSubserviceFormModal() {
        subserviceFormTitle.textContent = 'Request Service - ' + selectedServiceName;
        subserviceFormModal.setAttribute('aria-hidden', 'false');
    }

    function closeSubserviceFormModal() {
        subserviceFormModal.setAttribute('aria-hidden', 'true');
    }

    subserviceFormClose && subserviceFormClose.addEventListener('click', closeSubserviceFormModal);
    subserviceFormCancel && subserviceFormCancel.addEventListener('click', closeSubserviceFormModal);
    subserviceFormModal && subserviceFormModal.addEventListener('click', function(e) {
        if (e.target === subserviceFormModal) closeSubserviceFormModal();
    });

    subserviceProceed && subserviceProceed.addEventListener('click', function() {
        closeSubserviceModal();
        openSubserviceFormModal();
    });

    subserviceRequestForm && subserviceRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!selectedServiceName) {
            openModal('Select Service', 'Please choose a service before submitting your request.');
            return;
        }

        const reqName = (document.getElementById('reqName').value || '').trim();
        const reqEmail = (document.getElementById('reqEmail').value || '').trim();
        const reqPhone = (document.getElementById('reqPhone').value || '').trim();
        const reqNotes = (document.getElementById('reqNotes').value || '').trim();
        const submittedAt = new Date();

        const storedRequests = readStoredRequests();
        const newRequest = {
            title: `${selectedCategoryTitle} - ${selectedServiceName}`,
            icon: 'fas fa-concierge-bell',
            iconColor: '#3498db',
            iconTone: 'blue',
            status: 'Submitted',
            requestId: buildNextRequestId(storedRequests),
            submittedOn: formatDateShort(submittedAt),
            dueDate: 'To be assigned',
            category: selectedCategoryTitle,
            overview: selectedServiceDescription || 'Service request submitted from the services page.',
            instructions: [
                'Our team will review your service request details.',
                'Upload any supporting files from My Requests if needed.',
                'Status will be updated once processing starts.'
            ],
            staffName: 'LedgerWorx Team',
            staffRole: 'Service Coordinator',
            progress: buildSubmittedProgress(),
            actionBtn: 'Upload Documents',
            createdAt: submittedAt.toISOString(),
            requester: {
                name: reqName,
                email: reqEmail,
                phone: reqPhone
            },
            notes: reqNotes,
            amount: selectedServiceAmount,
            duration: selectedServiceDuration,
            source: 'services-page'
        };

        storedRequests.unshift(newRequest);
        writeStoredRequests(storedRequests);

        this.reset();
        closeSubserviceFormModal();
        alert('Service request submitted successfully. It is now visible in My Requests with Submitted status.');
        window.location.href = 'client-request.php';
    });
});
    

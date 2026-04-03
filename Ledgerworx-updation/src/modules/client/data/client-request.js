const REQUEST_STORAGE_KEY = 'ledgerworxClientServiceRequests';
const ICON_TONE_CLASSES = ['orange', 'green', 'purple', 'blue', 'teal'];

function escapeHtml(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function formatDateShort(dateValue) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(dateValue);
}

function buildProgressFromStatus(status) {
    const normalizedStatus = String(status || '').trim().toLowerCase();
    const templates = {
        submitted: [true, false, false, false, false],
        'under review': [true, true, false, false, false],
        processing: [true, true, true, false, false],
        'in progress': [true, true, true, false, false],
        pending: [true, true, true, true, false],
        completed: [true, true, true, true, true]
    };
    const completedStates = templates[normalizedStatus] || templates.submitted;
    const labels = ['Submitted', 'Review', 'Processing', 'Pending', 'Completed'];

    return labels.map((label, index) => ({
        label: label,
        completed: completedStates[index]
    }));
}

function normalizeProgress(progress, status) {
    const fallbackProgress = buildProgressFromStatus(status);
    if (!Array.isArray(progress) || progress.length === 0) return fallbackProgress;

    return fallbackProgress.map((fallbackStep, index) => {
        const incomingStep = progress[index] || {};
        const labelValue = typeof incomingStep.label === 'string' && incomingStep.label.trim() ? incomingStep.label.trim() : fallbackStep.label;
        const completedValue = typeof incomingStep.completed === 'boolean' ? incomingStep.completed : fallbackStep.completed;
        return {
            label: labelValue,
            completed: completedValue
        };
    });
}

function deriveStatusFromProgress(progress) {
    if (!Array.isArray(progress) || progress.length === 0) return 'Submitted';

    let lastCompletedIndex = -1;
    progress.forEach((step, index) => {
        if (step && step.completed) lastCompletedIndex = index;
    });

    const statusByIndex = ['Submitted', 'Under Review', 'In Progress', 'Pending', 'Completed'];
    if (lastCompletedIndex < 0) return 'Submitted';
    return statusByIndex[Math.min(lastCompletedIndex, statusByIndex.length - 1)];
}

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

function normalizeStoredRequest(item, index) {
    if (!item || typeof item !== 'object') return null;

    const createdAt = item.createdAt ? new Date(item.createdAt) : new Date();
    const submittedOn = typeof item.submittedOn === 'string' && item.submittedOn.trim() ? item.submittedOn.trim() : formatDateShort(createdAt);
    const incomingProgress = normalizeProgress(item.progress, item.status);
    const resolvedStatus = typeof item.status === 'string' && item.status.trim() ? item.status.trim() : deriveStatusFromProgress(incomingProgress);
    const requestId = typeof item.requestId === 'string' && item.requestId.trim() ? item.requestId.trim() : `LW-REQ-S${String(index + 1).padStart(3, '0')}`;

    return {
        title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Service Request',
        icon: typeof item.icon === 'string' && item.icon.trim() ? item.icon.trim() : 'fas fa-concierge-bell',
        iconColor: typeof item.iconColor === 'string' && item.iconColor.trim() ? item.iconColor.trim() : '#3498db',
        iconTone: typeof item.iconTone === 'string' && item.iconTone.trim() ? item.iconTone.trim() : 'blue',
        status: resolvedStatus,
        requestId: requestId,
        submittedOn: submittedOn,
        dueDate: typeof item.dueDate === 'string' && item.dueDate.trim() ? item.dueDate.trim() : 'To be assigned',
        category: typeof item.category === 'string' && item.category.trim() ? item.category.trim() : 'Service Request',
        overview: typeof item.overview === 'string' && item.overview.trim() ? item.overview.trim() : 'Service request submitted from the services page.',
        instructions: Array.isArray(item.instructions) && item.instructions.length > 0 ? item.instructions : [
            'Our team will review your service request details.',
            'Please upload supporting documents if applicable.',
            'Status will update as the request progresses.'
        ],
        staffName: typeof item.staffName === 'string' && item.staffName.trim() ? item.staffName.trim() : 'LedgerWorx Team',
        staffRole: typeof item.staffRole === 'string' && item.staffRole.trim() ? item.staffRole.trim() : 'Service Coordinator',
        progress: incomingProgress,
        actionBtn: typeof item.actionBtn === 'string' && item.actionBtn.trim() ? item.actionBtn.trim() : 'Upload Documents'
    };
}

const defaultRequests = [{
        title: 'Business Setup - Trade License Issuance',
        icon: 'fas fa-briefcase',
        iconColor: '#f39c12',
        iconTone: 'orange',
        status: 'In Progress',
        requestId: 'LW-REQ-024',
        submittedOn: '12 Jan 2026',
        dueDate: 'Apr 25, 2026',
        category: 'Business Setup',
        overview: 'Prepare and submit quarterly business setup documentation and authority-facing records for review.',
        instructions: [
            'Review and finalize all authority submission records.',
            'Ensure all required attachments are complete and valid.',
            'Upload any pending documents through the Upload Documents button.'
        ],
        staffName: 'Jane Smith',
        staffRole: 'Trade License Specialist',
        progress: [{
                label: 'Submitted',
                completed: true
            },
            {
                label: 'Review',
                completed: true
            },
            {
                label: 'Processing',
                completed: true
            },
            {
                label: 'Pending',
                completed: false
            },
            {
                label: 'Completed',
                completed: false
            }
        ],
        actionBtn: 'Upload Documents'
    },
    {
        title: 'Accounting & Finance - Monthly Bookkeeping',
        icon: 'fas fa-file-invoice',
        iconColor: '#16a085',
        iconTone: 'green',
        status: 'Under Review',
        requestId: 'LW-REQ-018',
        submittedOn: '8 Jan 2026',
        dueDate: 'May 10, 2026',
        category: 'Accounting',
        overview: 'Complete monthly bookkeeping and reconciliation of all accounts with accurate financial record-keeping.',
        instructions: [
            'Record all transactions in the accounting software.',
            'Reconcile bank accounts and credit cards.',
            'Prepare monthly financial statements and reports.'
        ],
        staffName: 'John Davis',
        staffRole: 'Senior Accountant',
        progress: [{
                label: 'Submitted',
                completed: true
            },
            {
                label: 'Review',
                completed: true
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
        ],
        actionBtn: 'Review Details'
    },
    {
        title: 'Taxation - VAT Filing',
        icon: 'fas fa-calculator',
        iconColor: '#6f42c1',
        iconTone: 'purple',
        status: 'Completed',
        requestId: 'LW-REQ-015',
        submittedOn: '5 Jan 2026',
        dueDate: 'Mar 15, 2026',
        category: 'Taxation',
        overview: 'VAT return filed with all required tax compliance checks and submission confirmation.',
        instructions: [
            'Compile all VAT transactions and invoices.',
            'Calculate VAT amounts accurately.',
            'Submit VAT return to the relevant tax authority.'
        ],
        staffName: 'Sarah Wilson',
        staffRole: 'Tax Consultant',
        progress: [{
                label: 'Submitted',
                completed: true
            },
            {
                label: 'Review',
                completed: true
            },
            {
                label: 'Processing',
                completed: true
            },
            {
                label: 'Approved',
                completed: true
            },
            {
                label: 'Completed',
                completed: true
            }
        ],
        actionBtn: 'View Confirmation'
    }
];

const storedRequests = readStoredRequests()
    .map((item, index) => normalizeStoredRequest(item, index))
    .filter((item) => item !== null);

let requests = [...storedRequests, ...defaultRequests];
let activeRequestIndex = null;
const uploadedDocumentsByRequest = {};
const requestDocumentApiUrl = '../client-php/api/client-documents.php';

function buildCardProgressMarkup(progress) {
    const safeProgress = Array.isArray(progress) ? progress : buildProgressFromStatus('submitted');
    let progressHtml = '<div class="progress">';

    safeProgress.forEach((step, index) => {
        progressHtml += `<div class="step${step.completed ? ' active' : ''}"></div>`;
        if (index < safeProgress.length - 1) {
            const nextStep = safeProgress[index + 1];
            const lineIsActive = Boolean(step.completed && nextStep && nextStep.completed);
            progressHtml += `<div class="line${lineIsActive ? ' active' : ''}"></div>`;
        }
    });
    progressHtml += '</div>';

    return progressHtml;
}

function buildProgressLabelsMarkup(progress) {
    const safeProgress = Array.isArray(progress) ? progress : buildProgressFromStatus('submitted');
    const labelsMarkup = safeProgress.map((step) => `<span>${escapeHtml(step.label)}</span>`).join('');
    return `<div class="labels">${labelsMarkup}</div>`;
}

function resolveIconToneClass(request, index) {
    const tone = String(request.iconTone || '').trim().toLowerCase();
    if (ICON_TONE_CLASSES.includes(tone)) return tone;
    return ICON_TONE_CLASSES[index % ICON_TONE_CLASSES.length];
}

function renderRequestCards() {
    const requestCardsContainer = document.getElementById('requestCards');
    if (!requestCardsContainer) return;

    requestCardsContainer.innerHTML = '';
    requests.forEach((request, index) => {
        const toneClass = resolveIconToneClass(request, index);
        const card = document.createElement('div');
        card.className = 'request-card';
        card.tabIndex = 0;
        card.innerHTML = `
            <div class="left">
                <div class="icon-box ${toneClass}">
                    <i class="${escapeHtml(request.icon)}"></i>
                </div>
                <div class="request-info">
                    <h4>${escapeHtml(request.title)}</h4>
                    <small>Request ID: ${escapeHtml(request.requestId)} | Submitted ${escapeHtml(request.submittedOn)}</small>
                </div>
            </div>
            <div class="right">
                <div class="status-text">Status: ${escapeHtml(request.status)}</div>
                ${buildCardProgressMarkup(request.progress)}
                ${buildProgressLabelsMarkup(request.progress)}
            </div>
            <div class="arrow"><i class="fas fa-chevron-right"></i></div>
        `;

        card.addEventListener('click', () => openRequestModal(index));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openRequestModal(index);
            }
        });
        requestCardsContainer.appendChild(card);
    });
}

function renderUploadedDocuments(index) {
    const uploadedDocsList = document.getElementById('modalUploadedDocuments');
    const actionBtn = document.getElementById('modalActionBtn');
    if (!uploadedDocsList || typeof index !== 'number') return;

    const request = requests[index];
    const docs = uploadedDocumentsByRequest[index] || [];
    uploadedDocsList.innerHTML = '';

    if (docs.length === 0) {
        const li = document.createElement('li');
        li.className = 'uploaded-doc-empty';
        li.textContent = 'No documents uploaded yet.';
        uploadedDocsList.appendChild(li);
        if (actionBtn && request && request.actionBtn.toLowerCase().includes('upload')) {
            actionBtn.textContent = request.actionBtn;
        }
        return;
    }

    docs.forEach((fileName) => {
        const li = document.createElement('li');
        li.textContent = fileName;
        uploadedDocsList.appendChild(li);
    });

    if (actionBtn && request && request.actionBtn.toLowerCase().includes('upload')) {
        actionBtn.textContent = 'Upload More Documents';
    }
}

async function syncUploadedDocumentsForRequest(index) {
    const request = requests[index];
    const clientEmail = (document.body.dataset.clientEmail || '').trim().toLowerCase();
    if (!request || !clientEmail) return;

    try {
        const response = await fetch(
            `${requestDocumentApiUrl}?client_email=${encodeURIComponent(clientEmail)}&request_id=${encodeURIComponent(request.requestId)}`,
            { headers: { Accept: 'application/json' } }
        );
        const result = await response.json();
        if (!response.ok || !result.ok) return;

        uploadedDocumentsByRequest[index] = Array.isArray(result.documents)
            ? result.documents.map((item) => item.original_name || item.document_title).filter(Boolean)
            : [];

        if (activeRequestIndex === index) {
            renderUploadedDocuments(index);
        }
    } catch (error) {
        console.error('Failed to load request documents', error);
    }
}

function openRequestModal(index) {
    const request = requests[index];
    const modal = document.getElementById('requestModal');
    if (!request || !modal) return;

    activeRequestIndex = index;

    document.getElementById('modalTitle').textContent = request.title;
    document.getElementById('modalIcon').innerHTML = `<i class="${request.icon}"></i>`;
    document.getElementById('modalIcon').style.background = request.iconColor;
    document.getElementById('modalDueDate').textContent = request.dueDate;
    document.getElementById('modalCategory').textContent = request.category;
    document.getElementById('modalOverview').textContent = request.overview;
    document.getElementById('modalStaffName').textContent = request.staffName;
    document.getElementById('modalStaffRole').textContent = request.staffRole;
    document.getElementById('modalActionBtn').textContent = request.actionBtn;

    const progressSteps = document.getElementById('progressSteps');
    progressSteps.innerHTML = '';
    request.progress.forEach((step, i) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'progress-step';
        if (step.completed && i < request.progress.length - 1) {
            stepDiv.classList.add('completed');
        } else if (step.completed) {
            stepDiv.classList.add('active');
        }

        const circle = document.createElement('div');
        circle.className = 'progress-step-circle';
        circle.textContent = step.completed ? 'OK' : (i + 1);
        stepDiv.appendChild(circle);

        const label = document.createElement('span');
        label.textContent = step.label;
        stepDiv.appendChild(label);

        if (i < request.progress.length - 1) {
            const line = document.createElement('div');
            line.className = 'progress-step-line';
            if (step.completed) line.classList.add('active');
            stepDiv.appendChild(line);
        }

        progressSteps.appendChild(stepDiv);
    });

    const instructions = document.getElementById('modalInstructions');
    instructions.innerHTML = '';
    request.instructions.forEach((instruction) => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructions.appendChild(li);
    });

    renderUploadedDocuments(index);
    syncUploadedDocumentsForRequest(index);
    modal.classList.add('active');
}

function closeRequestModal() {
    const modal = document.getElementById('requestModal');
    if (!modal) return;
    modal.classList.remove('active');
}

function handleRequestPrimaryAction() {
    if (activeRequestIndex === null) return;
    const request = requests[activeRequestIndex];
    const action = (request.actionBtn || '').toLowerCase();

    if (action.includes('upload')) {
        const input = document.getElementById('requestDocumentInput');
        if (input) input.click();
        return;
    }

    if (action.includes('review')) {
        const modalBody = document.querySelector('#requestModal .modal-body');
        const sections = document.querySelectorAll('#requestModal .modal-section');
        if (modalBody) modalBody.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        sections.forEach((section) => {
            section.classList.add('review-highlight');
            setTimeout(() => section.classList.remove('review-highlight'), 850);
        });
        return;
    }

    if (action.includes('confirmation')) {
        window.location.href = 'client-documents.php';
    }
}

document.addEventListener('DOMContentLoaded', function() {
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
        hideProfileDropdown();
        window.location.href = 'client-signoutaf.php';
    });

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirm = document.querySelector('.modal-confirm');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.querySelector('.modal-cancel');
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

    renderRequestCards();

    const requestDocumentInput = document.getElementById('requestDocumentInput');
    requestDocumentInput && requestDocumentInput.addEventListener('change', async function(e) {
        if (activeRequestIndex === null) return;
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        const request = requests[activeRequestIndex];
        const clientEmail = (document.body.dataset.clientEmail || '').trim().toLowerCase();

        if (!request || !clientEmail) {
            openModal('Upload Failed', 'Client email is missing, so the document could not be synced to Zoho.');
            requestDocumentInput.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('client_email', clientEmail);
        formData.append('request_id', request.requestId);
        formData.append('request_title', request.title);
        formData.append('document_title', request.title);
        selectedFiles.forEach((file) => {
            formData.append('documents[]', file, file.name);
        });

        try {
            const response = await fetch(requestDocumentApiUrl, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!response.ok || !result.ok) {
                throw new Error(result.message || 'Document upload failed.');
            }

            const existing = uploadedDocumentsByRequest[activeRequestIndex] || [];
            (result.documents || []).forEach((documentRecord) => {
                const displayName = documentRecord.original_name || documentRecord.document_title;
                if (displayName && !existing.includes(displayName)) {
                    existing.push(displayName);
                }
            });
            uploadedDocumentsByRequest[activeRequestIndex] = existing;
            renderUploadedDocuments(activeRequestIndex);
            openModal('Upload Complete', 'The selected document(s) were uploaded and synced to the client Zoho folder.');
        } catch (error) {
            openModal('Upload Failed', error.message || 'Document upload failed.');
        } finally {
            requestDocumentInput.value = '';
        }
    });

    const modalActionBtn = document.getElementById('modalActionBtn');
    modalActionBtn && modalActionBtn.addEventListener('click', handleRequestPrimaryAction);

    const requestModal = document.getElementById('requestModal');
    requestModal && requestModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeRequestModal();
        }
    });

    if (!requests.length) {
        openModal('No Requests Yet', 'You have not submitted any service requests yet.');
    }
});

window.openRequestModal = openRequestModal;
window.closeRequestModal = closeRequestModal;

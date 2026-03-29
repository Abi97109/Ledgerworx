const ICON_TONE_CLASSES = ['orange', 'green', 'purple', 'blue', 'teal'];

export function formatClientDateShort(dateValue) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(dateValue);
}

export function buildClientProgressFromStatus(status) {
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
        label,
        completed: completedStates[index]
    }));
}

export function normalizeClientProgress(progress, status) {
    const fallbackProgress = buildClientProgressFromStatus(status);
    if (!Array.isArray(progress) || progress.length === 0) {
        return fallbackProgress;
    }

    return fallbackProgress.map((fallbackStep, index) => {
        const incomingStep = progress[index] || {};
        const labelValue =
            typeof incomingStep.label === 'string' && incomingStep.label.trim()
                ? incomingStep.label.trim()
                : fallbackStep.label;
        const completedValue =
            typeof incomingStep.completed === 'boolean'
                ? incomingStep.completed
                : fallbackStep.completed;

        return {
            label: labelValue,
            completed: completedValue
        };
    });
}

export function deriveClientRequestStatus(progress) {
    if (!Array.isArray(progress) || progress.length === 0) {
        return 'Submitted';
    }

    let lastCompletedIndex = -1;
    progress.forEach((step, index) => {
        if (step && step.completed) {
            lastCompletedIndex = index;
        }
    });

    const statusByIndex = ['Submitted', 'Under Review', 'In Progress', 'Pending', 'Completed'];
    if (lastCompletedIndex < 0) {
        return 'Submitted';
    }

    return statusByIndex[Math.min(lastCompletedIndex, statusByIndex.length - 1)];
}

export function getClientRequestIconTone(request, index) {
    const tone = String(request.iconTone || '').trim().toLowerCase();
    if (ICON_TONE_CLASSES.includes(tone)) {
        return tone;
    }

    return ICON_TONE_CLASSES[index % ICON_TONE_CLASSES.length];
}

export function createSubmittedClientRequest({
    title,
    category,
    overview,
    requester,
    notes,
    amount,
    duration,
    submittedAt,
    requestId
}) {
    const createdAt = submittedAt || new Date();
    const resolvedRequestId =
        typeof requestId === 'string' && requestId.trim()
            ? requestId.trim()
            : `LW-REQ-${createdAt.getTime()}`;

    return {
        id: resolvedRequestId,
        title,
        icon: 'fas fa-concierge-bell',
        iconColor: '#3498db',
        iconTone: 'blue',
        status: 'Submitted',
        requestId: resolvedRequestId,
        submittedOn: formatClientDateShort(createdAt),
        dueDate: 'To be assigned',
        category,
        overview,
        instructions: [
            'Our team will review your service request details.',
            'Upload any supporting files from My Requests if needed.',
            'Status will be updated once processing starts.'
        ],
        staffName: 'LedgerWorx Team',
        staffRole: 'Service Coordinator',
        progress: buildClientProgressFromStatus('submitted'),
        actionBtn: 'Upload Documents',
        createdAt: createdAt.toISOString(),
        requester,
        notes,
        amount,
        duration,
        source: 'services-page'
    };
}

export { ICON_TONE_CLASSES };

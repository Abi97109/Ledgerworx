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
    const labels = ['Submitted', 'Documents Upload', 'Review', 'Payment', 'Processing', 'Confirmation', 'Completed'];
    const stageIndexMap = {
        submitted: 0,
        'documents upload': 1,
        'documents required': 1,
        review: 2,
        'under review': 2,
        payment: 3,
        'payment pending': 3,
        'payment required': 3,
        'awaiting payment confirmation': 3,
        processing: 4,
        'in progress': 4,
        confirmation: 5,
        completed: 6,
        cancelled: 0
    };
    const activeIndex = stageIndexMap[normalizedStatus] ?? 0;

    return labels.map((label, index) => ({
        label,
        completed: index <= activeIndex
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

    const statusByIndex = ['Submitted', 'Documents Upload', 'Review', 'Payment', 'Processing', 'Confirmation', 'Completed'];
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
            'Your request has been submitted successfully.',
            'Upload the required documents to move it into review.',
            'You will receive notifications as the request progresses.'
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

export function parseAedAmount(text) {
    if (!text) return 0;
    const normalized = String(text).replace(/[^0-9.-]/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function formatAedAmount(value) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return `AED ${new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(safeValue)}`;
}

export function computeDueNowTotal(items) {
    if (!Array.isArray(items)) return 0;

    return items.reduce((total, item) => {
        const statusClass = item?.statusClass || '';
        if (statusClass === 'payment-required' || statusClass === 'not-completed') {
            return total + parseAedAmount(item.amount);
        }
        return total;
    }, 0);
}

export function buildClientAvatar(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1f8f8b&color=fff&size=96`;
}

export function submitLegacyPost(action, payload) {
    const form = document.createElement('form');
    form.method = 'post';
    form.action = action;

    Object.keys(payload).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}
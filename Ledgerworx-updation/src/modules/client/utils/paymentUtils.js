export function parseAedAmount(text) {
    if (!text) {
        return 0;
    }

    const normalized = String(text).replace(/[^0-9.-]/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function formatAedAmount(value) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return (
        'AED ' +
        new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(safeValue)
    );
}

export function getClientPaymentTotals(items) {
    return (items || []).reduce(
        (totals, item) => {
            const amount = parseAedAmount(item.amount);

            if (item.statusKey === 'paid') {
                totals.paid += amount;
                return totals;
            }

            if (item.statusKey === 'upcoming') {
                totals.upcoming += amount;
                return totals;
            }

            if (item.statusKey === 'payment-required' || item.statusKey === 'not-completed') {
                totals.dueNow += amount;
            }

            return totals;
        },
        {
            dueNow: 0,
            upcoming: 0,
            paid: 0
        }
    );
}

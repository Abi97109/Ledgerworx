import React, { useMemo, useState } from 'react';

const overallData = {
  week: {
    label: 'This week',
    revenue: 'AED 231,590',
    growth: '40.0',
    refund: '2.5',
    online: '23.4',
    note:
      'Performance is strong this week with a 40.0 growth rate. Online selling is driving 23.4 of total volume, while refunds remain low at 2.5.',
  },
  month: {
    label: 'This month',
    revenue: 'AED 928,420',
    growth: '28.0',
    refund: '3.1',
    online: '18.7',
    note:
      'Monthly revenue remains healthy with balanced channel performance. Online demand is stable, while refund levels are still tightly controlled.',
  },
  year: {
    label: 'This year',
    revenue: 'AED 5,842,300',
    growth: '62.0',
    refund: '4.3',
    online: '31.8',
    note:
      'Annual performance shows strong expansion across UAE operations. Digital sales continue to lift overall revenue while refund exposure stays manageable.',
  },
};

const salesSeries = [
  { day: 'Mon', year: 52, month: 80, week: 112 },
  { day: 'Tue', year: 72, month: 58, week: 130 },
  { day: 'Wed', year: 45, month: 104, week: 90 },
  { day: 'Thu', year: 98, month: 68, week: 118 },
  { day: 'Fri', year: 58, month: 88, week: 104 },
  { day: 'Sat', year: 32, month: 52, week: 76 },
  { day: 'Sun', year: 72, month: 124, week: 134 },
];

const accountData = {
  week: { receivables: 85.0, cash: 15.0 },
  month: { receivables: 72.0, cash: 28.0 },
  year: { receivables: 64.0, cash: 36.0 },
};

const clientData = {
  week: { leads: 48.0, customers: 30.0 },
  month: { leads: 63.0, customers: 46.0 },
  year: { leads: 79.0, customers: 61.0 },
};

const salesToggleConfig = [
  { key: 'year', label: 'Year', color: 'is-gray', barClass: 'sales-bar-gray' },
  { key: 'month', label: 'Month', color: 'is-blue', barClass: 'sales-bar-blue' },
  { key: 'week', label: 'Week', color: 'is-green', barClass: 'sales-bar-green' },
];

const timeframeConfig = [
  { key: 'year', label: 'Year' },
  { key: 'month', label: 'Month' },
  { key: 'week', label: 'Week' },
];

function ToggleRow({ label, color, active, onClick }) {
  const classes = ['toggle-pill', color, active ? 'is-active' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={`toggle-line ${active ? 'toggle-line-active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className={classes}></span>
      <span>{label}</span>
    </button>
  );
}

function formatValue(value) {
  return Number(value).toFixed(1);
}

function Dashboard() {
  const [overallTimeframe, setOverallTimeframe] = useState('week');
  const [salesToggles, setSalesToggles] = useState({
    year: true,
    month: true,
    week: true,
  });
  const [accountsTimeframe, setAccountsTimeframe] = useState('week');
  const [clientsTimeframe, setClientsTimeframe] = useState('week');
  const [hoveredAccount, setHoveredAccount] = useState(null);

  const overall = overallData[overallTimeframe];
  const account = accountData[accountsTimeframe];
  const clients = clientData[clientsTimeframe];

  const visibleSalesKeys = useMemo(
    () => salesToggleConfig.filter((item) => salesToggles[item.key]),
    [salesToggles]
  );

  const handleSalesToggle = (key) => {
    const enabledCount = Object.values(salesToggles).filter(Boolean).length;
    if (salesToggles[key] && enabledCount === 1) {
      return;
    }

    setSalesToggles((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="container dashboard-page">
      <h1 className="dashboard-title">MANAGER DASHBOARD</h1>
      <p className="dashboard-sub">
        Welcome back, U. Detailed performance insights for UAE Operations.
      </p>

      <section className="dashboard-grid">
        <article className="dashboard-card dashboard-card-main">
          <div className="dashboard-card-head">
            <h2 className="section-title">Overall</h2>
            <select
              className="dashboard-select"
              value={overall.label}
              onChange={(event) => {
                const selected = Object.entries(overallData).find(
                  ([, value]) => value.label === event.target.value
                );
                if (selected) {
                  setOverallTimeframe(selected[0]);
                }
              }}
            >
              {Object.values(overallData).map((option) => (
                <option key={option.label}>{option.label}</option>
              ))}
            </select>
          </div>

          <p className="revenue-figure">{overall.revenue}</p>
          <p className="revenue-label">Total revenue</p>

          <div className="dashboard-note">{overall.note}</div>

          <div className="summary-stats">
            <div className="summary-stat">
              <strong>{overall.growth}</strong>
              <span>Growth</span>
            </div>
            <div className="summary-stat">
              <strong>{overall.refund}</strong>
              <span>Refund</span>
            </div>
            <div className="summary-stat">
              <strong>{overall.online}</strong>
              <span>Online</span>
            </div>
          </div>
        </article>

        <article className="dashboard-card dashboard-card-wide">
          <div className="dashboard-card-head">
            <div>
              <h2 className="section-title">Sales Performance</h2>
              <p className="section-subtitle">Comparison across timeframes</p>
            </div>

            <div className="toggle-stack">
              {salesToggleConfig.map((toggle) => (
                <ToggleRow
                  key={toggle.key}
                  label={toggle.label}
                  color={toggle.color}
                  active={salesToggles[toggle.key]}
                  onClick={() => handleSalesToggle(toggle.key)}
                />
              ))}
            </div>
          </div>

          <div className="sales-chart" aria-label="Sales performance chart">
            {salesSeries.map((item) => (
              <div className="sales-day" key={item.day}>
                <div className="sales-bars">
                  {visibleSalesKeys.map((series) => (
                    <div
                      key={series.key}
                      className={`sales-bar ${series.barClass}`}
                      style={{ height: `${item[series.key]}px` }}
                    >
                      <span className="graph-tooltip">
                        {series.label}: {formatValue(item[series.key])}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="sales-label">{item.day}</span>
              </div>
            ))}
          </div>

          <p className="chart-meta">
            Showing {visibleSalesKeys.map((item) => item.label).join(', ')} data
          </p>
        </article>

        <article className="dashboard-card dashboard-card-side">
          <div className="dashboard-card-head">
            <div>
              <h2 className="section-title">Accounts distribution</h2>
              <p className="accounts-copy">Receivables vs Cash</p>
            </div>

            <div className="toggle-stack">
              {timeframeConfig.map((toggle) => (
                <ToggleRow
                  key={toggle.key}
                  label={toggle.label}
                  color={toggle.key === accountsTimeframe ? 'is-green' : ''}
                  active={toggle.key === accountsTimeframe}
                  onClick={() => setAccountsTimeframe(toggle.key)}
                />
              ))}
            </div>
          </div>

          <div
            className="accounts-pie"
            aria-label="Accounts distribution pie chart"
            style={{
              background: `conic-gradient(#4a958d 0 ${account.receivables}%, #3f81ec ${account.receivables}% 100%)`,
            }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const angle =
                ((Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 360) % 360;
              const splitAngle = (account.receivables / 100) * 360;

              setHoveredAccount(angle <= splitAngle ? 'receivables' : 'cash');
            }}
            onMouseLeave={() => setHoveredAccount(null)}
          >
            {hoveredAccount ? (
              <span className="graph-tooltip graph-tooltip-pie">
                {hoveredAccount === 'receivables'
                  ? `Receivables: ${formatValue(account.receivables)}`
                  : `Cash on Hand: ${formatValue(account.cash)}`}
              </span>
            ) : null}
          </div>

          <div className="accounts-legend">
            <div className="legend-row">
              <span className="legend-dot legend-dot-green"></span>
              <span>Receivables: {formatValue(account.receivables)}</span>
            </div>
            <div className="legend-row">
              <span className="legend-dot legend-dot-blue"></span>
              <span>Cash on Hand: {formatValue(account.cash)}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-card dashboard-card-bottom">
        <div className="clients-head">
          <h2 className="section-title">Clients</h2>

          <div className="toggle-stack toggle-stack-inline" aria-label="Client timeframe toggles">
            {timeframeConfig.map((toggle) => (
              <ToggleRow
                key={toggle.key}
                label={toggle.label}
                color={toggle.key === clientsTimeframe ? 'is-green' : ''}
                active={toggle.key === clientsTimeframe}
                onClick={() => setClientsTimeframe(toggle.key)}
              />
            ))}
          </div>
        </div>

        <div className="progress-shell">
          <div className="progress-block">
            <p className="progress-label">Leads</p>
            <div className="progress-track">
              <div
                className="progress-fill progress-fill-blue progress-fill-hover"
                style={{ width: `${clients.leads}%` }}
              >
                <span className="graph-tooltip">
                  Leads: {formatValue(clients.leads)}
                </span>
              </div>
            </div>
            <p className="progress-value">{formatValue(clients.leads)}</p>
          </div>

          <div className="progress-block">
            <p className="progress-label">Customers</p>
            <div className="progress-track">
              <div
                className="progress-fill progress-fill-green progress-fill-hover"
                style={{ width: `${clients.customers}%` }}
              >
                <span className="graph-tooltip">
                  Customers: {formatValue(clients.customers)}
                </span>
              </div>
            </div>
            <p className="progress-value">{formatValue(clients.customers)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

import React, { useMemo, useState } from 'react';

const accountSnapshots = {
  week: {
    cards: {
      revenue: 'AED 420,000',
      received: 'AED 315,000',
      pending: 'AED 82,000',
      overdue: 'AED 23,000',
    },
    revenueSeries: [180000, 260000, 210000, 300000],
    collection: 61,
    transactions: [
      { client: 'NexGen Tech', invoice: 'INV-1098', amount: 'AED 120,000', status: 'PAID' },
      { client: 'Global Ventures', invoice: 'INV-1048', amount: 'AED 58,000', status: 'PENDING' },
    ],
  },
  month: {
    cards: {
      revenue: 'AED 1,250,000',
      received: 'AED 950,000',
      pending: 'AED 254,000',
      overdue: 'AED 46,000',
    },
    revenueSeries: [300000, 450000, 200000, 300000],
    collection: 75,
    transactions: [
      { client: 'NexGen Tech', invoice: 'INV-1100', amount: 'AED 900,000', status: 'PAID' },
      { client: 'Global Ventures', invoice: 'INV-1055', amount: 'AED 179,000', status: 'PENDING' },
    ],
  },
  year: {
    cards: {
      revenue: 'AED 8,600,000',
      received: 'AED 6,900,000',
      pending: 'AED 1,180,000',
      overdue: 'AED 520,000',
    },
    revenueSeries: [2200000, 3200000, 2800000, 3600000],
    collection: 82,
    transactions: [
      { client: 'NexGen Tech', invoice: 'INV-2088', amount: 'AED 2,400,000', status: 'PAID' },
      { client: 'Global Ventures', invoice: 'INV-1980', amount: 'AED 860,000', status: 'PENDING' },
    ],
  },
};

const periods = ['week', 'month', 'year'];
const chartModes = ['Bar', 'Curvy', 'Pie'];
const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

function formatCurrency(value) {
  return value.toLocaleString();
}

function Accounts() {
  const [timeframe, setTimeframe] = useState('month');
  const [chartMode, setChartMode] = useState('Curvy');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredRevenueSlice, setHoveredRevenueSlice] = useState(null);
  const [hoveredCollection, setHoveredCollection] = useState(null);

  const current = accountSnapshots[timeframe];
  const maxValue = Math.max(...current.revenueSeries);

  const linePoints = useMemo(
    () =>
      current.revenueSeries.map((value, index) => {
        const x = 70 + index * 135;
        const y = 240 - (value / maxValue) * 145;
        return { x, y, value };
      }),
    [current.revenueSeries, maxValue]
  );

  const linePath = useMemo(() => {
    return linePoints.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      const previous = linePoints[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  }, [linePoints]);

  const areaPath = `${linePath} L ${linePoints[linePoints.length - 1].x} 240 L ${linePoints[0].x} 240 Z`;

  return (
    <div className="container accounts-reference-page">
      <div className="accounts-reference-header">
        <h1 className="accounts-reference-title">Accounts Dashboard</h1>

        <div className="accounts-time-toggle">
          {periods.map((period) => (
            <button
              key={period}
              type="button"
              className={timeframe === period ? 'active' : ''}
              onClick={() => setTimeframe(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <section className="accounts-kpis">
        <article className="accounts-kpi-card">
          <p className="accounts-kpi-label">TOTAL REVENUE</p>
          <h2 className="accounts-kpi-value">{current.cards.revenue}</h2>
        </article>
        <article className="accounts-kpi-card">
          <p className="accounts-kpi-label">PAYMENTS RECEIVED</p>
          <h2 className="accounts-kpi-value">{current.cards.received}</h2>
        </article>
        <article className="accounts-kpi-card">
          <p className="accounts-kpi-label">PENDING BALANCE</p>
          <h2 className="accounts-kpi-value">{current.cards.pending}</h2>
        </article>
        <article className="accounts-kpi-card">
          <p className="accounts-kpi-label">OVERDUE INVOICES</p>
          <h2 className="accounts-kpi-value">{current.cards.overdue}</h2>
        </article>
      </section>

      <section className="accounts-main-grid">
        <article className="accounts-chart-card">
          <div className="accounts-card-head">
            <h3 className="accounts-section-title">Revenue Analysis</h3>

            <div className="accounts-chart-toggle">
              {chartModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={chartMode === mode ? 'active' : ''}
                  onClick={() => setChartMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="accounts-chart-frame">
            {chartMode === 'Bar' ? (
              <div className="accounts-bar-chart">
                {current.revenueSeries.map((value, index) => (
                  <div className="accounts-bar-group" key={weekLabels[index]}>
                    <div
                      className="accounts-bar graph-pop"
                      style={{ height: `${(value / maxValue) * 185}px` }}
                    >
                      <span className="graph-tooltip">{formatCurrency(value)}</span>
                    </div>
                    <span>{weekLabels[index]}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {chartMode === 'Curvy' ? (
              <svg viewBox="0 0 520 260" className="accounts-line-svg" aria-label="Revenue analysis curved chart">
                {[0, 1, 2, 3, 4, 5].map((line) => (
                  <line
                    key={`h-${line}`}
                    x1="60"
                    y1={40 + line * 40}
                    x2="485"
                    y2={40 + line * 40}
                    className="accounts-grid-line"
                  />
                ))}

                {weekLabels.map((_, index) => (
                  <line
                    key={`v-${index}`}
                    x1={70 + index * 135}
                    y1="40"
                    x2={70 + index * 135}
                    y2="240"
                    className="accounts-grid-line accounts-grid-line-vertical"
                  />
                ))}

                <path d={areaPath} className="accounts-area-path" />
                <path d={linePath} className="accounts-line-path" />

                {linePoints.map((point, index) => (
                  <g key={weekLabels[index]}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3.5"
                      className="accounts-line-point interactive-point"
                      onMouseEnter={() => setHoveredPoint(point)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}

                {hoveredPoint && (
                  <foreignObject
                    x={hoveredPoint.x - 40}
                    y={hoveredPoint.y - 38}
                    width="96"
                    height="28"
                  >
                    <div className="tooltip">{formatCurrency(hoveredPoint.value)}</div>
                  </foreignObject>
                )}

                {[0, 1, 2, 3, 4].map((tick) => {
                  const amount = maxValue - tick * (maxValue / 4);
                  return (
                    <text key={tick} x="18" y={44 + tick * 50} className="accounts-axis-label">
                      {formatCurrency(Math.round(amount))}
                    </text>
                  );
                })}

                {weekLabels.map((label, index) => (
                  <text key={label} x={56 + index * 135} y="255" className="accounts-axis-label">
                    {label}
                  </text>
                ))}
              </svg>
            ) : null}

            {chartMode === 'Pie' ? (
              <div className="accounts-pie-panel">
                <div
                  className="accounts-revenue-pie graph-pop"
                  style={{
                    background: `conic-gradient(#4a958d 0 38%, #6ab8b0 38% 66%, #9fd7d2 66% 84%, #dfe7f2 84% 100%)`,
                  }}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const angle =
                      ((Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 360) % 360;

                    if (angle <= 136.8) {
                      setHoveredRevenueSlice(`${weekLabels[0]}: ${formatCurrency(current.revenueSeries[0])}`);
                    } else if (angle <= 237.6) {
                      setHoveredRevenueSlice(`${weekLabels[1]}: ${formatCurrency(current.revenueSeries[1])}`);
                    } else if (angle <= 302.4) {
                      setHoveredRevenueSlice(`${weekLabels[2]}: ${formatCurrency(current.revenueSeries[2])}`);
                    } else {
                      setHoveredRevenueSlice(`${weekLabels[3]}: ${formatCurrency(current.revenueSeries[3])}`);
                    }
                  }}
                  onMouseLeave={() => setHoveredRevenueSlice(null)}
                >
                  {hoveredRevenueSlice ? (
                    <span className="graph-tooltip graph-tooltip-pie">{hoveredRevenueSlice}</span>
                  ) : null}
                </div>
                <div className="accounts-pie-legend">
                  {current.revenueSeries.map((value, index) => (
                    <div key={weekLabels[index]} className="accounts-pie-legend-row graph-pop">
                      <span className={`accounts-pie-dot accounts-pie-dot-${index + 1}`}></span>
                      <span>
                        {weekLabels[index]}: {formatCurrency(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>

        <article className="accounts-collection-card">
          <h3 className="accounts-section-title">Collection Status</h3>
          <div
            className="accounts-collection-donut graph-pop"
            style={{
              background: `conic-gradient(#438f87 0 ${current.collection}%, #e8edf7 ${current.collection}% 100%)`,
            }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const angle =
                ((Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 360) % 360;
              const splitAngle = (current.collection / 100) * 360;

              setHoveredCollection(
                angle <= splitAngle
                  ? `Collected: ${current.collection}`
                  : `Open: ${100 - current.collection}`
              );
            }}
            onMouseLeave={() => setHoveredCollection(null)}
          >
            {hoveredCollection ? (
              <span className="graph-tooltip graph-tooltip-pie">{hoveredCollection}</span>
            ) : null}
            <div className="accounts-collection-inner"></div>
          </div>
        </article>
      </section>

      <section className="accounts-history-card">
        <div className="accounts-card-head">
          <h3 className="accounts-section-title">Transaction History</h3>

          <div className="accounts-status-filter">
            <button type="button" className="accounts-status-button paid">
              Paid
            </button>
            <button type="button" className="accounts-status-button pending">
              Pending
            </button>
          </div>
        </div>

        <div className="accounts-table-wrap">
          <table className="accounts-table">
            <thead>
              <tr>
                <th>CLIENT NAME</th>
                <th>INVOICE ID</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {current.transactions.map((row) => (
                <tr key={row.invoice}>
                  <td>{row.client}</td>
                  <td>{row.invoice}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={`accounts-status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Accounts;

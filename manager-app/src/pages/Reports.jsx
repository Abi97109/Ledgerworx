import React, { useMemo, useState } from 'react';

const reportData = {
  Week: {
    summary: {
      revenue: 'AED 420,000',
      invoices: '64',
      collected: 'AED 336,000',
      overdue: '7',
    },
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    revenue: [120000, 150000, 142000, 198000, 236000, 284000],
    collected: [90000, 118000, 111000, 170000, 208000, 244000],
    invoiceStatus: { paid: 49, pending: 10, overdue: 5 },
    table: [
      { client: 'Emirates Group', invoices: 4, paid: 3, value: 'AED 118,000', outstanding: 'AED 26,000' },
      { client: 'Al Noor Trading', invoices: 3, paid: 2, value: 'AED 94,000', outstanding: 'AED 18,000' },
      { client: 'Bright Solutions', invoices: 5, paid: 4, value: 'AED 86,000', outstanding: 'AED 12,000' },
    ],
  },
  Month: {
    summary: {
      revenue: 'AED 1,250,000',
      invoices: '210',
      collected: 'AED 980,000',
      overdue: '22',
    },
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    revenue: [120000, 160000, 140000, 230000, 255000, 330000],
    collected: [90000, 132000, 108000, 192000, 218000, 282000],
    invoiceStatus: { paid: 152, pending: 36, overdue: 22 },
    table: [
      { client: 'Emirates Group', invoices: 12, paid: 9, value: 'AED 366,000', outstanding: 'AED 91,000' },
      { client: 'Al Noor Trading', invoices: 9, paid: 5, value: 'AED 320,000', outstanding: 'AED 110,000' },
      { client: 'Bright Solutions', invoices: 11, paid: 8, value: 'AED 230,000', outstanding: 'AED 30,000' },
    ],
  },
  Year: {
    summary: {
      revenue: 'AED 8,420,000',
      invoices: '1,840',
      collected: 'AED 6,910,000',
      overdue: '186',
    },
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    revenue: [980000, 1260000, 1420000, 1880000, 2360000, 3140000],
    collected: [820000, 1060000, 1240000, 1660000, 2050000, 2720000],
    invoiceStatus: { paid: 1248, pending: 406, overdue: 186 },
    table: [
      { client: 'Emirates Group', invoices: 96, paid: 74, value: 'AED 2,840,000', outstanding: 'AED 684,000' },
      { client: 'Al Noor Trading', invoices: 82, paid: 55, value: 'AED 2,140,000', outstanding: 'AED 730,000' },
      { client: 'Bright Solutions', invoices: 76, paid: 61, value: 'AED 1,860,000', outstanding: 'AED 296,000' },
    ],
  },
};

function formatNumber(value) {
  return value.toLocaleString();
}

function Reports() {
  const [timeframe, setTimeframe] = useState('Month');
  const [hoverPoint, setHoverPoint] = useState(null);
  const [hoverSlice, setHoverSlice] = useState(null);

  const current = reportData[timeframe];
  const maxVal = Math.max(...current.revenue, ...current.collected);

  const pointsRevenue = useMemo(
    () =>
      current.revenue.map((value, index) => ({
        key: `revenue-${index}`,
        label: current.labels[index],
        value,
        type: 'Revenue',
        x: 40 + index * 160,
        y: 230 - (value / maxVal) * 170,
      })),
    [current, maxVal]
  );

  const pointsCollected = useMemo(
    () =>
      current.collected.map((value, index) => ({
        key: `collected-${index}`,
        label: current.labels[index],
        value,
        type: 'Collected',
        x: 40 + index * 160,
        y: 230 - (value / maxVal) * 170,
      })),
    [current, maxVal]
  );

  const buildPath = (points) =>
    points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, '');

  const revenuePath = buildPath(pointsRevenue);
  const collectedPath = buildPath(pointsCollected);
  const areaPath = `${revenuePath} L ${pointsRevenue[pointsRevenue.length - 1].x} 230 L ${pointsRevenue[0].x} 230 Z`;

  const totalInvoices =
    current.invoiceStatus.paid + current.invoiceStatus.pending + current.invoiceStatus.overdue;
  const donutRadius = 78;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const invoiceSlices = [
    { key: 'paid', label: 'Paid', value: current.invoiceStatus.paid, color: '#12cfa5' },
    { key: 'pending', label: 'Pending', value: current.invoiceStatus.pending, color: '#472ef4' },
    { key: 'overdue', label: 'Overdue', value: current.invoiceStatus.overdue, color: '#f26255' },
  ];

  let cumulativeOffset = 0;
  const donutSegments = invoiceSlices.map((slice) => {
    const length = (slice.value / totalInvoices) * donutCircumference;
    const segment = {
      ...slice,
      dashArray: `${length} ${donutCircumference - length}`,
      dashOffset: -cumulativeOffset,
    };
    cumulativeOffset += length;
    return segment;
  });

  return (
    <div className="container reports-reference-page">
      <div className="reports-reference-header">
        <h1 className="reports-reference-title">Business Reports</h1>
      </div>

      <section className="reports-summary-grid">
        <article className="reports-summary-card">
          <div className="reports-summary-icon money">$</div>
          <div>
            <p className="reports-summary-label">REVENUE</p>
            <h2 className="reports-summary-value">{current.summary.revenue}</h2>
          </div>
        </article>
        <article className="reports-summary-card">
          <div className="reports-summary-icon docs">D</div>
          <div>
            <p className="reports-summary-label">INVOICES</p>
            <h2 className="reports-summary-value">{current.summary.invoices}</h2>
          </div>
        </article>
        <article className="reports-summary-card">
          <div className="reports-summary-icon chart">C</div>
          <div>
            <p className="reports-summary-label">COLLECTED</p>
            <h2 className="reports-summary-value">{current.summary.collected}</h2>
          </div>
        </article>
        <article className="reports-summary-card">
          <div className="reports-summary-icon alert">!</div>
          <div>
            <p className="reports-summary-label">OVERDUE</p>
            <h2 className="reports-summary-value">{current.summary.overdue}</h2>
          </div>
        </article>
      </section>

      <section className="reports-reference-main">
        <article className="reports-chart-card">
          <div className="reports-card-head">
            <h3 className="reports-card-title">Revenue Performance</h3>
            <select
              className="reports-select"
              value={timeframe}
              onChange={(event) => setTimeframe(event.target.value)}
            >
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>

          <div className="reports-chart-wrap">
            <svg viewBox="0 0 900 270" className="reports-line-chart" aria-label="Revenue performance chart">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <line
                  key={`grid-${index}`}
                  x1="40"
                  x2="840"
                  y1={40 + index * 38}
                  y2={40 + index * 38}
                  className="reports-grid-line"
                />
              ))}

              <path d={areaPath} className="reports-area-fill" />
              <path d={revenuePath} className="reports-revenue-line" />
              <path d={collectedPath} className="reports-collected-line" />

              {pointsRevenue.map((point) => (
                <circle
                  key={point.key}
                  className="reports-chart-point interactive-point"
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  onMouseEnter={() => setHoverPoint(point)}
                  onMouseLeave={() => setHoverPoint(null)}
                />
              ))}

              {pointsCollected.map((point) => (
                <circle
                  key={point.key}
                  className="reports-chart-point reports-chart-point-secondary interactive-point"
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  onMouseEnter={() => setHoverPoint(point)}
                  onMouseLeave={() => setHoverPoint(null)}
                />
              ))}

              {hoverPoint ? (
                <foreignObject
                  x={hoverPoint.x - 58}
                  y={hoverPoint.y - 38}
                  width="152"
                  height="34"
                >
                  <div className="tooltip tooltip-wide">{`${hoverPoint.type}: ${formatNumber(hoverPoint.value)}`}</div>
                </foreignObject>
              ) : null}

              {[0, 1, 2, 3, 4, 5].map((tick) => (
                <text
                  key={`axis-${tick}`}
                  x="0"
                  y={42 + tick * 38}
                  className="reports-axis-label"
                >
                  {formatNumber(Math.round(maxVal - tick * (maxVal / 5)))}
                </text>
              ))}
            </svg>

            <div className="reports-x-labels">
              {current.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="reports-donut-card">
          <h3 className="reports-card-title">Invoice Status</h3>

          <div className="reports-donut">
            {hoverSlice ? <span className="graph-tooltip graph-tooltip-pie">{hoverSlice}</span> : null}
            <svg viewBox="0 0 220 220" className="reports-donut-svg" aria-label="Invoice status donut chart">
              <circle className="reports-donut-track" cx="110" cy="110" r={donutRadius} />
              {donutSegments.map((slice) => (
                <circle
                  key={slice.key}
                  className={`reports-donut-segment ${hoverSlice?.startsWith(slice.label) ? 'is-hovered' : ''}`}
                  cx="110"
                  cy="110"
                  r={donutRadius}
                  stroke={slice.color}
                  strokeDasharray={slice.dashArray}
                  strokeDashoffset={slice.dashOffset}
                  onMouseEnter={() => setHoverSlice(`${slice.label}: ${slice.value}`)}
                  onMouseLeave={() => setHoverSlice(null)}
                />
              ))}
            </svg>
            <div className="reports-donut-inner"></div>
          </div>

          <div className="reports-legend">
            <div className="reports-legend-row">
              <span className="reports-legend-dot paid"></span>
              <span>Paid</span>
              <strong>{current.invoiceStatus.paid}</strong>
            </div>
            <div className="reports-legend-row">
              <span className="reports-legend-dot pending"></span>
              <span>Pending</span>
              <strong>{current.invoiceStatus.pending}</strong>
            </div>
            <div className="reports-legend-row">
              <span className="reports-legend-dot overdue"></span>
              <span>Overdue</span>
              <strong>{current.invoiceStatus.overdue}</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="reports-table-card">
        <h3 className="reports-card-title">Top Client Distribution</h3>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>INVOICES</th>
                <th>PAID</th>
                <th>TOTAL VALUE</th>
                <th>OUTSTANDING</th>
              </tr>
            </thead>
            <tbody>
              {current.table.map((row) => (
                <tr key={row.client}>
                  <td>{row.client}</td>
                  <td>{row.invoices}</td>
                  <td>{row.paid}</td>
                  <td>{row.value}</td>
                  <td className="reports-outstanding">{row.outstanding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Reports;

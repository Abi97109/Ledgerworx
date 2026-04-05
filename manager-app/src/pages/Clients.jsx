import React, { useMemo, useState } from 'react';

const clientData = {
  Daily: {
    stats: [
      { title: 'TOTAL CLIENT BASE', value: '320', growth: '+2.1% vs prev', tone: 'positive', card: 'blue' },
      { title: 'COMPLIANT ACCOUNTS', value: '250', growth: '+1.8% vs prev', tone: 'positive', card: 'green' },
      { title: 'NEW ONBOARDING', value: '10', growth: '+3.2% vs prev', tone: 'warning', card: 'yellow' },
      { title: 'RISK/RENEWAL PENDING', value: '4', growth: '-1.5% vs prev', tone: 'negative', card: 'red' },
    ],
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
    graph: [12, 18, 26, 38, 52, 61, 73, 82],
    performance: '+6.4 PERFORMANCE',
  },
  Weekly: {
    stats: [
      { title: 'TOTAL CLIENT BASE', value: '340', growth: '+3.2% vs prev', tone: 'positive', card: 'blue' },
      { title: 'COMPLIANT ACCOUNTS', value: '260', growth: '+2.4% vs prev', tone: 'positive', card: 'green' },
      { title: 'NEW ONBOARDING', value: '12', growth: '+5.1% vs prev', tone: 'warning', card: 'yellow' },
      { title: 'RISK/RENEWAL PENDING', value: '6', growth: '-4.3% vs prev', tone: 'negative', card: 'red' },
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    graph: [20, 34, 48, 65, 84, 98, 110],
    performance: '+9.8 PERFORMANCE',
  },
  Monthly: {
    stats: [
      { title: 'TOTAL CLIENT BASE', value: '353', growth: '+5.2% vs prev', tone: 'positive', card: 'blue' },
      { title: 'COMPLIANT ACCOUNTS', value: '280', growth: '+4.7% vs prev', tone: 'positive', card: 'green' },
      { title: 'NEW ONBOARDING', value: '16', growth: '+14.3% vs prev', tone: 'warning', card: 'yellow' },
      { title: 'RISK/RENEWAL PENDING', value: '8', growth: '-11.1% vs prev', tone: 'negative', card: 'red' },
    ],
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    graph: [68, 118, 172, 208],
    performance: '+12.4 PERFORMANCE',
  },
  Yearly: {
    stats: [
      { title: 'TOTAL CLIENT BASE', value: '420', growth: '+12.0% vs prev', tone: 'positive', card: 'blue' },
      { title: 'COMPLIANT ACCOUNTS', value: '350', growth: '+10.0% vs prev', tone: 'positive', card: 'green' },
      { title: 'NEW ONBOARDING', value: '40', growth: '+20.0% vs prev', tone: 'warning', card: 'yellow' },
      { title: 'RISK/RENEWAL PENDING', value: '15', growth: '-8.0% vs prev', tone: 'negative', card: 'red' },
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    graph: [60, 88, 120, 158, 194, 230, 270, 312, 356, 394, 432, 470],
    performance: '+18.9 PERFORMANCE',
  },
};

const hubPerformance = {
  'Kochi Central': {
    Daily: { totalServices: 34, activeContracts: 29, renewals: 4 },
    Weekly: { totalServices: 92, activeContracts: 78, renewals: 11 },
    Monthly: { totalServices: 140, activeContracts: 120, renewals: 20 },
    Yearly: { totalServices: 510, activeContracts: 448, renewals: 62 },
  },
  'Trivandrum South': {
    Daily: { totalServices: 28, activeContracts: 22, renewals: 5 },
    Weekly: { totalServices: 84, activeContracts: 66, renewals: 14 },
    Monthly: { totalServices: 128, activeContracts: 101, renewals: 27 },
    Yearly: { totalServices: 470, activeContracts: 391, renewals: 79 },
  },
  'Calicut North': {
    Daily: { totalServices: 19, activeContracts: 16, renewals: 3 },
    Weekly: { totalServices: 61, activeContracts: 49, renewals: 8 },
    Monthly: { totalServices: 104, activeContracts: 86, renewals: 18 },
    Yearly: { totalServices: 398, activeContracts: 334, renewals: 64 },
  },
  'Dubai Hub': {
    Daily: { totalServices: 41, activeContracts: 36, renewals: 3 },
    Weekly: { totalServices: 121, activeContracts: 105, renewals: 12 },
    Monthly: { totalServices: 176, activeContracts: 152, renewals: 24 },
    Yearly: { totalServices: 640, activeContracts: 571, renewals: 69 },
  },
  'London Office': {
    Daily: { totalServices: 23, activeContracts: 20, renewals: 2 },
    Weekly: { totalServices: 73, activeContracts: 62, renewals: 7 },
    Monthly: { totalServices: 118, activeContracts: 96, renewals: 22 },
    Yearly: { totalServices: 430, activeContracts: 356, renewals: 74 },
  },
  'Singapore Hub': {
    Daily: { totalServices: 26, activeContracts: 21, renewals: 4 },
    Weekly: { totalServices: 79, activeContracts: 63, renewals: 11 },
    Monthly: { totalServices: 122, activeContracts: 98, renewals: 24 },
    Yearly: { totalServices: 452, activeContracts: 364, renewals: 88 },
  },
};

const hubs = ['Kochi Central', 'Trivandrum South', 'Calicut North', 'Dubai Hub', 'London Office', 'Singapore Hub'];

function Clients() {
  const [timeframe, setTimeframe] = useState('Monthly');
  const [activeHub, setActiveHub] = useState('Kochi Central');
  const [hoverPoint, setHoverPoint] = useState(null);

  const current = clientData[timeframe];
  const currentHub = hubPerformance[activeHub][timeframe];
  const maxValue = Math.max(...current.graph);
  const pointStep = current.labels.length > 1 ? 560 / (current.labels.length - 1) : 0;

  const points = useMemo(
    () =>
      current.graph.map((value, index) => ({
        label: current.labels[index],
        value,
        x: 18 + index * pointStep,
        y: 250 - (value / maxValue) * 180,
      })),
    [current.graph, current.labels, maxValue, pointStep]
  );

  const linePath = useMemo(() => {
    return points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  }, [points]);

  const areaPath = `${linePath} L ${points[points.length - 1].x} 258 L ${points[0].x} 258 Z`;

  return (
    <div className="container clients-reference-page">
      <div className="clients-reference-header">
        <div>
          <h1 className="clients-reference-title">Client Portfolio Management</h1>
          <p className="clients-reference-subtitle">
            Strategic oversight of active contracts, regional metrics, and document compliance.
          </p>
        </div>

        <div className="clients-time-toggle">
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
            <button
              key={period}
              type="button"
              className={timeframe === period ? 'active' : ''}
              onClick={() => setTimeframe(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <section className="clients-stat-grid">
        {current.stats.map((item) => (
          <article key={item.title} className={`clients-stat-card ${item.card}`}>
            <p className="clients-stat-title">{item.title}</p>
            <h2 className="clients-stat-value">{item.value}</h2>
            <p className={`clients-stat-growth ${item.tone}`}>{item.growth}</p>
          </article>
        ))}
      </section>

      <section className="clients-hub-card">
        <div className="clients-card-head">
          <h3 className="clients-card-title">Service Hub Performance</h3>
          <button type="button" className="clients-ellipsis">
            ...
          </button>
        </div>

        <div className="clients-hub-tabs">
          {hubs.map((hub) => (
            <button
              key={hub}
              type="button"
              className={activeHub === hub ? 'active' : ''}
              onClick={() => setActiveHub(hub)}
            >
              {hub}
            </button>
          ))}
        </div>

        <div className="clients-hub-metrics">
          <div className="clients-hub-metric blue graph-pop">
            <strong>{currentHub.totalServices}</strong>
            <span>TOTAL SERVICES</span>
          </div>
          <div className="clients-hub-metric green graph-pop">
            <strong>{currentHub.activeContracts}</strong>
            <span>ACTIVE CONTRACTS</span>
          </div>
          <div className="clients-hub-metric red graph-pop">
            <strong>{currentHub.renewals}</strong>
            <span>RENEWAL REQ.</span>
          </div>
        </div>

        <div className="clients-hub-note">
          Regional data is synchronized with the central CRM every 6 hours. "Active Contracts" exclude any entities with expired trade licenses or pending VAT filings.
        </div>
      </section>

      <section className="clients-chart-card">
        <div className="clients-card-head">
          <h3 className="clients-card-title">Client Acquisition Velocity</h3>
          <span className="clients-performance-tag">{current.performance}</span>
        </div>

        <div className="clients-chart-wrap">
          <svg viewBox="0 0 620 270" className="clients-line-chart" aria-label="Client acquisition velocity chart">
            <path d={areaPath} className="clients-area-fill" />
            <path d={linePath} className="clients-line-stroke" />

            {points.map((point) => (
              <g key={point.label}>
                <circle
                  className="clients-chart-point interactive-point"
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  onMouseEnter={() => setHoverPoint(point)}
                  onMouseLeave={() => setHoverPoint(null)}
                />
              </g>
            ))}

            {hoverPoint ? (
              <foreignObject
                x={hoverPoint.x - 34}
                y={hoverPoint.y - 36}
                width="110"
                height="28"
              >
                <div className="tooltip">{`${hoverPoint.label}: ${hoverPoint.value}`}</div>
              </foreignObject>
            ) : null}

            {current.labels.map((label, index) => (
              <text key={label} x={12 + index * pointStep} y="268" className="clients-axis-label">
                {label}
              </text>
            ))}
          </svg>
        </div>
      </section>
    </div>
  );
}

export default Clients;

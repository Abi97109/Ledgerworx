import React, { useMemo, useState } from 'react';

const salesData = {
  Day: {
    totalSales: 'AED 1,500',
    totalSalesTrend: 'Down 2.0 vs yesterday',
    totalSalesTone: 'negative',
    totalRevenue: 'AED 12k',
    totalRevenueTrend: 'Up 5.0 vs yesterday',
    totalRevenueTone: 'positive',
    leads: '5',
    leadsTrend: '+1 vs yesterday',
    leadsTone: 'neutral',
    conversion: '20.0',
    conversionTrend: 'Stable',
    conversionTone: 'muted',
    goal: '5',
    goalLabel: 'Sales vs Target Period',
    funnel: [
      { label: 'New Lead', value: '5', width: 100, color: 'dark' },
      { label: 'Contacted', value: '4', width: 90, color: 'dark' },
      { label: 'Interested', value: '3', width: 70, color: 'mid' },
      { label: 'Proposal Sent', value: '2', width: 50, color: 'mid' },
      { label: 'Negotiation', value: '1', width: 28, color: 'light' },
      { label: 'Converted', value: '1', width: 28, color: 'light' },
    ],
    leadsTable: [
      { name: 'Daily Client A', source: 'Call', stage: 'Interested', stageTone: 'blue', person: 'Akram', value: 'AED 5k' },
      { name: 'Retail Walk-in', source: 'Direct', stage: 'Contacted', stageTone: 'green', person: 'Rami', value: 'AED 2k' },
    ],
  },
  Week: {
    totalSales: 'AED 9,200',
    totalSalesTrend: 'Up 12.0 vs last week',
    totalSalesTone: 'positive',
    totalRevenue: 'AED 55k',
    totalRevenueTrend: 'Up 9.0 vs last week',
    totalRevenueTone: 'positive',
    leads: '22',
    leadsTrend: '+6 vs last week',
    leadsTone: 'neutral',
    conversion: '27.3',
    conversionTrend: 'Improving',
    conversionTone: 'positive',
    goal: '18',
    goalLabel: 'Sales vs Target Period',
    funnel: [
      { label: 'New Lead', value: '22', width: 100, color: 'dark' },
      { label: 'Contacted', value: '18', width: 88, color: 'dark' },
      { label: 'Interested', value: '14', width: 74, color: 'mid' },
      { label: 'Proposal Sent', value: '10', width: 58, color: 'mid' },
      { label: 'Negotiation', value: '6', width: 36, color: 'light' },
      { label: 'Converted', value: '6', width: 36, color: 'light' },
    ],
    leadsTable: [
      { name: 'Emirates Office', source: 'Referral', stage: 'Interested', stageTone: 'blue', person: 'Akram', value: 'AED 14k' },
      { name: 'Metro Retail', source: 'Direct', stage: 'Contacted', stageTone: 'green', person: 'Rami', value: 'AED 9k' },
    ],
  },
  Month: {
    totalSales: 'AED 32,000',
    totalSalesTrend: 'Up 18.0 vs last month',
    totalSalesTone: 'positive',
    totalRevenue: 'AED 180k',
    totalRevenueTrend: 'Up 14.0 vs last month',
    totalRevenueTone: 'positive',
    leads: '85',
    leadsTrend: '+24 vs last month',
    leadsTone: 'neutral',
    conversion: '28.2',
    conversionTrend: 'Stable',
    conversionTone: 'muted',
    goal: '60',
    goalLabel: 'Sales vs Target Period',
    funnel: [
      { label: 'New Lead', value: '85', width: 100, color: 'dark' },
      { label: 'Contacted', value: '70', width: 88, color: 'dark' },
      { label: 'Interested', value: '55', width: 72, color: 'mid' },
      { label: 'Proposal Sent', value: '40', width: 54, color: 'mid' },
      { label: 'Negotiation', value: '28', width: 32, color: 'light' },
      { label: 'Converted', value: '24', width: 32, color: 'light' },
    ],
    leadsTable: [
      { name: 'Noor Holdings', source: 'Call', stage: 'Interested', stageTone: 'blue', person: 'Akram', value: 'AED 42k' },
      { name: 'Retail Walk-in', source: 'Direct', stage: 'Contacted', stageTone: 'green', person: 'Rami', value: 'AED 18k' },
    ],
  },
  Year: {
    totalSales: 'AED 410,000',
    totalSalesTrend: 'Up 24.0 vs last year',
    totalSalesTone: 'positive',
    totalRevenue: 'AED 1.2M',
    totalRevenueTrend: 'Up 20.0 vs last year',
    totalRevenueTone: 'positive',
    leads: '900',
    leadsTrend: '+180 vs last year',
    leadsTone: 'neutral',
    conversion: '33.3',
    conversionTrend: 'Strong',
    conversionTone: 'positive',
    goal: '250',
    goalLabel: 'Sales vs Target Period',
    funnel: [
      { label: 'New Lead', value: '900', width: 100, color: 'dark' },
      { label: 'Contacted', value: '750', width: 90, color: 'dark' },
      { label: 'Interested', value: '600', width: 76, color: 'mid' },
      { label: 'Proposal Sent', value: '450', width: 58, color: 'mid' },
      { label: 'Negotiation', value: '320', width: 38, color: 'light' },
      { label: 'Converted', value: '300', width: 38, color: 'light' },
    ],
    leadsTable: [
      { name: 'Global Ventures', source: 'Referral', stage: 'Interested', stageTone: 'blue', person: 'Akram', value: 'AED 110k' },
      { name: 'City Retail', source: 'Direct', stage: 'Contacted', stageTone: 'green', person: 'Rami', value: 'AED 72k' },
    ],
  },
};

function Sales() {
  const [activeTab, setActiveTab] = useState('Day');
  const current = useMemo(() => salesData[activeTab], [activeTab]);

  return (
    <div className="container sales-page sales-reference-page">
      <div className="sales-reference-header">
        <h1 className="sales-reference-title">Sales Performance</h1>

        <div className="sales-reference-tabs">
          {['Day', 'Week', 'Month', 'Year'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <section className="sales-reference-kpis">
        <article className="sales-kpi-card">
          <p className="sales-kpi-label">Total Sales</p>
          <h2 className="sales-kpi-value">{current.totalSales}</h2>
          <p className={`sales-kpi-trend ${current.totalSalesTone}`}>{current.totalSalesTrend}</p>
        </article>

        <article className="sales-kpi-card">
          <p className="sales-kpi-label">Total Revenue</p>
          <h2 className="sales-kpi-value">{current.totalRevenue}</h2>
          <p className={`sales-kpi-trend ${current.totalRevenueTone}`}>{current.totalRevenueTrend}</p>
        </article>

        <article className="sales-kpi-card">
          <p className="sales-kpi-label">Leads</p>
          <h2 className="sales-kpi-value">{current.leads}</h2>
          <p className={`sales-kpi-trend ${current.leadsTone}`}>{current.leadsTrend}</p>
        </article>

        <article className="sales-kpi-card">
          <p className="sales-kpi-label">Lead Conversion</p>
          <h2 className="sales-kpi-value">{current.conversion}</h2>
          <p className={`sales-kpi-trend ${current.conversionTone}`}>{current.conversionTrend}</p>
        </article>
      </section>

      <section className="sales-reference-main">
        <article className="sales-funnel-card">
          <h3 className="sales-section-title">Lead Funnel Analysis</h3>

          <div className="sales-funnel-stack">
            {current.funnel.map((step) => (
              <div
                key={step.label}
                className={`sales-funnel-bar sales-funnel-${step.color} graph-pop`}
                style={{ width: `${step.width}%` }}
              >
                <span className="graph-tooltip">
                  {step.label}: {step.value}
                </span>
                {step.label}:{step.value}
              </div>
            ))}
          </div>
        </article>

        <article className="sales-goal-card">
          <h3 className="sales-section-title sales-goal-title">Goal Progress</h3>
          <div className="sales-goal-value">{current.goal}</div>
          <p className="sales-goal-copy">{current.goalLabel}</p>
          <button type="button" className="sales-export-button">
            Export Sales Report
          </button>
        </article>
      </section>

      <section className="sales-table-card">
        <h3 className="sales-section-title">Recent Lead Tracking</h3>

        <div className="sales-table-wrap">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Source</th>
                <th>Stage</th>
                <th>Salesperson</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {current.leadsTable.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.source}</td>
                  <td>
                    <span className={`sales-stage-badge ${row.stageTone}`}>{row.stage}</span>
                  </td>
                  <td>{row.person}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Sales;

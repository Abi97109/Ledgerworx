import React, { useState } from "react";

function Reports() {
  const [hoverPoint, setHoverPoint] = useState(null);

  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  const revenue = [120000, 150000, 130000, 220000, 250000, 320000];
  const collected = [90000, 120000, 105000, 190000, 210000, 280000];

  const maxVal = Math.max(...revenue, ...collected);

  const generateCurve = (data) =>
    data.reduce((acc, val, i, arr) => {
      const x = i * 80;
      const y = 200 - (val / maxVal) * 150;

      if (i === 0) return `M ${x} ${y}`;

      const prevX = (i - 1) * 80;
      const prevY = 200 - (arr[i - 1] / maxVal) * 150;
      const cx = (prevX + x) / 2;

      return acc + ` Q ${cx} ${prevY}, ${x} ${y}`;
    }, "");

  return (
    <div className="container">

      <h1 className="page-title">Business Reports</h1>

      {/* TOP STATS */}
      <div className="stats-grid">
        <div className="card">Revenue <h2>AED 1,250,000</h2></div>
        <div className="card">Invoices <h2>210</h2></div>
        <div className="card">Collected <h2>AED 980,000</h2></div>
        <div className="card">Overdue <h2>22</h2></div>
      </div>

      {/* GRAPH + DONUT */}
      <div className="reports-grid">

        {/* GRAPH */}
        <div className="card large">
          <h3>Revenue Performance</h3>

          <svg viewBox="0 0 500 220" className="line-svg">

            {/* AREA */}
            <path
              d={generateCurve(revenue) + " L 400 200 L 0 200 Z"}
              fill="rgba(99,102,241,0.15)"
            />

            {/* REVENUE LINE */}
            <path
              d={generateCurve(revenue)}
              stroke="#4f46e5"
              strokeWidth="3"
              fill="none"
            />

            {/* COLLECTED LINE */}
            <path
              d={generateCurve(collected)}
              stroke="#14b8a6"
              strokeWidth="3"
              fill="none"
            />

            {/* POINTS */}
            {revenue.map((val, i) => {
              const x = i * 80;
              const y = 200 - (val / maxVal) * 150;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#4f46e5"
                    onMouseEnter={() =>
                      setHoverPoint({ x, y, value: val })
                    }
                    onMouseLeave={() => setHoverPoint(null)}
                  />
                </g>
              );
            })}

            {/* TOOLTIP */}
            {hoverPoint && (
              <foreignObject
                x={hoverPoint.x - 40}
                y={hoverPoint.y - 40}
                width="80"
                height="30"
              >
                <div className="tooltip">
                  {hoverPoint.value.toLocaleString()}
                </div>
              </foreignObject>
            )}
          </svg>

          {/* LABELS */}
          <div className="x-labels">
            {months.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* DONUT */}
        <div className="card">
          <h3>Invoice Status</h3>

          <div
            className="donut"
            style={{
              background: `conic-gradient(
                #10b981 0% 70%,
                #4f46e5 70% 85%,
                #ef4444 85% 100%
              )`,
            }}
          >
            <div className="donut-inner"></div>
          </div>

          <div className="legend">
            <p><span className="dot green"></span> Paid 152</p>
            <p><span className="dot blue"></span> Pending 36</p>
            <p><span className="dot red"></span> Overdue 22</p>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="card">
        <h3>Top Client Distribution</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Invoices</th>
              <th>Paid</th>
              <th>Total Value</th>
              <th>Outstanding</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Emirates Group</td>
              <td>12</td>
              <td>9</td>
              <td>AED 366,000</td>
              <td className="red">AED 91,000</td>
            </tr>

            <tr>
              <td>Al Noor Trading</td>
              <td>9</td>
              <td>5</td>
              <td>AED 320,000</td>
              <td className="red">AED 110,000</td>
            </tr>

            <tr>
              <td>Bright Solutions</td>
              <td>11</td>
              <td>8</td>
              <td>AED 230,000</td>
              <td className="red">AED 30,000</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Reports;
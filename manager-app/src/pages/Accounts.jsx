import React, { useState } from "react";

function Accounts() {
  const [timeframe, setTimeframe] = useState("month");
  const [hoverIndex, setHoverIndex] = useState(null);

  // DATA
  const revenueData = {
    week: [300000, 450000, 200000, 300000],
    month: [400000, 600000, 350000, 500000],
    year: [600000, 900000, 500000, 800000],
  };

  const donutData = {
    week: 75,
    month: 65,
    year: 85,
  };

  const data = revenueData[timeframe];
  const maxValue = Math.max(...data);

  return (
    <div className="container">

      {/* TITLE */}
      <h1 className="page-title">Accounts Dashboard</h1>

      {/* TOGGLE */}
      <div className="top-toggle">
        {["week", "month", "year"].map((t) => (
          <button
            key={t}
            className={timeframe === t ? "active" : ""}
            onClick={() => setTimeframe(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="card">
          <p>TOTAL REVENUE</p>
          <h2>AED 1,250,000</h2>
        </div>

        <div className="card">
          <p>PAYMENTS RECEIVED</p>
          <h2>AED 950,000</h2>
        </div>

        <div className="card">
          <p>PENDING BALANCE</p>
          <h2>AED 254,000</h2>
        </div>

        <div className="card">
          <p>OVERDUE INVOICES</p>
          <h2>AED 46,000</h2>
        </div>
      </div>

      {/* GRAPH SECTION */}
      <div className="accounts-grid">

        {/* BAR GRAPH */}
        <div className="card">
          <div className="card-header">
            <h3>Revenue Analysis</h3>

            <div className="toggle-buttons">
              <button className="active">Bar</button>
              <button>Curvy</button>
              <button>Pie</button>
            </div>
          </div>

          <div className="line-chart">
            <div className="bar-chart">

              {data.map((val, i) => (
                <div key={i} className="bar-group">

                  <div
                    className="bar"
                    style={{
                      height: `${(val / maxValue) * 200}px`,
                    }}
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {hoverIndex === i && (
                      <div className="bar-tooltip">
                        {val.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <span>Week {i + 1}</span>

                </div>
              ))}

            </div>
          </div>
        </div>

        {/* DONUT */}
        <div className="card">
          <h3>Collection Status</h3>

          <div
            className="donut"
            style={{
              background: `conic-gradient(
                #3f8f83 ${donutData[timeframe]}%,
                #cbd5e1 0%
              )`,
            }}
          >
            <div className="donut-inner"></div>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-header">
          <h3>Transaction History</h3>

          <div className="status-buttons">
            <button className="paid">Paid</button>
            <button className="pending">Pending</button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>CLIENT NAME</th>
              <th>INVOICE ID</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>NexGen Tech</td>
              <td>INV-1100</td>
              <td>AED 900,000</td>
              <td><span className="badge paid">PAID</span></td>
            </tr>

            <tr>
              <td>Global Ventures</td>
              <td>INV-1055</td>
              <td>AED 179,000</td>
              <td><span className="badge pending">PENDING</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Accounts;
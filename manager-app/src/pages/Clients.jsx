import React, { useState } from "react";

function Clients() {
  const [timeframe, setTimeframe] = useState("monthly");

  // 🔥 DATA
  const data = {
    daily: {
      stats: [320, 250, 10, 4],
      growth: ["+2.1%", "+1.5%", "+3.2%", "-2.1%"],
      graph: [5, 8, 6, 10, 7, 9, 12],
    },
    weekly: {
      stats: [340, 260, 12, 6],
      growth: ["+3.2%", "+2.4%", "+5.1%", "-4.3%"],
      graph: [20, 30, 40, 50, 60, 70, 80],
    },
    monthly: {
      stats: [353, 280, 16, 8],
      growth: ["+5.2%", "+4.7%", "+14.3%", "-11.1%"],
      graph: [10, 20, 35, 50, 70, 95, 120, 150, 180, 210, 240, 260],
    },
    yearly: {
      stats: [420, 350, 40, 15],
      growth: ["+12%", "+10%", "+20%", "-8%"],
      graph: [50, 80, 120, 160, 200, 250, 300, 350, 400, 450, 500, 550],
    },
  };

  const current = data[timeframe];

  // 🔥 SCALE GRAPH PROPERLY
  const maxVal = Math.max(...current.graph);

  return (
    <div className="container">

      {/* HEADER */}
      <h1 className="page-title">Client Portfolio Management</h1>
      <p className="sub-text">
        Strategic oversight of active contracts, regional metrics, and document compliance.
      </p>

      {/* TOGGLE */}
      <div className="toggle-wrapper">
        {["daily", "weekly", "monthly", "yearly"].map((t) => (
          <button
            key={t}
            className={timeframe === t ? "active" : ""}
            onClick={() => setTimeframe(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="card blue">
          <p>TOTAL CLIENT BASE</p>
          <h2>{current.stats[0]}</h2>
          <span className="pos">{current.growth[0]} vs prev</span>
        </div>

        <div className="card green">
          <p>COMPLIANT ACCOUNTS</p>
          <h2>{current.stats[1]}</h2>
          <span className="pos">{current.growth[1]} vs prev</span>
        </div>

        <div className="card yellow">
          <p>NEW ONBOARDING</p>
          <h2>{current.stats[2]}</h2>
          <span className="pos">{current.growth[2]} vs prev</span>
        </div>

        <div className="card red">
          <p>RISK/RENEWAL PENDING</p>
          <h2>{current.stats[3]}</h2>
          <span className="neg">{current.growth[3]} vs prev</span>
        </div>
      </div>

      {/* SERVICE HUB */}
      <div className="card">
        <h3>Service Hub Performance</h3>

        <div className="tabs">
          <button className="active">Kochi Central</button>
          <button>Trivandrum South</button>
          <button>Calicut North</button>
          <button>Dubai Hub</button>
          <button>London Office</button>
          <button>Singapore Hub</button>
        </div>

        <div className="hub-grid">
          <div className="hub-box blue-border">
            <h2>140</h2>
            <p>TOTAL SERVICES</p>
          </div>

          <div className="hub-box green-border">
            <h2>120</h2>
            <p>ACTIVE CONTRACTS</p>
          </div>

          <div className="hub-box red-border">
            <h2>20</h2>
            <p>RENEWAL REQ.</p>
          </div>
        </div>

        <p className="note">
          Regional data is synchronized with the central CRM every 6 hours.
        </p>
      </div>

      {/* GRAPH */}
      <div className="card">
        <div className="card-header">
          <h3>Client Acquisition Velocity</h3>
          <span className="pos">+12.4% PERFORMANCE</span>
        </div>

        <div className="chart">
          <svg viewBox="0 0 500 200" className="line-svg">

            {/* CURVED AREA */}
            <path
              d={
                current.graph.reduce((acc, val, i, arr) => {
                  const x = i * 40;
                  const y = 180 - (val / maxVal) * 140;

                  if (i === 0) return `M ${x} ${y}`;

                  const prevX = (i - 1) * 40;
                  const prevY = 180 - (arr[i - 1] / maxVal) * 140;
                  const cx = (prevX + x) / 2;

                  return acc + ` Q ${cx} ${prevY}, ${x} ${y}`;
                }, "") + " L 480 180 L 0 180 Z"
              }
              fill="rgba(63,143,131,0.15)"
            />

            {/* CURVED LINE */}
            <path
              d={current.graph.reduce((acc, val, i, arr) => {
                const x = i * 40;
                const y = 180 - (val / maxVal) * 140;

                if (i === 0) return `M ${x} ${y}`;

                const prevX = (i - 1) * 40;
                const prevY = 180 - (arr[i - 1] / maxVal) * 140;
                const cx = (prevX + x) / 2;

                return acc + ` Q ${cx} ${prevY}, ${x} ${y}`;
              }, "")}
              stroke="#3f8f83"
              strokeWidth="3"
              fill="none"
            />

            {/* POINTS */}
            {current.graph.map((v, i) => (
              <circle
                key={i}
                cx={i * 40}
                cy={180 - (v / maxVal) * 140}
                r="3"
                fill="#3f8f83"
              />
            ))}
          </svg>
        </div>
      </div>

    </div>
  );
}

export default Clients;
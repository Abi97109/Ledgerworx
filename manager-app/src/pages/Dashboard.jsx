import React, { useState } from "react";

function Dashboard() {
  const [timeframe, setTimeframe] = useState("week");
  const [accountsTimeframe, setAccountsTimeframe] = useState("week");
  const [clientsTimeframe, setClientsTimeframe] = useState("week");
  const [overallTimeframe, setOverallTimeframe] = useState("week");

  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null); // ✅ FIXED

  const dataMap = {
    week: [40, 60, 55, 65, 70, 50, 75],
    month: [60, 80, 70, 90, 85, 75, 95],
    year: [80, 100, 90, 110, 105, 95, 120],
  };

  const pieData = {
    week: { receivables: 85, cash: 15 },
    month: { receivables: 70, cash: 30 },
    year: { receivables: 60, cash: 40 },
  };

  const clientData = {
    week: { leads: 48, customers: 30 },
    month: { leads: 120, customers: 75 },
    year: { leads: 540, customers: 320 },
  };

  const overallData = {
    week: {
      revenue: "AED 231,590",
      growth: "+40%",
      refund: "2.5%",
      online: "+23.4%",
      text: "Performance is strong this week with a 40% growth rate.",
    },
    month: {
      revenue: "AED 890,000",
      growth: "+28%",
      refund: "3.1%",
      online: "+18.2%",
      text: "Monthly performance is stable with consistent growth.",
    },
    year: {
      revenue: "AED 5,200,000",
      growth: "+65%",
      refund: "4.0%",
      online: "+35.8%",
      text: "Yearly performance shows strong long-term growth.",
    },
  };

  const currentClient = clientData[clientsTimeframe];
  const currentPie = pieData[accountsTimeframe];
  const currentOverall = overallData[overallTimeframe];

  return (
    <div className="container">

      {/* HEADER */}
      <h1 className="dashboard-title">MANAGER DASHBOARD</h1>
      <p className="dashboard-sub">
        Welcome back, U. Detailed performance insights for UAE Operations.
      </p>

      <div className="dashboard-top">

        {/* OVERALL */}
        <div className="card hover-card">
          <div className="card-header">
            <h3>Overall</h3>

            {/* SIMPLE TOGGLE DROPDOWN */}
            <div className="toggle-buttons">
              {["week", "month", "year"].map(t => (
                <button
                  key={t}
                  className={overallTimeframe === t ? "active" : ""}
                  onClick={() => setOverallTimeframe(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <h1 className="big-number">{currentOverall.revenue}</h1>
          <p className="muted">Total revenue</p>

          <div className="info-box">
            {currentOverall.text}
          </div>

          <div className="mini-stats">
            <div>{currentOverall.growth} <span>Growth</span></div>
            <div>{currentOverall.refund} <span>Refund</span></div>
            <div>{currentOverall.online} <span>Online</span></div>
          </div>
        </div>

        {/* SALES */}
        <div className="card hover-card">
          <div className="card-header">
            <h3>Sales Performance</h3>

            <div className="toggle-buttons">
              {["year","month","week"].map(t => (
                <button
                  key={t}
                  className={timeframe===t ? "active" : ""}
                  onClick={()=>setTimeframe(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="chart">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>(
              <div key={i} className="chart-group">
                <div className="bars">

                  {timeframe === "year" && (
                    <div
                      className="bar grey"
                      style={{ height: `${dataMap.year[i]}px` }}
                      onMouseEnter={() => setHoveredBar({ type: "year", index: i })}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar?.type === "year" && hoveredBar.index === i && (
                        <div className="bar-tooltip">{dataMap.year[i]}</div>
                      )}
                    </div>
                  )}

                  {timeframe === "month" && (
                    <div
                      className="bar blue"
                      style={{ height: `${dataMap.month[i]}px` }}
                      onMouseEnter={() => setHoveredBar({ type: "month", index: i })}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar?.type === "month" && hoveredBar.index === i && (
                        <div className="bar-tooltip">{dataMap.month[i]}</div>
                      )}
                    </div>
                  )}

                  {timeframe === "week" && (
                    <div
                      className="bar green"
                      style={{ height: `${dataMap.week[i]}px` }}
                      onMouseEnter={() => setHoveredBar({ type: "week", index: i })}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar?.type === "week" && hoveredBar.index === i && (
                        <div className="bar-tooltip">{dataMap.week[i]}</div>
                      )}
                    </div>
                  )}

                </div>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACCOUNTS */}
        <div className="card hover-card">
          <div className="card-header">
            <h3>Accounts distribution</h3>

            <div className="toggle-buttons">
              {["year","month","week"].map(t => (
                <button
                  key={t}
                  className={accountsTimeframe===t ? "active" : ""}
                  onClick={()=>setAccountsTimeframe(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div
            className="pie"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              const angle =
                (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 180;

              if (angle < currentPie.receivables * 3.6) {
                setHoveredSlice("receivables");
              } else {
                setHoveredSlice("cash");
              }
            }}
            onMouseLeave={() => setHoveredSlice(null)}
            style={{
              background: `conic-gradient(
                #3f8f83 ${currentPie.receivables}%,
                #3b82f6 ${currentPie.receivables}% 100%
              )`,
            }}
          >
            {hoveredSlice && (
              <div className="pie-tooltip">
                {hoveredSlice === "receivables"
                  ? `Receivables: ${currentPie.receivables}%`
                  : `Cash: ${currentPie.cash}%`}
              </div>
            )}
          </div>

          <div className="legend">
            <div><span className="dot green"></span> Receivables: {currentPie.receivables}%</div>
            <div><span className="dot blue"></span> Cash: {currentPie.cash}%</div>
          </div>
        </div>

      </div>

      {/* CLIENTS */}
      <div className="card hover-card clients-card">
        <div className="card-header">
          <h3>Clients</h3>

          <div className="toggle-buttons">
            {["year","month","week"].map(t => (
              <button
                key={t}
                className={clientsTimeframe===t ? "active" : ""}
                onClick={()=>setClientsTimeframe(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="progress-group">
          <div className="progress-header">
            <p>Leads</p>
            <span>{currentClient.leads}</span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${(currentClient.leads / 600) * 100}%` }}
            />
          </div>
        </div>

        <div className="progress-group">
          <div className="progress-header">
            <p>Customers</p>
            <span>{currentClient.customers}</span>
          </div>

          <div className="progress">
            <div
              className="progress-fill green"
              style={{ width: `${(currentClient.customers / 600) * 100}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
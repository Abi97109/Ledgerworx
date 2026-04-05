import React, { useState } from "react";
import "../App.css";

function Sales() {

  const [activeTab, setActiveTab] = useState("Day");

  // 🔹 DATA (NOW FULLY DYNAMIC)
  const data = {
    Day: {
      sales: 1500,
      revenue: 12000,
      leads: 5,
      converted: 1,
      goal: 5,
      funnel: [5, 4, 3, 2, 1, 1]
    },
    Week: {
      sales: 9200,
      revenue: 55000,
      leads: 22,
      converted: 6,
      goal: 18,
      funnel: [22, 18, 14, 10, 6, 6]
    },
    Month: {
      sales: 32000,
      revenue: 180000,
      leads: 85,
      converted: 24,
      goal: 60,
      funnel: [85, 70, 55, 40, 28, 24]
    },
    Year: {
      sales: 410000,
      revenue: 1200000,
      leads: 900,
      converted: 300,
      goal: 250,
      funnel: [900, 750, 600, 450, 320, 300]
    }
  };

  const current = data[activeTab];

  return (
    <div className="sales-page">

      {/* HEADER */}
      <div className="sales-header">
        <h1>Sales Performance</h1>

        <div className="tabs">
          {["Day", "Week", "Month", "Year"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div className="sales-cards">

        <div className="card hover-card">
          <p>Total Sales</p>
          <h2>AED {current.sales.toLocaleString()}</h2>
        </div>

        <div className="card hover-card">
          <p>Total Revenue</p>
          <h2>AED {current.revenue.toLocaleString()}</h2>
        </div>

        <div className="card hover-card">
          <p>Leads</p>
          <h2>{current.leads}</h2>
        </div>

        <div className="card hover-card">
          <p>Converted</p>
          <h2>{current.converted}</h2>
        </div>

      </div>

      {/* MAIN */}
      <div className="sales-main">

        {/* FUNNEL */}
        <div className="funnel-card hover-card">
          <h3>Lead Funnel Analysis</h3>

          <div className="funnel">
            {current.funnel.map((value, index) => (
              <div
                key={index}
                className="bar"
                style={{
                  width: `${100 - index * 15}%`
                }}
              >
                {[
                  "New Leads",
                  "Contacted",
                  "Interested",
                  "Proposal",
                  "Negotiation",
                  "Converted"
                ][index]}: {value}
              </div>
            ))}
          </div>
        </div>

        {/* GOAL */}
        <div className="goal-card hover-card">
          <h3>Goal Progress</h3>
          <h1>{current.goal}</h1>
          <p>Completed this period</p>
          <button>Export Sales Report</button>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-card hover-card">
        <h3>Recent Lead Tracking</h3>

        <table>
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
            <tr>
              <td>Daily Client A</td>
              <td>Call</td>
              <td><span className="tag blue">Interested</span></td>
              <td>Akram</td>
              <td>AED 5k</td>
            </tr>

            <tr>
              <td>Retail Walk-in</td>
              <td>Direct</td>
              <td><span className="tag green">Contacted</span></td>
              <td>Rami</td>
              <td>AED 2k</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Sales;
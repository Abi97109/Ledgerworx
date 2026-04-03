import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import SalesLayout from "../components/SalesLayout";
import { reportsData } from "../data/mockData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true }
  }
};

export default function ReportsPage() {
  const [period, setPeriod] = useState("week");
  const active = reportsData[period];

  const chartData = useMemo(
    () => ({
      labels: active.chart.labels,
      datasets: [
        {
          label: "Leads Handled",
          data: active.chart.leads,
          borderColor: "#1a5a8f",
          backgroundColor: "rgba(26, 90, 143, 0.2)",
          tension: 0.4
        },
        {
          label: "Deals Closed",
          data: active.chart.deals,
          borderColor: "#16a34a",
          backgroundColor: "rgba(22, 163, 74, 0.2)",
          tension: 0.4
        }
      ]
    }),
    [active]
  );

  const conversionRate = ((active.leadsConverted / active.leadsHandled) * 100).toFixed(1);

  return (
    <SalesLayout pageClass="sales-page--reports">
      <div className="container">
        <div className="lw-page-header">
          <h1>Reports</h1>
          <div className="time-toggle">
            <button className={`toggle-btn ${period === "week" ? "active" : ""}`} onClick={() => setPeriod("week")}>
              This Week
            </button>
            <button className={`toggle-btn ${period === "month" ? "active" : ""}`} onClick={() => setPeriod("month")}>
              This Month
            </button>
          </div>
        </div>

        <div className="stats">
          <div className="lw-card card-blue">
            <h4>Leads Handled</h4>
            <h2>{active.leadsHandled}</h2>
            <p className="card-subtitle">Total Leads Assigned</p>
          </div>
          <div className="lw-card card-orange">
            <h4>Leads Converted</h4>
            <h2>{active.leadsConverted}</h2>
            <p className="card-subtitle">Successful Conversions</p>
          </div>
          <div className="lw-card card-green">
            <h4>Deals Closed</h4>
            <h2>{active.dealsClosed}</h2>
            <p className="card-subtitle">Finalized Agreements</p>
          </div>
        </div>

        <div className="lw-grid">
          <div className="chart-card">
            <h3>Sales Performance: Leads Handled vs. Deals Closed</h3>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="status-breakdown">
            <h3>Lead Status Breakdown</h3>
            <div className="status-item">
              <span className="status-label">🔥 Hot leads handled</span>
              <span className="status-badge hot">{active.status.hot}</span>
            </div>
            <div className="status-item">
              <span className="status-label">⚡ Warm leads handled</span>
              <span className="status-badge warm">{active.status.warm}</span>
            </div>
            <div className="status-item">
              <span className="status-label">❄️ Cold leads handled</span>
              <span className="status-badge cold">{active.status.cold}</span>
            </div>
            <div className="status-item">
              <span className="status-label">✓ Converted leads</span>
              <span className="status-badge converted">{active.status.converted}</span>
            </div>
          </div>
        </div>

        <div className="additional-stats">
          <div className="stat-mini-card">
            <div className="stat-mini-icon">📈</div>
            <div className="stat-mini-content">
              <h4>Conversion Rate</h4>
              <p>{conversionRate}%</p>
            </div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-icon">⏱️</div>
            <div className="stat-mini-content">
              <h4>Avg. Lead Time</h4>
              <p>3.2 days</p>
            </div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-icon">💰</div>
            <div className="stat-mini-content">
              <h4>Deal Value</h4>
              <p>AED 450K</p>
            </div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-icon">🎯</div>
            <div className="stat-mini-content">
              <h4>Target Achievement</h4>
              <p>82%</p>
            </div>
          </div>
        </div>
      </div>
    </SalesLayout>
  );
}

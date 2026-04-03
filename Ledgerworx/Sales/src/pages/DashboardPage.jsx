import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import SalesLayout from "../components/SalesLayout";
import { dashboardData } from "../data/mockData";
import { useSalesWorkspace } from "../modules/sales/context/SalesWorkspaceProvider";
import {
  buildSalesLeadDetailRoute,
  SALES_LEADS_ROUTE,
  SALES_TASKS_ROUTE
} from "../modules/sales/utils/routePaths";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function DashboardPage() {
  const { leads } = useSalesWorkspace();
  const [period, setPeriod] = useState("week");
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined" && document.body.classList.contains("sales-theme-dark")
  );

  const activeChart = period === "month" ? dashboardData.monthlyChart : dashboardData.weeklyChart;

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const body = document.body;
    const observer = new MutationObserver(() => {
      setIsDarkMode(body.classList.contains("sales-theme-dark"));
    });

    observer.observe(body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            padding: 20,
            font: { size: 13, weight: "600" },
            color: isDarkMode ? "#9ab0bf" : "#64748b",
            usePointStyle: true
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: isDarkMode ? "rgba(148, 163, 184, 0.14)" : "rgba(0, 0, 0, 0.05)"
          },
          ticks: {
            color: isDarkMode ? "#8ba4b6" : "#64748b",
            font: { size: 12 }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: isDarkMode ? "#8ba4b6" : "#64748b",
            font: { size: 12 }
          }
        }
      }
    }),
    [isDarkMode]
  );

  const chartData = useMemo(
    () => ({
      labels: activeChart.labels,
      datasets: [
        {
          label: "Leads Generated",
          data: activeChart.leads,
          borderColor: "#1a5a8f",
          backgroundColor: isDarkMode ? "rgba(42, 142, 196, 0.12)" : "rgba(26, 90, 143, 0.05)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: "#1a5a8f",
          pointBorderColor: isDarkMode ? "#0d1c26" : "white",
          pointBorderWidth: 2,
          pointHoverRadius: 8
        },
        {
          label: "Deals Closed",
          data: activeChart.deals,
          borderColor: "#16a34a",
          backgroundColor: isDarkMode ? "rgba(22, 163, 74, 0.12)" : "rgba(22, 163, 74, 0.05)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: "#16a34a",
          pointBorderColor: isDarkMode ? "#0d1c26" : "white",
          pointBorderWidth: 2,
          pointHoverRadius: 8
        }
      ]
    }),
    [activeChart, isDarkMode]
  );

  return (
    <SalesLayout pageClass="sales-page--dashboard">
      <div className="container">
        <div className="lw-page-header">
          <h1>Sales Dashboard</h1>
          <p>Welcome back! Here is your sales performance overview for this month.</p>
        </div>

        <div className="stats">
          <div className="lw-card tile-blue">
            <h4>New Leads</h4>
            <h2>{dashboardData.stats.newLeads}</h2>
            <p className="card-subtitle">+ 12% from last week</p>
          </div>

          <div className="lw-card tile-green">
            <h4>Deals Closed</h4>
            <h2>{dashboardData.stats.dealsClosed}</h2>
            <p className="card-subtitle">This Week</p>
          </div>

          <div className="lw-card tile-teal">
            <h4>Monthly Target</h4>
            <h2>AED {dashboardData.stats.targetAmount.toLocaleString()}</h2>
            <div className="u-inline-4">
              <div id="progressBar" className="u-inline-5" style={{ width: `${dashboardData.stats.achievedPercent}%` }}></div>
            </div>
            <small className="u-inline-6">{dashboardData.stats.achievedPercent}% of monthly target achieved</small>
          </div>

          <div className="lw-card tile-slate">
            <h4>Follow-Ups</h4>
            <h2>{dashboardData.stats.followUps}</h2>
            <p className="card-subtitle">Due Today</p>
          </div>

          <div className="lw-card tile-orange">
            <h4>Active Leads</h4>
            <h2>{dashboardData.stats.activeLeads}</h2>
            <p className="card-subtitle">In Pipeline</p>
          </div>
        </div>

        <div className="lw-grid">
          <div className="lw-card tile-slate">
            <h3 className="u-inline-7">Lead Status</h3>
            <div className="lead-box hot">
              <span>Hot Leads</span>
              <span className="u-inline-8">{dashboardData.leadStatus.hot}</span>
            </div>
            <div className="lead-box warm">
              <span>Warm Leads</span>
              <span className="u-inline-8">{dashboardData.leadStatus.warm}</span>
            </div>
            <div className="lead-box cold">
              <span>Cold Leads</span>
              <span className="u-inline-8">{dashboardData.leadStatus.cold}</span>
            </div>
          </div>

          <div className="lw-card tile-blue">
            <h3 className="u-inline-7">Sales Performance</h3>
            <div className="u-inline-9">
              <button
                onClick={() => setPeriod("week")}
                className={period === "week" ? "u-inline-10" : "u-inline-11"}
              >
                Weekly
              </button>
              <button
                onClick={() => setPeriod("month")}
                className={period === "month" ? "u-inline-10" : "u-inline-11"}
              >
                Monthly
              </button>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="lw-card tile-green">
            <h3 className="u-inline-7">Recent Leads</h3>
            <div>
              {leads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="list-item">
                  <Link to={buildSalesLeadDetailRoute(lead.id)}>{lead.name}</Link>
                  <span className={`lw-badge ${lead.status}`}>{lead.status}</span>
                </div>
              ))}
            </div>
            <Link className="lw-btn u-inline-12" to={SALES_LEADS_ROUTE}>
              + Add New Lead
            </Link>
          </div>
        </div>

        <div className="lw-grid u-inline-13">
          <div className="lw-card tile-orange">
            <h3 className="u-inline-7">Tasks</h3>
            <div className="u-inline-14">
              <strong>Today's Tasks</strong> <span className="u-inline-15">4</span>
            </div>
            <div className="u-inline-16">
              <div className="u-inline-17">Call Client ABC</div>
              <div className="u-inline-17">Follow up on proposal</div>
            </div>
            <Link className="lw-btn u-inline-12" to={SALES_TASKS_ROUTE}>
              View All Tasks
            </Link>
          </div>

          <div className="lw-card tile-blue">
            <h3 className="u-inline-7">Reminders</h3>
            <div className="u-inline-18">
              <div className="u-inline-19">Follow up with Ahmed</div>
              <div className="u-inline-20">Today at 2:00 PM</div>
            </div>
            <div className="u-inline-21">
              <div className="u-inline-19">Send proposal to Sarah</div>
              <div className="u-inline-20">Today at 4:00 PM</div>
            </div>
          </div>

          <div className="lw-card tile-green">
            <h3 className="u-inline-7">Zoho CRM Sync</h3>
            <div className="u-inline-22">Last Sync: 15 mins ago</div>
            <div className="u-inline-23">
              <span className="u-inline-24">OK</span>
              <div>
                <div className="u-inline-25">Leads Synced</div>
                <div className="u-inline-26">320 records</div>
              </div>
            </div>
            <div className="u-inline-23">
              <span className="u-inline-24">OK</span>
              <div>
                <div className="u-inline-25">Clients Updated</div>
                <div className="u-inline-26">150 records</div>
              </div>
            </div>
            <div className="u-inline-27">
              <span className="u-inline-24">OK</span>
              <div>
                <div className="u-inline-25">Tasks Synced</div>
                <div className="u-inline-26">45 records</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SalesLayout>
  );
}

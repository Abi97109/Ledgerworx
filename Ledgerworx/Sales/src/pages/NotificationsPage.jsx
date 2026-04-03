import { useMemo, useState } from "react";
import SalesLayout from "../components/SalesLayout";
import { notificationsData } from "../data/mockData";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      notificationsData.filter((item) => {
        if (filter === "all") return true;
        if (filter === "unread") return item.unread;
        return item.type === filter;
      }),
    [filter]
  );

  return (
    <SalesLayout pageClass="sales-page--notifications">
      <div className="container">
        <div className="lw-page-header">
          <h1>Notifications</h1>
        </div>

        <div className="tabs">
          {["all", "unread", "leads", "tasks", "invoices"].map((tab) => (
            <span key={tab} className={filter === tab ? "active" : ""} onClick={() => setFilter(tab)}>
              {tab === "all" ? "All" : tab[0].toUpperCase() + tab.slice(1)}
            </span>
          ))}
        </div>

        <div className="notification-list">
          {filtered.map((item) => (
            <div key={item.id} className={`notification-item ${item.unread ? "is-unread" : ""}`}>
              <div className="notification-title-row">
                <h4>{item.title}</h4>
                {item.unread && <span className="lw-badge hot">New</span>}
              </div>
              <p>{item.message}</p>
              <small>{item.time}</small>
            </div>
          ))}
          {filtered.length === 0 && <p className="task-empty">No notifications for this filter.</p>}
        </div>
      </div>
    </SalesLayout>
  );
}

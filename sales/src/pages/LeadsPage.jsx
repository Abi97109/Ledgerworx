import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import { dashboardData } from "../data/mockData";
import { buildSalesLeadDetailRoute } from "../modules/sales/utils/routePaths";

export default function LeadsPage() {
  const [leads, setLeads] = useState(dashboardData.recentLeads);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", email: "", status: "hot" });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter = filter === "all" ? true : lead.status === filter;
      const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [leads, filter, search]);

  const addLead = () => {
    if (!newLead.name.trim() || !newLead.email.trim()) {
      return;
    }

    const id = newLead.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setLeads((prev) => [
      {
        id,
        name: newLead.name,
        email: newLead.email,
        phone: "N/A",
        owner: "John Carter",
        status: newLead.status
      },
      ...prev
    ]);

    setNewLead({ name: "", email: "", status: "hot" });
    setShowModal(false);
  };

  return (
    <SalesLayout pageClass="sales-page--leads">
      <div className="container">
        <div className="lw-page-header">
          <h1>Leads</h1>
        </div>

        <div className="filters-section">
          <div className="filter-tabs">
            {["all", "hot", "warm", "cold", "converted"].map((item) => (
              <span
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item === "all" ? "All" : item[0].toUpperCase() + item.slice(1)}
              </span>
            ))}
          </div>

          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select defaultValue="month">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
            <button className="lw-btn" onClick={() => setShowModal(true)}>
              + Add New Lead
            </button>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Lead Name / Company</th>
                <th>Status</th>
                <th>Next Follow-Up</th>
                <th>Owner</th>
                <th>Convert to Client</th>
                <th>Send Invoice</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <Link to={buildSalesLeadDetailRoute(lead.id)}>{lead.name}</Link>
                    <div className="text-muted-small">{lead.email}</div>
                  </td>
                  <td>
                    <span className={`lw-badge ${lead.status}`}>{lead.status}</span>
                  </td>
                  <td>Tomorrow</td>
                  <td className="text-owner">{lead.owner}</td>
                  <td>
                    <button className="lw-btn lw-btn--small">Convert</button>
                  </td>
                  <td>
                    <button className="lw-btn lw-btn--small">Invoice</button>
                  </td>
                  <td>
                    <i className="fas fa-ellipsis-v"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="lw-modal-content">
            <span className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </span>
            <h3>Add New Lead</h3>
            <input
              placeholder="Lead Name"
              value={newLead.name}
              onChange={(event) => setNewLead((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              placeholder="Contact / Email"
              value={newLead.email}
              onChange={(event) => setNewLead((prev) => ({ ...prev, email: event.target.value }))}
            />
            <select
              value={newLead.status}
              onChange={(event) => setNewLead((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
            <button className="lw-btn u-inline-28" onClick={addLead}>
              Save Lead
            </button>
          </div>
        </div>
      )}
    </SalesLayout>
  );
}

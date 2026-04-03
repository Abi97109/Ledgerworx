import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import { useSalesWorkspace } from "../modules/sales/context/SalesWorkspaceProvider";
import { buildSalesContactDetailRoute, buildSalesLeadDetailRoute } from "../modules/sales/utils/routePaths";

const defaultLeadForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "Website Lead",
  owner: "John Carter",
  status: "hot"
};

export default function LeadsPage() {
  const navigate = useNavigate();
  const { leads, addLead, convertLead } = useSalesWorkspace();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState(defaultLeadForm);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter = filter === "all" ? true : lead.status === filter;
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm) ||
        lead.phone.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  }, [leads, filter, search]);

  const handleAddLead = () => {
    if (!newLead.name.trim() || !newLead.company.trim() || !newLead.email.trim() || !newLead.phone.trim()) {
      return;
    }

    const id = newLead.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    addLead({ id, ...newLead });
    setNewLead(defaultLeadForm);
    setShowModal(false);
  };

  const sendProposal = (lead) => {
    const normalized = lead.phone.replace(/[^\d]/g, "");
    const text = encodeURIComponent(`Hello ${lead.name}, sharing the LedgerWorx proposal for your review.`);
    if (normalized) {
      window.open(`https://wa.me/${normalized}?text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleConvertLead = (leadId) => {
    const contact = convertLead(leadId);
    if (contact) {
      navigate(buildSalesContactDetailRoute(contact.id));
    }
  };

  return (
    <SalesLayout pageClass="sales-page--leads">
      <div className="container">
        <div className="lw-page-header">
          <h1>Leads</h1>
        </div>

        <div className="leads-toolbar-card">
          <div className="leads-toolbar-top">
            <div className="leads-view-chip">All Leads</div>
            <button type="button" className="leads-toolbar-more" aria-label="More lead views">
              ...
            </button>
          </div>

          <div className="leads-toolbar-actions">
            <div className="filter-controls leads-filter-controls">
              <input
                type="text"
                className="leads-search-input"
                placeholder="Search by name, company, email or phone..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All Statuses</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
                <option value="converted">Converted</option>
              </select>
              <button className="lw-btn leads-create-btn" onClick={() => setShowModal(true)}>
                Create Lead
              </button>
            </div>
          </div>
        </div>

        <div className="table-card leads-table-card">
          <table className="leads-crm-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Lead Source</th>
                <th>Lead Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <Link className="leads-name-link" to={buildSalesLeadDetailRoute(lead.id)}>
                        {lead.name}
                      </Link>
                      <div className="text-muted-small">
                        <span className={`lw-badge ${lead.status}`}>{lead.status}</span>
                      </div>
                    </td>
                    <td>{lead.company}</td>
                    <td className="leads-email-cell">{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.source}</td>
                    <td className="text-owner">{lead.owner}</td>
                    <td>
                      <div className="lead-actions">
                        <button type="button" className="add-btn" onClick={() => sendProposal(lead)}>
                          Send Proposal
                        </button>
                        <button type="button" className="lw-btn" onClick={() => handleConvertLead(lead.id)}>
                          Convert to Client
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="crm-empty-cell">
                    No leads match the current search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="lw-modal-content leads-modal-content">
            <div className="leads-modal-shell">
              <div className="leads-modal-header">
                <div>
                  <h2>Create Lead</h2>
                  <p>Capture the prospect details first, then the salesperson can send a proposal or convert the lead later.</p>
                </div>
              </div>

              <div className="sales-form-stack">
                <div className="form-group sales-form-field">
                  <label htmlFor="leadName">Lead Name</label>
                  <input
                    id="leadName"
                    placeholder="Enter lead name"
                    value={newLead.name}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </div>

                <div className="form-group sales-form-field">
                  <label htmlFor="leadCompany">Company</label>
                  <input
                    id="leadCompany"
                    placeholder="Enter company"
                    value={newLead.company}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, company: event.target.value }))}
                  />
                </div>

                <div className="form-group sales-form-field">
                  <label htmlFor="leadEmail">Email</label>
                  <input
                    id="leadEmail"
                    placeholder="name@company.com"
                    value={newLead.email}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>

                <div className="form-group sales-form-field">
                  <label htmlFor="leadPhone">Phone</label>
                  <input
                    id="leadPhone"
                    placeholder="+971 ..."
                    value={newLead.phone}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                </div>

                <div className="form-group sales-form-field">
                  <label htmlFor="leadSource">Lead Source</label>
                  <select
                    id="leadSource"
                    value={newLead.source}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, source: event.target.value }))}
                  >
                    <option value="Business Setup">Business Setup</option>
                    <option value="Website Lead">Website Lead</option>
                    <option value="Referral">Referral</option>
                    <option value="Campaign">Campaign</option>
                  </select>
                </div>

                <div className="form-group sales-form-field">
                  <label htmlFor="leadOwner">Lead Owner</label>
                  <input
                    id="leadOwner"
                    placeholder="Lead owner"
                    value={newLead.owner}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, owner: event.target.value }))}
                  />
                </div>

                <div className="form-group sales-form-field">
                  <label htmlFor="leadStatus">Lead Temperature</label>
                  <select
                    id="leadStatus"
                    value={newLead.status}
                    onChange={(event) => setNewLead((prev) => ({ ...prev, status: event.target.value }))}
                  >
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>
              </div>

              <div className="leads-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="lw-btn" onClick={handleAddLead}>
                  Save Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SalesLayout>
  );
}

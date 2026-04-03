import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import { dashboardData, leadNotes } from "../data/mockData";
import { SALES_LEADS_ROUTE } from "../modules/sales/utils/routePaths";

export default function LeadDetailPage() {
  const navigate = useNavigate();
  const { leadId } = useParams();
  const [notes, setNotes] = useState(leadNotes);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const lead = useMemo(
    () => dashboardData.recentLeads.find((item) => item.id === leadId) || dashboardData.recentLeads[0],
    [leadId]
  );

  const saveNote = () => {
    if (!noteText.trim()) {
      return;
    }

    const item = {
      id: Date.now(),
      text: noteText,
      date: followUpDate || "No follow-up date"
    };

    setNotes((prev) => [item, ...prev]);
    setNoteText("");
    setFollowUpDate("");
    setShowNoteModal(false);
  };

  return (
    <SalesLayout pageClass="sales-page--lead-detail">
      <div className="container">
        <div className="breadcrumb">
          <button type="button" className="add-btn" onClick={() => navigate(SALES_LEADS_ROUTE)}>
            ← Back to Leads
          </button>
          <span>›</span>
          <span>{lead.name}</span>
        </div>

        <div className="lead-header">
          <div className="lead-avatar-large">{lead.name.slice(0, 2).toUpperCase()}</div>
          <div className="lead-header-content">
            <h1>{lead.name}</h1>

            <div className="detail-item-content u-inline-35">
              <div className="detail-item-label">Email</div>
              <div className="detail-item-value">{lead.email}</div>
            </div>

            <div className="lead-details-list">
              <div className="detail-item">
                <div className="detail-item-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="detail-item-content">
                  <div className="detail-item-label">Phone</div>
                  <div className="detail-item-value">{lead.phone}</div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-icon">
                  <i className="fas fa-tag"></i>
                </div>
                <div className="detail-item-content">
                  <div className="detail-item-label">Status</div>
                  <div className="detail-item-value">{lead.status}</div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="detail-item-content">
                  <div className="detail-item-label">Owner</div>
                  <div className="detail-item-value">{lead.owner}</div>
                </div>
              </div>
            </div>

            <div className="lead-info-row">
              <div className={`info-badge ${lead.status}`}>{lead.status.toUpperCase()} LEAD</div>
            </div>

            <div className="header-buttons">
              <button className="lw-btn btn-primary" onClick={() => setShowNoteModal(true)}>
                📝 Add Note / Follow-Up
              </button>
              <button className="lw-btn btn-primary">🔄 Assign Service</button>
              <button className="lw-btn btn-primary">
                <i className="fas fa-exchange-alt"></i> Transfer Lead
              </button>
              <button className="lw-btn btn-secondary">✓ Convert to Client</button>
            </div>
          </div>
        </div>

        <div className="lw-grid">
          <div>
            <div className="lw-card">
              <h3>📦 Services</h3>
              <div className="card-section">
                <div className="section-label">Assigned Services</div>
                <div className="section-content">
                  <p className="u-inline-36">No service assigned</p>
                </div>
              </div>
              <button className="add-btn u-inline-37">+ Assign Service</button>
            </div>
          </div>

          <div>
            <div className="lw-card">
              <h3>📋 Notes &amp; Follow-Ups</h3>
              <div className="section-content" id="notesList">
                {notes.map((note) => (
                  <div key={note.id} className="u-inline-14">
                    <div className="note-text">{note.text}</div>
                    <div className="note-meta">Follow-up: {note.date}</div>
                  </div>
                ))}
              </div>
              <button className="add-btn u-inline-37" onClick={() => setShowNoteModal(true)}>
                + Add Note / Follow-Up
              </button>
            </div>

            <div className="lw-card u-inline-38">
              <h3>⏱️ Activity Timeline</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">✓</div>
                  <div className="timeline-content">
                    <h4>Lead created</h4>
                    <p>Lead was added to the system</p>
                    <div className="timeline-date">Created today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNoteModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="lw-modal-content">
            <h3>Add Note / Follow-Up</h3>
            <textarea
              placeholder="Write your note here..."
              rows="5"
              className="u-inline-39"
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
            ></textarea>
            <input
              type="date"
              value={followUpDate}
              onChange={(event) => setFollowUpDate(event.target.value)}
            />
            <div className="u-inline-40">
              <button className="lw-btn btn-primary u-inline-34" onClick={saveNote}>
                Save Note
              </button>
              <button className="lw-btn btn-secondary u-inline-34" onClick={() => setShowNoteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </SalesLayout>
  );
}

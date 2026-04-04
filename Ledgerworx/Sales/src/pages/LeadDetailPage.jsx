import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import EmployeePortalLoader from "../../../shared/employee-ui/EmployeePortalLoader";
import { leadNotes } from "../data/mockData";
import { useSalesWorkspace } from "../modules/sales/context/SalesWorkspaceProvider";
import { buildSalesContactDetailRoute, SALES_LEADS_ROUTE } from "../modules/sales/utils/routePaths";

export default function LeadDetailPage() {
  const navigate = useNavigate();
  const { leadId } = useParams();
  const { leads, getLeadById, convertLead, deleteLead, isLoading, error, refreshWorkspace } = useSalesWorkspace();
  const [notes, setNotes] = useState(leadNotes);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const lead = useMemo(() => getLeadById(leadId) || leads[0] || null, [leadId, leads, getLeadById]);

  if (!lead && isLoading) {
    return (
      <SalesLayout pageClass="sales-page--lead-detail">
        <EmployeePortalLoader
          fullHeight
          title="Loading lead details"
          message="Pulling the latest lead record and related sales context from Zoho CRM."
        />
      </SalesLayout>
    );
  }

  if (!lead) {
    return (
      <SalesLayout pageClass="sales-page--lead-detail">
        <div className="container">
          <div className="lw-page-header">
            <h1>Lead Not Found</h1>
            <p>{isLoading ? "Loading live lead data..." : "This lead is no longer available in the active sales workspace."}</p>
            {error ? (
              <button type="button" className="add-btn" onClick={refreshWorkspace}>
                Retry Zoho CRM Load
              </button>
            ) : null}
          </div>
        </div>
      </SalesLayout>
    );
  }

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

  const sendProposal = () => {
    const normalized = lead.phone.replace(/[^\d]/g, "");
    const text = encodeURIComponent(`Hello ${lead.name}, sharing the LedgerWorx proposal for your review.`);
    if (normalized) {
      window.open(`https://wa.me/${normalized}?text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleConvert = async () => {
    setIsConverting(true);

    try {
      const contact = await convertLead(lead.id);
      if (contact) {
        navigate(buildSalesContactDetailRoute(contact.id));
      }
    } catch (convertError) {
      window.alert(convertError?.message || "Unable to convert this lead right now.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this lead from Zoho CRM?");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteLead(lead.id);
      navigate(SALES_LEADS_ROUTE);
    } catch (deleteError) {
      window.alert(deleteError?.message || "Unable to delete this lead right now.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SalesLayout pageClass="sales-page--lead-detail">
      <div className="container">
        <div className="breadcrumb">
          <button type="button" className="add-btn" onClick={() => navigate(SALES_LEADS_ROUTE)}>
            Back to Leads
          </button>
          <span>&gt;</span>
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
                <div className="detail-item-content">
                  <div className="detail-item-label">Phone</div>
                  <div className="detail-item-value">{lead.phone}</div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-content">
                  <div className="detail-item-label">Status</div>
                  <div className="detail-item-value">{lead.status}</div>
                </div>
              </div>
              <div className="detail-item">
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
                Add Note / Follow-Up
              </button>
              <button className="lw-btn btn-primary" onClick={sendProposal}>
                Send Proposal
              </button>
              <button className="lw-btn btn-secondary" onClick={handleConvert} disabled={isConverting}>
                {isConverting ? "Converting..." : "Convert to Client"}
              </button>
              <button className="btn-cancel" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Lead"}
              </button>
            </div>
          </div>
        </div>

        <div className="lw-grid">
          <div>
            <div className="lw-card">
              <h3>Requested Services</h3>
              <div className="card-section">
                <div className="section-label">Sales Notes</div>
                <div className="section-content">
                  <p className="u-inline-36">No portal service has been requested yet.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="lw-card">
              <h3>Notes & Follow-Ups</h3>
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
              <h3>Activity Timeline</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">OK</div>
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

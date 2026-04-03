import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import { useSalesWorkspace } from "../modules/sales/context/SalesWorkspaceProvider";
import { SALES_CONTACTS_ROUTE } from "../modules/sales/utils/routePaths";

function buildWhatsappUrl(phone, name) {
  const normalized = (phone || "").replace(/[^\d]/g, "");
  const message = encodeURIComponent(`Hello ${name}, this is your LedgerWorx sales contact. I wanted to follow up on your request.`);
  return normalized ? `https://wa.me/${normalized}?text=${message}` : "#";
}

export default function ContactDetailPage() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const { contacts, getContactById } = useSalesWorkspace();

  const contact = useMemo(() => getContactById(contactId) || contacts[0] || null, [contactId, contacts, getContactById]);

  if (!contact) {
    return (
      <SalesLayout pageClass="sales-page--contact-detail">
        <div className="container">
          <div className="lw-page-header">
            <h1>Contact Not Found</h1>
            <p>This contact is not available in the current sales workspace.</p>
          </div>
        </div>
      </SalesLayout>
    );
  }

  return (
    <SalesLayout pageClass="sales-page--contact-detail">
      <div className="container">
        <div className="breadcrumb">
          <button type="button" className="add-btn" onClick={() => navigate(SALES_CONTACTS_ROUTE)}>
            Back to Contacts
          </button>
          <span>&gt;</span>
          <span>{contact.name}</span>
        </div>

        <div className="lead-header contact-header">
          <div className="lead-avatar-large">{contact.name.slice(0, 2).toUpperCase()}</div>
          <div className="lead-header-content">
            <h1>{contact.name}</h1>
            <div className="lead-details-list">
              <div className="detail-item">
                <div className="detail-item-content">
                  <div className="detail-item-label">Email</div>
                  <div className="detail-item-value">{contact.email}</div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-content">
                  <div className="detail-item-label">Phone</div>
                  <div className="detail-item-value">{contact.phone}</div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-content">
                  <div className="detail-item-label">Portal Status</div>
                  <div className="detail-item-value">{contact.portalStatus}</div>
                </div>
              </div>
            </div>

            <div className="header-buttons">
              <a className="lw-btn btn-primary" href={buildWhatsappUrl(contact.phone, contact.name)} target="_blank" rel="noreferrer">
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="lw-grid">
          <div className="lw-card contact-card-wide">
            <div className="contact-section-header">
              <div>
                <h3>Client Request Tracking</h3>
                <p>Sales can monitor progress here while verification and approval remain with the operations team.</p>
              </div>
            </div>
            <div className="contact-tracking-list contact-tracking-list--timeline">
              {contact.requestTracking.map((step) => (
                <div key={step.label} className={`contact-tracking-item ${step.status}`}>
                  <div className="contact-tracking-step-marker"></div>
                  <div className="contact-tracking-copy">
                    <span>{step.label}</span>
                    <small>{step.status === "current" ? "Current stage" : step.status === "completed" ? "Completed" : "Pending"}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lw-card">
            <h3>Requested Services / Packages</h3>
            <div className="contact-request-list">
              {contact.requestedItems.length ? (
                contact.requestedItems.map((item) => <div key={item} className="list-item">{item}</div>)
              ) : (
                <p className="text-muted-small">No portal request has been raised yet.</p>
              )}
            </div>
          </div>

          <div className="lw-card">
            <h3>Client Documents</h3>
            <div className="contact-documents-list">
              {contact.documents.length ? (
                contact.documents.map((document) => (
                  <div key={document.name} className="contact-document-row">
                    <div>
                      <strong>{document.name}</strong>
                      <div className="text-muted-small">{document.status}</div>
                    </div>
                    <a className="add-btn" href={document.url} download>
                      Download
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-muted-small">Documents are view-only here and will appear once the client uploads them.</p>
              )}
            </div>
          </div>

          <div className="lw-card">
            <h3>Payment Status</h3>
            <div className="contact-payment-status">
              <strong>{contact.payment.status}</strong>
              <p>{contact.payment.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </SalesLayout>
  );
}

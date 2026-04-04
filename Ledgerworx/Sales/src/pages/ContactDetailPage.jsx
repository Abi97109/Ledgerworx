import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import EmployeePortalLoader from "../../../shared/employee-ui/EmployeePortalLoader";
import { fetchSalesContactPortalSummary } from "../modules/sales/api/salesPortalApi";
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
  const { contacts, getContactById, isLoading, error, refreshWorkspace } = useSalesWorkspace();
  const [detailState, setDetailState] = useState({
    isLoading: true,
    error: "",
    contact: null,
    requestSummaries: []
  });

  const baseContact = useMemo(() => getContactById(contactId) || contacts[0] || null, [contactId, contacts, getContactById]);

  useEffect(() => {
    if (!contactId) {
      return;
    }

    let isMounted = true;
    setDetailState((current) => ({
      ...current,
      isLoading: true,
      error: ""
    }));

    fetchSalesContactPortalSummary(contactId)
      .then((payload) => {
        if (!isMounted) {
          return;
        }
        setDetailState({
          isLoading: false,
          error: "",
          contact: payload?.contact || baseContact,
          requestSummaries: Array.isArray(payload?.requestSummaries) ? payload.requestSummaries : []
        });
      })
      .catch((loadError) => {
        if (!isMounted) {
          return;
        }
        setDetailState({
          isLoading: false,
          error: loadError?.message || "Unable to load client request details.",
          contact: baseContact,
          requestSummaries: []
        });
      });

    return () => {
      isMounted = false;
    };
  }, [baseContact, contactId]);

  const contact = detailState.contact || baseContact;
  const requestSummaries = Array.isArray(detailState.requestSummaries) ? detailState.requestSummaries : [];

  if (!contact && (isLoading || detailState.isLoading)) {
    return (
      <SalesLayout pageClass="sales-page--contact-detail">
        <EmployeePortalLoader
          fullHeight
          title="Loading contact details"
          message="Fetching the latest CRM profile and portal request data for this contact."
        />
      </SalesLayout>
    );
  }

  if (!contact) {
    return (
      <SalesLayout pageClass="sales-page--contact-detail">
        <div className="container">
          <div className="lw-page-header">
            <h1>Contact Not Found</h1>
            <p>{isLoading ? "Loading live contact data..." : "This contact is not available in the current sales workspace."}</p>
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

        {detailState.error ? (
          <div className="crm-status-banner crm-status-banner--error" style={{ marginBottom: "18px" }}>
            <div>
              <strong>Portal details could not be loaded.</strong>
              <div>{detailState.error}</div>
            </div>
          </div>
        ) : null}

        <div className="lw-card contact-tracker-strip">
          <div className="contact-section-header">
            <div>
              <h3>Client Request Tracking</h3>
              <p>Each service or package request is tracked separately while verification and approval remain with the operations team.</p>
            </div>
          </div>
          {detailState.isLoading ? (
            <EmployeePortalLoader
              compact
              title="Loading request trackers"
              message="Preparing the live workflow view for this client."
            />
          ) : requestSummaries.length ? (
            <div className="contact-request-tracker-group">
              {requestSummaries.map((request) => (
                <div key={request.requestId} className="contact-request-tracker-card">
                  <div className="contact-request-tracker-head">
                    <div>
                      <strong>{request.title || "Client Request"}</strong>
                      <div className="text-muted-small">Request ID: {request.requestId}</div>
                    </div>
                    <span className="contact-request-stage-pill">{request.status}</span>
                  </div>
                  <div className="contact-tracking-list contact-tracking-list--horizontal">
                    {(Array.isArray(request.trackingSteps) ? request.trackingSteps : []).map((step) => (
                      <div key={`${request.requestId}-${step.label}`} className={`contact-tracking-item ${step.status}`}>
                        <div className="contact-tracking-step-marker"></div>
                        <div className="contact-tracking-copy">
                          <span>{step.label}</span>
                          <small>
                            {request.status === "Completed" && step.label === "Completed"
                              ? ""
                              : step.status === "current"
                                ? "Current stage"
                                : step.status === "completed"
                                  ? "Completed"
                                  : "Pending"}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="contact-empty-inline">No client requests have been raised yet.</div>
          )}
        </div>

        <div className="lw-grid lw-grid--contact-detail">
          <div className="lw-card">
            <h3>Requested Services / Packages</h3>
            <div className="contact-request-list">
              {detailState.isLoading ? (
                <EmployeePortalLoader compact title="Loading requests" message="Refreshing the linked service and package requests." />
              ) : requestSummaries.length ? (
                requestSummaries.map((request) => <div key={request.requestId} className="list-item">{request.title}</div>)
              ) : (
                <p className="text-muted-small">No portal request has been raised yet.</p>
              )}
            </div>
          </div>

          <div className="lw-card">
            <h3>Client Documents</h3>
            <div className="contact-documents-list">
              {detailState.isLoading ? (
                <EmployeePortalLoader compact title="Loading documents" message="Pulling uploaded client documents from the portal." />
              ) : requestSummaries.some((request) => Array.isArray(request.documents) && request.documents.length) ? (
                requestSummaries.flatMap((request) =>
                  (request.documents || []).map((document) => (
                  <div key={document.name} className="contact-document-row">
                    <div>
                      <strong>{document.name}</strong>
                      <div className="text-muted-small">Request ID: {document.requestId}</div>
                      <div className="text-muted-small">{document.status}</div>
                    </div>
                    <a className="add-btn" href={document.url || "#"} download={Boolean(document.url)}>
                      Download
                    </a>
                  </div>
                  ))
                )
              ) : (
                <p className="text-muted-small">Documents are view-only here and will appear once the client uploads them.</p>
              )}
            </div>
          </div>

          <div className="lw-card">
            <h3>Payment Status</h3>
            <div className="contact-payment-status">
              {detailState.isLoading ? (
                <EmployeePortalLoader compact title="Loading payments" message="Checking the current payment stage for each request." />
              ) : requestSummaries.length ? (
                requestSummaries.map((request) => (
                  <div key={`payment-${request.requestId}`} className="contact-payment-request">
                    <strong>{request.title}</strong>
                    <div>{request.payment?.status || "Pending"}</div>
                    <p>{request.payment?.notes || "Payment confirmation will be handled later in the workflow."}</p>
                  </div>
                ))
              ) : (
                <>
                  <strong>{contact.payment?.status || "Pending"}</strong>
                  <p>{contact.payment?.notes || "Payment confirmation will be handled later in the workflow."}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </SalesLayout>
  );
}

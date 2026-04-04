import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientRequestsPageMeta } from '../data/requestsData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_REQUESTS_ROUTE
} from '../utils/routePaths';
import { getClientRequestIconTone } from '../utils/requestStorage';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import {
    useDeleteClientRequestMutation,
    useClientRequestsQuery
} from '../hooks/useClientRequestsQuery';
import '../styles/client-request.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

function normalizeDocumentKey(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export default function ClientRequestsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bootstrapQuery = usePortalSession();
    const { theme, toggleTheme } = useClientPortalPage(clientRequestsPageMeta.pageTitle);
    const modalBodyRef = useRef(null);
    const requestsQuery = useClientRequestsQuery();
    const deleteRequestMutation = useDeleteClientRequestMutation();
    const [activeRequestIndex, setActiveRequestIndex] = useState(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isReviewHighlightActive, setIsReviewHighlightActive] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });

    const requests = useMemo(() => {
        if (!requestsQuery.data || !Array.isArray(requestsQuery.data.requests)) {
            return [];
        }

        return requestsQuery.data.requests;
    }, [requestsQuery.data]);

    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;

    const activeRequest = useMemo(() => {
        if (typeof activeRequestIndex !== 'number') {
            return null;
        }

        return requests[activeRequestIndex] || null;
    }, [activeRequestIndex, requests]);

    React.useEffect(() => {
        const requestId = String(searchParams.get('request') || '').trim();
        if (!requestId || !requests.length) {
            return;
        }

        const requestIndex = requests.findIndex((item) => item.requestId === requestId);
        if (requestIndex >= 0) {
            setActiveRequestIndex(requestIndex);
            setIsRequestModalOpen(true);
            navigate(CLIENT_REQUESTS_ROUTE, { replace: true });
        }
    }, [navigate, requests, searchParams]);

    function closeModal() {
        setModalState((prev) => ({
            ...prev,
            isOpen: false,
            onConfirm: null
        }));
    }

    function handleModalConfirm() {
        const callback = modalState.onConfirm;
        closeModal();
        if (callback) {
            callback();
        }
    }

    function openRequestModal(index) {
        setActiveRequestIndex(index);
        setIsRequestModalOpen(true);
    }

    function closeRequestModal() {
        setIsRequestModalOpen(false);
    }

    function handleRequestPrimaryAction() {
        if (!activeRequest) {
            return;
        }

        const action = String(activeRequest.actionBtn || '').toLowerCase();
        const requiredDocuments = Array.isArray(activeRequest.requiredDocuments) ? activeRequest.requiredDocuments : [];
        const uploadedDocuments = Array.isArray(activeRequest.uploadedDocuments) ? activeRequest.uploadedDocuments : [];
        const uploadedDocumentSet = new Set(uploadedDocuments.map(normalizeDocumentKey));
        const allRequiredDocsUploaded =
            requiredDocuments.length > 0 &&
            requiredDocuments.every((item) => uploadedDocumentSet.has(normalizeDocumentKey(item)));

        if (action.includes('upload')) {
            if (allRequiredDocsUploaded) {
                navigate(`${CLIENT_PAYMENTS_ROUTE}?request=${encodeURIComponent(activeRequest.requestId)}`);
                return;
            }
            navigate(`${CLIENT_DOCUMENTS_ROUTE}?request=${encodeURIComponent(activeRequest.requestId)}`);
            return;
        }

        if (action.includes('review')) {
            if (modalBodyRef.current) {
                modalBodyRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            setIsReviewHighlightActive(true);
            window.setTimeout(() => {
                setIsReviewHighlightActive(false);
            }, 850);
            return;
        }

        if (action.includes('payment') || action.includes('whatsapp') || action.includes('confirmation') || action.includes('awaiting')) {
            navigate(`${CLIENT_PAYMENTS_ROUTE}?request=${encodeURIComponent(activeRequest.requestId)}`);
            return;
        }

        navigate(`${CLIENT_DOCUMENTS_ROUTE}?request=${encodeURIComponent(activeRequest.requestId)}`);
    }

    async function handleDeleteRequest() {
        if (!activeRequest) {
            return;
        }

        closeRequestModal();

        setModalState({
            isOpen: true,
            title: 'Cancel Request',
            body: `Delete request ${activeRequest.requestId}? This will remove it from My Requests.`,
            onConfirm: async () => {
                await deleteRequestMutation.mutateAsync(activeRequest.requestId);
                await requestsQuery.refetch();
                setActiveRequestIndex(null);
            }
        });
    }

    const uploadedDocuments = Array.isArray(activeRequest?.uploadedDocuments) ? activeRequest.uploadedDocuments : [];

    return (
        <>
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientRequestsPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientRequestsPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="requests"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">My Requests</span>
                </nav>

                <h2 className="page-title">{clientRequestsPageMeta.heading}</h2>
                <p className="subtitle">{clientRequestsPageMeta.subtitle}</p>

                {requestsQuery.isLoading ? (
                    <PortalPageLoader label="Loading your requests..." />
                ) : requestsQuery.isError ? (
                    <PortalPageError
                        message={requestsQuery.error && requestsQuery.error.message}
                        onRetry={() => requestsQuery.refetch()}
                    />
                ) : requests.length === 0 ? (
                    <section className="requests-empty-state" aria-live="polite">
                        <h3>No service requests yet</h3>
                        <p>Your submitted services will appear here once you request one from the Services catalog.</p>
                        <Link to={CLIENT_DASHBOARD_ROUTE} className="requests-empty-link">
                            Go to dashboard
                        </Link>
                    </section>
                ) : (
                    <div id="requestCards">
                        {requests.map((request, index) => {
                            const toneClass = getClientRequestIconTone(request, index);
                            return (
                                <div
                                    key={request.requestId}
                                    className="request-card"
                                    tabIndex={0}
                                    onClick={() => openRequestModal(index)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            openRequestModal(index);
                                        }
                                    }}
                                >
                                    <div className="left">
                                        <div className={`icon-box ${toneClass}`}>
                                            <i className={request.icon}></i>
                                        </div>
                                        <div className="request-info">
                                            <h4>{request.title}</h4>
                                            <small>Request ID: {request.requestId} | Submitted {request.submittedOn}</small>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="status-text">Status: {request.status}</div>
                                        <div className="progress">
                                            {request.progress.map((step, stepIndex) => (
                                                <React.Fragment key={`${request.requestId}-${step.label}`}>
                                                    <div className={`step${step.completed ? ' active' : ''}`}></div>
                                                    {stepIndex < request.progress.length - 1 ? (
                                                        <div
                                                            className={`line${step.completed && request.progress[stepIndex + 1] && request.progress[stepIndex + 1].completed ? ' active' : ''}`}
                                                        ></div>
                                                    ) : null}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="labels">
                                            {request.progress.map((step) => (
                                                <span key={`${request.requestId}-${step.label}-label`}>{step.label}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="arrow"><i className="fas fa-chevron-right"></i></div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div
                className={`modal-overlay${isRequestModalOpen ? ' active' : ''}`}
                id="requestModal"
                onClick={(event) => {
                    if (event.target.id === 'requestModal') {
                        closeRequestModal();
                    }
                }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-header-icon" id="modalIcon" style={{ background: activeRequest ? activeRequest.iconColor : undefined }}>
                            <i className={activeRequest ? activeRequest.icon : 'fas fa-briefcase'}></i>
                        </div>
                        <div className="modal-header-title">
                            <h2 id="modalTitle">{activeRequest ? activeRequest.title : 'Request Title'}</h2>
                        </div>
                        <button className="modal-close-btn" type="button" onClick={closeRequestModal}>&times;</button>
                    </div>

                    <div className="progress-tracker">
                        <div className="progress-steps" id="progressSteps">
                            {activeRequest
                                ? activeRequest.progress.map((step, index) => {
                                      const lastCompletedIndex = activeRequest.progress.reduce(
                                          (value, progressStep, progressIndex) => (progressStep.completed ? progressIndex : value),
                                          -1
                                      );

                                      return (
                                          <div
                                              key={`${step.label}-${index}`}
                                              className={`progress-step${step.completed && index < lastCompletedIndex ? ' completed' : ''}${index === lastCompletedIndex ? ' active' : ''}`}
                                          >
                                              <div className="progress-step-circle">{step.completed ? 'OK' : index + 1}</div>
                                              <span>{step.label}</span>
                                              {index < activeRequest.progress.length - 1 ? (
                                                  <div className={`progress-step-line${index < lastCompletedIndex ? ' active' : ''}`}></div>
                                              ) : null}
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                    </div>

                    <div className="modal-body" ref={modalBodyRef}>
                        <div className={`modal-section${isReviewHighlightActive ? ' review-highlight' : ''}`}>
                            <div className="modal-info-row">
                                <span className="modal-info-label">Due by:</span>
                                <span className="modal-info-value" id="modalDueDate">{activeRequest ? activeRequest.dueDate : 'Apr 25, 2024'}</span>
                            </div>
                            <div className="modal-info-row">
                                <span className="modal-info-label">Category:</span>
                                <span className="modal-category-badge" id="modalCategory">{activeRequest ? activeRequest.category : 'Accounting'}</span>
                            </div>
                        </div>

                        <div className={`modal-section${isReviewHighlightActive ? ' review-highlight' : ''}`}>
                            <h3>Overview</h3>
                            <p className="modal-description" id="modalOverview">{activeRequest ? activeRequest.overview : 'Request description goes here.'}</p>
                        </div>

                        <div className={`modal-section${isReviewHighlightActive ? ' review-highlight' : ''}`}>
                            <h3>Instructions</h3>
                            <ul className="modal-list" id="modalInstructions">
                                {activeRequest ? activeRequest.instructions.map((instruction) => (
                                    <li key={instruction}>{instruction}</li>
                                )) : null}
                            </ul>
                        </div>

                        <div className={`modal-section${isReviewHighlightActive ? ' review-highlight' : ''}`}>
                            <h3>Uploaded Documents</h3>
                            <ul className="modal-list" id="modalUploadedDocuments">
                                {uploadedDocuments.length ? (
                                    uploadedDocuments.map((fileName) => <li key={fileName}>{fileName}</li>)
                                ) : (
                                    <li className="uploaded-doc-empty">No documents uploaded yet.</li>
                                )}
                            </ul>
                        </div>

                        <div className={`modal-section${isReviewHighlightActive ? ' review-highlight' : ''}`}>
                            <h3>Assigned Staff</h3>
                            <div className="modal-staff">
                                <img src="https://i.pravatar.cc/48" alt="Staff" className="modal-staff-img" />
                                <div className="modal-staff-info">
                                    <h4 id="modalStaffName">{activeRequest ? activeRequest.staffName : 'Jane Smith'}</h4>
                                    <p id="modalStaffRole">{activeRequest ? activeRequest.staffRole : 'Senior Accountant'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="modal-btn modal-btn-secondary" type="button" onClick={closeRequestModal}>Close</button>
                        {activeRequest ? (
                            <button
                                className="modal-btn modal-btn-secondary"
                                type="button"
                                onClick={handleDeleteRequest}
                                disabled={deleteRequestMutation.isPending}
                            >
                                Cancel Request
                            </button>
                        ) : null}
                        <button className="modal-btn modal-btn-primary" id="modalActionBtn" type="button" onClick={handleRequestPrimaryAction}>
                            {activeRequest ? activeRequest.actionBtn : 'Submit Report'}
                        </button>
                    </div>
                </div>
            </div>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
            />
        </>
    );
}

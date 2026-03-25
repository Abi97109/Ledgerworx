import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientDefaultRequests, clientRequestsPageMeta } from '../data/requestsData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE
} from '../utils/routePaths';
import {
    getClientRequestIconTone,
    normalizeStoredClientRequest,
    readStoredClientRequests
} from '../utils/requestStorage';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-request.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientRequestsPage() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useClientPortalPage(clientRequestsPageMeta.pageTitle);
    const modalBodyRef = useRef(null);
    const documentInputRef = useRef(null);
    const [requests] = useState(() => {
        const storedRequests = readStoredClientRequests()
            .map((item, index) => normalizeStoredClientRequest(item, index))
            .filter(Boolean);

        return [...storedRequests, ...clientDefaultRequests];
    });
    const [activeRequestIndex, setActiveRequestIndex] = useState(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [uploadedDocumentsByRequest, setUploadedDocumentsByRequest] = useState({});
    const [isReviewHighlightActive, setIsReviewHighlightActive] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });

    const activeRequest = useMemo(() => {
        if (typeof activeRequestIndex !== 'number') {
            return null;
        }

        return requests[activeRequestIndex] || null;
    }, [activeRequestIndex, requests]);

    useEffect(() => {
        if (!requests.length) {
            setModalState({
                isOpen: true,
                title: 'No Requests Yet',
                body: 'You have not submitted any service requests yet.',
                onConfirm: null
            });
        }
    }, [requests.length]);

    function openModal(title, body, onConfirm) {
        setModalState({
            isOpen: true,
            title,
            body,
            onConfirm: typeof onConfirm === 'function' ? onConfirm : null
        });
    }

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

    function handleUploadedDocumentsChange(event) {
        if (typeof activeRequestIndex !== 'number') {
            return;
        }

        const selectedFiles = Array.from(event.target.files || []);
        if (!selectedFiles.length) {
            return;
        }

        setUploadedDocumentsByRequest((prev) => {
            const nextExisting = [...(prev[activeRequestIndex] || [])];
            selectedFiles.forEach((file) => {
                if (!nextExisting.includes(file.name)) {
                    nextExisting.push(file.name);
                }
            });

            return {
                ...prev,
                [activeRequestIndex]: nextExisting
            };
        });

        event.target.value = '';
    }

    function handleRequestPrimaryAction() {
        if (!activeRequest) {
            return;
        }

        const action = String(activeRequest.actionBtn || '').toLowerCase();

        if (action.includes('upload')) {
            if (documentInputRef.current) {
                documentInputRef.current.click();
            }
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

        if (action.includes('confirmation')) {
            navigate(CLIENT_DOCUMENTS_ROUTE);
        }
    }

    const uploadedDocuments = typeof activeRequestIndex === 'number' ? uploadedDocumentsByRequest[activeRequestIndex] || [] : [];

    return (
        <>
            <ClientPortalNavbar
                profileName={clientRequestsPageMeta.profileName}
                profileImage={clientRequestsPageMeta.profileImage}
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
                            {activeRequest ? activeRequest.progress.map((step, index) => (
                                <div
                                    key={`${step.label}-${index}`}
                                    className={`progress-step${step.completed && index < activeRequest.progress.length - 1 ? ' completed' : ''}${step.completed && index === activeRequest.progress.length - 1 ? ' active' : ''}`}
                                >
                                    <div className="progress-step-circle">{step.completed ? 'OK' : index + 1}</div>
                                    <span>{step.label}</span>
                                    {index < activeRequest.progress.length - 1 ? (
                                        <div className={`progress-step-line${step.completed ? ' active' : ''}`}></div>
                                    ) : null}
                                </div>
                            )) : null}
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
                        <button className="modal-btn modal-btn-primary" id="modalActionBtn" type="button" onClick={handleRequestPrimaryAction}>
                            {activeRequest ? activeRequest.actionBtn : 'Submit Report'}
                        </button>
                    </div>
                    <input
                        type="file"
                        id="requestDocumentInput"
                        ref={documentInputRef}
                        className="hidden-file-input"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                        multiple
                        onChange={handleUploadedDocumentsChange}
                    />
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

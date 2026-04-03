import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientSubServicesPageMeta } from '../data/subServicesData';
import {
    useClientDocumentsQuery,
    useCreateClientRequestMutation
} from '../hooks/useClientRequestsQuery';
import { usePortalCatalogQuery } from '../hooks/usePortalQueries';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_MORE_SERVICES_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_REQUESTS_ROUTE
} from '../utils/routePaths';
import {
    buildClientProgressFromStatus,
} from '../utils/requestStorage';
import { normalizeServiceCategory } from '../utils/portalData';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-subServices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

function normalizeDocumentKey(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function uniqDocumentNames(values) {
    const seen = new Set();
    const output = [];

    (values || []).forEach((value) => {
        const name = String(value || '').trim();
        const key = normalizeDocumentKey(name);
        if (!key || seen.has(key)) {
            return;
        }
        seen.add(key);
        output.push(name);
    });

    return output;
}

function inferServiceRequiredDocuments(categoryTitle, serviceName) {
    const combined = `${categoryTitle || ''} ${serviceName || ''}`.toLowerCase();

    if (combined.includes('business') || combined.includes('license') || combined.includes('government') || combined.includes('visa')) {
        return ['Passport Copy', 'Company Setup Information Form'];
    }

    if (combined.includes('tax') || combined.includes('vat')) {
        return ['Passport Copy', 'Tax Registration Details Form'];
    }

    if (combined.includes('legal') || combined.includes('contract')) {
        return ['Passport Copy', 'Signed Engagement Form'];
    }

    return ['Passport Copy'];
}

function getSelectedCategory(categories, locationSearch) {
    const query = new URLSearchParams(locationSearch || '');
    const selectedKey = String(query.get('category') || '').trim().toLowerCase();

    return categories.find((item) => item.key === selectedKey) || {
        key: '',
        title: 'All Sub Services',
        items: [],
        summary: '',
        iconClass: 'fas fa-briefcase'
    };
}

export default function ClientSubServicesPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const bootstrapQuery = usePortalSession();
    const catalogQuery = usePortalCatalogQuery();
    const documentsQuery = useClientDocumentsQuery();
    const createRequestMutation = useCreateClientRequestMutation();
    const { theme, toggleTheme } = useClientPortalPage(clientSubServicesPageMeta.pageTitle);
    const [selectedService, setSelectedService] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });
    const [requestForm, setRequestForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        notes: ''
    });
    const uploadedDocumentKeySet = useMemo(() => {
        const docs = Array.isArray(documentsQuery.data?.documents) ? documentsQuery.data.documents : [];
        return new Set(
            docs
                .map((item) => normalizeDocumentKey(item?.documentName))
                .filter(Boolean)
        );
    }, [documentsQuery.data]);

    const categories = useMemo(() => {
        return Array.isArray(catalogQuery.data && catalogQuery.data.services)
            ? catalogQuery.data.services.map(normalizeServiceCategory)
            : [];
    }, [catalogQuery.data]);

    const selectedCategory = useMemo(() => {
        return getSelectedCategory(categories, location.search);
    }, [categories, location.search]);

    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;

    useEffect(() => {
        if (!sessionProfile) {
            return;
        }

        setRequestForm((prev) => ({
            fullName: prev.fullName || sessionProfile.name || '',
            email: prev.email || sessionProfile.email || '',
            phone: prev.phone || sessionProfile.phone || '',
            notes: prev.notes
        }));
    }, [sessionProfile]);

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

    function openDetailsModal(service) {
        setSelectedService(service);
        setIsDetailsModalOpen(true);
    }

    function closeDetailsModal() {
        setIsDetailsModalOpen(false);
    }

    function closeFormModal() {
        setIsFormModalOpen(false);
    }

    function handleServiceProceed() {
        closeDetailsModal();
        setIsFormModalOpen(true);
    }

    function updateRequestField(field, value) {
        setRequestForm((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    async function handleRequestSubmit(event) {
        event.preventDefault();

        if (!selectedService) {
            openModal('Select Service', 'Please choose a service before submitting your request.');
            return;
        }

        const requiredDocuments = inferServiceRequiredDocuments(selectedCategory.title, selectedService.name);
        const uploadedDocuments = uniqDocumentNames(
            requiredDocuments.filter((item) => uploadedDocumentKeySet.has(normalizeDocumentKey(item)))
        );
        const readyForPayment =
            requiredDocuments.length > 0 &&
            requiredDocuments.every((item) => uploadedDocumentKeySet.has(normalizeDocumentKey(item)));
        const nextStatus = readyForPayment ? 'Payment Pending' : 'Documents Required';

        try {
            const response = await createRequestMutation.mutateAsync({
                title: `${selectedCategory.title} - ${selectedService.name}`,
                category: 'Service Request',
                overview: selectedService.description || 'Service request submitted from the services page.',
                requester: {
                    name: requestForm.fullName.trim(),
                    email: requestForm.email.trim(),
                    phone: requestForm.phone.trim()
                },
                notes: requestForm.notes.trim(),
                amount: selectedService.amount,
                duration: selectedService.years,
                requiredDocuments,
                uploadedDocuments,
                instructions: readyForPayment
                    ? [
                          'Your required service documents are already available in the portal.',
                          'You can continue to the payment handoff for this service request.',
                          'After payment handoff, this request will move to completion.'
                      ]
                    : [
                          'Your service request has been submitted successfully.',
                          'Upload the required documents from the Documents page to continue processing.',
                          'Once the required documents are complete, payment handoff will unlock automatically.'
                      ],
                status: nextStatus,
                workflowStage: nextStatus,
                actionBtn: readyForPayment ? 'Contact on WhatsApp' : 'Upload Documents',
                dueDate: readyForPayment ? 'Proceed to payment handoff' : 'Upload remaining required documents',
                progress: buildClientProgressFromStatus(readyForPayment ? 'payment pending' : 'documents required'),
                source: 'service-page',
                paymentContactName: 'LedgerWorx Accounts Team',
                paymentContactPhone: '+971506708639',
                paymentWhatsappLink: 'https://wa.me/971506708639',
                staffName: 'LedgerWorx Team',
                staffRole: 'Service Coordinator',
                icon: 'fas fa-concierge-bell',
                iconColor: '#3498db',
                iconTone: 'blue'
            });
            setRequestForm({
                fullName: '',
                email: '',
                phone: '',
                notes: ''
            });
            closeFormModal();
            const createdRequestId = String(response?.request?.requestId || '').trim();
            openModal('Request Submitted', 'Your service request has been submitted and is now visible in My Requests.', () => {
                if (readyForPayment && createdRequestId) {
                    navigate(`${CLIENT_PAYMENTS_ROUTE}?request=${encodeURIComponent(createdRequestId)}`);
                    return;
                }

                if (createdRequestId) {
                    navigate(`${CLIENT_REQUESTS_ROUTE}?request=${encodeURIComponent(createdRequestId)}`);
                    return;
                }

                navigate(CLIENT_DOCUMENTS_ROUTE);
            });
        } catch (error) {
            openModal(
                'Unable to submit request',
                error && error.message ? error.message : 'Please try again in a moment.'
            );
        }
    }

    if (catalogQuery.isLoading || documentsQuery.isLoading) {
        return <PortalPageLoader label="Loading sub services..." />;
    }

    if (catalogQuery.isError || documentsQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load sub services"
                message={(catalogQuery.error && catalogQuery.error.message) || (documentsQuery.error && documentsQuery.error.message)}
                onRetry={() => {
                    catalogQuery.refetch();
                    documentsQuery.refetch();
                }}
            />
        );
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientSubServicesPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientSubServicesPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey=""
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <Link to={CLIENT_MORE_SERVICES_ROUTE}>More Services</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">{selectedCategory.title}</span>
                </nav>
                <h1 className="page-title">{selectedCategory.title}</h1>
                <p className="page-subtitle">{clientSubServicesPageMeta.subtitle}</p>

                {selectedCategory.items.length ? (
                    <ul className="subservice-list">
                        {selectedCategory.items.map((item, index) => (
                            <li key={`${item.name}-${index}`} className="subservice-item">
                                <button type="button" className="subservice-trigger" onClick={() => openDetailsModal(item)}>
                                    <div className="subservice-copy">
                                        <div className="subservice-topline">
                                            <span className="subservice-status-pill">{item.status || 'Available'}</span>
                                            {item.tax ? <span className="subservice-tax">{item.tax}</span> : null}
                                        </div>
                                        <span className="subservice-name">{item.name}</span>
                                        <p className="subservice-preview">{item.description}</p>
                                        <div className="subservice-chips">
                                            <span className="subservice-chip subservice-chip-primary">{item.amount}</span>
                                            <span className="subservice-chip">{item.years}</span>
                                            {item.location ? <span className="subservice-chip">{item.location}</span> : null}
                                        </div>
                                    </div>
                                    <span className="subservice-index">
                                        {index + 1}
                                        <i className="fas fa-chevron-right"></i>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">
                        <strong>No service details are available for this item yet.</strong>
                        <p>Once a service is synced from Zoho CRM, its details will appear here.</p>
                    </div>
                )}
            </div>

            <div
                id="subserviceModal"
                className="modal"
                aria-hidden={isDetailsModalOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'subserviceModal') {
                        closeDetailsModal();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" id="subserviceClose" aria-label="Close" type="button" onClick={closeDetailsModal}>
                        &times;
                    </button>
                    <h3 id="subserviceTitle">{selectedService ? selectedService.name : 'Sub Service'}</h3>
                    <p id="subserviceDescription" className="subservice-modal-details">
                        {selectedService ? selectedService.description : ''}
                    </p>
                    <div className="subservice-meta">
                        <div className="subservice-meta-row"><strong>Amount:</strong> <span id="subserviceAmount">{selectedService ? selectedService.amount : ''}</span></div>
                        <div className="subservice-meta-row"><strong>Duration:</strong> <span id="subserviceYears">{selectedService ? selectedService.years : ''}</span></div>
                        <div className="subservice-meta-row"><strong>Status:</strong> <span>{selectedService ? selectedService.status : ''}</span></div>
                        <div className="subservice-meta-row"><strong>Location:</strong> <span>{selectedService ? selectedService.location || 'To be confirmed' : ''}</span></div>
                        {selectedService && selectedService.tax ? (
                            <div className="subservice-meta-row"><strong>Tax:</strong> <span>{selectedService.tax}</span></div>
                        ) : null}
                    </div>
                    <div className="subservice-actions">
                        <button type="button" className="btn-proceed" id="subserviceProceed" onClick={handleServiceProceed}>
                            Proceed
                        </button>
                        <button type="button" className="btn-cancel" id="subserviceCancel" onClick={closeDetailsModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <div
                id="subserviceFormModal"
                className="modal"
                aria-hidden={isFormModalOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'subserviceFormModal') {
                        closeFormModal();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" id="subserviceFormClose" aria-label="Close" type="button" onClick={closeFormModal}>
                        &times;
                    </button>
                    <h3 id="subserviceFormTitle">Request Service - {selectedService ? selectedService.name : ''}</h3>
                    <form id="subserviceRequestForm" className="request-form" onSubmit={handleRequestSubmit}>
                        <div>
                            <label htmlFor="reqName">Full Name</label>
                            <input
                                type="text"
                                id="reqName"
                                required
                                value={requestForm.fullName}
                                onChange={(event) => updateRequestField('fullName', event.target.value)}
                                placeholder={(sessionProfile && sessionProfile.name) || 'Your full name'}
                            />
                        </div>
                        <div>
                            <label htmlFor="reqEmail">Email</label>
                            <input
                                type="email"
                                id="reqEmail"
                                required
                                value={requestForm.email}
                                onChange={(event) => updateRequestField('email', event.target.value)}
                                placeholder={(sessionProfile && sessionProfile.email) || 'name@example.com'}
                            />
                        </div>
                        <div>
                            <label htmlFor="reqPhone">Phone</label>
                            <input
                                type="text"
                                id="reqPhone"
                                required
                                value={requestForm.phone}
                                onChange={(event) => updateRequestField('phone', event.target.value)}
                                placeholder={(sessionProfile && sessionProfile.phone) || 'Phone number'}
                            />
                        </div>
                        <div>
                            <label htmlFor="reqNotes">Notes</label>
                            <textarea
                                id="reqNotes"
                                placeholder="Add any specific requirement..."
                                value={requestForm.notes}
                                onChange={(event) => updateRequestField('notes', event.target.value)}
                            />
                        </div>
                        <div className="subservice-actions">
                            <button type="submit" className="btn-proceed" disabled={createRequestMutation.isPending}>
                                {createRequestMutation.isPending ? 'Submitting...' : 'Submit'}
                            </button>
                            <button type="button" className="btn-cancel" id="subserviceFormCancel" onClick={closeFormModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
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

import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import {
    clientSubServicesPageMeta,
    getClientSubServiceCategory
} from '../data/subServicesData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_MORE_SERVICES_ROUTE,
    CLIENT_REQUESTS_ROUTE
} from '../utils/routePaths';
import {
    buildNextClientRequestId,
    createSubmittedClientRequest,
    readStoredClientRequests,
    writeStoredClientRequests
} from '../utils/requestStorage';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-subServices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientSubServicesPage() {
    const location = useLocation();
    const navigate = useNavigate();
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

    const selectedCategory = useMemo(() => {
        const query = new URLSearchParams(location.search || '');
        return getClientSubServiceCategory(query.get('category'));
    }, [location.search]);

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

    function handleRequestSubmit(event) {
        event.preventDefault();

        if (!selectedService) {
            openModal('Select Service', 'Please choose a service before submitting your request.');
            return;
        }

        const storedRequests = readStoredClientRequests();
        const newRequest = createSubmittedClientRequest({
            title: `${selectedCategory.title} - ${selectedService.name}`,
            category: selectedCategory.title,
            overview: selectedService.description || 'Service request submitted from the services page.',
            requester: {
                name: requestForm.fullName.trim(),
                email: requestForm.email.trim(),
                phone: requestForm.phone.trim()
            },
            notes: requestForm.notes.trim(),
            amount: selectedService.amount,
            duration: selectedService.years,
            submittedAt: new Date(),
            requestId: buildNextClientRequestId(storedRequests)
        });

        storedRequests.unshift(newRequest);
        writeStoredClientRequests(storedRequests);

        setRequestForm({
            fullName: '',
            email: '',
            phone: '',
            notes: ''
        });
        closeFormModal();
        window.alert('Service request submitted successfully. It is now visible in My Requests with Submitted status.');
        navigate(CLIENT_REQUESTS_ROUTE);
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={clientSubServicesPageMeta.profileName}
                profileImage={clientSubServicesPageMeta.profileImage}
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

                <ul className="subservice-list">
                    {selectedCategory.items.map((item, index) => (
                        <li key={`${item.name}-${index}`} className="subservice-item">
                            <button type="button" className="subservice-trigger" onClick={() => openDetailsModal(item)}>
                                <span className="subservice-name">{item.name}</span>
                                <span className="subservice-index">{index + 1}</span>
                            </button>
                        </li>
                    ))}
                </ul>
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
                            <button type="submit" className="btn-proceed">Submit</button>
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

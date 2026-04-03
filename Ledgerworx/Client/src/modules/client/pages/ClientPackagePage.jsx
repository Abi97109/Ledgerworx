import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import {
    useClientDocumentsQuery,
    useCreateClientRequestMutation
} from '../hooks/useClientRequestsQuery';
import { clientPackagePageMeta } from '../data/packageData';
import { usePortalCatalogQuery } from '../hooks/usePortalQueries';
import { normalizeCatalogPackage } from '../utils/portalData';
import { buildClientProgressFromStatus } from '../utils/requestStorage';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_MORE_PACKAGES_ROUTE
} from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-package.css';
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

function inferPackageRequiredDocuments(selectedPlan) {
    const packageName = String(selectedPlan?.name || '').toLowerCase();
    const category = String(selectedPlan?.category || '').toLowerCase();
    const combined = `${packageName} ${category}`;

    if (combined.includes('visa') || combined.includes('business setup')) {
        return ['Passport Copy', 'Company Setup Information Form'];
    }

    if (combined.includes('renewal')) {
        return ['Passport Copy'];
    }

    return ['Passport Copy'];
}

export default function ClientPackagePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const catalogQuery = usePortalCatalogQuery();
    const documentsQuery = useClientDocumentsQuery();
    const createRequestMutation = useCreateClientRequestMutation();
    const { theme, toggleTheme } = useClientPortalPage(clientPackagePageMeta.pageTitle);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [requestForm, setRequestForm] = useState({
        packageName: '',
        plan: '',
        packagePrice: '',
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
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

    const selectedPlan = useMemo(() => {
        const query = new URLSearchParams(location.search || '');
        const selectedKey = String(query.get('plan') || '').trim().toLowerCase();
        const packageList = Array.isArray(catalogQuery.data && catalogQuery.data.packages)
            ? catalogQuery.data.packages.map(normalizeCatalogPackage)
            : [];

        return packageList.find((item) => item.key === selectedKey) || null;
    }, [catalogQuery.data, location.search]);

    useEffect(() => {
        setRequestForm((prev) => ({
            ...prev,
            packageName: selectedPlan ? selectedPlan.name : '',
            plan: selectedPlan ? selectedPlan.key : '',
            packagePrice: selectedPlan ? selectedPlan.monthlyPrice : ''
        }));
    }, [selectedPlan]);

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setIsRequestModalOpen(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function updateRequestField(field, value) {
        setRequestForm((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    async function handleRequestSubmit(event) {
        event.preventDefault();
        if (!selectedPlan) {
            return;
        }

        const requiredDocuments = inferPackageRequiredDocuments(selectedPlan);
        const uploadedDocuments = uniqDocumentNames(
            requiredDocuments.filter((item) => uploadedDocumentKeySet.has(normalizeDocumentKey(item)))
        );
        const readyForPayment =
            requiredDocuments.length > 0 &&
            requiredDocuments.every((item) => uploadedDocumentKeySet.has(normalizeDocumentKey(item)));
        const nextStatus = readyForPayment ? 'Review' : 'Submitted';

        try {
            const response = await createRequestMutation.mutateAsync({
                title: selectedPlan.name,
                category: 'Package Request',
                amount: selectedPlan.monthlyPrice || 'Amount to be confirmed',
                duration: selectedPlan.duration || selectedPlan.supportWindow || selectedPlan.salesWindow || '',
                overview: selectedPlan.description || selectedPlan.tagline || 'Package request submitted from the live catalog.',
                notes: requestForm.notes,
                requiredDocuments,
                uploadedDocuments,
                instructions: readyForPayment
                    ? [
                          'Your required package documents are already available in the portal.',
                          'This package request is ready for review by our team.',
                          'Payment will open after the review stage is completed.'
                      ]
                    : [
                          'Your package request has been created successfully.',
                          'Open the Documents page and upload the remaining required documents.',
                          'Once the required documents are complete, the request will move into review.'
                      ],
                status: nextStatus,
                workflowStage: nextStatus,
                actionBtn: readyForPayment ? 'Await Review' : 'Upload Documents',
                dueDate: readyForPayment ? 'Review in progress' : 'Upload remaining required documents',
                progress: buildClientProgressFromStatus(nextStatus),
                requester: {
                    name: requestForm.fullName,
                    email: requestForm.email,
                    phone: requestForm.phone,
                    companyName: requestForm.companyName
                },
                requesterName: requestForm.fullName,
                requesterEmail: requestForm.email,
                source: 'package-page',
                paymentContactName: 'LedgerWorx Accounts Team',
                paymentContactPhone: '+971506708639',
                paymentWhatsappLink: 'https://wa.me/971506708639',
                staffName: 'LedgerWorx Team',
                staffRole: 'Package Coordinator',
                icon: 'fas fa-box-open',
                iconColor: '#16a085',
                iconTone: 'teal'
            });

            const createdRequest = response?.request || null;
            const createdRequestId = String(createdRequest?.requestId || '').trim();

            setIsRequestModalOpen(false);

            if (createdRequestId) {
                navigate(`/client/requests?request=${encodeURIComponent(createdRequestId)}`);
                return;
            }

            navigate('/client/requests');
        } catch (error) {
            window.alert(error?.message || 'Unable to submit this package request right now.');
        }
    }

    if (catalogQuery.isLoading || documentsQuery.isLoading) {
        return <PortalPageLoader label="Loading package details..." />;
    }

    if (catalogQuery.isError || documentsQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load package details"
                message={(catalogQuery.error && catalogQuery.error.message) || (documentsQuery.error && documentsQuery.error.message)}
                onRetry={() => {
                    catalogQuery.refetch();
                    documentsQuery.refetch();
                }}
            />
        );
    }

    const detailTiles = selectedPlan
        ? [
              ['Monthly Price', selectedPlan.monthlyPrice],
              ['Annual Price', selectedPlan.annualPrice],
              ['Duration', selectedPlan.duration],
              ['Package Category', selectedPlan.category],
              ['Status', selectedPlan.productStatus],
              ['Code', selectedPlan.code],
              ['Usage Unit', selectedPlan.usageUnit],
              ['Support Window', selectedPlan.supportWindow || selectedPlan.support],
              ['Sales Window', selectedPlan.salesWindow],
              ['Manufacturer', selectedPlan.manufacturer || selectedPlan.reports],
              ['Tax Summary', selectedPlan.taxSummary],
              ['Coverage', selectedPlan.servicesLimit],
              ['Stock / Availability', selectedPlan.turnaround]
          ].filter(([, value]) => String(value || '').trim())
        : [];

    const includedServices = selectedPlan
        ? (selectedPlan.includedServices.length ? selectedPlan.includedServices : selectedPlan.features).filter(Boolean)
        : [];

    const deliverables = selectedPlan ? selectedPlan.deliverables.filter(Boolean) : [];
    const exclusions = selectedPlan ? selectedPlan.notIncluded.filter(Boolean) : [];

    return (
        <>
            <ClientPortalNavbar
                profileName={clientPackagePageMeta.profileName}
                profileImage={clientPackagePageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="dashboard"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <main className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">{selectedPlan ? selectedPlan.name : 'Package Details'}</span>
                </nav>

                {selectedPlan ? (
                    <>
                        <section className="package-intro">
                            <span className="package-kicker">{selectedPlan.category || 'Package'}</span>
                            <h1 className="title">{selectedPlan.name}</h1>
                            <p className="subtitle">
                                {selectedPlan.tagline || selectedPlan.description || 'Review the package scope, catalog metadata, and request details below.'}
                            </p>
                        </section>

                        <section className="card hero">
                            {detailTiles.map(([label, value]) => (
                                <div key={label} className="meta-box">
                                    <div className="meta-label">{label}</div>
                                    <div className="meta-value">{value}</div>
                                </div>
                            ))}
                        </section>

                        {selectedPlan.description ? (
                            <section className="card">
                                <h2 className="section-title">Description</h2>
                                <p className="package-description">{selectedPlan.description}</p>
                            </section>
                        ) : null}

                        {includedServices.length ? (
                            <section className="card">
                                <h2 className="section-title">Included Services</h2>
                                <ul className="list">
                                    {includedServices.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ) : null}

                        {deliverables.length ? (
                            <section className="card">
                                <h2 className="section-title">Deliverables</h2>
                                <ul className="list">
                                    {deliverables.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ) : null}

                        <section className="card">
                            <h2 className="section-title">{exclusions.length ? 'Not Included' : 'Request This Package'}</h2>
                            {exclusions.length ? (
                                <ul className="list">
                                    {exclusions.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="package-description">This catalog item does not include a separate exclusions list from Zoho CRM yet. You can still proceed with the request.</p>
                            )}
                            <div className="actions">
                                <button type="button" className="btn btn-primary" onClick={() => setIsRequestModalOpen(true)}>
                                    Proceed with Request
                                </button>
                                <Link className="btn btn-secondary" to={CLIENT_MORE_PACKAGES_ROUTE}>
                                    Compare Other Packages
                                </Link>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="empty">
                        <strong>Package not found.</strong>
                        <p>Please return to the dashboard and select an available package.</p>
                    </div>
                )}
            </main>

            <div
                id="requestModal"
                className={`modal${isRequestModalOpen ? ' active' : ''}`}
                aria-hidden={isRequestModalOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'requestModal') {
                        setIsRequestModalOpen(false);
                    }
                }}
            >
                <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="requestModalTitle">
                    <button
                        className="modal-close"
                        id="closeRequestModal"
                        aria-label="Close"
                        type="button"
                        onClick={() => setIsRequestModalOpen(false)}
                    >
                        &times;
                    </button>
                    <h3 className="modal-title" id="requestModalTitle">Package Request Form</h3>
                    <p className="modal-subtitle">Fill the details below and we will create the request with the correct document and payment flow.</p>
                    <form id="requestForm" className="request-form" onSubmit={handleRequestSubmit}>
                        <div>
                            <label htmlFor="requestPackage">Selected Package</label>
                            <input type="text" id="requestPackage" value={requestForm.packageName} readOnly />
                        </div>
                        <div>
                            <label htmlFor="requestName">Full Name</label>
                            <input
                                type="text"
                                id="requestName"
                                required
                                value={requestForm.fullName}
                                onChange={(event) => updateRequestField('fullName', event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestEmail">Email Address</label>
                            <input
                                type="email"
                                id="requestEmail"
                                required
                                value={requestForm.email}
                                onChange={(event) => updateRequestField('email', event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestPhone">Phone Number</label>
                            <input
                                type="tel"
                                id="requestPhone"
                                required
                                value={requestForm.phone}
                                onChange={(event) => updateRequestField('phone', event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestCompany">Company Name</label>
                            <input
                                type="text"
                                id="requestCompany"
                                required
                                value={requestForm.companyName}
                                onChange={(event) => updateRequestField('companyName', event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestNotes">Additional Notes</label>
                            <textarea
                                id="requestNotes"
                                placeholder="Any special request or details"
                                value={requestForm.notes}
                                onChange={(event) => updateRequestField('notes', event.target.value)}
                            />
                        </div>
                        <div className="modal-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                id="cancelRequestModal"
                                onClick={() => setIsRequestModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">Submit Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

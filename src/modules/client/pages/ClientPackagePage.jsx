import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientPackagePageMeta, getClientPackageByPlan } from '../data/packageData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_PAYMENTS_ROUTE
} from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-package.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientPackagePage() {
    const location = useLocation();
    const navigate = useNavigate();
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

    const selectedPlan = useMemo(() => {
        const query = new URLSearchParams(location.search || '');
        return getClientPackageByPlan(query.get('plan'));
    }, [location.search]);

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

    function handleRequestSubmit(event) {
        event.preventDefault();
        setIsRequestModalOpen(false);
        navigate(CLIENT_PAYMENTS_ROUTE, {
            state: {
                packageRequest: requestForm
            }
        });
    }

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
                        <h1 className="title">{selectedPlan.name}</h1>
                        <p className="subtitle">{selectedPlan.tagline}</p>

                        <section className="card hero">
                            <div className="meta-box">
                                <div className="meta-label">Monthly Price</div>
                                <div className="meta-value">{selectedPlan.monthlyPrice}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Annual Price</div>
                                <div className="meta-value">{selectedPlan.annualPrice}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Service Coverage</div>
                                <div className="meta-value">{selectedPlan.servicesLimit}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Support Model</div>
                                <div className="meta-value">{selectedPlan.support}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Reporting</div>
                                <div className="meta-value">{selectedPlan.reports}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Turnaround</div>
                                <div className="meta-value">{selectedPlan.turnaround}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Onboarding</div>
                                <div className="meta-value">{selectedPlan.onboarding}</div>
                            </div>
                        </section>

                        <section className="card">
                            <h2 className="section-title">Included Services</h2>
                            <ul className="list">
                                {selectedPlan.includedServices.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="card">
                            <h2 className="section-title">Deliverables</h2>
                            <ul className="list">
                                {selectedPlan.deliverables.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="card">
                            <h2 className="section-title">Not Included</h2>
                            <ul className="list">
                                {selectedPlan.notIncluded.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <div className="actions">
                                <button type="button" className="btn btn-primary" onClick={() => setIsRequestModalOpen(true)}>
                                    Proceed with Request
                                </button>
                                <Link className="btn btn-secondary" to={`${CLIENT_DASHBOARD_ROUTE}?section=packages`}>
                                    Compare Other Packages
                                </Link>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="empty">
                        <strong>Package not found.</strong>
                        <p>Please return to the dashboard and select Basic, Pro, or Ultimate.</p>
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
                    <p className="modal-subtitle">Fill the details below and continue to the payments page.</p>
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
                            <button type="submit" className="btn btn-primary">Proceed to Payments</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

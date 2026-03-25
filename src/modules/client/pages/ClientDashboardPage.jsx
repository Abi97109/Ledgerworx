import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import {
    CLIENT_ACTIVE_SERVICES_ROUTE,
    clientDashboardNotifications,
    clientDashboardPackages,
    clientDashboardPageMeta,
    clientDashboardQuickLinks,
    clientDashboardRecentActivity,
    clientDashboardServices,
    clientDashboardStats,
    clientPrimaryNavLinks
} from '../data/dashboardData';
import { clientPaymentItems } from '../data/paymentsData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_INVOICES_ROUTE,
    CLIENT_MORE_SERVICES_ROUTE,
    CLIENT_PAYMENTS_ROUTE
} from '../utils/routePaths';
import {
    CLIENT_DUE_NOW_STORAGE_KEY,
    formatAedAmount,
    getClientPaymentTotals
} from '../utils/paymentUtils';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';
import '../styles/client-dashboard.css';
import '../styles/dark-mode.css';

export default function ClientDashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(() => {
        const initialTheme = getClientSavedTheme();

        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        }

        return initialTheme;
    });
    const paymentTotals = useMemo(() => getClientPaymentTotals(clientPaymentItems), []);
    const [paymentDueAmount, setPaymentDueAmount] = useState(clientDashboardStats.initialPaymentDue);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });
    const [toastState, setToastState] = useState({
        isVisible: false,
        message: ''
    });
    const toastTimeoutRef = useRef(null);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark-mode', theme === 'dark');
        saveClientTheme(theme);
    }, [theme]);

    useEffect(() => {
        const existing = document.getElementById('font-awesome-6-5-0');
        if (existing) {
            return;
        }

        const link = document.createElement('link');
        link.id = 'font-awesome-6-5-0';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        let nextDueNowAmount = paymentTotals.dueNow;

        try {
            const cachedDueNow = Number(window.localStorage.getItem(CLIENT_DUE_NOW_STORAGE_KEY));
            if (Number.isFinite(cachedDueNow) && cachedDueNow >= 0) {
                nextDueNowAmount = cachedDueNow;
            }
        } catch (error) {
            // Ignore storage access failures.
        }

        setPaymentDueAmount(nextDueNowAmount);
    }, [paymentTotals.dueNow]);

    useEffect(() => {
        try {
            window.localStorage.setItem(CLIENT_DUE_NOW_STORAGE_KEY, String(paymentDueAmount));
        } catch (error) {
            // Ignore storage access failures.
        }
    }, [paymentDueAmount]);

    useEffect(() => {
        const query = new URLSearchParams(location.search || '');
        if (query.get('section') !== 'packages') {
            return;
        }

        const packagesSection = document.getElementById('packages');
        if (packagesSection) {
            packagesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [location.search]);

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        return function cleanupToastTimeout() {
            if (toastTimeoutRef.current) {
                window.clearTimeout(toastTimeoutRef.current);
            }
        };
    }, []);

    function showPayNowNotification(message) {
        setToastState({
            isVisible: true,
            message
        });

        if (toastTimeoutRef.current) {
            window.clearTimeout(toastTimeoutRef.current);
        }

        toastTimeoutRef.current = window.setTimeout(() => {
            setToastState((prev) => ({
                ...prev,
                isVisible: false
            }));
        }, 2200);
    }

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
        const next = modalState.onConfirm;
        closeModal();
        if (next) {
            next();
        }
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={clientDashboardPageMeta.profileName}
                profileImage={clientDashboardPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="dashboard"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            />

            <main className="container">
                <section className="welcome">
                    <h1>Welcome back, {clientDashboardPageMeta.userName}</h1>
                    <p>Here's what's happening with your account today</p>
                </section>

                <section className="packages" id="packages">
                    {clientDashboardPackages.map((pkg) => (
                        <article
                            key={pkg.id}
                            className="card"
                            data-plan={pkg.plan}
                            data-href={pkg.routePath.replace('/client/', '')}
                            onClick={() => navigate(pkg.routePath)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    navigate(pkg.routePath);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <h3>{pkg.title}</h3>
                            <div className="price">{pkg.price}</div>
                            <ul>
                                {pkg.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>

                <section className="stats">
                    <Link to={CLIENT_ACTIVE_SERVICES_ROUTE} className="stat-box stat-link">
                        <span className="stat-label">Active Services</span>
                        <div className="stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h2>{clientDashboardStats.activeServicesCount}</h2>
                    </Link>
                    <Link to={CLIENT_INVOICES_ROUTE} className="stat-box stat-link">
                        <span className="stat-label">Invoices</span>
                        <div className="stat-icon">
                            <i className="fas fa-file-invoice-dollar"></i>
                        </div>
                        <h2>{clientDashboardStats.invoicesCount}</h2>
                    </Link>
                    <div className="stat-box">
                        <span className="stat-label">Payments Due</span>
                        <h2 id="dashboardPaymentDueAmount">{formatAedAmount(paymentDueAmount)}</h2>
                        <div className="pay-now" style={{ marginTop: '14px' }}>
                            <button
                                className="primary pay-btn"
                                onClick={() => {
                                    showPayNowNotification('Pay Now clicked. Please confirm to continue payment.');
                                    openModal(
                                        'Go To Payments',
                                        'You will be redirected to the Payments page to complete this payment.',
                                        () => {
                                            navigate(CLIENT_PAYMENTS_ROUTE);
                                        }
                                    );
                                }}
                            >
                                Pay Now
                            </button>
                            <button className="secondary">Download Invoice</button>
                        </div>
                    </div>
                </section>

                <section className="services-section">
                    <div className="services-header">
                        <h3>Services</h3>
                        <Link to={CLIENT_MORE_SERVICES_ROUTE} className="more-services">
                            More Services <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="services">
                        {clientDashboardServices.map((service) => (
                            <Link key={service.id} to={service.routePath} className="service-box">
                                <div className="service-left">
                                    <div className="service-icon">
                                        <i className={service.iconClass}></i>
                                    </div>
                                    <span>{service.label}</span>
                                </div>
                                <i className="fas fa-chevron-right"></i>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="bottom-section">
                    <div className="recent">
                        <h3>Recent Activity</h3>
                        <div className="activity-grid">
                            {clientDashboardRecentActivity.map((activity) => (
                                <div key={activity.id} className="activity-tile">
                                    <div className="title">{activity.title}</div>
                                    <div className="meta">{activity.meta}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="side">
                        <h3>Quick Links</h3>
                        <div className="quick-links">
                            <div
                                id="quickBlogLink"
                                onClick={() => {
                                    openModal(
                                        'Redirecting to Blog Page',
                                        'You will be redirected to the blog page.',
                                        () => {
                                            window.location.href = buildLegacyUrl(clientDashboardQuickLinks.blogHref);
                                        }
                                    );
                                }}
                            >
                                Blog
                            </div>
                            <Link to={clientDashboardQuickLinks.supportRoute}>Support</Link>
                        </div>

                        <h3>Latest Notifications</h3>
                        <div className="notifications">
                            {clientDashboardNotifications.map((note) => (
                                <p key={note}>{note}</p>
                            ))}
                        </div>
                    </aside>
                </div>
            </main>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
            />

            <div
                id="payNowToast"
                className={`pay-now-toast${toastState.isVisible ? ' show' : ''}`}
                role="status"
                aria-live="polite"
            >
                {toastState.message}
            </div>
        </>
    );
}

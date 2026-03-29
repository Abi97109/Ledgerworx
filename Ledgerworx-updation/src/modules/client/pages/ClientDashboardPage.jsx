import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientDashboardQuickLinks } from '../data/dashboardData';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { usePortalDashboardQuery } from '../hooks/usePortalQueries';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_INVOICES_ROUTE,
    CLIENT_MORE_SERVICES_ROUTE,
    CLIENT_PAYMENTS_ROUTE
} from '../utils/routePaths';
import { formatAedAmount } from '../utils/paymentUtils';
import { normalizeCatalogPackage, normalizeServiceCategory } from '../utils/portalData';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';
import '../styles/client-dashboard.css';
import '../styles/dark-mode.css';

function normalizeDashboardPayload(payload, sessionProfile) {
    const profile = payload && payload.profile ? payload.profile : {};
    const stats = payload && payload.stats ? payload.stats : {};
    const payments = payload && payload.payments ? payload.payments : {};

    return {
        profile: {
            name: profile.name || (sessionProfile && sessionProfile.name) || 'Client',
            avatarUrl: profile.avatarUrl || (sessionProfile && sessionProfile.avatarUrl) || '',
            email: profile.email || (sessionProfile && sessionProfile.email) || '',
            phone: profile.phone || (sessionProfile && sessionProfile.phone) || ''
        },
        stats: {
            activeServicesCount: Number.isFinite(Number(stats.activeServicesCount)) ? Number(stats.activeServicesCount) : 0,
            invoicesCount: Number.isFinite(Number(stats.invoicesCount)) ? Number(stats.invoicesCount) : 0,
            paymentDueAmount: Number.isFinite(Number(payments.dueNow)) ? Number(payments.dueNow) : 0
        },
        packages: Array.isArray(payload && payload.packages) ? payload.packages.map(normalizeCatalogPackage) : [],
        services: Array.isArray(payload && payload.services) ? payload.services.map(normalizeServiceCategory) : [],
        recentActivity: Array.isArray(payload && payload.recentActivity) ? payload.recentActivity : [],
        notifications: Array.isArray(payload && payload.notifications) ? payload.notifications : []
    };
}

export default function ClientDashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const bootstrapQuery = usePortalSession();
    const dashboardQuery = usePortalDashboardQuery();
    const [theme, setTheme] = useState(() => {
        const initialTheme = getClientSavedTheme();

        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        }

        return initialTheme;
    });
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

    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;
    const dashboardData = normalizeDashboardPayload(dashboardQuery.data || {}, sessionProfile);

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

    if (dashboardQuery.isLoading) {
        return <PortalPageLoader label="Loading your dashboard..." />;
    }

    if (dashboardQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load your dashboard"
                message={dashboardQuery.error && dashboardQuery.error.message}
                onRetry={() => dashboardQuery.refetch()}
            />
        );
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={dashboardData.profile.name}
                profileImage={dashboardData.profile.avatarUrl}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="dashboard"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            />

            <main className="container">
                <section className="welcome">
                    <h1>Welcome back, {dashboardData.profile.name}</h1>
                    <p>Here&apos;s what&apos;s happening with your account today</p>
                </section>

                <section className="packages" id="packages">
                    {dashboardData.packages.map((pkg) => (
                        <article
                            key={pkg.id}
                            className="card"
                            data-plan={pkg.key}
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
                            <div className="price">{pkg.monthlyPrice}</div>
                            <ul>
                                {(pkg.features.length ? pkg.features : pkg.includedServices.slice(0, 3)).map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>

                <section className="stats">
                    <Link to={CLIENT_MORE_SERVICES_ROUTE} className="stat-box stat-link">
                        <span className="stat-label">Active Services</span>
                        <div className="stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h2>{dashboardData.stats.activeServicesCount}</h2>
                    </Link>
                    <Link to={CLIENT_INVOICES_ROUTE} className="stat-box stat-link">
                        <span className="stat-label">Invoices</span>
                        <div className="stat-icon">
                            <i className="fas fa-file-invoice-dollar"></i>
                        </div>
                        <h2>{dashboardData.stats.invoicesCount}</h2>
                    </Link>
                    <div className="stat-box">
                        <span className="stat-label">Payments Due</span>
                        <h2 id="dashboardPaymentDueAmount">
                            {dashboardData.stats.paymentDueAmount > 0 ? formatAedAmount(dashboardData.stats.paymentDueAmount) : 'No pending payments'}
                        </h2>
                        {dashboardData.stats.paymentDueAmount > 0 ? (
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
                            </div>
                        ) : (
                            <p className="payment-clear-note">Your account is clear. New dues will appear here automatically.</p>
                        )}
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
                        {dashboardData.services.map((service) => (
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
                            {dashboardData.recentActivity.length ? (
                                dashboardData.recentActivity.map((activity) => (
                                    <div key={activity.id || activity.title} className="activity-tile">
                                        <div className="title">{activity.title}</div>
                                        <div className="meta">{activity.meta || activity.timestamp || ''}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="activity-empty-state">
                                    Your recent request activity will appear here once you submit a service request.
                                </div>
                            )}
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
                            {dashboardData.notifications.length ? (
                                dashboardData.notifications.map((note) => (
                                    <p key={note.id || note.title || note}>{note.title || note.message || note}</p>
                                ))
                            ) : (
                                <p className="notification-empty-state">No new notifications right now.</p>
                            )}
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

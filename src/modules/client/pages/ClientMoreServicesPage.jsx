import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { clientMoreServicesPageMeta } from '../data/moreServicesData';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { usePortalCatalogQuery } from '../hooks/usePortalQueries';
import { normalizeServiceCategory } from '../utils/portalData';
import { CLIENT_DASHBOARD_ROUTE } from '../utils/routePaths';
import '../styles/client-moreServices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';

export default function ClientMoreServicesPage() {
    const catalogQuery = usePortalCatalogQuery();
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

    const serviceCategories = Array.isArray(catalogQuery.data && catalogQuery.data.services)
        ? catalogQuery.data.services.map(normalizeServiceCategory)
        : [];

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark-mode', theme === 'dark');
        saveClientTheme(theme);
    }, [theme]);

    useEffect(() => {
        document.title = clientMoreServicesPageMeta.pageTitle;
    }, []);

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
        if (typeof callback === 'function') {
            callback();
        }
    }

    if (catalogQuery.isLoading) {
        return <PortalPageLoader label="Loading service catalog..." />;
    }

    if (catalogQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load services"
                message={catalogQuery.error && catalogQuery.error.message}
                onRetry={() => catalogQuery.refetch()}
            />
        );
    }

    return (
        <div className="client-more-services-page">
            <ClientPortalNavbar
                profileName={clientMoreServicesPageMeta.profileName}
                profileImage={clientMoreServicesPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey=""
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">More Services</span>
                </nav>
                <section className="services-hero">
                    <div className="services-hero-copy">
                        <span className="services-eyebrow">Live Zoho catalog</span>
                        <h1 className="page-title">{clientMoreServicesPageMeta.heading}</h1>
                        <p className="page-subtitle">{clientMoreServicesPageMeta.subtitle}</p>
                    </div>
                    <div className="services-hero-stats">
                        <div className="hero-stat">
                            <strong>{serviceCategories.length}</strong>
                            <span>Active services</span>
                        </div>
                        <div className="hero-stat hero-stat-accent">
                            <strong>Live</strong>
                            <span>Synced from Zoho CRM</span>
                        </div>
                    </div>
                </section>

                {serviceCategories.length ? (
                    <div className="services-grid">
                        {serviceCategories.map((service) => (
                            <Link key={service.id} to={service.routePath} className="service-link">
                                <article className="service-tile">
                                    <div className="tile-head">
                                        <span className="tile-icon">
                                            <i className={service.iconClass}></i>
                                        </span>
                                        <span className="tile-tag">{service.tag}</span>
                                    </div>
                                    <div className="tile-spotlight">
                                        <span className="tile-price">{service.price || (service.items[0] && service.items[0].amount) || 'Price on request'}</span>
                                        <span className="tile-duration">{service.duration || (service.items[0] && service.items[0].years) || 'Duration on request'}</span>
                                    </div>
                                    <h3 className="tile-title">{service.title}</h3>
                                    <p className="tile-meta">{service.summary}</p>
                                    <div className="tile-status-row">
                                        <span className="tile-status-badge">{service.status || 'Available'}</span>
                                        {service.items[0] && service.items[0].tax ? (
                                            <span className="tile-tax">{service.items[0].tax}</span>
                                        ) : null}
                                    </div>
                                    <div className="tile-footer">
                                        <span className="tile-location">
                                            <i className="fas fa-location-dot"></i>
                                            {service.location || (service.items[0] && service.items[0].location) || 'Remote / To be confirmed'}
                                        </span>
                                        <span className="tile-cta">
                                            Explore <i className="fas fa-arrow-right"></i>
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <strong>No services are available right now.</strong>
                        <p>The portal is now reading service data only from Zoho CRM. Add or publish services there and refresh this page.</p>
                    </div>
                )}
            </div>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
            />
        </div>
    );
}

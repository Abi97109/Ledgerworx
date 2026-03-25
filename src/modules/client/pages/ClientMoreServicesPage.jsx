import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import {
    CLIENT_DASHBOARD_ROUTE,
    clientMoreServicesItems,
    clientMoreServicesPageMeta,
    clientPrimaryNavLinks
} from '../data/moreServicesData';
import '../styles/client-moreServices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';

export default function ClientMoreServicesPage() {
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
                <h1 className="page-title">{clientMoreServicesPageMeta.heading}</h1>
                <p className="page-subtitle">{clientMoreServicesPageMeta.subtitle}</p>

                <div className="services-grid">
                    {clientMoreServicesItems.map((service) => (
                        <Link key={service.id} to={service.routePath} className="service-link">
                            <article className="service-tile">
                                <div className="tile-head">
                                    <span className="tile-icon">
                                        <i className={service.iconClass}></i>
                                    </span>
                                    <span className="tile-tag">{service.tag}</span>
                                </div>
                                <h3 className="tile-title">{service.title}</h3>
                                <p className="tile-meta">{service.meta}</p>
                            </article>
                        </Link>
                    ))}
                </div>
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

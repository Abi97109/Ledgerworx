import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import {
    clientActiveServices,
    clientActiveServicesPageMeta
} from '../data/activeServicesData';
import {
    CLIENT_DASHBOARD_ROUTE,
    clientPrimaryNavLinks
} from '../data/clientNavData';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';
import '../styles/client-activeservices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientActiveServicesPage() {
    const [theme, setTheme] = useState(() => {
        const initialTheme = getClientSavedTheme();

        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        }

        return initialTheme;
    });

    const [selectedService, setSelectedService] = useState(null);
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
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setSelectedService(null);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function closeConfirmModal() {
        setModalState((prev) => ({
            ...prev,
            isOpen: false,
            onConfirm: null
        }));
    }

    function handleModalConfirm() {
        if (typeof modalState.onConfirm === 'function') {
            modalState.onConfirm();
        }
        closeConfirmModal();
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={clientActiveServicesPageMeta.profileName}
                profileImage={clientActiveServicesPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Active Services</span>
                </nav>
                <div className="page-header">
                    <h1 className="page-title">{clientActiveServicesPageMeta.pageTitle}</h1>
                    <p className="page-subtitle">{clientActiveServicesPageMeta.pageSubtitle}</p>
                </div>

                <div className="services-grid">
                    {clientActiveServices.map((service) => (
                        <a
                            key={service.id}
                            href="#"
                            className="service-link"
                            data-service-id={service.id}
                            onClick={(event) => {
                                event.preventDefault();
                                setSelectedService(service);
                            }}
                        >
                            <article className="service-tile">
                                <div className="tile-head">
                                    <div className="tile-icon">
                                        <i className={service.iconClass}></i>
                                    </div>
                                    <span className="status-chip">{service.status}</span>
                                </div>
                                <h3 className="tile-title">{service.title}</h3>
                                <p className="tile-meta">Started: {service.started}</p>
                            </article>
                        </a>
                    ))}
                </div>
            </div>

            <div
                className={'service-modal' + (selectedService ? ' active' : '')}
                id="serviceDetailModal"
                aria-hidden={selectedService ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'serviceDetailModal') {
                        setSelectedService(null);
                    }
                }}
            >
                <div className="service-modal-box" role="dialog" aria-modal="true" aria-labelledby="serviceModalTitle">
                    <div className="service-modal-head">
                        <h2 className="service-modal-title" id="serviceModalTitle">
                            {selectedService ? selectedService.title : 'Service Detail'}
                        </h2>
                        <button className="service-modal-close" id="serviceModalClose" aria-label="Close" onClick={() => setSelectedService(null)}>
                            &times;
                        </button>
                    </div>
                    <div className="service-modal-meta">
                        <span className="service-chip status" id="serviceModalStatus">
                            {selectedService ? selectedService.status : 'Active'}
                        </span>
                        <span className="service-chip date" id="serviceModalDate">
                            Started: {selectedService ? selectedService.started : '-'}
                        </span>
                    </div>
                    <p className="service-modal-text" id="serviceModalText">
                        {selectedService ? selectedService.detail : ''}
                    </p>
                </div>
            </div>

            <div
                id="modal"
                className="modal"
                aria-hidden={modalState.isOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'modal') {
                        closeConfirmModal();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" aria-label="Close" onClick={closeConfirmModal}>
                        &times;
                    </button>
                    <h3 id="modal-title">{modalState.title}</h3>
                    <p id="modal-body">{modalState.body}</p>
                    <div className="modal-actions">
                        <button className="primary modal-confirm" onClick={handleModalConfirm}>
                            Confirm
                        </button>
                        <button className="secondary modal-cancel" onClick={closeConfirmModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

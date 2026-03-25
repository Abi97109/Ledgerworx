import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import {
    CLIENT_DASHBOARD_ROUTE,
    clientInvoicesList,
    clientInvoicesPageMeta,
    clientPrimaryNavLinks
} from '../data/invoicesData';
import {
    CLIENT_INVOICE_PDF_ROUTE,
    CLIENT_INVOICES_ROUTE
} from '../utils/routePaths';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';
import '../styles/client-invoices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientInvoicesPage() {
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
        document.title = clientInvoicesPageMeta.pageTitle;
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
        <div className="client-invoices-page">
            <ClientPortalNavbar
                profileName={clientInvoicesPageMeta.profileName}
                profileImage={clientInvoicesPageMeta.profileImage}
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
                    <span className="current">Invoices</span>
                </nav>
                <h1 className="page-title">{clientInvoicesPageMeta.heading}</h1>
                <p className="page-subtitle">{clientInvoicesPageMeta.subtitle}</p>

                <ul className="invoice-list">
                    {clientInvoicesList.map((invoice) => {
                        const query = new URLSearchParams({
                            id: invoice.id,
                            date: invoice.date,
                            time: invoice.time,
                            amount: invoice.amount
                        }).toString();

                        return (
                            <Link
                                key={invoice.id}
                                className="invoice-item"
                                to={`${CLIENT_INVOICE_PDF_ROUTE}?${query}`}
                                state={{ from: CLIENT_INVOICES_ROUTE }}
                            >
                                <div>
                                    <div className="invoice-label">Invoice ID</div>
                                    <div className="invoice-id">{invoice.id}</div>
                                </div>
                                <div>
                                    <div className="invoice-label">Generated Date</div>
                                    <div className="invoice-value">{invoice.date}</div>
                                </div>
                                <div>
                                    <div className="invoice-label">Generated Time</div>
                                    <div className="invoice-value">{invoice.time}</div>
                                </div>
                                <div>
                                    <div className="invoice-label">Amount</div>
                                    <div className="invoice-value">{invoice.amount}</div>
                                </div>
                            </Link>
                        );
                    })}
                </ul>
            </div>

            <div
                id="modal"
                className="modal"
                aria-hidden={modalState.isOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'modal') {
                        closeModal();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" aria-label="Close" type="button" onClick={closeModal}>
                        &times;
                    </button>
                    <h3 id="modal-title">{modalState.title}</h3>
                    <p id="modal-body">{modalState.body}</p>
                    <div className="modal-actions">
                        <button type="button" className="primary modal-confirm" onClick={handleModalConfirm}>
                            Confirm
                        </button>
                        <button type="button" className="secondary modal-cancel" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
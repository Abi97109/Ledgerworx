import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientSupportPageMeta, clientSupportSections } from '../data/supportData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_SUPPORT_ROUTE
} from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-support.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientSupportPage() {
    const { theme, toggleTheme } = useClientPortalPage(clientSupportPageMeta.pageTitle);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?'
    });

    return (
        <>
            <ClientPortalNavbar
                profileName={clientSupportPageMeta.profileName}
                profileImage={clientSupportPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey=""
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                supportRoute={CLIENT_SUPPORT_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Support</span>
                </nav>
                <h1 className="page-title">{clientSupportPageMeta.heading}</h1>
                <p className="page-subtitle">{clientSupportPageMeta.subtitle}</p>

                <div className="support-grid">
                    {clientSupportSections.map((section) => (
                        <article key={section.id} className="support-card">
                            <h3>{section.title}</h3>
                            {section.items.map((item, index) => (
                                <div key={`${section.id}-${index}`} className="support-item">
                                    <i className={item.iconClass}></i>
                                    <div>
                                        {item.lines.map((line) => (
                                            <div key={line}>{line}</div>
                                        ))}
                                        <div className="support-meta">{item.meta}</div>
                                    </div>
                                </div>
                            ))}
                        </article>
                    ))}
                </div>
            </div>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
                onConfirm={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
            />
        </>
    );
}

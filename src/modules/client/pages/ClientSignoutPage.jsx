import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { buildAppUrl } from '../../../utils/legacyLinks';
import { clientSignoutPageData } from '../data/signoutData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_SUPPORT_ROUTE
} from '../utils/routePaths';
import '../styles/client-signoutaf.css';
import '../styles/client-breadcrumb.css';

function formatSignedOutAt(dateValue) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(dateValue);
}

export default function ClientSignoutPage() {
    const signedOutAt = useMemo(() => formatSignedOutAt(new Date()), []);

    useEffect(() => {
        document.title = clientSignoutPageData.pageTitle;

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

    return (
        <>
            <div className="top-brand">
                <Link to={CLIENT_DASHBOARD_ROUTE} aria-label="Login Again">
                    <img src={buildAppUrl('client-assets/logo.png')} alt="Ledger Workx logo" className="logo-img" />
                </Link>
            </div>

            <main className="wrap">
                <div>
                    <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                        <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                        <span className="crumb-sep">/</span>
                        <span className="current">Sign Out</span>
                    </nav>
                    <section className="logout-card">
                        <div className="icon"><i className="fas fa-right-from-bracket"></i></div>
                        <h1>{clientSignoutPageData.heading}</h1>
                        <p className="sub">{clientSignoutPageData.subtitle}</p>
                        <p className="meta"><i className="fas fa-clock"></i> Signed out on {signedOutAt}</p>
                        <div className="actions">
                            <Link to={CLIENT_DASHBOARD_ROUTE} className="btn btn-primary">
                                <i className="fas fa-right-to-bracket"></i> {clientSignoutPageData.loginAgainLabel}
                            </Link>
                            <Link to={CLIENT_SUPPORT_ROUTE} className="btn btn-secondary">
                                <i className="fas fa-headset"></i> {clientSignoutPageData.contactSupportLabel}
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

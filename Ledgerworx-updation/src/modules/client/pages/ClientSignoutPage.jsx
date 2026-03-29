import React, { useEffect, useMemo } from 'react';
import portalLogo from '../../../assets/logo.png';
import { clientSignoutPageData } from '../data/signoutData';
import '../styles/client-signoutaf.css';
import '../styles/client-breadcrumb.css';

const WORDPRESS_LOGIN_URL = 'https://ledgerworx.me/login/';

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
                <a href={WORDPRESS_LOGIN_URL} aria-label="Go to Login">
                    <img src={portalLogo} alt="Ledger Workx logo" className="logo-img" />
                </a>
            </div>

            <main className="wrap">
                <div>
                    <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                        <a href={WORDPRESS_LOGIN_URL}>Login</a>
                        <span className="crumb-sep">/</span>
                        <span className="current">Sign Out</span>
                    </nav>
                    <section className="logout-card">
                        <div className="icon"><i className="fas fa-right-from-bracket"></i></div>
                        <h1>{clientSignoutPageData.heading}</h1>
                        <p className="sub">{clientSignoutPageData.subtitle}</p>
                        <p className="meta"><i className="fas fa-clock"></i> Signed out on {signedOutAt}</p>
                        <div className="actions">
                            <a href={WORDPRESS_LOGIN_URL} className="btn btn-primary">
                                <i className="fas fa-right-to-bracket"></i> {clientSignoutPageData.loginAgainLabel}
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

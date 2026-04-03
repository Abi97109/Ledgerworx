import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientMorePackagesPageMeta } from '../data/morePackagesData';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { usePortalCatalogQuery } from '../hooks/usePortalQueries';
import { normalizeCatalogPackage } from '../utils/portalData';
import { CLIENT_DASHBOARD_ROUTE } from '../utils/routePaths';
import '../styles/client-morePackages.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';

export default function ClientMorePackagesPage() {
    const catalogQuery = usePortalCatalogQuery();
    const bootstrapQuery = usePortalSession();
    const [theme, setTheme] = useState(() => {
        const initialTheme = getClientSavedTheme();

        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        }

        return initialTheme;
    });

    const packages = Array.isArray(catalogQuery.data && catalogQuery.data.packages)
        ? catalogQuery.data.packages.map(normalizeCatalogPackage)
        : [];

    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark-mode', theme === 'dark');
        saveClientTheme(theme);
    }, [theme]);

    useEffect(() => {
        document.title = clientMorePackagesPageMeta.pageTitle;
    }, []);

    if (catalogQuery.isLoading) {
        return <PortalPageLoader label="Loading package catalogue..." />;
    }

    if (catalogQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load packages"
                message={catalogQuery.error && catalogQuery.error.message}
                onRetry={() => catalogQuery.refetch()}
            />
        );
    }

    return (
        <div className="client-more-packages-page">
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientMorePackagesPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientMorePackagesPageMeta.profileImage}
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
                    <span className="current">More Packages</span>
                </nav>

                <section className="packages-hero">
                    <div className="packages-hero-copy">
                        <span className="packages-eyebrow">Live Zoho catalogue</span>
                        <h1 className="page-title">{clientMorePackagesPageMeta.heading}</h1>
                        <p className="page-subtitle">{clientMorePackagesPageMeta.subtitle}</p>
                    </div>
                    <div className="packages-hero-stats">
                        <div className="hero-stat">
                            <strong>{packages.length}</strong>
                            <span>Available packages</span>
                        </div>
                        <div className="hero-stat hero-stat-accent">
                            <strong>Client-ready</strong>
                            <span>Pick the best fit and submit your request</span>
                        </div>
                    </div>
                </section>

                {packages.length ? (
                    <div className="packages-grid">
                        {packages.map((pkg, index) => {
                            const visibleFeatures = (pkg.features.length ? pkg.features : pkg.includedServices)
                                .filter(Boolean)
                                .slice(0, 4);
                            const isFeatured = index < 3;

                            return (
                                <Link key={pkg.id} to={pkg.routePath} className="package-link">
                                    <article className={`package-tile${isFeatured ? ' package-tile-featured' : ''}`}>
                                        <div className="package-tile-head">
                                            <span className="package-badge">{pkg.category || 'Package'}</span>
                                            <div className="package-badge-stack">
                                                {isFeatured ? <span className="package-featured-tag">Featured</span> : null}
                                                <span className="package-status">{pkg.productStatus || 'Active'}</span>
                                            </div>
                                        </div>
                                        <div className="package-price-row">
                                            <span className="package-price">{pkg.monthlyPrice || 'Price on request'}</span>
                                            {pkg.taxSummary ? <span className="package-tax">{pkg.taxSummary}</span> : null}
                                        </div>
                                        <h3 className="package-title">{pkg.title}</h3>
                                        <p className="package-copy">{pkg.tagline || pkg.description || 'Explore this package to review its scope, deliverables, and support window.'}</p>
                                        <div className="package-meta-grid">
                                            <span><strong>Code:</strong> {pkg.code || 'Not assigned'}</span>
                                            <span><strong>Duration:</strong> {pkg.duration || 'On request'}</span>
                                            <span><strong>Support:</strong> {pkg.supportWindow || 'To be confirmed'}</span>
                                            <span><strong>Sales window:</strong> {pkg.salesWindow || 'Open'}</span>
                                            <span><strong>Usage unit:</strong> {pkg.usageUnit || 'Standard'}</span>
                                        </div>
                                        {visibleFeatures.length ? (
                                            <ul className="package-feature-list">
                                                {visibleFeatures.map((feature) => (
                                                    <li key={feature}>{feature}</li>
                                                ))}
                                            </ul>
                                        ) : null}
                                        <div className="package-tile-footer">
                                            <span className="package-manufacturer">{pkg.manufacturer || 'LedgerWorx curated package'}</span>
                                            <span className="package-feature-count">{visibleFeatures.length} key inclusions</span>
                                            <span className="package-cta">View details <i className="fas fa-arrow-right"></i></span>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="empty-state">
                        <strong>No packages are available right now.</strong>
                        <p>The portal is now reading package data only from Zoho CRM Products. Add or publish products there and refresh this page.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

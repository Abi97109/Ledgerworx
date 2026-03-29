import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientProfileAccountNote, clientProfileSettingsPageMeta } from '../data/profileSettingsData';
import { usePortalSession } from '../context/PortalSessionProvider';
import { CLIENT_DASHBOARD_ROUTE } from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-profile-settings.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

function buildInitials(fullName) {
    return String(fullName || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .join('')
        .slice(0, 2);
}

function buildProfileSummary(profile) {
    const safeProfile = profile || {};

    return {
        id: safeProfile.id || '',
        name: safeProfile.name || 'Client',
        email: safeProfile.email || 'Not available',
        phone: safeProfile.phone || 'Not available',
        companyName: safeProfile.companyName || 'Not available',
        userType: safeProfile.userType || safeProfile.clientType || 'Client',
        clientSince: safeProfile.clientSince || 'Not available',
        status: safeProfile.status || 'Active',
        avatarUrl: safeProfile.avatarUrl || ''
    };
}

export default function ClientProfileSettingsPage() {
    const bootstrapQuery = usePortalSession();
    const { theme, toggleTheme } = useClientPortalPage(clientProfileSettingsPageMeta.pageTitle);

    const profileSummary = useMemo(() => {
        return buildProfileSummary(bootstrapQuery.data && bootstrapQuery.data.profile);
    }, [bootstrapQuery.data]);

    const profileInitials = buildInitials(profileSummary.name);

    const settingBoxes = [
        { id: 'business-name', iconClass: 'fas fa-building', label: 'Business Name', value: profileSummary.companyName },
        { id: 'business-email', iconClass: 'fas fa-envelope', label: 'Business Email', value: profileSummary.email },
        { id: 'contact-phone', iconClass: 'fas fa-phone', label: 'Primary Contact Number', value: profileSummary.phone },
        { id: 'user-type', iconClass: 'fas fa-user-tie', label: 'User Type', value: profileSummary.userType },
        { id: 'client-since', iconClass: 'fas fa-calendar', label: 'Client Since', value: profileSummary.clientSince },
        { id: 'account-status', iconClass: 'fas fa-badge-check', label: 'Account Status', value: profileSummary.status },
        { id: 'client-id', iconClass: 'fas fa-id-card', label: 'Client ID', value: profileSummary.id ? `CL-${profileSummary.id}` : 'Not available' }
    ];

    return (
        <>
            <ClientPortalNavbar
                profileName={profileSummary.name}
                profileImage={profileSummary.avatarUrl}
                navLinks={clientPrimaryNavLinks}
                activeNavKey=""
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <main className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Profile Settings</span>
                </nav>
                <h1 className="page-title">{clientProfileSettingsPageMeta.heading}</h1>

                <section className="panel">
                    <div className="profile-summary">
                        <div className="avatar-wrap">
                            <div className={`avatar${profileSummary.avatarUrl ? ' has-photo' : ''}`} id="avatarBox">
                                <span className="avatar-initials" id="avatarInitials">{profileInitials}</span>
                                {profileSummary.avatarUrl ? (
                                    <img src={profileSummary.avatarUrl} alt="Client profile photo" id="avatarPreview" />
                                ) : null}
                            </div>
                        </div>
                        <div className="identity">
                            <h2>{profileSummary.name}</h2>
                            <p className="meta">{profileSummary.userType} Account - <span className="status-dot">{profileSummary.status}</span></p>
                            <p className="line"><i className="fas fa-envelope"></i> {profileSummary.email}</p>
                            <p className="line"><i className="fas fa-phone"></i> {profileSummary.phone}</p>
                            <p className="line"><i className="fas fa-building"></i> {profileSummary.companyName}</p>
                        </div>
                    </div>

                    <div className="settings-grid">
                        {settingBoxes.map((item) => (
                            <div key={item.id} className="setting-box">
                                <div className="setting-label"><i className={item.iconClass}></i> {item.label}</div>
                                <div className="setting-value">{item.value}</div>
                            </div>
                        ))}
                    </div>
                    <p className="account-note"><i className="fas fa-lock"></i> {clientProfileAccountNote}</p>
                </section>
            </main>
        </>
    );
}

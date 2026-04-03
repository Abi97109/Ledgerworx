import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import {
    buildClientNotificationItems,
    clientNotificationsPageMeta,
    getClientNotificationById
} from '../data/notificationsData';
import { usePortalDashboardQuery } from '../hooks/usePortalQueries';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_NOTIFICATIONS_ROUTE
} from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-notificationex.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientNotificationDetailPage() {
    const location = useLocation();
    const bootstrapQuery = usePortalSession();
    const dashboardQuery = usePortalDashboardQuery({
        staleTime: 0,
        refetchOnMount: 'always'
    });
    const { theme, toggleTheme } = useClientPortalPage('LedgerWorx - Notification Detail');
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?'
    });
    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;
    const notificationItems = useMemo(
        () => buildClientNotificationItems(dashboardQuery.data && dashboardQuery.data.notifications),
        [dashboardQuery.data]
    );

    const notification = useMemo(() => {
        const query = new URLSearchParams(location.search || '');
        return (
            getClientNotificationById(query.get('id'), notificationItems) || {
                title: 'Notification Not Found',
                detailTime: 'N/A',
                category: 'General',
                detail:
                    'The selected notification could not be found. Please return to the notifications page and choose an available item.'
            }
        );
    }, [location.search, notificationItems]);

    if (dashboardQuery.isLoading) {
        return <PortalPageLoader label="Loading notification..." />;
    }

    if (dashboardQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load notification"
                message={dashboardQuery.error && dashboardQuery.error.message}
                onRetry={() => dashboardQuery.refetch()}
            />
        );
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientNotificationsPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientNotificationsPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="notifications"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <Link to={CLIENT_NOTIFICATIONS_ROUTE}>Notifications</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Notification Detail</span>
                </nav>

                <article className="detail-card">
                    <h1 className="detail-title">{notification.title}</h1>
                    <div className="meta-row">
                        <span className="meta-chip"><i className="fas fa-clock"></i> {notification.detailTime}</span>
                        <span className="meta-chip">{notification.category}</span>
                    </div>
                    <p className="detail-text">{notification.detail}</p>
                </article>
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

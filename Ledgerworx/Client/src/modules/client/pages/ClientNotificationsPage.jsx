import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import {
    buildClientNotificationItems,
    clientNotificationsPageMeta
} from '../data/notificationsData';
import { usePortalNotificationsQuery } from '../hooks/usePortalQueries';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_NOTIFICATION_DETAIL_ROUTE
} from '../utils/routePaths';
import {
    getClientSeenNotificationsMap,
    setClientNotificationSeen
} from '../utils/notificationStorage';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/clinet-notification.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientNotificationsPage() {
    const navigate = useNavigate();
    const bootstrapQuery = usePortalSession();
    const notificationsQuery = usePortalNotificationsQuery({
        staleTime: 0,
        refetchOnMount: 'always'
    });
    const { theme, toggleTheme } = useClientPortalPage(clientNotificationsPageMeta.pageTitle);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortValue, setSortValue] = useState('latest');
    const [seenMap, setSeenMap] = useState(() => getClientSeenNotificationsMap());
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?'
    });
    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;
    const notificationItems = useMemo(
        () => buildClientNotificationItems(notificationsQuery.data && notificationsQuery.data.notifications),
        [notificationsQuery.data]
    );

    const visibleNotifications = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const filtered = notificationItems
            .map((item) => {
                const hasStoredSeenState = Object.prototype.hasOwnProperty.call(seenMap, item.id);
                return {
                    ...item,
                    seen: hasStoredSeenState ? Boolean(seenMap[item.id]) : item.defaultSeen
                };
            })
            .filter((item) => {
                if (!query) {
                    return true;
                }

                const text = `${item.title} ${item.message} ${item.category} ${item.displayTime}`.toLowerCase();
                return text.includes(query);
            });

        return filtered.sort((left, right) => {
            if (sortValue === 'oldest') {
                return new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime();
            }

            if (sortValue === 'title') {
                return left.title.localeCompare(right.title);
            }

            return new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime();
        });
    }, [notificationItems, searchQuery, seenMap, sortValue]);

    function handleNotificationClick(notificationId) {
        setClientNotificationSeen(notificationId);
        setSeenMap((prev) => ({
            ...prev,
            [notificationId]: true
        }));
        navigate(`${CLIENT_NOTIFICATION_DETAIL_ROUTE}?id=${encodeURIComponent(notificationId)}`);
    }

    if (notificationsQuery.isLoading) {
        return <PortalPageLoader label="Loading notifications..." />;
    }

    if (notificationsQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load notifications"
                message={notificationsQuery.error && notificationsQuery.error.message}
                onRetry={() => notificationsQuery.refetch()}
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
                    <span className="current">Notifications</span>
                </nav>

                <div className="page-header">
                    <h1 className="page-title">{clientNotificationsPageMeta.heading}</h1>
                    <p className="page-subtitle">{clientNotificationsPageMeta.subtitle}</p>
                </div>

                <div className="toolbar">
                    <div className="search-wrap">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            id="searchInput"
                            className="search-input"
                            placeholder="Search notifications..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </div>
                    <div className="sort-wrap">
                        <i className="fas fa-sort"></i>
                        <select
                            id="sortSelect"
                            className="sort-select"
                            value={sortValue}
                            onChange={(event) => setSortValue(event.target.value)}
                        >
                            <option value="latest">Sort: Latest</option>
                            <option value="oldest">Sort: Oldest</option>
                            <option value="title">Sort: Title (A-Z)</option>
                        </select>
                    </div>
                </div>

                <div id="notificationGrid" className="notification-grid">
                    {visibleNotifications.map((item) => (
                        <article
                            key={item.id}
                            className="notification-tile"
                            data-id={item.id}
                            data-title={item.title}
                            data-time={item.timestamp}
                            data-seen={item.seen ? 'true' : 'false'}
                            onClick={() => handleNotificationClick(item.id)}
                        >
                            <div className="tile-top">
                                <div className="tile-title-row">
                                    <span className={`notification-dot ${item.seen ? 'seen' : 'unseen'}`}></span>
                                    <h3 className="tile-title">{item.title}</h3>
                                </div>
                            </div>
                            <span className="tile-time">{item.displayTime}</span>
                            <p className="tile-msg">{item.message}</p>
                            <span className="tile-tag">{item.category}</span>
                        </article>
                    ))}
                </div>

                <div id="emptyState" className="empty-state" style={{ display: visibleNotifications.length ? 'none' : 'block' }}>
                    No notifications found for your search.
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

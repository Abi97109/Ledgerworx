import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { dashboardDocumentsPageData } from '../data/dashboardDocumentsData';
import { usePageStyles } from '../hooks/usePageStyles';
import { buildClientAvatar } from '../utils/dashboardUtils';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import clientDashboardDocumentCssUrl from '../styles/clientDashboardDocument.css?url';
import clientBreadcrumbCssUrl from '../styles/clientBreadcrumb.css?url';
import clientDashboardDarkModeCssUrl from '../styles/clientDashboardDarkMode.css?url';

const THEME_STORAGE_KEY = 'clientPortalTheme';

function ClientDashboardDocumentsPage() {
    usePageStyles([clientDashboardDocumentCssUrl, clientBreadcrumbCssUrl, clientDashboardDarkModeCssUrl]);

    const { profileName, profileImage, navLinks, documents } = dashboardDocumentsPageData;
    const profileRef = useRef(null);

    const [navMenuDisplay, setNavMenuDisplay] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            return savedTheme === 'dark' ? 'dark' : 'light';
        } catch (error) {
            return 'light';
        }
    });

    const resolvedProfileImage = useMemo(() => {
        if (profileImage && !profileImage.includes('i.pravatar.cc')) {
            return profileImage;
        }

        return buildClientAvatar(profileName);
    }, [profileImage, profileName]);

    useEffect(() => {
        const root = document.documentElement;
        const isDarkMode = theme === 'dark';

        root.classList.toggle('dark-mode', isDarkMode);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            // Ignore storage failures in restricted environments.
        }
    }, [theme]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!profileRef.current) return;
            if (!profileRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsDocModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const toggleProfileDropdown = (event) => {
        event.stopPropagation();
        setIsProfileDropdownOpen((currentState) => !currentState);
    };

    const handleThemeToggle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleNavToggle = () => {
        setNavMenuDisplay((currentDisplay) => (currentDisplay === 'flex' ? 'none' : 'flex'));
    };

    const handleSignOut = (event) => {
        event.preventDefault();
        setIsProfileDropdownOpen(false);
        window.location.href = buildLegacyUrl('client-signoutaf.php');
    };

    const openDocModal = (documentItem) => {
        setSelectedDocument(documentItem);
        setIsDocModalOpen(true);
    };

    const closeDocModal = () => {
        setIsDocModalOpen(false);
    };

    return (
        <>
            <header className="navbar">
                <div className="brand">
                    <Link to="/client/dashboard" aria-label="Go to Dashboard">
                        <img src={buildLegacyUrl('client/client-assets/logo.png')} alt="Ledger Workx logo" className="logo-img" />
                    </Link>
                </div>

                <button className="nav-toggle" aria-label="Toggle menu" onClick={handleNavToggle}>
                    <i className="fas fa-bars"></i>
                </button>

                <nav className="nav-links" style={navMenuDisplay ? { display: navMenuDisplay } : undefined}>
                    {navLinks.map((navLink) => {
                        const iconClass = `fa-solid ${navLink.icon}`;

                        if (navLink.isMigrated) {
                            return (
                                <Link key={navLink.label} to={navLink.routeTo}>
                                    <i className={iconClass}></i>
                                    {navLink.label}
                                </Link>
                            );
                        }

                        return (
                            <a key={navLink.label} href={buildLegacyUrl(navLink.href)}>
                                <i className={iconClass}></i>
                                {navLink.label}
                            </a>
                        );
                    })}
                </nav>

                <div className="profile" ref={profileRef}>
                    <span className="profile-name" id="profileNameBtn" onClick={toggleProfileDropdown}>
                        {profileName}
                    </span>
                    <img
                        src={resolvedProfileImage}
                        alt="profile"
                        className="profile-img"
                        id="profileToggle"
                        onClick={toggleProfileDropdown}
                        onError={(event) => {
                            event.currentTarget.src = buildClientAvatar(profileName);
                        }}
                    />
                    <i
                        className={`fas fa-chevron-down profile-arrow${isProfileDropdownOpen ? ' rotate' : ''}`}
                        id="profileArrow"
                        onClick={toggleProfileDropdown}
                    ></i>
                    <div className={`profile-dropdown${isProfileDropdownOpen ? ' active' : ''}`} id="profileDropdown">
                        <div className="dropdown-header">
                            <img
                                src={resolvedProfileImage}
                                alt="Client avatar"
                                className="user-avatar"
                                onError={(event) => {
                                    event.currentTarget.src = buildClientAvatar(profileName);
                                }}
                            />
                            <h4>{profileName}</h4>
                            <p>Client Portal</p>
                        </div>
                        <div className="dropdown-body">
                            <a
                                href={buildLegacyUrl('client-profile-settings.php')}
                                className="dropdown-item"
                                data-dropdown-item="profile-settings"
                            >
                                <i className="fas fa-user"></i>
                                <span>Profile Settings</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <div
                                className="theme-toggle"
                                id="themeToggle"
                                role="button"
                                tabIndex={0}
                                onClick={handleThemeToggle}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        handleThemeToggle(event);
                                    }
                                }}
                            >
                                <div className="theme-toggle-label">
                                    <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} id="themeIcon"></i>
                                    <span id="themeText">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </div>
                                <div className={`toggle-switch${theme === 'dark' ? ' active' : ''}`} id="themeToggleSwitch"></div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <a href={buildLegacyUrl('client-support.php')} className="dropdown-item" data-dropdown-item="help">
                                <i className="fas fa-question-circle"></i>
                                <span>Help &amp; Support</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item signout" id="signoutBtn" type="button" onClick={handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/client/dashboard">Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Documents</span>
                </nav>
                <h1 className="page-title">All Available Documents</h1>
                <p className="page-subtitle">Documents currently available for your account</p>

                <div className="doc-grid">
                    {documents.map((documentItem) => (
                        <article key={documentItem.id} className="doc-tile" onClick={() => openDocModal(documentItem)}>
                            <div className="doc-head">
                                <span className="doc-icon">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                                <i className="fas fa-check-circle doc-status"></i>
                            </div>
                            <h3 className="doc-title">{documentItem.title}</h3>
                            <p className="doc-meta">{documentItem.updated}</p>
                        </article>
                    ))}
                </div>
            </div>

            <div
                className={`doc-modal${isDocModalOpen ? ' active' : ''}`}
                id="docModal"
                aria-hidden={isDocModalOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        closeDocModal();
                    }
                }}
            >
                <div className="doc-modal-box" role="dialog" aria-modal="true" aria-labelledby="docModalTitle">
                    <div className="doc-modal-head">
                        <h2 className="doc-modal-title" id="docModalTitle">
                            {selectedDocument ? selectedDocument.title : 'Document'}
                        </h2>
                        <button className="doc-modal-close" id="docModalClose" aria-label="Close" onClick={closeDocModal}>
                            &times;
                        </button>
                    </div>
                    <div className="doc-preview" id="docPreview">
                        <i className="fas fa-file-lines"></i>
                        {selectedDocument ? (
                            <>
                                <strong>{selectedDocument.title}</strong>
                                <br />
                                This document is available and selected.
                            </>
                        ) : (
                            'Document preview is shown here.'
                        )}
                    </div>
                    <p className="doc-modal-meta" id="docModalMeta">
                        {selectedDocument ? selectedDocument.updated : ''}
                    </p>
                </div>
            </div>

            <ConfirmationModal
                isOpen={false}
                title="Confirm"
                body="Are you sure?"
                onConfirm={() => {}}
                onCancel={() => {}}
            />
        </>
    );
}

export default ClientDashboardDocumentsPage;

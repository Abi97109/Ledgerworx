import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { clientDocumentsPageData } from '../data/documentsData';
import { usePageStyles } from '../hooks/usePageStyles';
import { buildClientAvatar } from '../utils/dashboardUtils';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import clientDocumentsCssUrl from '../styles/clientDocuments.css?url';
import clientBreadcrumbCssUrl from '../styles/clientBreadcrumb.css?url';
import clientDashboardDarkModeCssUrl from '../styles/clientDashboardDarkMode.css?url';

const THEME_STORAGE_KEY = 'clientPortalTheme';

const ACTION_LABELS = {
    view: 'View',
    delete: 'Delete',
    reupload: 'Reupload',
    upload: 'Upload',
    download: 'Download'
};

const ACTION_BUTTON_CLASSES = {
    view: 'btn-view',
    delete: 'btn-delete',
    reupload: 'btn-reupload',
    upload: 'btn-upload',
    download: 'btn-download'
};

function cloneDocuments(list) {
    return list.map((item) => ({
        ...item,
        actions: Array.isArray(item.actions) ? [...item.actions] : []
    }));
}

function ClientDocumentsPage() {
    usePageStyles([clientDocumentsCssUrl, clientBreadcrumbCssUrl, clientDashboardDarkModeCssUrl]);

    const {
        profileName,
        profileImage,
        navLinks,
        uploadedDocuments,
        pendingDocuments,
        companySharedDocuments,
        invoiceDocuments
    } = clientDocumentsPageData;

    const profileRef = useRef(null);
    const fileInputRef = useRef(null);

    const [navMenuDisplay, setNavMenuDisplay] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            return savedTheme === 'dark' ? 'dark' : 'light';
        } catch (error) {
            return 'light';
        }
    });
    const [documentsBySection, setDocumentsBySection] = useState(() => ({
        uploaded: cloneDocuments(uploadedDocuments),
        pending: cloneDocuments(pendingDocuments),
        company: cloneDocuments(companySharedDocuments),
        invoices: cloneDocuments(invoiceDocuments)
    }));
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [fileActionContext, setFileActionContext] = useState(null);

    const resolvedProfileImage = useMemo(() => {
        if (profileImage && !profileImage.includes('i.pravatar.cc')) {
            return profileImage;
        }

        return buildClientAvatar(profileName);
    }, [profileImage, profileName]);

    const deleteDocumentName = useMemo(() => {
        if (!deleteTarget) return 'this document';
        const sectionList = documentsBySection[deleteTarget.sectionKey] || [];
        const matchingDocument = sectionList.find((item) => item.id === deleteTarget.documentId);
        return matchingDocument ? matchingDocument.title : 'this document';
    }, [deleteTarget, documentsBySection]);

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

    const formatDate = () => {
        return new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getDocumentByTarget = (sectionKey, documentId) => {
        const sectionList = documentsBySection[sectionKey] || [];
        return sectionList.find((item) => item.id === documentId) || null;
    };

    const openFilePicker = (action, sectionKey, documentId) => {
        setFileActionContext({ action, sectionKey, documentId });
        if (!fileInputRef.current) return;
        fileInputRef.current.value = '';
        fileInputRef.current.click();
    };

    const downloadDocument = (documentItem) => {
        const docName = documentItem.title;
        const safeName = docName.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
        const fileContent =
            `Document: ${docName}\n` +
            'Source: Company Shared Documents\n' +
            `Downloaded: ${new Date().toLocaleString()}`;

        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${safeName || 'document'}.txt`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 0);
    };

    const handleDocumentAction = (action, sectionKey, documentId) => {
        const documentItem = getDocumentByTarget(sectionKey, documentId);
        if (!documentItem) return;

        if (action === 'view') {
            window.alert(`Viewing: ${documentItem.title}`);
            return;
        }

        if (action === 'download') {
            downloadDocument(documentItem);
            return;
        }

        if (action === 'delete') {
            setDeleteTarget({ sectionKey, documentId });
            return;
        }

        if (action === 'upload' || action === 'reupload') {
            openFilePicker(action, sectionKey, documentId);
        }
    };

    const closeDeleteConfirm = () => {
        setDeleteTarget(null);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;

        setDocumentsBySection((currentState) => {
            const nextSectionList = (currentState[deleteTarget.sectionKey] || []).filter(
                (item) => item.id !== deleteTarget.documentId
            );

            return {
                ...currentState,
                [deleteTarget.sectionKey]: nextSectionList
            };
        });

        closeDeleteConfirm();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (!selectedFile || !fileActionContext) return;

        const selectedFileName = selectedFile.name;
        const sourceDocument = getDocumentByTarget(fileActionContext.sectionKey, fileActionContext.documentId);
        if (!sourceDocument) {
            setFileActionContext(null);
            event.target.value = '';
            return;
        }

        if (fileActionContext.action === 'upload') {
            const nextMeta = `Updated: ${formatDate()} (${selectedFileName})`;

            setDocumentsBySection((currentState) => {
                const pendingSource = (currentState.pending || []).find(
                    (item) => item.id === fileActionContext.documentId
                );
                if (!pendingSource) {
                    return currentState;
                }

                const nextPending = (currentState.pending || []).filter(
                    (item) => item.id !== fileActionContext.documentId
                );
                const movedToUploaded = {
                    ...pendingSource,
                    meta: nextMeta,
                    actions: ['view', 'delete', 'reupload']
                };

                return {
                    ...currentState,
                    pending: nextPending,
                    uploaded: [...(currentState.uploaded || []), movedToUploaded]
                };
            });

            window.alert(`Uploaded "${selectedFileName}" for ${sourceDocument.title}.`);
        } else if (fileActionContext.action === 'reupload') {
            const nextMeta = `Updated: ${formatDate()} (${selectedFileName})`;

            setDocumentsBySection((currentState) => {
                const currentSection = currentState[fileActionContext.sectionKey] || [];
                const nextSection = currentSection.map((item) => {
                    if (item.id !== fileActionContext.documentId) return item;
                    return {
                        ...item,
                        meta: nextMeta
                    };
                });

                return {
                    ...currentState,
                    [fileActionContext.sectionKey]: nextSection
                };
            });

            window.alert(`Reuploaded "${selectedFileName}" for ${sourceDocument.title}.`);
        }

        setFileActionContext(null);
        event.target.value = '';
    };

    const renderDocumentTile = (sectionKey, documentItem, statusClassName, statusAriaLabel, statusIconClassName) => {
        return (
            <article key={documentItem.id} className="doc-tile">
                <div className="doc-top">
                    <span className="doc-title">{documentItem.title}</span>
                    <i className={`fa-solid ${statusIconClassName} doc-status ${statusClassName}`} aria-label={statusAriaLabel}></i>
                </div>
                <div className="doc-meta">{documentItem.meta}</div>
                <div className="doc-actions">
                    {documentItem.actions.map((action) => (
                        <button
                            key={action}
                            className={`btn ${ACTION_BUTTON_CLASSES[action]}`}
                            type="button"
                            onClick={() => handleDocumentAction(action, sectionKey, documentItem.id)}
                        >
                            {ACTION_LABELS[action]}
                        </button>
                    ))}
                </div>
            </article>
        );
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
                                <Link key={navLink.label} to={navLink.routeTo} className={navLink.isActive ? 'active' : undefined}>
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
                <div className="page-header">
                    <h1 className="page-title">Documents</h1>
                    <p className="page-subtitle">Manage uploaded, pending, company-shared, and invoice documents</p>
                </div>

                <div className="document-layout">
                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-circle-check"></i>
                                Uploaded
                            </h2>
                            <Link className="more-docs-link" to="/client/dashboard-documents?section=uploaded">
                                More Documents
                            </Link>
                        </div>
                        <div className="doc-grid" id="uploadedGrid">
                            {documentsBySection.uploaded.map((documentItem) =>
                                renderDocumentTile('uploaded', documentItem, 'uploaded', 'uploaded', 'fa-circle-check')
                            )}
                        </div>
                    </section>

                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-hourglass-half"></i>
                                Pending
                            </h2>
                            <Link className="more-docs-link" to="/client/dashboard-documents?section=pending">
                                More Documents
                            </Link>
                        </div>
                        <div className="doc-grid" id="pendingGrid">
                            {documentsBySection.pending.map((documentItem) =>
                                renderDocumentTile('pending', documentItem, 'pending', 'pending', 'fa-hourglass-half')
                            )}
                            {documentsBySection.pending.length === 0 ? (
                                <div
                                    className="doc-meta empty-pending-msg"
                                    style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '16px' }}
                                >
                                    No pending documents.
                                </div>
                            ) : null}
                        </div>
                    </section>

                    <section className="doc-section company-docs-wrap">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-building"></i>
                                Shared by Company
                            </h2>
                            <Link className="more-docs-link" to="/client/dashboard-documents?section=company-shared">
                                More Documents
                            </Link>
                        </div>
                        <div className="doc-grid" id="companyGrid">
                            {documentsBySection.company.map((documentItem) =>
                                renderDocumentTile('company', documentItem, 'company', 'company-shared', 'fa-circle-check')
                            )}
                        </div>
                    </section>

                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-file-invoice-dollar"></i>
                                Invoices
                            </h2>
                            <Link className="more-docs-link" to="/client/invoices">
                                More Documents
                            </Link>
                        </div>
                        <div className="doc-grid" id="invoiceGrid">
                            {documentsBySection.invoices.map((documentItem) =>
                                renderDocumentTile('invoices', documentItem, 'invoice', 'invoice', 'fa-file-invoice-dollar')
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <input ref={fileInputRef} type="file" id="docFileInput" hidden onChange={handleFileChange} />

            <div
                className={`confirm-modal${deleteTarget ? ' active' : ''}`}
                id="deleteConfirmModal"
                aria-hidden={deleteTarget ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        closeDeleteConfirm();
                    }
                }}
            >
                <div className="confirm-box" role="dialog" aria-modal="true" aria-labelledby="confirmDeleteTitle">
                    <h3 className="confirm-title" id="confirmDeleteTitle">
                        Delete Document
                    </h3>
                    <p className="confirm-text">
                        Are you sure you want to delete <strong id="deleteDocName">{deleteDocumentName}</strong>?
                    </p>
                    <div className="confirm-actions">
                        <button className="btn btn-cancel" id="cancelDeleteBtn" type="button" onClick={closeDeleteConfirm}>
                            Cancel
                        </button>
                        <button className="btn btn-confirm-delete" id="confirmDeleteBtn" type="button" onClick={handleConfirmDelete}>
                            Delete
                        </button>
                    </div>
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

export default ClientDocumentsPage;

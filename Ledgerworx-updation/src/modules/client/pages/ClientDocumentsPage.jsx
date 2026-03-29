import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import {
    CLIENT_DASHBOARD_ROUTE,
    clientDocumentsInvoiceItems,
    clientDocumentsLinks,
    clientDocumentsPageMeta,
    clientDocumentsUploadedItems,
    clientPrimaryNavLinks
} from '../data/documentsData';
import { getClientSavedTheme, saveClientTheme } from '../utils/themeStorage';
import '../styles/client-documents.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

function formatDate() {
    return new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function toDocumentTitle(fileName) {
    const withoutExt = String(fileName || '').replace(/\.[^/.]+$/, '');
    const normalized = withoutExt.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    return normalized || 'Uploaded Document';
}

function createTextDownload(docName) {
    const safeName = docName.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
    const fileContent =
        'Document: ' + docName + '\n' +
        'Source: Client Portal Documents\n' +
        'Downloaded: ' + new Date().toLocaleString();

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = (safeName || 'document') + '.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 0);
}

export default function ClientDocumentsPage() {
    const [theme, setTheme] = useState(() => {
        const initialTheme = getClientSavedTheme();

        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        }

        return initialTheme;
    });

    const [uploadedItems, setUploadedItems] = useState(clientDocumentsUploadedItems);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [fileAction, setFileAction] = useState('');
    const [fileTargetId, setFileTargetId] = useState(null);

    const docFileInputRef = useRef(null);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark-mode', theme === 'dark');
        saveClientTheme(theme);
    }, [theme]);

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

    function openModal(title, body, onConfirm) {
        setModalState({
            isOpen: true,
            title,
            body,
            onConfirm: typeof onConfirm === 'function' ? onConfirm : null
        });
    }

    function closeModal() {
        setModalState((prev) => ({
            ...prev,
            isOpen: false,
            onConfirm: null
        }));
    }

    function handleModalConfirm() {
        if (typeof modalState.onConfirm === 'function') {
            modalState.onConfirm();
        }
        closeModal();
    }

    function getDocNameById(docId) {
        const uploaded = uploadedItems.find((item) => item.id === docId);
        if (uploaded) {
            return uploaded.title;
        }

        const invoice = clientDocumentsInvoiceItems.find((item) => item.id === docId);
        return invoice ? invoice.title : 'Document';
    }

    function openDeleteConfirm(docId) {
        setPendingDeleteId(docId);
    }

    function closeDeleteConfirm() {
        setPendingDeleteId(null);
    }

    function openFilePicker(action, targetId) {
        setFileAction(action);
        setFileTargetId(targetId || null);

        if (docFileInputRef.current) {
            docFileInputRef.current.value = '';
            docFileInputRef.current.click();
        }
    }

    function handleFileChange(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }

        const selectedFileName = file.name;

        if (fileAction === 'new-upload') {
            const newTile = {
                id: 'upload-' + Date.now(),
                title: toDocumentTitle(selectedFileName),
                meta: 'Updated: ' + formatDate() + ' (' + selectedFileName + ')'
            };

            setUploadedItems((prev) => [newTile, ...prev]);
            window.alert('Uploaded "' + selectedFileName + '" successfully.');
        } else if (fileAction === 'reupload' && fileTargetId) {
            const docName = getDocNameById(fileTargetId);
            setUploadedItems((prev) =>
                prev.map((item) =>
                    item.id === fileTargetId
                        ? {
                              ...item,
                              meta: 'Updated: ' + formatDate() + ' (' + selectedFileName + ')'
                          }
                        : item
                )
            );
            window.alert('Reuploaded "' + selectedFileName + '" for ' + docName + '.');
        }

        setFileAction('');
        setFileTargetId(null);
        event.target.value = '';
    }

    function handleDeleteConfirm() {
        if (!pendingDeleteId) {
            closeDeleteConfirm();
            return;
        }

        setUploadedItems((prev) => prev.filter((item) => item.id !== pendingDeleteId));
        closeDeleteConfirm();
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={clientDocumentsPageMeta.profileName}
                profileImage={clientDocumentsPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="documents"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Documents</span>
                </nav>
                <div className="page-header">
                    <h1 className="page-title">{clientDocumentsPageMeta.pageTitle}</h1>
                    <p className="page-subtitle">{clientDocumentsPageMeta.pageSubtitle}</p>
                </div>

                <div className="document-layout">
                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-circle-check"></i> Uploaded
                            </h2>
                            <div className="section-head-actions">
                                <button
                                    type="button"
                                    className="more-docs-link upload-other-btn"
                                    id="uploadOtherBtn"
                                    onClick={() => openFilePicker('new-upload', null)}
                                >
                                    <i className="fa-solid fa-upload"></i> Upload Document
                                </button>
                            </div>
                        </div>
                        <div className="doc-grid" id="uploadedGrid">
                            {uploadedItems.map((item) => (
                                <article key={item.id} className="doc-tile">
                                    <div className="doc-top">
                                        <span className="doc-title">{item.title}</span>
                                        <i className="fa-solid fa-circle-check doc-status uploaded" aria-label="uploaded"></i>
                                    </div>
                                    <div className="doc-meta">{item.meta}</div>
                                    <div className="doc-actions">
                                        <button className="btn btn-view" onClick={() => window.alert('Viewing: ' + item.title)}>
                                            View
                                        </button>
                                        <button className="btn btn-delete" onClick={() => openDeleteConfirm(item.id)}>
                                            Delete
                                        </button>
                                        <button className="btn btn-reupload" onClick={() => openFilePicker('reupload', item.id)}>
                                            Reupload
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-file-invoice-dollar"></i> Invoices
                            </h2>
                            <Link className="more-docs-link" to={clientDocumentsLinks.invoicesMoreRoute}>
                                More Documents
                            </Link>
                        </div>
                        <div className="doc-grid" id="invoiceGrid">
                            {clientDocumentsInvoiceItems.map((item) => (
                                <article key={item.id} className="doc-tile">
                                    <div className="doc-top">
                                        <span className="doc-title">{item.title}</span>
                                        <i className="fa-solid fa-file-invoice-dollar doc-status invoice" aria-label="invoice"></i>
                                    </div>
                                    <div className="doc-meta">{item.meta}</div>
                                    <div className="doc-actions">
                                        <button className="btn btn-view" onClick={() => window.alert('Viewing: ' + item.title)}>
                                            View
                                        </button>
                                        <button className="btn btn-download" onClick={() => createTextDownload(item.title)}>
                                            Download
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <input ref={docFileInputRef} type="file" id="docFileInput" hidden onChange={handleFileChange} />

            <div
                className={'confirm-modal' + (pendingDeleteId ? ' active' : '')}
                id="deleteConfirmModal"
                aria-hidden={pendingDeleteId ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'deleteConfirmModal') {
                        closeDeleteConfirm();
                    }
                }}
            >
                <div className="confirm-box" role="dialog" aria-modal="true" aria-labelledby="confirmDeleteTitle">
                    <h3 className="confirm-title" id="confirmDeleteTitle">
                        Delete Document
                    </h3>
                    <p className="confirm-text">
                        Are you sure you want to delete <strong id="deleteDocName">{pendingDeleteId ? getDocNameById(pendingDeleteId) : 'this document'}</strong>?
                    </p>
                    <div className="confirm-actions">
                        <button className="btn btn-cancel" id="cancelDeleteBtn" type="button" onClick={closeDeleteConfirm}>
                            Cancel
                        </button>
                        <button className="btn btn-confirm-delete" id="confirmDeleteBtn" type="button" onClick={handleDeleteConfirm}>
                            Delete
                        </button>
                    </div>
                </div>
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
                    <button className="modal-close" aria-label="Close" onClick={closeModal}>
                        &times;
                    </button>
                    <h3 id="modal-title">{modalState.title}</h3>
                    <p id="modal-body">{modalState.body}</p>
                    <div className="modal-actions">
                        <button className="primary modal-confirm" onClick={handleModalConfirm}>
                            Confirm
                        </button>
                        <button className="secondary modal-cancel" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

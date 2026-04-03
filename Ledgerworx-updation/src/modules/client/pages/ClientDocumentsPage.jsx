import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import {
    CLIENT_DASHBOARD_ROUTE,
    clientDocumentsLinks,
    clientDocumentsPageMeta,
    clientPrimaryNavLinks
} from '../data/documentsData';
import { uploadClientRequestDocument } from '../api/clientRequestsApi';
import {
    useClientDocumentsQuery,
    useClientRequestsQuery,
    useDeleteClientDocumentMutation
} from '../hooks/useClientRequestsQuery';
import { usePortalInvoicesQuery } from '../hooks/usePortalQueries';
import { CLIENT_INVOICE_PDF_ROUTE, CLIENT_REQUESTS_ROUTE } from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-documents.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

function toDocumentTitle(fileName) {
    const withoutExt = String(fileName || '').replace(/\.[^/.]+$/, '');
    const normalized = withoutExt.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    return normalized || 'Uploaded Document';
}

function isClosedRequest(stage) {
    const normalized = String(stage || '').trim().toLowerCase();
    return normalized.includes('completed') || normalized.includes('cancelled');
}

function normalizeDocumentKey(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function uniqDocumentNames(values) {
    const seen = new Set();
    const output = [];

    (values || []).forEach((value) => {
        const name = String(value || '').trim();
        const key = normalizeDocumentKey(name);
        if (!key || seen.has(key)) {
            return;
        }
        seen.add(key);
        output.push(name);
    });

    return output;
}

function getRequestTypeFromPayload(request) {
    const source = String(request?.source || '').toLowerCase();
    const category = String(request?.category || '').toLowerCase();
    const title = String(request?.title || '').toLowerCase();
    const combined = `${source} ${category} ${title}`;
    return combined.includes('package') ? 'Package' : 'Service';
}

function getGroupSyncStatusLabel(records) {
    const statuses = (records || []).map((record) => String(record?.syncStatus || '').toLowerCase());
    if (statuses.includes('synced')) {
        return 'CRM Synced';
    }
    if (statuses.includes('fallback_synced')) {
        return 'Synced to fallback folder';
    }
    return 'CRM Sync Pending';
}

export default function ClientDocumentsPage() {
    const bootstrapQuery = usePortalSession();
    const requestsQuery = useClientRequestsQuery();
    const documentsQuery = useClientDocumentsQuery();
    const invoicesQuery = usePortalInvoicesQuery();
    const deleteDocumentMutation = useDeleteClientDocumentMutation();
    const { theme, toggleTheme } = useClientPortalPage(clientDocumentsPageMeta.pageTitle);

    const [uploadTarget, setUploadTarget] = useState({ requestId: '', documentName: '' });
    const [toastMessage, setToastMessage] = useState('');
    const [isUploadingDocument, setIsUploadingDocument] = useState(false);
    const docFileInputRef = useRef(null);

    const sessionProfile = bootstrapQuery.data?.profile || null;
    const isBusy = isUploadingDocument || deleteDocumentMutation.isPending;

    const requestList = useMemo(() => {
        return Array.isArray(requestsQuery.data?.requests) ? requestsQuery.data.requests : [];
    }, [requestsQuery.data]);

    const uploadedDocuments = useMemo(() => {
        return Array.isArray(documentsQuery.data?.documents) ? documentsQuery.data.documents : [];
    }, [documentsQuery.data]);

    const invoiceRecords = useMemo(() => {
        return Array.isArray(invoicesQuery.data?.invoices) ? invoicesQuery.data.invoices : [];
    }, [invoicesQuery.data]);

    const requestMap = useMemo(() => {
        const map = new Map();
        requestList.forEach((request) => map.set(String(request.requestId || ''), request));
        return map;
    }, [requestList]);

    const availableDocumentKeySet = useMemo(() => {
        const lookup = new Set();
        uploadedDocuments.forEach((record) => {
            const key = normalizeDocumentKey(record?.documentName);
            if (key) {
                lookup.add(key);
            }
        });
        return lookup;
    }, [uploadedDocuments]);

    const uploadedDocumentGroups = useMemo(() => {
        const groups = new Map();
        uploadedDocuments.forEach((record) => {
            const normalizedName = normalizeDocumentKey(record?.documentName);
            const displayName = String(record?.documentName || '').trim();
            if (!normalizedName || !displayName) {
                return;
            }

            const existing = groups.get(normalizedName);
            if (!existing) {
                groups.set(normalizedName, {
                    key: normalizedName,
                    documentName: displayName,
                    records: [record],
                    primaryRequestId: String(record?.requestId || '').trim(),
                    latestUpdatedAt: record?.updatedAt || record?.createdAt || ''
                });
                return;
            }

            existing.records.push(record);
            const existingTs = existing.latestUpdatedAt ? (Date.parse(existing.latestUpdatedAt) || 0) : 0;
            const candidateTs = record?.updatedAt || record?.createdAt
                ? (Date.parse(record.updatedAt || record.createdAt) || 0)
                : 0;
            if (candidateTs >= existingTs) {
                existing.documentName = displayName;
                existing.primaryRequestId = String(record?.requestId || '').trim() || existing.primaryRequestId;
                existing.latestUpdatedAt = record?.updatedAt || record?.createdAt || existing.latestUpdatedAt;
            }
        });

        return Array.from(groups.values()).sort((a, b) => {
            const left = a.latestUpdatedAt ? (Date.parse(a.latestUpdatedAt) || 0) : 0;
            const right = b.latestUpdatedAt ? (Date.parse(b.latestUpdatedAt) || 0) : 0;
            return right - left;
        });
    }, [uploadedDocuments]);

    const groupedRequiredDocuments = useMemo(() => {
        const groups = { Package: [], Service: [] };

        requestList.forEach((request) => {
            if (isClosedRequest(request.workflowStage || request.status)) {
                return;
            }

            const requestId = String(request.requestId || '').trim();
            if (!requestId) {
                return;
            }

            const requiredDocuments = Array.isArray(request.requiredDocuments) ? request.requiredDocuments : [];
            if (!requiredDocuments.length) {
                return;
            }

            const requestType = getRequestTypeFromPayload(request);
            const rows = requiredDocuments
                .map((name) => String(name || '').trim())
                .filter(Boolean)
                .map((documentName) => ({
                    requestId,
                    documentName,
                    uploaded: availableDocumentKeySet.has(normalizeDocumentKey(documentName))
                }));

            groups[requestType].push({
                requestId,
                requestTitle: request.title || 'Client Request',
                rows
            });
        });

        return groups;
    }, [requestList, availableDocumentKeySet]);

    function openFilePicker(documentName = '', targetRequestId = '') {
        if (isBusy) {
            return;
        }
        const resolvedRequestId = String(targetRequestId || '').trim();
        if (!resolvedRequestId) {
            setToastMessage('Could not identify the request for this upload. Please open the request and try again.');
            return;
        }

        setUploadTarget({ requestId: resolvedRequestId, documentName: documentName || '' });
        if (docFileInputRef.current) {
            docFileInputRef.current.value = '';
            docFileInputRef.current.click();
        }
    }

    async function handleFileChange(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }

        const targetRequest = requestMap.get(uploadTarget.requestId) || null;
        if (!targetRequest) {
            setToastMessage('Choose a request before uploading a document.');
            event.target.value = '';
            return;
        }

        const selectedFileName = toDocumentTitle(file.name);
        const completedDocumentName = uploadTarget.documentName || selectedFileName;

        try {
            setIsUploadingDocument(true);
            const uploadResponse = await uploadClientRequestDocument(targetRequest.requestId, file, completedDocumentName);
            await requestsQuery.refetch();
            await documentsQuery.refetch();

            const warningMessage = String(uploadResponse?.zoho?.warning || '').trim();
            setToastMessage(
                warningMessage
                    ? `Uploaded ${selectedFileName}. ${warningMessage}`
                    : `Uploaded ${selectedFileName} successfully.`
            );
        } catch (error) {
            setToastMessage(error?.message || 'Unable to save the uploaded document right now.');
        } finally {
            setIsUploadingDocument(false);
            setUploadTarget({ requestId: '', documentName: '' });
            event.target.value = '';
        }
    }

    function getBestRequestIdForDocument(documentName, preferredRequestId = '') {
        const normalizedDocumentName = normalizeDocumentKey(documentName);
        const preferred = String(preferredRequestId || '').trim();
        if (preferred) {
            return preferred;
        }

        const matchingRequiredRequest = requestList.find((request) => {
            if (isClosedRequest(request.workflowStage || request.status)) {
                return false;
            }
            const requiredDocs = Array.isArray(request.requiredDocuments) ? request.requiredDocuments : [];
            return requiredDocs.some((name) => normalizeDocumentKey(name) === normalizedDocumentName);
        });

        if (matchingRequiredRequest?.requestId) {
            return String(matchingRequiredRequest.requestId);
        }

        const matchingUploadedRequest = requestList.find((request) => {
            const uploadedNames = Array.isArray(request.uploadedDocuments) ? request.uploadedDocuments : [];
            return uploadedNames.some((name) => normalizeDocumentKey(name) === normalizedDocumentName);
        });

        return matchingUploadedRequest?.requestId ? String(matchingUploadedRequest.requestId) : '';
    }

    async function handleDeleteDocumentGroup(group) {
        const documentName = String(group?.documentName || '').trim();
        if (!documentName) {
            setToastMessage('Unable to delete this document right now.');
            return;
        }

        const confirmed = window.confirm(`Delete "${documentName}" from uploaded documents?`);
        if (!confirmed) {
            return;
        }

        const relatedRecords = (group?.records || []).filter((record) => Number(record?.id || 0) > 0);

        if (!relatedRecords.length) {
            setToastMessage('Could not find matching document records to delete.');
            return;
        }

        try {
            for (const record of relatedRecords) {
                await deleteDocumentMutation.mutateAsync({
                    documentId: Number(record?.id || 0),
                    requestId: group?.primaryRequestId || '',
                    documentName,
                    syncStatus: record?.syncStatus || '',
                    fileUrl: record?.fileUrl || ''
                });
            }
            await requestsQuery.refetch();
            await documentsQuery.refetch();
            setToastMessage(`Removed ${documentName} from uploaded documents.`);
        } catch (error) {
            setToastMessage(error?.message || 'Unable to delete the document right now.');
        }
    }

    function renderRequestGroups(groups) {
        if (!groups.length) {
            return (
                <article className="doc-tile empty-doc-tile">
                    <div className="doc-top">
                        <span className="doc-title">No required documents</span>
                    </div>
                    <div className="doc-meta">No active requests in this category right now.</div>
                </article>
            );
        }

        return groups.map((group) => (
            <div key={group.requestId} className="required-doc-group">
                <div className="request-inline-summary">
                    <strong>{group.requestTitle}</strong>
                    <span>Request ID: {group.requestId}</span>
                </div>
                <div className="doc-grid">
                    {group.rows.map((row) => (
                        <article
                            key={`${group.requestId}-${row.documentName}`}
                            className={`doc-tile required-doc-tile${row.uploaded ? ' uploaded-doc-tile' : ''}`}
                        >
                            <div className="doc-top">
                                <span className="doc-title">{row.documentName}</span>
                                <i className={`fa-solid ${row.uploaded ? 'fa-circle-check doc-status uploaded' : 'fa-clock doc-status pending'}`}></i>
                            </div>
                            <div className="doc-meta">
                                {row.uploaded ? 'Uploaded for this request' : 'Pending upload for this request'}
                            </div>
                            <div className="doc-actions">
                                <button
                                    className={row.uploaded ? 'btn btn-reupload' : 'btn btn-upload'}
                                    type="button"
                                    onClick={() => openFilePicker(row.documentName, group.requestId)}
                                    disabled={isBusy}
                                >
                                    {row.uploaded ? 'Re-upload' : 'Upload Document'}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        ));
    }

    if (requestsQuery.isLoading || documentsQuery.isLoading) {
        return <PortalPageLoader label="Loading documents..." />;
    }

    if (requestsQuery.isError || documentsQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load documents"
                message={(requestsQuery.error && requestsQuery.error.message) || (documentsQuery.error && documentsQuery.error.message)}
                onRetry={() => {
                    requestsQuery.refetch();
                    documentsQuery.refetch();
                }}
            />
        );
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientDocumentsPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientDocumentsPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="documents"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Documents</span>
                </nav>

                <div className="page-header">
                    <h1 className="page-title">{clientDocumentsPageMeta.pageTitle}</h1>
                    <p className="page-subtitle">
                        One document center for all requests. Required documents are grouped by each package and service request.
                    </p>
                </div>

                {toastMessage ? <div className="documents-inline-note">{toastMessage}</div> : null}

                <div className="document-layout">
                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-circle-check"></i> Uploaded Documents
                            </h2>
                            <Link className="more-docs-link" to={CLIENT_REQUESTS_ROUTE}>
                                Go to My Requests
                            </Link>
                        </div>
                        <div className="doc-grid" id="uploadedGrid">
                            {uploadedDocumentGroups.length ? (
                                uploadedDocumentGroups.map((group) => {
                                    const syncLabel = getGroupSyncStatusLabel(group.records);
                                    const targetRequestId = getBestRequestIdForDocument(group.documentName, group.primaryRequestId);
                                    return (
                                        <article key={group.key} className="doc-tile uploaded-doc-tile">
                                            <div className="doc-top">
                                                <span className="doc-title">{group.documentName}</span>
                                                <i className="fa-solid fa-circle-check doc-status uploaded" aria-label="uploaded"></i>
                                            </div>
                                            <div className="doc-meta">{syncLabel}</div>
                                            <div className="doc-actions">
                                                <button
                                                    className="btn btn-reupload"
                                                    type="button"
                                                    onClick={() => {
                                                        if (!targetRequestId) {
                                                            setToastMessage('No active request currently requires this document.');
                                                            return;
                                                        }
                                                        openFilePicker(group.documentName, targetRequestId);
                                                    }}
                                                    disabled={isBusy}
                                                >
                                                    Re-upload
                                                </button>
                                                <button
                                                    className="btn btn-delete"
                                                    type="button"
                                                    onClick={() => handleDeleteDocumentGroup(group)}
                                                    disabled={isBusy}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })
                            ) : (
                                <article className="doc-tile empty-doc-tile">
                                    <div className="doc-top">
                                        <span className="doc-title">No documents uploaded yet</span>
                                    </div>
                                    <div className="doc-meta">Register for a service or package, then your uploads will appear here.</div>
                                </article>
                            )}
                        </div>
                    </section>

                    <section className="doc-section">
                        <div className="section-head">
                            <h2 className="section-title">
                                <i className="fa-solid fa-file-invoice-dollar"></i> Invoices
                            </h2>
                            <Link className="more-docs-link" to={clientDocumentsLinks.invoicesMoreRoute}>
                                Open Invoices
                            </Link>
                        </div>
                        <div className="doc-grid" id="invoiceGrid">
                            {invoicesQuery.isLoading ? (
                                <article className="doc-tile empty-doc-tile">
                                    <div className="doc-top">
                                        <span className="doc-title">Loading invoices...</span>
                                    </div>
                                    <div className="doc-meta">Fetching live Zoho invoice records.</div>
                                </article>
                            ) : invoicesQuery.isError ? (
                                <article className="doc-tile empty-doc-tile">
                                    <div className="doc-top">
                                        <span className="doc-title">Unable to load invoices</span>
                                    </div>
                                    <div className="doc-meta">{invoicesQuery.error?.message || 'Please retry from the Invoices page.'}</div>
                                </article>
                            ) : invoiceRecords.length ? (
                                invoiceRecords.slice(0, 4).map((invoice) => {
                                    const query = new URLSearchParams({
                                        id: String(invoice.id || invoice.invoiceNumber || '')
                                    }).toString();

                                    return (
                                        <Link
                                            key={invoice.id || invoice.invoiceNumber}
                                            className="doc-tile invoice-doc-tile"
                                            to={`${CLIENT_INVOICE_PDF_ROUTE}?${query}`}
                                            state={{ from: clientDocumentsLinks.invoicesMoreRoute, invoice }}
                                        >
                                            <div className="doc-top">
                                                <span className="doc-title invoice-doc-title">{invoice.invoiceNumber || invoice.id}</span>
                                                <i className="fa-solid fa-file-invoice-dollar doc-status invoice" aria-label="invoice"></i>
                                            </div>
                                            <div className="invoice-doc-meta">
                                                <span className="invoice-doc-label">Date</span>
                                                <span className="invoice-doc-value">{invoice.invoiceDate || '-'}</span>
                                            </div>
                                            <div className="invoice-doc-meta">
                                                <span className="invoice-doc-label">Amount</span>
                                                <span className="invoice-doc-value invoice-doc-amount">{invoice.amount || 'AED 0.00'}</span>
                                            </div>
                                            <div className="doc-actions">
                                                <span className="btn btn-download">View PDF</span>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <article className="doc-tile empty-doc-tile">
                                    <div className="doc-top">
                                        <span className="doc-title">No invoices yet</span>
                                    </div>
                                    <div className="doc-meta">No live Zoho invoices were found for this client mapping.</div>
                                </article>
                            )}
                        </div>
                    </section>
                </div>

                <section className="doc-section doc-required-pool-section">
                    <div className="section-head">
                        <h2 className="section-title">
                            <i className="fa-solid fa-list-check"></i> Required Documents
                        </h2>
                    </div>
                    <div className="required-doc-groups">
                        <div className="required-doc-group">
                            <h3 className="required-doc-group-title">Package Requests</h3>
                            {renderRequestGroups(groupedRequiredDocuments.Package)}
                        </div>
                        <div className="required-doc-group">
                            <h3 className="required-doc-group-title">Service Requests</h3>
                            {renderRequestGroups(groupedRequiredDocuments.Service)}
                        </div>
                    </div>
                </section>
            </div>

            {isUploadingDocument ? (
                <div className="documents-upload-overlay" role="status" aria-live="polite" aria-label="Uploading documents">
                    <div className="documents-upload-card">
                        <div className="documents-upload-spinner" aria-hidden="true"></div>
                        <p>Uploading documents...</p>
                    </div>
                </div>
            ) : null}

            <input ref={docFileInputRef} type="file" id="docFileInput" hidden onChange={handleFileChange} />
        </>
    );
}

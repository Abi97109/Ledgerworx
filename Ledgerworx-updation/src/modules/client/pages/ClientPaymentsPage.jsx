import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import { clientPaymentsPageMeta } from '../data/paymentsData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_RECEIPT_PDF_ROUTE,
    CLIENT_REQUESTS_ROUTE
} from '../utils/routePaths';
import {
    formatAedAmount,
    parseAedAmount
} from '../utils/paymentUtils';
import { buildClientProgressFromStatus } from '../utils/requestStorage';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import { useClientRequestsQuery, useUpdateClientRequestMutation } from '../hooks/useClientRequestsQuery';
import '../styles/client-payments.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

const DEFAULT_PAYMENT_CONTACT_PHONE = '+971506708639';
const DEFAULT_PAYMENT_WHATSAPP_LINK = 'https://wa.me/971506708639';

function normalizeStage(text) {
    return String(text || '').trim().toLowerCase();
}

function buildPaymentRows(requests) {
    return requests
        .filter((request) => {
            const stage = normalizeStage(request.workflowStage || request.status);
            return stage.includes('payment') || stage.includes('completed');
        })
        .map((request) => {
            const stage = normalizeStage(request.workflowStage || request.status);
            const amountValue = parseAedAmount(request.amount);

            if (stage.includes('payment pending') || stage.includes('payment required')) {
                return {
                    id: request.requestId,
                    title: request.title,
                    requestId: request.requestId,
                    amount: request.amount || 'Amount to be confirmed',
                    amountValue,
                    statusKey: 'payment-required',
                    statusLabel: 'Payment Required',
                    actionLabel: 'Contact on WhatsApp',
                    iconTone: 'orange',
                    iconClass: 'fas fa-wallet',
                    request
                };
            }

            if (stage.includes('awaiting payment confirmation')) {
                return {
                    id: request.requestId,
                    title: request.title,
                    requestId: request.requestId,
                    amount: request.amount || 'Amount submitted',
                    amountValue,
                    statusKey: 'upcoming',
                    statusLabel: 'Awaiting Confirmation',
                    actionLabel: 'Awaiting Confirmation',
                    iconTone: 'blue',
                    iconClass: 'fas fa-hourglass-half',
                    request
                };
            }

            return {
                id: request.requestId,
                title: request.title,
                requestId: request.requestId,
                amount: request.amount || 'Amount confirmed',
                amountValue,
                statusKey: 'paid',
                statusLabel: 'Completed',
                actionLabel: 'View Receipt',
                iconTone: 'green',
                iconClass: 'fas fa-check-circle',
                request
            };
        });
}

function buildPaymentSummary(rows) {
    const summary = {
        dueNow: 0,
        pendingCount: 0,
        awaitingCount: 0,
        paidTotal: 0,
        paidCount: 0
    };

    rows.forEach((row) => {
        if (row.statusKey === 'payment-required') {
            summary.dueNow += row.amountValue;
            summary.pendingCount += 1;
            return;
        }

        if (row.statusKey === 'upcoming') {
            summary.awaitingCount += 1;
            return;
        }

        if (row.statusKey === 'paid') {
            summary.paidTotal += row.amountValue;
            summary.paidCount += 1;
        }
    });

    return summary;
}

export default function ClientPaymentsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const requestId = String(searchParams.get('request') || '').trim();
    const bootstrapQuery = usePortalSession();
    const requestsQuery = useClientRequestsQuery();
    const updateRequestMutation = useUpdateClientRequestMutation();
    const { theme, toggleTheme } = useClientPortalPage(clientPaymentsPageMeta.pageTitle);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });
    const [toastState, setToastState] = useState({
        isVisible: false,
        message: ''
    });
    const toastTimeoutRef = useRef(null);

    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;
    const requestList = Array.isArray(requestsQuery.data?.requests) ? requestsQuery.data.requests : [];
    const activeRequest = requestList.find((item) => item.requestId === requestId) || null;
    const isRequestMode = Boolean(requestId);

    const paymentRows = useMemo(() => buildPaymentRows(requestList), [requestList]);
    const paymentSummary = useMemo(() => buildPaymentSummary(paymentRows), [paymentRows]);

    React.useEffect(() => {
        return function cleanupToastTimeout() {
            if (toastTimeoutRef.current) {
                window.clearTimeout(toastTimeoutRef.current);
            }
        };
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
        const callback = modalState.onConfirm;
        closeModal();
        if (callback) {
            callback();
        }
    }

    function showPayNowNotification(message) {
        setToastState({
            isVisible: true,
            message
        });

        if (toastTimeoutRef.current) {
            window.clearTimeout(toastTimeoutRef.current);
        }

        toastTimeoutRef.current = window.setTimeout(() => {
            setToastState((prev) => ({
                ...prev,
                isVisible: false
            }));
        }, 2200);
    }

    function buildPaymentQuery(data) {
        const query = new URLSearchParams({
            title: data.title || 'Service Payment',
            request: data.requestId || 'N/A',
            amount: data.amount || 'N/A'
        });

        return `${CLIENT_RECEIPT_PDF_ROUTE}?${query.toString()}`;
    }

    async function markRequestPaid(request) {
        await updateRequestMutation.mutateAsync({
            requestId: request.requestId,
            requestData: {
                status: 'Completed',
                workflowStage: 'Completed',
                progress: buildClientProgressFromStatus('completed'),
                actionBtn: 'View Receipt',
                dueDate: 'Payment handoff completed',
                instructions: [
                    'You have been redirected to our WhatsApp payment contact.',
                    'This request has been marked as paid after the WhatsApp payment handoff.',
                    'You can now review the receipt from the Payments page.'
                ]
            }
        });
    }

    function handleWhatsAppPayment(request) {
        if (!request) {
            return;
        }

        const whatsappLink = request.paymentWhatsappLink || DEFAULT_PAYMENT_WHATSAPP_LINK;
        const whatsappMessage = encodeURIComponent(`Hello, I would like to complete payment for request ${request.requestId} (${request.title}).`);
        const targetUrl = `${whatsappLink}${whatsappLink.includes('?') ? '&' : '?'}text=${whatsappMessage}`;

        openModal(
            'Continue to WhatsApp',
            `You will be redirected to ${request.paymentContactName || 'our payment contact'} on WhatsApp. Continue?`,
            async () => {
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
                try {
                    await markRequestPaid(request);
                    showPayNowNotification('WhatsApp opened. The request has been marked as paid.');
                } catch (error) {
                    showPayNowNotification(error?.message || 'WhatsApp opened, but we could not update the request status right away.');
                }
            }
        );
    }

    function handlePaymentAction(row) {
        if (row.actionLabel === 'Contact on WhatsApp') {
            handleWhatsAppPayment(row.request);
            return;
        }

        if (row.actionLabel === 'View Receipt') {
            navigate(
                buildPaymentQuery({
                    title: row.title,
                    requestId: row.requestId,
                    amount: row.amount
                })
            );
        }
    }

    if (requestsQuery.isLoading) {
        return <PortalPageLoader label="Loading payment handoff..." />;
    }

    if (requestsQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load payment handoff"
                message={requestsQuery.error && requestsQuery.error.message}
                onRetry={() => requestsQuery.refetch()}
            />
        );
    }

    if (isRequestMode && !activeRequest) {
        return (
            <PortalPageError
                title="Request not found"
                message="We could not find the selected request. Please reopen it from My Requests."
                onRetry={() => navigate(CLIENT_REQUESTS_ROUTE)}
            />
        );
    }

    return (
        <>
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientPaymentsPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientPaymentsPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="payments"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Payments</span>
                </nav>

                <div className="page-header">
                    <h1 className="page-title">{clientPaymentsPageMeta.heading}</h1>
                    <p className="page-subtitle">
                        {isRequestMode
                            ? 'Complete the payment handoff for this request by contacting our team on WhatsApp.'
                            : 'Payment summary and actions are powered by your live request-tracker stages.'}
                    </p>
                </div>

                {isRequestMode ? (
                    <div className="request-payment-layout">
                        <div className="payment-summary single-request-payment-card">
                            <div className="payment-card due-now request-handoff-card">
                                <div className="payment-card-content">
                                    <div className="payment-card-title">Payment Handoff</div>
                                    <div className="payment-card-amount">{activeRequest.amount || 'Amount to be confirmed'}</div>
                                    <div className="payment-card-sub">Request ID: {activeRequest.requestId}</div>
                                </div>
                                <button
                                    type="button"
                                    className="payment-card-button"
                                    onClick={() => handleWhatsAppPayment(activeRequest)}
                                    disabled={updateRequestMutation.isPending || String(activeRequest.actionBtn || '').toLowerCase().includes('awaiting')}
                                >
                                    {String(activeRequest.actionBtn || '').toLowerCase().includes('awaiting') ? 'Awaiting Confirmation' : 'Contact on WhatsApp'}
                                </button>
                            </div>
                        </div>

                        <section className="payment-request-panel">
                            <div className="payment-request-head">
                                <div>
                                    <span className="payment-request-kicker">Selected Request</span>
                                    <h2>{activeRequest.title}</h2>
                                </div>
                                <span className="payment-request-status">{activeRequest.status}</span>
                            </div>
                            <div className="payment-request-grid">
                                <div><span>Category</span><strong>{activeRequest.category || 'Client Request'}</strong></div>
                                <div><span>Stage</span><strong>{activeRequest.workflowStage || activeRequest.status}</strong></div>
                                <div><span>Contact Person</span><strong>{activeRequest.paymentContactName || 'LedgerWorx Accounts Team'}</strong></div>
                                <div><span>Phone</span><strong>{activeRequest.paymentContactPhone || DEFAULT_PAYMENT_CONTACT_PHONE}</strong></div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <>
                        <div className="payment-summary">
                            <div className="payment-card due-now">
                                <div className="payment-card-content">
                                    <div className="payment-card-title">Due Now</div>
                                    <div className="payment-card-amount">{formatAedAmount(paymentSummary.dueNow)}</div>
                                    <div className="payment-card-sub">{paymentSummary.pendingCount} request(s) need payment handoff</div>
                                </div>
                            </div>
                            <div className="payment-card upcoming">
                                <div className="payment-card-content">
                                    <div className="payment-card-title">Awaiting Confirmation</div>
                                    <div className="payment-card-amount">{paymentSummary.awaitingCount}</div>
                                    <div className="payment-card-sub">Request(s) waiting for staff confirmation</div>
                                </div>
                            </div>
                            <div className="payment-card paid">
                                <div className="payment-card-content">
                                    <div className="payment-card-title">Completed</div>
                                    <div className="payment-card-amount">{formatAedAmount(paymentSummary.paidTotal)}</div>
                                    <div className="payment-card-sub">{paymentSummary.paidCount} request(s) completed</div>
                                </div>
                            </div>
                        </div>

                        {paymentRows.length ? (
                            <div className="payment-items">
                                {paymentRows.map((item) => (
                                    <div key={item.id} className="payment-item">
                                        <div className={`payment-item-icon ${item.iconTone}`}>
                                            <i className={item.iconClass}></i>
                                        </div>
                                        <div className="payment-item-info">
                                            <div className="payment-item-title">{item.title}</div>
                                            <div className="payment-item-request-id">Request ID: {item.requestId}</div>
                                        </div>
                                        <div className="payment-item-amount">{item.amount}</div>
                                        <div className="payment-item-status">
                                            <span className={`status-badge ${item.statusKey}`}>{item.statusLabel}</span>
                                        </div>
                                        <div className="payment-item-action">
                                            {item.actionLabel === 'Awaiting Confirmation' ? (
                                                <button type="button" className="action-btn secondary" disabled>
                                                    Awaiting Confirmation
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className={`action-btn${item.actionLabel === 'View Receipt' ? ' secondary' : ''}`}
                                                    onClick={() => handlePaymentAction(item)}
                                                >
                                                    {item.actionLabel}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <section className="requests-empty-state payment-empty-state">
                                <h3>No payment requests yet</h3>
                                <p>Once a package or service request reaches the payment stage, it will appear here.</p>
                                <Link to={CLIENT_REQUESTS_ROUTE} className="requests-empty-link">Go to My Requests</Link>
                            </section>
                        )}
                    </>
                )}
            </div>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
            />

            <div
                id="payNowToast"
                className={`pay-now-toast${toastState.isVisible ? ' show' : ''}`}
                role="status"
                aria-live="polite"
            >
                {toastState.message}
            </div>
        </>
    );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import {
    clientPaymentItems,
    clientPaymentSummaryCards,
    clientPaymentsPageMeta
} from '../data/paymentsData';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_RECEIPT_PDF_ROUTE
} from '../utils/routePaths';
import {
    CLIENT_DUE_NOW_STORAGE_KEY,
    formatAedAmount,
    getClientPaymentTotals
} from '../utils/paymentUtils';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-payments.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientPaymentsPage() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useClientPortalPage(clientPaymentsPageMeta.pageTitle);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });
    const [paymentDetailsState, setPaymentDetailsState] = useState({
        isOpen: false,
        data: null
    });
    const [toastState, setToastState] = useState({
        isVisible: false,
        message: ''
    });
    const toastTimeoutRef = useRef(null);

    const paymentTotals = useMemo(() => getClientPaymentTotals(clientPaymentItems), []);

    useEffect(() => {
        try {
            window.localStorage.setItem(CLIENT_DUE_NOW_STORAGE_KEY, String(paymentTotals.dueNow));
        } catch (error) {
            // Ignore storage access failures.
        }
    }, [paymentTotals.dueNow]);

    useEffect(() => {
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

    function openPaymentDetails(data) {
        setPaymentDetailsState({
            isOpen: true,
            data
        });
    }

    function closePaymentDetails() {
        setPaymentDetailsState({
            isOpen: false,
            data: null
        });
    }

    function buildPaymentQuery(data) {
        const query = new URLSearchParams({
            title: data.title || 'Service Payment',
            request: data.requestId || 'N/A',
            amount: data.amount || 'N/A'
        });

        return `${CLIENT_RECEIPT_PDF_ROUTE}?${query.toString()}`;
    }

    function handlePaymentAction(data, label) {
        const normalizedLabel = String(label || '').trim().toLowerCase();

        if (normalizedLabel === 'pay now' || normalizedLabel === 'retry payment') {
            openModal(
                'Redirect To Payment Gateway',
                `You are being redirected to payment gateway for ${data.title} (${data.amount}). Continue?`,
                () => {
                    showPayNowNotification('Redirecting to payment gateway...');
                }
            );
            return;
        }

        if (normalizedLabel === 'view receipt') {
            navigate(buildPaymentQuery(data));
            return;
        }

        if (normalizedLabel === 'view details') {
            openPaymentDetails(data);
        }
    }

    function getSummaryAmount(cardKey) {
        if (cardKey === 'due-now') {
            return formatAedAmount(paymentTotals.dueNow);
        }

        if (cardKey === 'upcoming') {
            return formatAedAmount(paymentTotals.upcoming);
        }

        return formatAedAmount(paymentTotals.paid);
    }

    function buildSummaryActionData(card) {
        return {
            title: card.title,
            requestId: card.key === 'due-now' ? 'LW-REQ-024' : 'N/A',
            amount: getSummaryAmount(card.key),
            status: card.subtitle,
            note: 'Review summary payment details and choose Pay Now or Pay Later.'
        };
    }

    const activePaymentDetails = paymentDetailsState.data;

    return (
        <>
            <ClientPortalNavbar
                profileName={clientPaymentsPageMeta.profileName}
                profileImage={clientPaymentsPageMeta.profileImage}
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
                    <p className="page-subtitle">{clientPaymentsPageMeta.subtitle}</p>
                </div>

                <div className="payment-summary">
                    {clientPaymentSummaryCards.map((card) => (
                        <div key={card.key} className={`payment-card ${card.variant}`}>
                            <div className="payment-card-content">
                                <div className="payment-card-title">{card.title}</div>
                                <div className="payment-card-amount">{getSummaryAmount(card.key)}</div>
                                <div className="payment-card-sub">
                                    {card.subtitleIconClass ? <i className={card.subtitleIconClass}></i> : null}
                                    {card.subtitleIconClass ? ' ' : ''}
                                    {card.subtitle}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="payment-card-button"
                                onClick={() => handlePaymentAction(buildSummaryActionData(card), card.buttonLabel)}
                            >
                                {card.buttonLabel}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="search-section">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search" />
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </div>

                <div className="payment-items">
                    {clientPaymentItems.map((item) => {
                        const isSecondaryAction = item.actionLabel === 'View Details' || item.actionLabel === 'View Receipt';
                        return (
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
                                    <span className={`status-badge ${item.statusKey}`}>
                                        <i className={item.statusIconClass}></i> {item.statusLabel}
                                    </span>
                                </div>
                                <div className="payment-item-action">
                                    <button
                                        type="button"
                                        className={`action-btn${isSecondaryAction ? ' secondary' : ''}`}
                                        onClick={() =>
                                            handlePaymentAction(
                                                {
                                                    title: item.title,
                                                    requestId: item.requestId,
                                                    amount: item.amount,
                                                    status: item.statusLabel,
                                                    note: 'Review the service payment details and choose Pay Now or Pay Later.'
                                                },
                                                item.actionLabel
                                            )
                                        }
                                    >
                                        {item.actionLabel}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
            />

            <div
                id="paymentDetailsModal"
                className="modal"
                aria-hidden={paymentDetailsState.isOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'paymentDetailsModal') {
                        closePaymentDetails();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" id="paymentDetailsClose" aria-label="Close" type="button" onClick={closePaymentDetails}>
                        &times;
                    </button>
                    <h3 id="paymentDetailsTitle">Payment Details</h3>
                    <div className="payment-details-grid">
                        <div className="payment-detail">
                            <div className="payment-detail-label">Service</div>
                            <div className="payment-detail-value" id="paymentDetailService">{activePaymentDetails ? activePaymentDetails.title : 'N/A'}</div>
                        </div>
                        <div className="payment-detail">
                            <div className="payment-detail-label">Request ID</div>
                            <div className="payment-detail-value" id="paymentDetailRequest">{activePaymentDetails ? activePaymentDetails.requestId : 'N/A'}</div>
                        </div>
                        <div className="payment-detail">
                            <div className="payment-detail-label">Amount</div>
                            <div className="payment-detail-value" id="paymentDetailAmount">{activePaymentDetails ? activePaymentDetails.amount : 'N/A'}</div>
                        </div>
                        <div className="payment-detail">
                            <div className="payment-detail-label">Status</div>
                            <div className="payment-detail-value" id="paymentDetailStatus">{activePaymentDetails ? activePaymentDetails.status : 'N/A'}</div>
                        </div>
                    </div>
                    <p className="payment-detail-note" id="paymentDetailNote">
                        {activePaymentDetails ? activePaymentDetails.note : 'Review the payment details and choose how you want to proceed.'}
                    </p>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn-pay-now"
                            id="paymentDetailPayNow"
                            onClick={() => {
                                if (!activePaymentDetails) {
                                    return;
                                }

                                closePaymentDetails();
                                openModal(
                                    'Redirect To Payment Gateway',
                                    `You are being redirected to payment gateway for ${activePaymentDetails.title} (${activePaymentDetails.amount}). Continue?`,
                                    () => {
                                        showPayNowNotification('Redirecting to payment gateway...');
                                    }
                                );
                            }}
                        >
                            Pay Now
                        </button>
                        <button
                            type="button"
                            className="btn-pay-later"
                            id="paymentDetailPayLater"
                            onClick={() => {
                                if (!activePaymentDetails) {
                                    return;
                                }

                                closePaymentDetails();
                                openModal(
                                    'Pay Later',
                                    `${activePaymentDetails.title} has been marked as pay later. You can complete payment anytime from this page.`,
                                    () => {}
                                );
                            }}
                        >
                            Pay Later
                        </button>
                        <button type="button" className="btn-cancel" id="paymentDetailCancel" onClick={closePaymentDetails}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

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

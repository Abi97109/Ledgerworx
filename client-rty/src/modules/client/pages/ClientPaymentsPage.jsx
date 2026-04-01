import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_NAV_LINKS,
  CLIENT_PROFILE,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import {
  CLIENT_PAYMENT_ITEMS,
  CLIENT_PAYMENT_MODAL_TEXT,
  CLIENT_PAYMENTS_PROFILE,
  CLIENT_PAYMENT_SUMMARY_CARDS,
} from "../data/clientPaymentsData";
import {
  buildPaymentDetailsFromItem,
  buildPaymentDetailsFromSummaryCard,
  buildPaymentGatewayPayload,
  calculatePaymentTotals,
  CLIENT_DUE_NOW_STORAGE_KEY,
  formatAedAmount,
} from "../utils/clientPaymentsHelpers";
import {
  applyRootTheme,
  buildClientAvatar,
  getSavedTheme,
  saveTheme,
} from "../utils/clientNotificationHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/client-payments.css";
import "../styles/client-breadcrumb.css";
import "../styles/dark-mode.css";

function ClientPaymentsPage() {
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Confirm",
    body: "Are you sure?",
    onConfirm: null,
  });

  const [isPaymentDetailsModalOpen, setIsPaymentDetailsModalOpen] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);

  const paymentTotals = useMemo(() => calculatePaymentTotals(CLIENT_PAYMENT_ITEMS), []);

  const paymentSummaryCards = useMemo(() => {
    return CLIENT_PAYMENT_SUMMARY_CARDS.map((card) => {
      if (card.className === "due-now") {
        return { ...card, amount: formatAedAmount(paymentTotals.dueNow) };
      }

      if (card.className === "upcoming") {
        return { ...card, amount: formatAedAmount(paymentTotals.upcoming) };
      }

      if (card.className === "paid") {
        return { ...card, amount: formatAedAmount(paymentTotals.paid) };
      }

      return card;
    });
  }, [paymentTotals]);

  const dropdownAvatar = useMemo(() => {
    const profileImage = CLIENT_PROFILE.profileImage?.trim() || "";
    if (profileImage && !profileImage.includes("i.pravatar.cc")) {
      return profileImage;
    }

    return buildClientAvatar(CLIENT_PROFILE.profileName);
  }, []);

  useEffect(() => {
    applyRootTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CLIENT_DUE_NOW_STORAGE_KEY, String(paymentTotals.dueNow));
    } catch (error) {
      // ignore storage failures
    }
  }, [paymentTotals.dueNow]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!profileRef.current) {
        return;
      }

      if (!profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const openModal = useCallback((title, body, onConfirm = null) => {
    setModalState({
      isOpen: true,
      title,
      body,
      onConfirm,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((previousState) => ({
      ...previousState,
      isOpen: false,
      onConfirm: null,
    }));
  }, []);

  const handleModalConfirm = useCallback(() => {
    if (typeof modalState.onConfirm === "function") {
      modalState.onConfirm();
    }

    closeModal();
  }, [closeModal, modalState]);

  const handleModalOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    },
    [closeModal],
  );

  const openPaymentDetails = useCallback((data) => {
    setSelectedPaymentDetails(data);
    setIsPaymentDetailsModalOpen(true);
  }, []);

  const closePaymentDetails = useCallback(() => {
    setIsPaymentDetailsModalOpen(false);
  }, []);

  const submitToPaymentGateway = useCallback((payload) => {
    const form = document.createElement("form");
    form.method = "post";
    form.action = buildLegacyUrl(CLIENT_LEGACY_PATHS.paymentGateway);

    Object.keys(payload).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = payload[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, []);

  const redirectToPaymentGateway = useCallback(
    (data, source) => {
      const payload = buildPaymentGatewayPayload({
        data,
        source,
        profileName: CLIENT_PAYMENTS_PROFILE.profileName,
        clientEmail: CLIENT_PAYMENTS_PROFILE.clientEmail,
        clientPhone: CLIENT_PAYMENTS_PROFILE.clientPhone,
      });

      submitToPaymentGateway(payload);
    },
    [submitToPaymentGateway],
  );

  const handlePaymentItemAction = useCallback(
    (item) => {
      const label = item.actionLabel.trim().toLowerCase();
      const detailsData = buildPaymentDetailsFromItem(item, CLIENT_PAYMENT_MODAL_TEXT.detailsItemNote);

      if (label === "pay now" || label === "retry payment") {
        openModal(
          "Redirect To Payment Gateway",
          `You are being redirected to payment gateway for ${detailsData.title} (${detailsData.amount}). Continue?`,
          () => {
            redirectToPaymentGateway(detailsData, "payments-item-tile");
          },
        );
        return;
      }

      if (label === "view receipt") {
        const query = new URLSearchParams({
          title: detailsData.title,
          request: detailsData.requestId,
          amount: detailsData.amount,
        });

        navigate(`${CLIENT_ROUTE_PATHS.receiptPdf}?${query.toString()}`);
        return;
      }

      if (label === "view details") {
        openPaymentDetails(detailsData);
      }
    },
    [navigate, openModal, openPaymentDetails, redirectToPaymentGateway],
  );

  const handleSummaryCardAction = useCallback(
    (card) => {
      const label = card.buttonLabel.trim().toLowerCase();
      const detailsData = buildPaymentDetailsFromSummaryCard(card, CLIENT_PAYMENT_MODAL_TEXT.detailsSummaryNote);

      if (label === "pay now") {
        openModal(
          "Redirect To Payment Gateway",
          `You are being redirected to payment gateway for ${detailsData.title} (${detailsData.amount}). Continue?`,
          () => {
            redirectToPaymentGateway(detailsData, "payments-summary-tile");
          },
        );
        return;
      }

      if (label === "view receipt") {
        const query = new URLSearchParams({
          title: detailsData.title,
          request: detailsData.requestId,
          amount: detailsData.amount,
        });

        navigate(`${CLIENT_ROUTE_PATHS.receiptPdf}?${query.toString()}`);
        return;
      }

      if (label === "view details") {
        openPaymentDetails(detailsData);
      }
    },
    [navigate, openModal, openPaymentDetails, redirectToPaymentGateway],
  );

  const handlePaymentDetailPayNow = useCallback(() => {
    const detailsData = selectedPaymentDetails || {
      title: "this payment",
      amount: "N/A",
    };

    closePaymentDetails();
    openModal(
      "Redirect To Payment Gateway",
      `You are being redirected to payment gateway for ${detailsData.title} (${detailsData.amount}). Continue?`,
      () => {
        redirectToPaymentGateway(detailsData, "payments-detail-modal");
      },
    );
  }, [closePaymentDetails, openModal, redirectToPaymentGateway, selectedPaymentDetails]);

  const handlePaymentDetailPayLater = useCallback(() => {
    const detailsData = selectedPaymentDetails || {
      title: "this payment",
    };

    closePaymentDetails();
    openModal(
      "Pay Later",
      `${detailsData.title} has been marked as pay later. You can complete payment anytime from this page.`,
      () => {},
    );
  }, [closePaymentDetails, openModal, selectedPaymentDetails]);

  const handleNavToggle = useCallback(() => {
    setIsNavOpen((previousState) => !previousState);
  }, []);

  const handleProfileToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsProfileOpen((previousState) => !previousState);
  }, []);

  const handleThemeToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
  }, []);

  const handleSignout = useCallback(
    (event) => {
      event.preventDefault();
      setIsProfileOpen(false);
      navigate(CLIENT_ROUTE_PATHS.signout);
    },
    [navigate],
  );

  const handleAvatarError = useCallback((event) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = buildClientAvatar(CLIENT_PROFILE.profileName);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="brand">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)} aria-label="Go to Dashboard">
            <img src={buildLegacyUrl(CLIENT_LEGACY_PATHS.logo)} alt="Ledger Workx logo" className="logo-img" />
          </a>
        </div>

        <button className="nav-toggle" aria-label="Toggle menu" onClick={handleNavToggle}>
          <i className="fas fa-bars" />
        </button>

        <nav className="nav-links" style={isNavOpen ? { display: "flex" } : undefined}>
          {CLIENT_NAV_LINKS.map((navLink) => {
            const content = (
              <>
                <i className={navLink.iconClass} />
                {navLink.label}
              </>
            );

            const isActive = navLink.key === "payments";

            if (navLink.isMigrated && navLink.routePath) {
              return (
                <Link key={navLink.key} to={navLink.routePath} className={isActive ? "active" : undefined}>
                  {content}
                </Link>
              );
            }

            return (
              <a key={navLink.key} href={buildLegacyUrl(navLink.legacyPath)} className={isActive ? "active" : undefined}>
                {content}
              </a>
            );
          })}
        </nav>

        <div className="profile" ref={profileRef}>
          <span className="profile-name" id="profileNameBtn" onClick={handleProfileToggle}>
            {CLIENT_PROFILE.profileName}
          </span>
          <img
            src={CLIENT_PROFILE.profileImage}
            alt="profile"
            className="profile-img"
            id="profileToggle"
            onClick={handleProfileToggle}
          />
          <i
            className={`fas fa-chevron-down profile-arrow${isProfileOpen ? " rotate" : ""}`}
            id="profileArrow"
            onClick={handleProfileToggle}
          />

          <div className={`profile-dropdown${isProfileOpen ? " active" : ""}`} id="profileDropdown">
            <div className="dropdown-header">
              <img src={dropdownAvatar} alt="Client avatar" className="user-avatar" onError={handleAvatarError} />
              <h4>{CLIENT_PROFILE.profileName}</h4>
              <p>{CLIENT_PROFILE.portalLabel}</p>
            </div>

            <div className="dropdown-body">
              <Link className="dropdown-item" data-dropdown-item="profile-settings" to={CLIENT_ROUTE_PATHS.profileSettings}>
                <i className="fas fa-user" />
                <span>Profile Settings</span>
              </Link>

              <div className="dropdown-divider" />

              <button className="theme-toggle" id="themeToggle" type="button" onClick={handleThemeToggle}>
                <div className="theme-toggle-label">
                  <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} id="themeIcon" />
                  <span id="themeText">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <div className={`toggle-switch${theme === "dark" ? " active" : ""}`} id="themeToggleSwitch" />
              </button>

              <div className="dropdown-divider" />

              <Link className="dropdown-item" data-dropdown-item="help" to={CLIENT_ROUTE_PATHS.support}>
                <i className="fas fa-question-circle" />
                <span>Help &amp; Support</span>
              </Link>

              <div className="dropdown-divider" />

              <button className="dropdown-item signout" id="signoutBtn" type="button" onClick={handleSignout}>
                <i className="fas fa-sign-out-alt" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)}>Dashboard</a>
          <span className="crumb-sep">/</span>
          <span className="current">Payments</span>
        </nav>

        <div className="page-header">
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">View and complete your payments</p>
        </div>

        <div className="payment-summary">
          {paymentSummaryCards.map((card) => (
            <div key={card.key} className={`payment-card ${card.className}`}>
              <div className="payment-card-content">
                <div className="payment-card-title">{card.title}</div>
                <div className="payment-card-amount">{card.amount}</div>
                <div className="payment-card-sub">
                  {card.subIconClass ? <i className={card.subIconClass} /> : null}
                  {card.subIconClass ? " " : null}
                  {card.sub}
                </div>
              </div>
              <button className="payment-card-button" onClick={() => handleSummaryCardAction(card)}>
                {card.buttonLabel}
              </button>
            </div>
          ))}
        </div>

        <div className="search-section">
          <div className="search-box">
            <i className="fas fa-search" />
            <input type="text" placeholder="Search" />
            <i className="fas fa-arrow-right" />
          </div>
        </div>

        <div className="payment-items">
          {CLIENT_PAYMENT_ITEMS.map((item) => (
            <div key={item.key} className="payment-item">
              <div className={`payment-item-icon ${item.iconTone}`}>
                <i className={item.iconClass} />
              </div>
              <div className="payment-item-info">
                <div className="payment-item-title">{item.title}</div>
                <div className="payment-item-request-id">Request ID: {item.requestId}</div>
              </div>
              <div className="payment-item-amount">{item.amount}</div>
              <div className="payment-item-status">
                <span className={`status-badge ${item.statusClass}`}>
                  <i className={item.statusIconClass} /> {item.statusLabel}
                </span>
              </div>
              <div className="payment-item-action">
                <button className={item.actionClass} onClick={() => handlePaymentItemAction(item)}>
                  {item.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="modal" className="modal" aria-hidden={modalState.isOpen ? "false" : "true"} onClick={handleModalOverlayClick}>
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

      <div
        id="paymentDetailsModal"
        className="modal"
        aria-hidden={isPaymentDetailsModalOpen ? "false" : "true"}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePaymentDetails();
          }
        }}
      >
        <div className="modal-content">
          <button className="modal-close" id="paymentDetailsClose" aria-label="Close" onClick={closePaymentDetails}>
            &times;
          </button>
          <h3 id="paymentDetailsTitle">{CLIENT_PAYMENT_MODAL_TEXT.detailsDefaultTitle}</h3>

          <div className="payment-details-grid">
            <div className="payment-detail">
              <div className="payment-detail-label">Service</div>
              <div className="payment-detail-value" id="paymentDetailService">
                {selectedPaymentDetails?.title || "N/A"}
              </div>
            </div>
            <div className="payment-detail">
              <div className="payment-detail-label">Request ID</div>
              <div className="payment-detail-value" id="paymentDetailRequest">
                {selectedPaymentDetails?.requestId || "N/A"}
              </div>
            </div>
            <div className="payment-detail">
              <div className="payment-detail-label">Amount</div>
              <div className="payment-detail-value" id="paymentDetailAmount">
                {selectedPaymentDetails?.amount || "N/A"}
              </div>
            </div>
            <div className="payment-detail">
              <div className="payment-detail-label">Status</div>
              <div className="payment-detail-value" id="paymentDetailStatus">
                {selectedPaymentDetails?.status || "N/A"}
              </div>
            </div>
          </div>

          <p className="payment-detail-note" id="paymentDetailNote">
            {selectedPaymentDetails?.note || CLIENT_PAYMENT_MODAL_TEXT.detailsDefaultNote}
          </p>

          <div className="modal-actions">
            <button type="button" className="btn-pay-now" id="paymentDetailPayNow" onClick={handlePaymentDetailPayNow}>
              Pay Now
            </button>
            <button type="button" className="btn-pay-later" id="paymentDetailPayLater" onClick={handlePaymentDetailPayLater}>
              Pay Later
            </button>
            <button type="button" className="btn-cancel" id="paymentDetailCancel" onClick={closePaymentDetails}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientPaymentsPage;

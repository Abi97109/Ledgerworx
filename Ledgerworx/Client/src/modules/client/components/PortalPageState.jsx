import React from 'react';
import '../styles/portal-page-state.css';

export function PortalPageLoader({ label = 'Loading portal data...' }) {
    return (
        <main className="portal-state-shell portal-state-shell-loading">
            <section className="portal-state-card portal-state-card-loading" aria-live="polite">
                <div className="portal-state-orbit" aria-hidden="true">
                    <span className="portal-orbit-ring portal-orbit-ring-one"></span>
                    <span className="portal-orbit-ring portal-orbit-ring-two"></span>
                    <span className="portal-orbit-core"></span>
                </div>
                <div className="portal-state-copy">
                    <span className="portal-state-kicker">LedgerWorx Portal</span>
                    <h1>{label}</h1>
                    <p>Please wait while we prepare your workspace and sync the latest portal data.</p>
                </div>
                <div className="portal-state-skeleton" aria-hidden="true">
                    <div className="portal-skeleton portal-skeleton-wide"></div>
                    <div className="portal-skeleton portal-skeleton-row">
                        <span className="portal-skeleton-card"></span>
                        <span className="portal-skeleton-card"></span>
                        <span className="portal-skeleton-card"></span>
                    </div>
                    <div className="portal-skeleton portal-skeleton-medium"></div>
                </div>
            </section>
        </main>
    );
}

export function PortalPageError({ title = 'Unable to load this page', message, onRetry }) {
    return (
        <main className="portal-state-shell">
            <section className="portal-state-card portal-state-card-error">
                <span className="portal-state-kicker">Portal status</span>
                <h1>{title}</h1>
                <p>{message || 'Please try again in a moment.'}</p>
                {typeof onRetry === 'function' ? (
                    <button type="button" className="portal-state-button" onClick={onRetry}>
                        Retry
                    </button>
                ) : null}
            </section>
        </main>
    );
}

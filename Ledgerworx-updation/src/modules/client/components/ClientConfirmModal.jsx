import React from 'react';

export default function ClientConfirmModal({
    isOpen,
    title,
    body,
    onClose,
    onConfirm,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel'
}) {
    return (
        <div
            id="modal"
            className="modal"
            aria-hidden={isOpen ? 'false' : 'true'}
            style={{
                display: isOpen ? 'flex' : 'none',
                position: 'fixed',
                inset: 0,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20000
            }}
            onClick={(event) => {
                if (event.target.id === 'modal') {
                    onClose();
                }
            }}
        >
            <div className="modal-content">
                <button className="modal-close" aria-label="Close" type="button" onClick={onClose}>
                    &times;
                </button>
                <h3 id="modal-title">{title}</h3>
                <p id="modal-body">{body}</p>
                <div className="modal-actions">
                    <button className="primary modal-confirm" type="button" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                    <button className="secondary modal-cancel" type="button" onClick={onClose}>
                        {cancelLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

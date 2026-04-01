import React from 'react';

function ConfirmationModal({ isOpen, title, body, onConfirm, onCancel }) {
    const ariaHidden = isOpen ? 'false' : 'true';

    return (
        <div
            id="modal"
            className={`modal${isOpen ? ' active' : ''}`}
            aria-hidden={ariaHidden}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
        >
            <div className="modal-content">
                <button className="modal-close" aria-label="Close" onClick={onCancel}>&times;</button>
                <h3 id="modal-title">{title}</h3>
                <p id="modal-body">{body}</p>
                <div className="modal-actions">
                    <button className="primary modal-confirm" onClick={onConfirm}>Confirm</button>
                    <button className="secondary modal-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
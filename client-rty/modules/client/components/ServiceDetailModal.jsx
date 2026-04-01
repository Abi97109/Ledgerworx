import React from 'react';

function ServiceDetailModal({ isOpen, service, onClose }) {
    const modalService = service || {
        title: 'Service Detail',
        status: 'Active',
        started: '-',
        detail: ''
    };

    return (
        <div
            className={`service-modal${isOpen ? ' active' : ''}`}
            id="serviceDetailModal"
            aria-hidden={isOpen ? 'false' : 'true'}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="service-modal-box" role="dialog" aria-modal="true" aria-labelledby="serviceModalTitle">
                <div className="service-modal-head">
                    <h2 className="service-modal-title" id="serviceModalTitle">{modalService.title}</h2>
                    <button className="service-modal-close" id="serviceModalClose" aria-label="Close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="service-modal-meta">
                    <span className="service-chip status" id="serviceModalStatus">{modalService.status}</span>
                    <span className="service-chip date" id="serviceModalDate">{`Started: ${modalService.started}`}</span>
                </div>
                <p className="service-modal-text" id="serviceModalText">{modalService.detail}</p>
            </div>
        </div>
    );
}

export default ServiceDetailModal;

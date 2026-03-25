import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientConfirmModal from '../components/ClientConfirmModal';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { clientPrimaryNavLinks } from '../data/clientNavData';
import {
    clientProfileAccountInfo,
    clientProfileAccountNote,
    clientProfilePreferenceGroups,
    clientProfileSettingsPageMeta,
    clientProfileSettingBoxes,
    clientProfileSummary
} from '../data/profileSettingsData';
import { CLIENT_DASHBOARD_ROUTE } from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-profile-settings.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

function buildInitials(fullName) {
    return String(fullName || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .join('')
        .slice(0, 2);
}

function buildPreferenceState(groups) {
    return groups.reduce((result, group) => {
        if (group.type !== 'checkbox') {
            return result;
        }

        group.items.forEach((item) => {
            result[item.id] = Boolean(item.defaultChecked);
        });

        return result;
    }, {});
}

function formatOtpTime(seconds) {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function ClientProfileSettingsPage() {
    const defaultCheckboxState = useMemo(() => buildPreferenceState(clientProfilePreferenceGroups), []);
    const { theme, setTheme, toggleTheme } = useClientPortalPage(clientProfileSettingsPageMeta.pageTitle);
    const photoInputRef = useRef(null);
    const [businessEmail, setBusinessEmail] = useState(clientProfileSummary.email);
    const [contactPhone, setContactPhone] = useState(clientProfileSummary.phone);
    const [preferenceState, setPreferenceState] = useState(defaultCheckboxState);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: 'Confirm',
        body: 'Are you sure?',
        onConfirm: null
    });
    const [contactEditState, setContactEditState] = useState({
        isOpen: false,
        field: '',
        value: ''
    });
    const [otpState, setOtpState] = useState({
        isOpen: false,
        pendingField: '',
        pendingValue: '',
        input: '',
        timeLeft: 120
    });

    useEffect(() => {
        if (!otpState.isOpen || otpState.timeLeft <= 0) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setOtpState((prev) => {
                if (!prev.isOpen || prev.timeLeft <= 0) {
                    return prev;
                }

                return {
                    ...prev,
                    timeLeft: prev.timeLeft - 1
                };
            });
        }, 1000);

        return function cleanupInterval() {
            window.clearInterval(intervalId);
        };
    }, [otpState.isOpen, otpState.timeLeft]);

    useEffect(() => {
        if (otpState.isOpen && otpState.timeLeft === 0) {
            openModal('OTP Expired', 'Your OTP has expired. Please click Resend OTP.');
        }
    }, [otpState.isOpen, otpState.timeLeft]);

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

    function openContactEditModal(field, prefillValue) {
        setContactEditState({
            isOpen: true,
            field,
            value:
                typeof prefillValue === 'string'
                    ? prefillValue
                    : field === 'email'
                        ? businessEmail
                        : contactPhone
        });
    }

    function closeContactEditModal() {
        setContactEditState({
            isOpen: false,
            field: '',
            value: ''
        });
    }

    function openOtpModal(field, value) {
        setOtpState({
            isOpen: true,
            pendingField: field,
            pendingValue: value,
            input: '',
            timeLeft: 120
        });
    }

    function closeOtpModal(clearPendingState = true) {
        setOtpState((prev) => ({
            isOpen: false,
            pendingField: clearPendingState ? '' : prev.pendingField,
            pendingValue: clearPendingState ? '' : prev.pendingValue,
            input: '',
            timeLeft: 120
        }));
    }

    function applyOtpUpdate() {
        if (otpState.pendingField === 'email') {
            setBusinessEmail(otpState.pendingValue);
            closeOtpModal();
            openModal('Saved', 'Your business email has been saved successfully.');
            return;
        }

        if (otpState.pendingField === 'phone') {
            setContactPhone(otpState.pendingValue);
            closeOtpModal();
            openModal('Saved', 'Your phone number has been saved successfully.');
        }
    }

    function handleContactEditConfirm() {
        const value = contactEditState.value.trim();
        if (!value) {
            openModal('Invalid Value', 'Please enter a value before confirming.');
            return;
        }

        if (contactEditState.field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                openModal('Invalid Email', 'Please enter a valid email address.');
                return;
            }
        }

        if (contactEditState.field === 'phone') {
            const phoneRegex = /^[0-9+\-()\s]{7,20}$/;
            if (!phoneRegex.test(value)) {
                openModal('Invalid Phone Number', 'Please enter a valid phone number.');
                return;
            }
        }

        const { field } = contactEditState;
        closeContactEditModal();
        openOtpModal(field, value);
    }

    function handleOtpInputChange(value) {
        const nextValue = value.replace(/\D/g, '').slice(0, 6);

        setOtpState((prev) => ({
            ...prev,
            input: nextValue
        }));

        if (nextValue.length < 6) {
            return;
        }

        if (otpState.timeLeft <= 0) {
            openModal('OTP Expired', 'Your OTP has expired. Please click Resend OTP.');
            return;
        }

        applyOtpUpdate();
    }

    function handlePreferenceChange(preferenceId, checked) {
        setPreferenceState((prev) => ({
            ...prev,
            [preferenceId]: checked
        }));
    }

    function resetAllSettings() {
        setPreferenceState(defaultCheckboxState);
        setTheme('light');
        setBusinessEmail(clientProfileSummary.email);
        setContactPhone(clientProfileSummary.phone);
        setAvatarPreview('');
        setHasPhoto(false);
        closeContactEditModal();
        closeOtpModal();
        if (photoInputRef.current) {
            photoInputRef.current.value = '';
        }
    }

    function handlePhotoChange(event) {
        const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            openModal('Invalid File', 'Please select an image file (JPG, PNG, or WEBP).');
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            openModal('File Too Large', 'Please upload an image smaller than 5 MB.');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function handleReaderLoad(loadEvent) {
            const dataUrl = loadEvent && loadEvent.target ? loadEvent.target.result : '';
            if (!dataUrl) {
                return;
            }

            setAvatarPreview(String(dataUrl));
            setHasPhoto(true);
            openModal('Profile Photo Updated', 'Your profile photo has been updated successfully.');
        };
        reader.readAsDataURL(file);
    }

    const profileInitials = buildInitials(clientProfileSettingsPageMeta.profileName);
    const navbarProfileImage = avatarPreview || clientProfileSettingsPageMeta.profileImage;
    const otpMetaText =
        otpState.pendingField === 'email'
            ? 'Enter the OTP sent to your new email address.'
            : 'Enter the OTP sent to your new phone number.';
    const contactEditTitle = contactEditState.field === 'email' ? 'Edit Business Email' : 'Edit Phone Number';
    const contactEditLabel = contactEditState.field === 'email' ? 'New Business Email' : 'New Phone Number';

    return (
        <>
            <ClientPortalNavbar
                profileName={clientProfileSettingsPageMeta.profileName}
                profileImage={navbarProfileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey=""
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <main className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Profile Settings</span>
                </nav>
                <h1 className="page-title">{clientProfileSettingsPageMeta.heading}</h1>

                <section className="panel">
                    <div className="profile-summary">
                        <div className="avatar-wrap">
                            <div className={`avatar${hasPhoto ? ' has-photo' : ''}`} id="avatarBox">
                                <span className="avatar-initials" id="avatarInitials">{profileInitials}</span>
                                <img src={avatarPreview} alt="Client profile photo" id="avatarPreview" />
                            </div>
                            <button type="button" className="photo-btn" id="changePhotoBtn" onClick={() => photoInputRef.current && photoInputRef.current.click()}>
                                <i className="fas fa-camera"></i> Change Photo
                            </button>
                            <input
                                type="file"
                                id="photoInput"
                                accept="image/*"
                                hidden
                                ref={photoInputRef}
                                onChange={handlePhotoChange}
                            />
                        </div>
                        <div className="identity">
                            <h2>{clientProfileSettingsPageMeta.profileName}</h2>
                            <p className="meta">{clientProfileSummary.clientType} Account - <span className="status-dot">{clientProfileSummary.status}</span></p>
                            <p className="line"><i className="fas fa-envelope"></i> <span id="identityEmailText">{businessEmail}</span></p>
                            <p className="line"><i className="fas fa-building"></i> {clientProfileSummary.company}</p>
                        </div>
                    </div>

                    <div className="settings-grid">
                        {clientProfileSettingBoxes.map((item) => {
                            const value =
                                item.valueKey === 'email'
                                    ? businessEmail
                                    : item.valueKey === 'phone'
                                        ? contactPhone
                                        : clientProfileSummary[item.valueKey];

                            return (
                                <div key={item.id} className="setting-box">
                                    <div className="setting-label"><i className={item.iconClass}></i> {item.label}</div>
                                    {item.editable ? (
                                        <button
                                            type="button"
                                            className="setting-edit-btn"
                                            aria-label={`Edit ${item.label}`}
                                            onClick={() => openContactEditModal(item.editable)}
                                        >
                                            <i className="fas fa-pen"></i>
                                        </button>
                                    ) : null}
                                    <div className="setting-value">{value}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="panel">
                    <h2 className="section-title">Notification Preferences</h2>
                    <p className="section-subtitle">Manage how your business receives service updates, document requests, and billing alerts.</p>

                    {clientProfilePreferenceGroups.map((group) => (
                        <div key={group.id} className="preference-group">
                            <h4>{group.title}</h4>
                            {group.items.map((item) => {
                                if (group.type === 'radio') {
                                    return (
                                        <label key={item.id} className="pref-item">
                                            <input
                                                type="radio"
                                                name={group.name}
                                                value={item.value}
                                                checked={theme === item.value}
                                                data-default-checked={item.defaultChecked ? 'true' : 'false'}
                                                onChange={() => setTheme(item.value)}
                                            />
                                            <span>
                                                <span className="title"><i className={item.iconClass}></i> {item.title}</span>
                                                <span className="desc">{item.description}</span>
                                            </span>
                                        </label>
                                    );
                                }

                                return (
                                    <label key={item.id} className="pref-item">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(preferenceState[item.id])}
                                            data-default-checked={item.defaultChecked ? 'true' : 'false'}
                                            onChange={(event) => handlePreferenceChange(item.id, event.target.checked)}
                                        />
                                        <span>
                                            <span className="title"><i className={item.iconClass}></i> {item.title}</span>
                                            <span className="desc">{item.description}</span>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    ))}

                    <div className="actions">
                        <button
                            type="button"
                            className="btn btn-primary"
                            id="saveSettingsBtn"
                            onClick={() => {
                                openModal('Save Settings', 'Do you want to save these client settings?', () => {
                                    window.alert('Settings saved successfully.');
                                });
                            }}
                        >
                            Save Settings
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            id="resetSettingsBtn"
                            onClick={() => {
                                openModal('Reset Settings', 'Do you want to reset all settings to default values?', resetAllSettings);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </section>

                <section className="panel">
                    <h2 className="section-title"><i className="fas fa-info-circle"></i> Account Information</h2>
                    <div className="account-grid">
                        {clientProfileAccountInfo.map((item) => (
                            <div key={item.id} className="account-item">
                                <div className="k">{item.key}</div>
                                <div className="v">
                                    {item.isStatus ? <span className="status-dot">{clientProfileSummary[item.valueKey]}</span> : clientProfileSummary[item.valueKey]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="account-note"><i className="fas fa-lock"></i> {clientProfileAccountNote}</p>
                </section>

                <section className="panel logout-box">
                    <button
                        type="button"
                        className="btn btn-logout"
                        id="logoutBtn"
                        onClick={() => {
                            openModal(
                                'Sign Out',
                                'Are you sure you want to sign out? You will be logged out of your account.',
                                () => {
                                    window.alert('You have been signed out.');
                                }
                            );
                        }}
                    >
                        Logout
                    </button>
                </section>
            </main>

            <ClientConfirmModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                body={modalState.body}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
            />

            <div
                id="contactEditModal"
                className="modal"
                aria-hidden={contactEditState.isOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'contactEditModal') {
                        closeContactEditModal();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" id="contactEditClose" aria-label="Close" type="button" onClick={closeContactEditModal}>
                        &times;
                    </button>
                    <h3 id="contactEditTitle">{contactEditTitle}</h3>
                    <div className="edit-form-wrap">
                        <label id="contactEditLabel" htmlFor="contactEditInput">{contactEditLabel}</label>
                        <input
                            type={contactEditState.field === 'email' ? 'email' : 'text'}
                            id="contactEditInput"
                            value={contactEditState.value}
                            onChange={(event) =>
                                setContactEditState((prev) => ({
                                    ...prev,
                                    value: event.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="primary" id="contactEditConfirm" onClick={handleContactEditConfirm}>Confirm</button>
                        <button type="button" className="secondary" id="contactEditCancel" onClick={closeContactEditModal}>Cancel</button>
                    </div>
                </div>
            </div>

            <div
                id="otpModal"
                className="modal"
                aria-hidden={otpState.isOpen ? 'false' : 'true'}
                onClick={(event) => {
                    if (event.target.id === 'otpModal') {
                        closeOtpModal();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="modal-close" id="otpClose" aria-label="Close" type="button" onClick={() => closeOtpModal()}>
                        &times;
                    </button>
                    <h3>Enter OTP</h3>
                    <div className="edit-form-wrap">
                        <label htmlFor="otpInput">Enter OTP</label>
                        <input
                            type="text"
                            id="otpInput"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="6-digit OTP"
                            value={otpState.input}
                            onChange={(event) => handleOtpInputChange(event.target.value)}
                        />
                    </div>
                    <p className="otp-meta" id="otpMetaText">{otpMetaText}</p>
                    <p className="otp-timer-wrap">Time left: <span className="timer" id="otpTimer">{formatOtpTime(otpState.timeLeft)}</span></p>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary"
                            id="otpEditBtn"
                            onClick={() => {
                                const nextField = otpState.pendingField;
                                const nextValue = otpState.pendingValue;
                                closeOtpModal();
                                if (nextField) {
                                    openContactEditModal(nextField, nextValue);
                                }
                            }}
                        >
                            Edit Number
                        </button>
                        <button
                            type="button"
                            className="primary"
                            id="otpResendBtn"
                            onClick={() => {
                                setOtpState((prev) => ({
                                    ...prev,
                                    input: '',
                                    timeLeft: 120
                                }));
                                openModal('OTP Sent', 'A new OTP has been sent successfully.');
                            }}
                        >
                            Resend OTP
                        </button>
                        <button type="button" className="secondary" id="otpCancelBtn" onClick={() => closeOtpModal()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

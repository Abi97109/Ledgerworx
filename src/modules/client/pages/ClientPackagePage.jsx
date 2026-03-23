import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { clientPackagePageData } from '../data/clientPackageData';
import { usePageStyles } from '../hooks/usePageStyles';
import { buildClientAvatar } from '../utils/dashboardUtils';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import clientPackageCssUrl from '../styles/clientPackage.css?url';
import clientBreadcrumbCssUrl from '../styles/clientBreadcrumb.css?url';
import clientDashboardDarkModeCssUrl from '../styles/clientDashboardDarkMode.css?url';

const THEME_STORAGE_KEY = 'clientPortalTheme';

function ClientPackagePage() {
    usePageStyles([clientPackageCssUrl, clientBreadcrumbCssUrl, clientDashboardDarkModeCssUrl]);

    const { profileName, profileImage, navLinks, packageMap } = clientPackagePageData;
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const planKey = (searchParams.get('plan') || '').trim().toLowerCase();
    const selectedPlan = packageMap[planKey] || null;

    const [navMenuDisplay, setNavMenuDisplay] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [requestForm, setRequestForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        notes: ''
    });
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            return savedTheme === 'dark' ? 'dark' : 'light';
        } catch (error) {
            return 'light';
        }
    });

    const resolvedProfileImage = useMemo(() => {
        if (profileImage && !profileImage.includes('i.pravatar.cc')) {
            return profileImage;
        }
        return buildClientAvatar(profileName);
    }, [profileImage, profileName]);

    useEffect(() => {
        const root = document.documentElement;
        const isDarkMode = theme === 'dark';

        root.classList.toggle('dark-mode', isDarkMode);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            // Ignore storage failures in restricted environments.
        }
    }, [theme]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!profileRef.current) return;
            if (!profileRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsRequestModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const toggleProfileDropdown = (event) => {
        event.stopPropagation();
        setIsProfileDropdownOpen((currentState) => !currentState);
    };

    const handleThemeToggle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleNavToggle = () => {
        setNavMenuDisplay((currentDisplay) => (currentDisplay === 'flex' ? 'none' : 'flex'));
    };

    const handleSignOut = (event) => {
        event.preventDefault();
        setIsProfileDropdownOpen(false);
        window.location.href = buildLegacyUrl('client-signoutaf.php');
    };

    const handleRequestFieldChange = (event) => {
        const { name, value } = event.target;
        setRequestForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const openRequestModal = () => {
        setIsRequestModalOpen(true);
    };

    const closeRequestModal = () => {
        setIsRequestModalOpen(false);
    };

    const handleRequestSubmit = (event) => {
        event.preventDefault();
        const queryParams = new URLSearchParams({
            package_name: selectedPlan ? selectedPlan.name : '',
            package_price: selectedPlan ? selectedPlan.monthly_price : '',
            plan: planKey,
            full_name: requestForm.full_name,
            email: requestForm.email,
            phone: requestForm.phone,
            company_name: requestForm.company_name,
            notes: requestForm.notes
        });

        navigate(`/client/payment-gateway?${queryParams.toString()}`);
    };

    return (
        <>
            <header className="navbar">
                <div className="brand">
                    <Link to="/client/dashboard" aria-label="Go to Dashboard">
                        <img src={buildLegacyUrl('client/client-assets/logo.png')} alt="Ledger Workx logo" className="logo-img" />
                    </Link>
                </div>

                <button className="nav-toggle" aria-label="Toggle menu" onClick={handleNavToggle}>
                    <i className="fas fa-bars"></i>
                </button>

                <nav className="nav-links" style={navMenuDisplay ? { display: navMenuDisplay } : undefined}>
                    {navLinks.map((navLink) => {
                        const iconClass = `fa-solid ${navLink.icon}`;

                        if (navLink.isMigrated) {
                            return (
                                <Link
                                    key={navLink.label}
                                    to={navLink.routeTo}
                                    className={navLink.isActive ? 'active' : undefined}
                                >
                                    <i className={iconClass}></i>
                                    {navLink.label}
                                </Link>
                            );
                        }

                        return (
                            <a key={navLink.label} href={buildLegacyUrl(navLink.href)}>
                                <i className={iconClass}></i>
                                {navLink.label}
                            </a>
                        );
                    })}
                </nav>

                <div className="profile" ref={profileRef}>
                    <span className="profile-name" id="profileNameBtn" onClick={toggleProfileDropdown}>
                        {profileName}
                    </span>
                    <img
                        src={resolvedProfileImage}
                        alt="profile"
                        className="profile-img"
                        id="profileToggle"
                        onClick={toggleProfileDropdown}
                        onError={(event) => {
                            event.currentTarget.src = buildClientAvatar(profileName);
                        }}
                    />
                    <i
                        className={`fas fa-chevron-down profile-arrow${isProfileDropdownOpen ? ' rotate' : ''}`}
                        id="profileArrow"
                        onClick={toggleProfileDropdown}
                    ></i>
                    <div className={`profile-dropdown${isProfileDropdownOpen ? ' active' : ''}`} id="profileDropdown">
                        <div className="dropdown-header">
                            <img
                                src={resolvedProfileImage}
                                alt="Client avatar"
                                className="user-avatar"
                                onError={(event) => {
                                    event.currentTarget.src = buildClientAvatar(profileName);
                                }}
                            />
                            <h4>{profileName}</h4>
                            <p>Client Portal</p>
                        </div>
                        <div className="dropdown-body">
                            <a
                                href={buildLegacyUrl('client-profile-settings.php')}
                                className="dropdown-item"
                                data-dropdown-item="profile-settings"
                            >
                                <i className="fas fa-user"></i>
                                <span>Profile Settings</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <div
                                className="theme-toggle"
                                id="themeToggle"
                                role="button"
                                tabIndex={0}
                                onClick={handleThemeToggle}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        handleThemeToggle(event);
                                    }
                                }}
                            >
                                <div className="theme-toggle-label">
                                    <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} id="themeIcon"></i>
                                    <span id="themeText">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </div>
                                <div className={`toggle-switch${theme === 'dark' ? ' active' : ''}`} id="themeToggleSwitch"></div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <a href={buildLegacyUrl('client-support.php')} className="dropdown-item" data-dropdown-item="help">
                                <i className="fas fa-question-circle"></i>
                                <span>Help &amp; Support</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item signout" id="signoutBtn" type="button" onClick={handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/client/dashboard">Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">{selectedPlan ? selectedPlan.name : 'Package Details'}</span>
                </nav>

                {selectedPlan ? (
                    <>
                        <h1 className="title">{selectedPlan.name}</h1>
                        <p className="subtitle">{selectedPlan.tagline}</p>

                        <section className="card hero">
                            <div className="meta-box">
                                <div className="meta-label">Monthly Price</div>
                                <div className="meta-value">{selectedPlan.monthly_price}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Annual Price</div>
                                <div className="meta-value">{selectedPlan.annual_price}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Service Coverage</div>
                                <div className="meta-value">{selectedPlan.services_limit}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Support Model</div>
                                <div className="meta-value">{selectedPlan.support}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Reporting</div>
                                <div className="meta-value">{selectedPlan.reports}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Turnaround</div>
                                <div className="meta-value">{selectedPlan.turnaround}</div>
                            </div>
                            <div className="meta-box">
                                <div className="meta-label">Onboarding</div>
                                <div className="meta-value">{selectedPlan.onboarding}</div>
                            </div>
                        </section>

                        <section className="card">
                            <h2 className="section-title">Included Services</h2>
                            <ul className="list">
                                {selectedPlan.included_services.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="card">
                            <h2 className="section-title">Deliverables</h2>
                            <ul className="list">
                                {selectedPlan.deliverables.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="card">
                            <h2 className="section-title">Not Included</h2>
                            <ul className="list">
                                {selectedPlan.not_included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <div className="actions">
                                <button type="button" className="btn btn-primary" id="openRequestModal" onClick={openRequestModal}>
                                    Proceed with Request
                                </button>
                                <Link className="btn btn-secondary" to="/client/dashboard#packages">
                                    Compare Other Packages
                                </Link>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="empty">
                        <strong>Package not found.</strong>
                        <p>Please return to the dashboard and select Basic, Pro, or Ultimate.</p>
                    </div>
                )}
            </main>

            <div
                id="requestModal"
                className={`modal${isRequestModalOpen ? ' active' : ''}`}
                aria-hidden={isRequestModalOpen ? 'false' : 'true'}
                onClick={closeRequestModal}
            >
                <div
                    className="modal-content"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="requestModalTitle"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button className="modal-close" id="closeRequestModal" aria-label="Close" onClick={closeRequestModal}>
                        &times;
                    </button>
                    <h3 className="modal-title" id="requestModalTitle">Package Request Form</h3>
                    <p className="modal-subtitle">Fill the details below and continue to the payment gateway.</p>
                    <form
                        id="requestForm"
                        className="request-form"
                        method="post"
                        action={buildLegacyUrl('client-payment-gateway.php')}
                        onSubmit={handleRequestSubmit}
                    >
                        <div>
                            <label htmlFor="requestPackage">Selected Package</label>
                            <input type="text" id="requestPackage" name="package_name" readOnly value={selectedPlan ? selectedPlan.name : ''} />
                        </div>
                        <input type="hidden" id="requestPlan" name="plan" value={planKey} />
                        <input
                            type="hidden"
                            id="requestPrice"
                            name="package_price"
                            value={selectedPlan ? selectedPlan.monthly_price : ''}
                        />
                        <div>
                            <label htmlFor="requestName">Full Name</label>
                            <input
                                type="text"
                                id="requestName"
                                name="full_name"
                                required
                                value={requestForm.full_name}
                                onChange={handleRequestFieldChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestEmail">Email Address</label>
                            <input
                                type="email"
                                id="requestEmail"
                                name="email"
                                required
                                value={requestForm.email}
                                onChange={handleRequestFieldChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestPhone">Phone Number</label>
                            <input
                                type="tel"
                                id="requestPhone"
                                name="phone"
                                required
                                value={requestForm.phone}
                                onChange={handleRequestFieldChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestCompany">Company Name</label>
                            <input
                                type="text"
                                id="requestCompany"
                                name="company_name"
                                required
                                value={requestForm.company_name}
                                onChange={handleRequestFieldChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="requestNotes">Additional Notes</label>
                            <textarea
                                id="requestNotes"
                                name="notes"
                                placeholder="Any special request or details"
                                value={requestForm.notes}
                                onChange={handleRequestFieldChange}
                            ></textarea>
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" id="cancelRequestModal" onClick={closeRequestModal}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">Proceed to Payment Gateway</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ClientPackagePage;

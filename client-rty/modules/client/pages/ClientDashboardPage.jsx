import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { dashboardData } from '../data/dashboardData';
import { paymentsMockItems } from '../data/paymentsData';
import {
    buildClientAvatar,
    computeDueNowTotal,
    formatAedAmount
} from '../utils/dashboardUtils';
import { usePageStyles } from '../hooks/usePageStyles';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import clientDashboardCssUrl from '../styles/clientDashboard.css?url';
import clientDashboardDarkModeCssUrl from '../styles/clientDashboardDarkMode.css?url';

const THEME_STORAGE_KEY = 'clientPortalTheme';
const DUE_NOW_STORAGE_KEY = 'ledgerworx_due_now_total';

function ClientDashboardPage() {
    usePageStyles([clientDashboardCssUrl, clientDashboardDarkModeCssUrl]);

    const {
        userName,
        profileName,
        profileImage,
        clientEmail,
        clientPhone,
        navLinks,
        packages,
        stats,
        services,
        recentActivity,
        quickLinks,
        notifications
    } = dashboardData;

    const fallbackDueNowAmount = useMemo(
        () => formatAedAmount(computeDueNowTotal(paymentsMockItems)),
        []
    );

    const [navMenuDisplay, setNavMenuDisplay] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            return savedTheme === 'dark' ? 'dark' : 'light';
        } catch (error) {
            return 'light';
        }
    });
    const [paymentDueAmount, setPaymentDueAmount] = useState(fallbackDueNowAmount);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('Confirm');
    const [modalBody, setModalBody] = useState('Are you sure?');

    const profileRef = useRef(null);
    const modalConfirmActionRef = useRef(null);

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
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
                modalConfirmActionRef.current = null;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        try {
            const cachedDueNow = Number(localStorage.getItem(DUE_NOW_STORAGE_KEY));
            if (Number.isFinite(cachedDueNow) && cachedDueNow >= 0) {
                setPaymentDueAmount(formatAedAmount(cachedDueNow));
            }
        } catch (error) {
            // Ignore storage failures in restricted environments.
        }

        const dueNowTotal = computeDueNowTotal(paymentsMockItems);
        setPaymentDueAmount(formatAedAmount(dueNowTotal));
        try {
            localStorage.setItem(DUE_NOW_STORAGE_KEY, String(dueNowTotal));
        } catch (error) {
            // Ignore storage failures in restricted environments.
        }
    }, []);

    const openModal = (title, body, onConfirm) => {
        setModalTitle(title);
        setModalBody(body);
        modalConfirmActionRef.current = typeof onConfirm === 'function' ? onConfirm : null;
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        modalConfirmActionRef.current = null;
    };

    const handleModalConfirm = () => {
        const nextAction = modalConfirmActionRef.current;
        closeModal();
        if (typeof nextAction === 'function') {
            nextAction();
        }
    };

    const toggleProfileDropdown = (event) => {
        event.stopPropagation();
        setIsProfileDropdownOpen((currentOpen) => !currentOpen);
    };

    const toggleTheme = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleNavToggle = () => {
        setNavMenuDisplay((currentDisplay) => (currentDisplay === 'flex' ? 'none' : 'flex'));
    };

    const redirectToLegacyPage = (href) => {
        window.location.href = buildLegacyUrl(href);
    };

    const submitToPaymentGateway = (payload) => {
        const queryParams = new URLSearchParams(
            Object.entries(payload).reduce((result, [key, value]) => {
                result[key] = value ?? '';
                return result;
            }, {})
        );

        window.location.href = `/client/payment-gateway?${queryParams.toString()}`;
    };

    const handlePayNow = () => {
        openModal(
            'Redirect to Payment Gateway',
            'You will be redirected to the payment gateway to complete this payment.',
            () => {
                submitToPaymentGateway({
                    package_name: 'Dashboard Payment Due',
                    package_price: paymentDueAmount,
                    full_name: profileName,
                    email: clientEmail,
                    phone: clientPhone,
                    company_name: '',
                    notes: 'Initiated from dashboard Pay Now tile.',
                    plan: 'dashboard-payment'
                });
            }
        );
    };

    const handleQuickBlogClick = () => {
        openModal(
            'Redirecting to Blog Page',
            'You will be redirected to the blog page.',
            () => {
                redirectToLegacyPage('blog.php');
            }
        );
    };

    const handleSignOut = (event) => {
        event.preventDefault();
        setIsProfileDropdownOpen(false);
        redirectToLegacyPage('client-signoutaf.php');
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
                                onClick={toggleTheme}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        toggleTheme(event);
                                    }
                                }}
                            >
                                <div className="theme-toggle-label">
                                    <i
                                        className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}
                                        id="themeIcon"
                                    ></i>
                                    <span id="themeText">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </div>
                                <div
                                    className={`toggle-switch${theme === 'dark' ? ' active' : ''}`}
                                    id="themeToggleSwitch"
                                ></div>
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
                <section className="welcome">
                    <h1>Welcome back, {userName}</h1>
                    <p>Here's what's happening with your account today</p>
                </section>

                <section className="packages" id="packages">
                    {packages.map((item) => {
                        const packageBody = (
                            <>
                                <h3>{item.title}</h3>
                                <div className="price">{item.price}</div>
                                <ul>
                                    {item.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </>
                        );

                        if (item.isMigrated) {
                            return (
                                <Link
                                    key={item.title}
                                    to={item.routeTo}
                                    className="card"
                                    data-plan={item.plan}
                                    data-href={item.href}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {packageBody}
                                </Link>
                            );
                        }

                        return (
                            <article
                                key={item.title}
                                className="card"
                                data-plan={item.plan}
                                data-href={item.href}
                                onClick={() => redirectToLegacyPage(item.href)}
                            >
                                {packageBody}
                            </article>
                        );
                    })}
                </section>

                <section className="stats">
                    {stats.map((stat) => {
                        const statContent = (
                            <>
                                <span className="stat-label">{stat.label}</span>
                                <div className="stat-icon">
                                    <i className={`fas ${stat.icon}`}></i>
                                </div>
                                <h2>{stat.value}</h2>
                            </>
                        );

                        if (stat.isMigrated) {
                            return (
                                <Link key={stat.label} to={stat.routeTo} className="stat-box stat-link">
                                    {statContent}
                                </Link>
                            );
                        }

                        return (
                            <a key={stat.label} href={buildLegacyUrl(stat.href)} className="stat-box stat-link">
                                {statContent}
                            </a>
                        );
                    })}
                    <div className="stat-box">
                        <span className="stat-label">Payments Due</span>
                        <h2 id="dashboardPaymentDueAmount">{paymentDueAmount}</h2>
                        <div className="pay-now" style={{ marginTop: '14px' }}>
                            <button className="primary pay-btn" onClick={handlePayNow}>Pay Now</button>
                            <button className="secondary">Download Invoice</button>
                        </div>
                    </div>
                </section>

                <section className="services-section">
                    <div className="services-header">
                        <h3>Services</h3>
                        <Link to="/client/more-services" className="more-services">
                            More Services <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="services">
                        {services.map((service) => (
                            <a key={service.label} href={buildLegacyUrl(service.href)} className="service-box">
                                <div className="service-left">
                                    <div className="service-icon">
                                        <i className={`fas ${service.icon}`}></i>
                                    </div>
                                    <span>{service.label}</span>
                                </div>
                                <i className="fas fa-chevron-right"></i>
                            </a>
                        ))}
                    </div>
                </section>

                <div className="bottom-section">
                    <div className="recent">
                        <h3>Recent Activity</h3>
                        <div className="activity-grid">
                            {recentActivity.map((item) => (
                                <div key={item.title} className="activity-tile">
                                    <div className="title">{item.title}</div>
                                    <div className="meta">{item.meta}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="side">
                        <h3>Quick Links</h3>
                        <div className="quick-links">
                            {quickLinks.map((quickLink) => {
                                if (quickLink.type === 'action') {
                                    return (
                                        <div key={quickLink.label} id={quickLink.id} onClick={handleQuickBlogClick}>
                                            {quickLink.label}
                                        </div>
                                    );
                                }

                                if (quickLink.isMigrated) {
                                    return (
                                        <Link key={quickLink.label} to={quickLink.routeTo}>
                                            {quickLink.label}
                                        </Link>
                                    );
                                }

                                return (
                                    <a key={quickLink.label} href={buildLegacyUrl(quickLink.href)}>
                                        {quickLink.label}
                                    </a>
                                );
                            })}
                        </div>

                        <h3>Latest Notifications</h3>
                        <div className="notifications">
                            {notifications.map((notificationText) => (
                                <p key={notificationText}>{notificationText}</p>
                            ))}
                        </div>
                    </aside>
                </div>
            </main>

            <ConfirmationModal
                isOpen={isModalOpen}
                title={modalTitle}
                body={modalBody}
                onConfirm={handleModalConfirm}
                onCancel={closeModal}
            />
        </>
    );
}

export default ClientDashboardPage;

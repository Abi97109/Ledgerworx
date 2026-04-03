import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import portalLogo from '../../../assets/logo.png';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import { usePortalSession } from '../context/PortalSessionProvider';
import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_PROFILE_SETTINGS_ROUTE,
    CLIENT_SIGNOUT_ROUTE,
    CLIENT_SUPPORT_ROUTE
} from '../utils/routePaths';

const WORDPRESS_HOME_URL = 'https://ledgerworx.me';

function buildClientAvatar(name) {
    return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=1f8f8b&color=fff&size=96';
}

function getDropdownAvatar(profileName, profileImage) {
    if (!profileImage || profileImage.includes('i.pravatar.cc')) {
        return buildClientAvatar(profileName);
    }

    return profileImage;
}

export default function ClientPortalNavbar({
    profileName,
    profileImage,
    navLinks,
    activeNavKey,
    homeRoute,
    profileSettingsRoute,
    signoutRoute,
    supportRoute,
    theme,
    onToggleTheme
}) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const bootstrapQuery = usePortalSession();
    const sessionProfile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;
    const resolvedProfileName = sessionProfile && sessionProfile.name ? sessionProfile.name : profileName;
    const resolvedProfileImage = sessionProfile && sessionProfile.avatarUrl ? sessionProfile.avatarUrl : profileImage;

    const dropdownAvatar = useMemo(() => {
        return getDropdownAvatar(resolvedProfileName, resolvedProfileImage);
    }, [resolvedProfileImage, resolvedProfileName]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!profileRef.current) {
                return;
            }

            if (!profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return function cleanup() {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    function toggleProfileDropdown(event) {
        event.stopPropagation();
        setIsProfileOpen((prev) => !prev);
    }

    function redirectToSignout() {
        const signoutPageUrl = WORDPRESS_HOME_URL + '/portal' + resolvedSignoutRoute;
        const logoutUrl = WORDPRESS_HOME_URL + '/?lw_action=logout&redirect_to=' + encodeURIComponent(signoutPageUrl);
        window.location.href = logoutUrl;
    }

    function handleThemeToggle(event) {
        event.preventDefault();
        event.stopPropagation();
        onToggleTheme();
    }

    const resolvedHomeRoute = homeRoute || CLIENT_DASHBOARD_ROUTE;
    const resolvedProfileSettingsRoute = profileSettingsRoute || CLIENT_PROFILE_SETTINGS_ROUTE;
    const resolvedSupportRoute = supportRoute || CLIENT_SUPPORT_ROUTE;
    const resolvedSignoutRoute = signoutRoute || CLIENT_SIGNOUT_ROUTE;

    return (
        <header className="navbar">
            <div className="brand">
                {resolvedHomeRoute ? (
                    <Link to={resolvedHomeRoute} aria-label="Go to Dashboard">
                        <img src={portalLogo} alt="Ledger Workx logo" className="logo-img" />
                    </Link>
                ) : (
                    <a href={buildLegacyUrl('client-php/client-dashboard.php')} aria-label="Go to Dashboard">
                        <img src={portalLogo} alt="Ledger Workx logo" className="logo-img" />
                    </a>
                )}
            </div>

            <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setIsNavOpen((prev) => !prev)}>
                <i className="fas fa-bars"></i>
            </button>

            <nav className="nav-links" style={isNavOpen ? { display: 'flex' } : undefined}>
                {navLinks.map((link) => (
                    link.routePath ? (
                        <Link
                            key={link.key || link.routePath}
                            to={link.routePath}
                            className={link.key && activeNavKey === link.key ? 'active' : ''}
                        >
                            <i className={'fa-solid ' + link.iconClass}></i>
                            {link.label}
                        </Link>
                    ) : (
                        <a
                            key={link.key || link.legacyPath}
                            href={buildLegacyUrl(link.legacyPath)}
                            className={link.key && activeNavKey === link.key ? 'active' : ''}
                        >
                            <i className={'fa-solid ' + link.iconClass}></i>
                            {link.label}
                        </a>
                    )
                ))}
            </nav>

            <div className="profile" ref={profileRef}>
                <span className="profile-name" id="profileNameBtn" onClick={toggleProfileDropdown}>
                    {resolvedProfileName}
                </span>
                <img
                    src={resolvedProfileImage}
                    alt="profile"
                    className="profile-img"
                    id="profileToggle"
                    onClick={toggleProfileDropdown}
                />
                <i
                    className={'fas fa-chevron-down profile-arrow' + (isProfileOpen ? ' rotate' : '')}
                    id="profileArrow"
                    onClick={toggleProfileDropdown}
                ></i>

                <div className={'profile-dropdown' + (isProfileOpen ? ' active' : '')} id="profileDropdown">
                    <div className="dropdown-header">
                        <img
                            src={dropdownAvatar}
                            alt="Client avatar"
                            className="user-avatar"
                            onError={(event) => {
                                event.currentTarget.src = buildClientAvatar(resolvedProfileName);
                            }}
                        />
                        <h4>{resolvedProfileName}</h4>
                        <p>Client Portal</p>
                    </div>
                    <div className="dropdown-body">
                        <Link
                            to={resolvedProfileSettingsRoute}
                            className="dropdown-item"
                            data-dropdown-item="profile-settings"
                        >
                            <i className="fas fa-user"></i>
                            <span>Profile Settings</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <div className="theme-toggle" id="themeToggle" onClick={handleThemeToggle}>
                            <div className="theme-toggle-label">
                                <i className={'fas ' + (theme === 'dark' ? 'fa-sun' : 'fa-moon')} id="themeIcon"></i>
                                <span id="themeText">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </div>
                            <div className={'toggle-switch' + (theme === 'dark' ? ' active' : '')} id="themeToggleSwitch"></div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <Link to={resolvedSupportRoute} className="dropdown-item" data-dropdown-item="help">
                            <i className="fas fa-question-circle"></i>
                            <span>Help &amp; Support</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item signout" id="signoutBtn" type="button" onClick={redirectToSignout}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

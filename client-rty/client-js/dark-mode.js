(function () {
    var root = document.documentElement;
    var storageKey = 'clientPortalTheme';

    var navIconMap = [
        { match: 'client-dashboard.php', icon: 'fa-chart-column' },
        { match: 'client-request.php', icon: 'fa-list-check' },
        { match: 'client-payments.php', icon: 'fa-credit-card' },
        { match: 'client-documents.php', icon: 'fa-folder-open' },
        { match: 'clinet-notification.php', icon: 'fa-bell' },
        { match: 'client-notificationex.php', icon: 'fa-bell' },
        { match: 'client-opentasks.php', icon: 'fa-list-check' },
        { match: 'client-activeservices.php', icon: 'fa-briefcase' },
        { match: 'client-invoices.php', icon: 'fa-file-invoice' },
        { match: 'client-package.php', icon: 'fa-box-archive' },
        { match: 'client-moreServices.php', icon: 'fa-layer-group' },
        { match: 'client-subServices.php', icon: 'fa-sitemap' },
        { match: 'client-support.php', icon: 'fa-headset' },
        { match: 'client-profile-settings.php', icon: 'fa-user' }
    ];

    function getSavedTheme() {
        try {
            return localStorage.getItem(storageKey);
        } catch (e) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (e) {
            // Ignore storage failures in restricted environments.
        }
    }

    function applyTheme(theme) {
        var isDark = theme === 'dark';
        root.classList.toggle('dark-mode', isDark);

        var toggleSwitch = document.getElementById('themeToggleSwitch');
        if (toggleSwitch) {
            toggleSwitch.classList.toggle('active', isDark);
        }

        var themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon', 'fa-sun');
            themeIcon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
        }

        var themeText = document.getElementById('themeText');
        if (themeText) {
            themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
    }

    function getIconClass(href) {
        var normalized = (href || '').toLowerCase();
        for (var i = 0; i < navIconMap.length; i += 1) {
            if (normalized.indexOf(navIconMap[i].match) !== -1) {
                return navIconMap[i].icon;
            }
        }
        return '';
    }

    function ensureNavIcons(navbar) {
        var links = navbar.querySelectorAll('.nav-links a');
        links.forEach(function (link) {
            if (link.querySelector('i')) {
                return;
            }
            var iconClass = getIconClass(link.getAttribute('href'));
            if (!iconClass) {
                return;
            }
            var icon = document.createElement('i');
            icon.className = 'fa-solid ' + iconClass;
            link.insertBefore(icon, link.firstChild);
        });
    }

    function buildClientAvatar(name) {
        return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=1f8f8b&color=fff&size=96';
    }

    function ensureDropdownMenu(navbar, dropdown) {
        if (!dropdown) {
            return;
        }

        var profileNameNode = navbar.querySelector('.profile-name');
        var profileImageNode = navbar.querySelector('.profile-img');
        var profileName = profileNameNode ? profileNameNode.textContent.trim() : 'Client User';
        var profileImage = buildClientAvatar(profileName);
        if (profileImageNode && profileImageNode.getAttribute('src')) {
            var rawImage = profileImageNode.getAttribute('src').trim();
            if (rawImage && rawImage.indexOf('i.pravatar.cc') === -1) {
                profileImage = rawImage;
            }
        }

        dropdown.innerHTML =
            '<div class="dropdown-header">' +
                '<img src="' + profileImage + '" alt="Client avatar" class="user-avatar" onerror="this.src=\'' + buildClientAvatar(profileName) + '\'">' +
                '<h4>' + profileName + '</h4>' +
                '<p>Client Portal</p>' +
            '</div>' +
            '<div class="dropdown-body">' +
                '<a href="client-profile-settings.php" class="dropdown-item" data-dropdown-item="profile-settings">' +
                    '<i class="fas fa-user"></i><span>Profile Settings</span>' +
                '</a>' +
                '<div class="dropdown-divider"></div>' +
                '<div class="theme-toggle" id="themeToggle">' +
                    '<div class="theme-toggle-label">' +
                        '<i class="fas fa-moon" id="themeIcon"></i>' +
                        '<span id="themeText">Dark Mode</span>' +
                    '</div>' +
                    '<div class="toggle-switch" id="themeToggleSwitch"></div>' +
                '</div>' +
                '<div class="dropdown-divider"></div>' +
                '<a href="client-support.php" class="dropdown-item" data-dropdown-item="help">' +
                    '<i class="fas fa-question-circle"></i><span>Help &amp; Support</span>' +
                '</a>' +
                '<div class="dropdown-divider"></div>' +
                '<button class="dropdown-item signout" id="signoutBtn" type="button">' +
                    '<i class="fas fa-sign-out-alt"></i><span>Sign Out</span>' +
                '</button>' +
            '</div>';

        var signoutItem = dropdown.querySelector('#signoutBtn');
        if (signoutItem) {
            signoutItem.addEventListener('click', function () {
                window.location.href = 'client-signoutaf.php';
            });
        }
    }

    function bindThemeToggle() {
        var themeToggle = document.getElementById('themeToggle');
        if (!themeToggle || themeToggle.getAttribute('data-theme-bound') === '1') {
            return;
        }

        themeToggle.setAttribute('data-theme-bound', '1');
        themeToggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var nextTheme = root.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    function init() {
        var navbar = document.querySelector('header.navbar');
        if (!navbar) {
            return;
        }

        ensureNavIcons(navbar);
        ensureDropdownMenu(navbar, navbar.querySelector('#profileDropdown'));

        var savedTheme = getSavedTheme();
        if (savedTheme !== 'dark' && savedTheme !== 'light') {
            savedTheme = 'light';
        }
        applyTheme(savedTheme);
        bindThemeToggle();
    }

    var earlyTheme = getSavedTheme();
    if (earlyTheme === 'dark') {
        root.classList.add('dark-mode');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

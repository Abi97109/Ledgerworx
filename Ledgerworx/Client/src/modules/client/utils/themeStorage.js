const THEME_STORAGE_KEY = 'clientPortalTheme';

export function getClientSavedTheme() {
    if (typeof window === 'undefined') {
        return 'light';
    }

    try {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
    } catch (error) {
        // Ignore storage access failures.
    }

    return 'light';
}

export function saveClientTheme(theme) {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        // Ignore storage access failures.
    }
}

export { THEME_STORAGE_KEY };
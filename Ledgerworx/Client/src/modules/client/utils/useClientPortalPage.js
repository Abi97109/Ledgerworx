import { useEffect, useState } from 'react';
import { getClientSavedTheme, saveClientTheme } from './themeStorage';

export function useClientPortalPage(pageTitle) {
    const [theme, setTheme] = useState(() => {
        const initialTheme = getClientSavedTheme();

        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        }

        return initialTheme;
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark-mode', theme === 'dark');
        saveClientTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (pageTitle) {
            document.title = pageTitle;
        }
    }, [pageTitle]);

    useEffect(() => {
        const existing = document.getElementById('font-awesome-6-5-0');
        if (existing) {
            return;
        }

        const link = document.createElement('link');
        link.id = 'font-awesome-6-5-0';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
        document.head.appendChild(link);
    }, []);

    return {
        theme,
        setTheme,
        toggleTheme() {
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
        }
    };
}

import { useEffect } from 'react';

const STYLE_SOURCE_ATTRIBUTE = 'data-ledgerworx-page-style';
const STYLE_REFCOUNT_ATTRIBUTE = 'data-ledgerworx-style-refcount';
const URL_SEPARATOR = '||';

function parseStyleUrls(styleUrls) {
    if (Array.isArray(styleUrls)) {
        return styleUrls.filter(Boolean);
    }

    return styleUrls ? [styleUrls] : [];
}

export function usePageStyles(styleUrls) {
    const normalizedUrls = parseStyleUrls(styleUrls);
    const signature = normalizedUrls.join(URL_SEPARATOR);

    useEffect(() => {
        const urls = signature ? signature.split(URL_SEPARATOR) : [];
        const links = urls.map((href) => {
            const selector = `link[rel="stylesheet"][${STYLE_SOURCE_ATTRIBUTE}="${href}"]`;
            const existingLink = document.head.querySelector(selector);

            if (existingLink) {
                const currentCount = Number(existingLink.getAttribute(STYLE_REFCOUNT_ATTRIBUTE) || '0');
                existingLink.setAttribute(STYLE_REFCOUNT_ATTRIBUTE, String(currentCount + 1));
                return existingLink;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.setAttribute(STYLE_SOURCE_ATTRIBUTE, href);
            link.setAttribute(STYLE_REFCOUNT_ATTRIBUTE, '1');
            document.head.appendChild(link);
            return link;
        });

        return () => {
            links.forEach((link) => {
                if (!link || !link.parentNode) {
                    return;
                }

                const currentCount = Number(link.getAttribute(STYLE_REFCOUNT_ATTRIBUTE) || '0');

                if (currentCount <= 1) {
                    link.parentNode.removeChild(link);
                    return;
                }

                link.setAttribute(STYLE_REFCOUNT_ATTRIBUTE, String(currentCount - 1));
            });
        };
    }, [signature]);
}

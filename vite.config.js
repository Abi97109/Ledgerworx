import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const apacheSpaFallbackPlugin = {
    name: 'apache-spa-fallback',
    closeBundle() {
        const sourcePath = fileURLToPath(new URL('./public/.htaccess', import.meta.url));
        const targetPath = fileURLToPath(new URL('./dist/.htaccess', import.meta.url));

        if (existsSync(sourcePath)) {
            copyFileSync(sourcePath, targetPath);
        }
    }
};

export default defineConfig({
    base: '/',
    plugins: [react(), apacheSpaFallbackPlugin],
    server: {
        host: '0.0.0.0',
        port: 5173
    },
    preview: {
        host: '0.0.0.0',
        port: 4173
    }
});

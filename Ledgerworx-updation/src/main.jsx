import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortalSessionProvider } from './modules/client/context/PortalSessionProvider';
import AppRouter from './routes/AppRouter';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            refetchOnWindowFocus: true
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <PortalSessionProvider>
                <AppRouter />
            </PortalSessionProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
